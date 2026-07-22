import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { publications } from "../src/data/publications.mjs";
import { site } from "../src/data/site.mjs";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "dist");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderAuthors(authors) {
  return authors
    .map((author, index) => {
      const separator = index === 0 ? "" : index === authors.length - 1 ? ", and " : ", ";
      const className = author.owner ? ' class="publication__owner"' : "";
      const equal = author.equal ? "<sup>*</sup>" : "";
      return `${separator}<span${className}>${escapeHtml(author.name)}</span>${equal}`;
    })
    .join("");
}

function renderLinks(links) {
  return links
    .map((link) => `[<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>]`)
    .join(", ");
}

function renderVenue(venue) {
  if (typeof venue === "string") return escapeHtml(venue);

  return `${escapeHtml(venue.before)}<strong class="publication__highlight">${escapeHtml(venue.highlight)}</strong>${escapeHtml(venue.after)}`;
}

function renderPublication(publication) {
  const awards = (publication.awards ?? [])
    .map((award) => `<br /><strong class="publication__award">${escapeHtml(award)}</strong>`)
    .join("");

  return `<li class="publication">
  <span class="publication__title">${escapeHtml(publication.title)}</span><br />
  <span class="publication__authors">${renderAuthors(publication.authors)}</span><br />
  <span class="publication__venue"><em>${renderVenue(publication.venue)}</em></span>${awards}<br />
  <span class="publication__links">${renderLinks(publication.links)}</span>
</li>`;
}

function renderPublicationYears(publicationsToRender) {
  const publicationsByYear = Map.groupBy(
    publicationsToRender,
    (publication) => publication.date.slice(0, 4),
  );

  return [...publicationsByYear]
    .map(
      ([year, yearPublications]) => `<section class="publication-year" aria-labelledby="publications-${year}">
  <h2 class="publication-year__heading" id="publications-${year}">${escapeHtml(year)}</h2>
  <ul class="publication-list">
${yearPublications.map(renderPublication).join("\n")}
  </ul>
</section>`,
    )
    .join("\n");
}

function renderPublicationList() {
  const orderedPublications = [...publications].sort((left, right) =>
    right.date.localeCompare(left.date),
  );
  const papers = orderedPublications.filter((publication) => publication.category !== "survey");
  const surveys = orderedPublications.filter((publication) => publication.category === "survey");
  const paperList = renderPublicationYears(papers);

  if (surveys.length === 0) return paperList;

  return `${paperList}
<section class="publication-section publication-section--survey" aria-labelledby="survey-publications">
<h2 class="publication-group" id="survey-publications">Survey</h2>
<ul class="publication-list">
${surveys.map(renderPublication).join("\n")}
</ul>
</section>`;
}

function renderProfile() {
  return `<aside class="sidebar" aria-label="Author profile">
  <div itemscope itemtype="https://schema.org/Person">
    <div class="author__avatar">
      <img src="${escapeHtml(site.avatar)}" alt="${escapeHtml(site.owner)}" width="512" height="512" itemprop="image" />
    </div>
    <div class="author__content">
      <h2 class="author__name" itemprop="name">${escapeHtml(site.owner)}</h2>
    </div>
    <div class="author__urls-wrapper">
      <button class="btn btn--inverse author__toggle" type="button" aria-expanded="false" aria-controls="author-links" title="Show profile links">
        <i class="fas fa-link" aria-hidden="true"></i><span>Links</span>
      </button>
      <ul class="author__urls social-icons" id="author-links">
        <li><i class="fas fa-fw fa-map-marker" aria-hidden="true"></i> ${escapeHtml(site.location)}</li>
        <li><i class="fas fa-fw fa-envelope" aria-hidden="true"></i> ${escapeHtml(site.email)}</li>
        <li><a href="${escapeHtml(site.social.twitter)}"><i class="fab fa-fw fa-twitter-square" aria-hidden="true"></i> Twitter</a></li>
        <li><a href="${escapeHtml(site.social.linkedin)}"><i class="fab fa-fw fa-linkedin" aria-hidden="true"></i> LinkedIn</a></li>
        <li><a href="${escapeHtml(site.social.github)}"><i class="fab fa-fw fa-github" aria-hidden="true"></i> Github</a></li>
        <li><a href="${escapeHtml(site.social.scholar)}"><i class="fas fa-fw fa-graduation-cap" aria-hidden="true"></i> Google Scholar</a></li>
        <li><a href="${escapeHtml(site.resume)}" download><i class="fas fa-fw fa-download" aria-hidden="true"></i> Resume</a></li>
      </ul>
    </div>
  </div>
</aside>`;
}

