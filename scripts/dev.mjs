import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const distDir = path.join(rootDir, "dist");
const args = process.argv.slice(2);
const watchEnabled = !args.includes("--no-watch");

function getOption(name, fallback) {
  const equalsOption = args.find((argument) => argument.startsWith(`${name}=`));
  if (equalsOption) return equalsOption.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const host = getOption("--host", "127.0.0.1");
const port = Number(getOption("--port", "4321"));
const clients = new Set();
const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"],
]);

function safeCandidates(urlPath) {
  const relativePath = decodeURIComponent(urlPath).replace(/^\/+/, "");
  const candidates = urlPath.endsWith("/")
    ? [path.join(relativePath, "index.html")]
    : [relativePath, `${relativePath}.html`, path.join(relativePath, "index.html")];

  return candidates
    .map((candidate) => path.resolve(distDir, candidate))
    .filter((candidate) => candidate === distDir || candidate.startsWith(`${distDir}${path.sep}`));
}

async function findFile(urlPath) {
  for (const candidate of safeCandidates(urlPath)) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      // Try the next route form.
    }
  }
  return null;
}

function runBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(rootDir, "scripts/build.mjs")], {
      cwd: rootDir,
      stdio: "inherit",
    });

    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Build exited with ${signal ? `signal ${signal}` : `code ${code}`}.`));
    });
  });
}

const reloadScript = '<script>new EventSource("/__reload").onmessage=()=>location.reload();</script>';

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

  if (watchEnabled && requestUrl.pathname === "/__reload") {
    response.writeHead(200, {
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
    });
    response.write("retry: 500\n\n");
    clients.add(response);
    request.on("close", () => clients.delete(response));
    return;
  }

  let filePath = await findFile(requestUrl.pathname);
  let statusCode = 200;
  if (!filePath) {
    filePath = path.join(distDir, "404.html");
    statusCode = 404;
  }

  try {
    let body = await readFile(filePath);
    const contentType = mimeTypes.get(path.extname(filePath).toLowerCase()) ?? "application/octet-stream";
    if (watchEnabled && contentType.startsWith("text/html")) {
      body = Buffer.from(body.toString().replace("</body>", `${reloadScript}</body>`));
    }
    response.writeHead(statusCode, { "Cache-Control": "no-store", "Content-Type": contentType });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Unable to read the generated site.\n");
    console.error(error);
  }
});

await runBuild();

const watchers = [];
let rebuildTimer;
if (watchEnabled) {
  const scheduleRebuild = () => {
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(async () => {
      try {
        await runBuild();
        for (const client of clients) client.write("data: reload\n\n");
      } catch (error) {
        console.error("Rebuild failed:", error);
      }
    }, 100);
  };

  watchers.push(watch(path.join(rootDir, "src"), { recursive: true }, scheduleRebuild));
  watchers.push(watch(path.join(rootDir, "public"), { recursive: true }, scheduleRebuild));
  watchers.push(watch(path.join(rootDir, "scripts"), { recursive: true }, scheduleRebuild));
}

server.listen(port, host, () => {
  console.log(`${watchEnabled ? "Development server" : "Preview"}: http://${host}:${port}/`);
});

function shutDown() {
  for (const watcher of watchers) watcher.close();
  for (const client of clients) client.end();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);