function renderNavigation(route) {
  return site.navigation
    .map((item) => {
      const title = item.title ? ` title="${escapeHtml(item.title)}"` : "";
      const current = item.activeRoute === route ? ' aria-current="page"' : "";
      const sectionId = item.href.startsWith("/#") ? item.href.slice(2) : "";
      const section = sectionId ? ` data-section-link="${escapeHtml(sectionId)}"` : "";
      const home = item.href === "/" ? " data-home-link" : "";
      return `<li class="masthead__menu-item"><a href="${escapeHtml(item.href)}"${title}${current}${section}${home}>${escapeHtml(item.label)}</a></li>`;
    })
    .join("\n            ");
}

function renderLayout({ title, description, route, content }) {
  const canonical = new URL(route, site.url).toString();
  const pageTitle = `${title} - ${site.title}`;
  const person = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.owner,
    url: site.url,
    sameAs: Object.values(site.social),
  }).replaceAll("<", "\\u003c");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="${escapeHtml(site.title)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@jiangfeiduan" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <link rel="icon" href="/images/favicon.ico" />
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96x96.png" />
    <script>document.documentElement.classList.add("js");</script>
    <link rel="stylesheet" href="/assets/css/site.css" />
    <title>${escapeHtml(pageTitle)}</title>
    <script type="application/ld+json">${person}</script>
  </head>
  <body data-route="${escapeHtml(route)}">
    <header class="masthead">
      <div class="masthead__inner-wrap">
        <nav class="greedy-nav" aria-label="Primary navigation">
          <ul class="visible-links" id="primary-navigation">
            <li class="masthead__menu-item masthead__menu-item--lg"><a href="/">${escapeHtml(site.title)}</a></li>
            <li class="masthead__menu-item masthead__menu-item--toggle">
              <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Open navigation" title="Open navigation">
                <i class="fas fa-bars" aria-hidden="true"></i>
              </button>
            </li>
            ${renderNavigation(route)}
          </ul>
        </nav>
      </div>
    </header>
    <main id="main">
      ${renderProfile()}
      <article class="page">
        <div class="page__inner-wrap">
          <header><h1 class="page__title">${escapeHtml(title)}</h1></header>
          <section class="page__content">${content}</section>
        </div>
      </article>
    </main>
    <footer class="page__footer">
      <div class="page__footer-inner">
        <div class="page__footer-follow">
          <ul class="social-icons">
            <li><strong>Follow:</strong></li>
            <li><a href="${escapeHtml(site.social.twitter)}"><i class="fab fa-twitter-square" aria-hidden="true"></i> Twitter</a></li>
            <li><a href="${escapeHtml(site.social.github)}"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a></li>
          </ul>
        </div>
        <div class="page__footer-copyright">&copy; ${new Date().getFullYear()} ${escapeHtml(site.owner)}. Static HTML generated with Node.js.</div>
      </div>
    </footer>
    <script>
      const profileToggle = document.querySelector(".author__toggle");
      const profileLinks = document.querySelector("#author-links");
      profileToggle?.addEventListener("click", () => {
        const isOpen = profileToggle.getAttribute("aria-expanded") === "true";
        profileToggle.setAttribute("aria-expanded", String(!isOpen));
        profileToggle.title = isOpen ? "Show profile links" : "Hide profile links";
        profileLinks?.classList.toggle("is-open", !isOpen);
      });

      const navigation = document.querySelector("#primary-navigation");
      const navigationToggle = document.querySelector(".nav-toggle");
      const closeNavigation = () => {
        navigation?.classList.remove("is-open");
        navigationToggle?.setAttribute("aria-expanded", "false");
        navigationToggle?.setAttribute("aria-label", "Open navigation");
        if (navigationToggle) navigationToggle.title = "Open navigation";
      };

      navigationToggle?.addEventListener("click", () => {
        const isOpen = navigationToggle.getAttribute("aria-expanded") === "true";
        navigation?.classList.toggle("is-open", !isOpen);
        navigationToggle.setAttribute("aria-expanded", String(!isOpen));
        navigationToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
        navigationToggle.title = isOpen ? "Open navigation" : "Close navigation";
      });

      navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));
      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        closeNavigation();
        profileToggle?.setAttribute("aria-expanded", "false");
        if (profileToggle) profileToggle.title = "Show profile links";
        profileLinks?.classList.remove("is-open");
      });

      if (document.body.dataset.route === "/") {
        const sectionLinks = [...document.querySelectorAll("[data-section-link]")];
        const homeLink = document.querySelector("[data-home-link]");
        const sections = sectionLinks
          .map((link) => ({ link, section: document.getElementById(link.dataset.sectionLink) }))
          .filter(({ section }) => section);
        let updatePending = false;

        const updateActiveSection = () => {
          const offset = (document.querySelector(".masthead")?.offsetHeight ?? 0) + 32;
          let active = null;
          for (const candidate of sections) {
            if (candidate.section.getBoundingClientRect().top <= offset) active = candidate;
          }

          homeLink?.toggleAttribute("aria-current", !active);
          if (!active && homeLink) homeLink.setAttribute("aria-current", "page");
          for (const candidate of sections) {
            candidate.link.toggleAttribute("aria-current", candidate === active);
            if (candidate === active) candidate.link.setAttribute("aria-current", "location");
          }
          updatePending = false;
        };

        const requestActiveSectionUpdate = () => {
          if (updatePending) return;
          updatePending = true;
          requestAnimationFrame(updateActiveSection);
        };

        updateActiveSection();
        addEventListener("scroll", requestActiveSectionUpdate, { passive: true });
        addEventListener("resize", requestActiveSectionUpdate);
      }
    </script>
  </body>
</html>
`;
}

async function writePage(relativePath, options) {
  const outputPath = path.join(distDir, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderLayout(options));
}

export async function build() {
  await rm(distDir, { recursive: true, force: true });
  await cp(publicDir, distDir, { recursive: true });

  const publicationList = renderPublicationList();
  const [homeTemplate, blogContent] = await Promise.all([
    readFile(path.join(rootDir, "src/content/home.html"), "utf8"),
    readFile(path.join(rootDir, "src/content/blog.html"), "utf8"),
  ]);
  const homeContent = homeTemplate.replace("<!-- PUBLICATIONS -->", publicationList);

  await Promise.all([
    writePage("index.html", {
      title: "About",
      description: "About Jiangfei Duan and his research in efficient large-scale DNN training and inference.",
      route: "/",
      content: homeContent,
    }),
    writePage("publications/index.html", {
      title: "Publications",
      description: "Publications by Jiangfei Duan.",
      route: "/publications/",
      content: publicationList,
    }),
    writePage("cv/index.html", {
      title: "CV",
      description: "Curriculum vitae for Jiangfei Duan.",
      route: "/cv/",
      content: '<p>View or download my <a href="/files/cv.pdf">curriculum vitae (PDF)</a>.</p>',
    }),
    writePage("blog/index.html", {
      title: "Blog",
      description: "Blog posts by Jiangfei Duan.",
      route: "/blog/",
      content: blogContent,
    }),
    writePage("404.html", {
      title: "Page Not Found",
      description: "The requested page could not be found.",
      route: "/404.html",
      content: '<p>Sorry, this page does not exist.</p><p><a href="/">Return to the homepage</a>.</p>',
    }),
  ]);

  console.log(`Built ${publications.length} publications and 5 pages in ${path.relative(process.cwd(), distDir) || "dist"}/`);
}

const isDirectRun = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isDirectRun) await build();
