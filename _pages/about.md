---
permalink: /
title: "About"
excerpt: "About me"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

I am a third-year Ph.D. student at [MMLab, CUHK](https://mmlab.ie.cuhk.edu.hk/people.html), advised by [Prof. Dahua Lin](http://dahua.site/). My research interests lie in broad area of MLSys, especially efficient large scale DNN training and inference. Before joining CUHK, I received my Bachelor's degree in Computer Science from [University of Chinese Academy of Sciences](https://english.ucas.ac.cn/), advised by [Prof. Shiguang Shan](https://scholar.google.com/citations?user=Vkzd7MIAAAAJ&hl=zh-CN).

<!-- Currently, I am working on efficient LLM serving systems. Feel free to drop me an email if you are interested in my research. -->

<!-- <span style="color: red">I will be on the job market for 2025. Please feel free to reach out if you have openings in industry or academia.</span> -->
<span style="color: red">I will be on the job market for 2025. Please feel free to reach out if you have openings in industry or academia.</span>

My detailed CV can be found [here](https://jf-d.github.io/files/cv.pdf).

News
==
----
- [July 2024] We announce a survey about LLM training system and infra, check [arXiv](https://arxiv.org/abs/2407.20018)!
- [July 2024] SKVQ is accepted by COLM 2024. Congratulations to Duanmu!
- [May  2024] MuxServe is accepted by ICML 2024!
- [Apr. 2024] I will attend NSDI '24 in person at Santa Clara, CA. See you there!

Education
==
----

<div style="display: flex; align-items: center;">
    <img src="images/cuhk_logo.png" alt="Image" width="100" height="100" style="margin-right: 20px;" />
    <p>
        <br />
        <strong>
        The Chinese University of Hong Kong
        </strong>
        <br />
        Aug. 2021 - July 2025 (Expected)
        <br />
        Ph.D. Candidate in Department of Information Engineering
    </p>
</div>


<div style="display: flex; align-items: center;">
    <img src="images/ucas_logo.png" alt="Image" width="100" height="100" style="margin-right: 20px;" />
    <p>
        <br />
        <strong>
        University of Chinese Academy of Sciences
        </strong>
        <br />
        Sep. 2016 - July 2020
        <br />
        B.E. in Computer Science and Technology
    </p>
</div>

Experience
==
----

<span style="font-size: 14pt;">**Catalyst, CMU**</span> \\
<span style="color: gray; font-size: 12pt">*Research Intern, Apr. 2022 - May. 2023*</span> \\
*Advisors*: [Prof. Zhihao Jia](https://www.cs.cmu.edu/~zhihaoj2/), [Dr. Minjia Zhang](http://zhangminjia.me/), [Dr. Xupeng Miao](https://hsword.github.io/) \\
<span style="color: #696969;">Cost-efficient DNN training and inference.</span>


<span style="font-size: 14pt;">**MMLab, CUHK**</span>  \\
<span style="color: gray; font-size: 12pt">*Research Assiant, Aug. 2020 - Apr. 2022*</span> \\
*Advisors*: [Prof. Dahua Lin](http://dahua.site/), [Prof. Shengen Yan](https://scholar.google.com/citations?user=SvE3bdUAAAAJ&hl=en), [Prof. Xiuhong Li](https://scholar.google.com/citations?user=90eREm0AAAAJ&hl=en) \\
<span style="color: #696969;">Auto parallel DNN training.</span>

<span style="font-size: 14pt;">**MMLab, CUHK**</span>  \\
<!-- <span style="font-size: 14pt;">**SenseTime Research**</span> \\ -->
<span style="color: gray; font-size: 12pt">*Research Assiant, July 2019 - July 2020*</span> \\
*Mentors*: [Prof. Dahua Lin](http://dahua.site/), Xingcheng Zhang \\
<span style="color: #696969;">Optmize large scale data parallel training performance. With sparse communication and system optimization, We train alexnet in 1 minute on a 1000 V100 cluster with Parrots (a DL framework similar to PyTorch).</span>



Publications
==
----
<!-- #CC2221 -->
- <span style="color: #d2691e;">Near-Lossless Acceleration of Long Context LLM Inference with Adaptive Structured Sparse Attention</span> \\
Qianchao Zhu, **Jiangfei Duan**, Chang Chen, Siran Liu, Xiuhong Li, Guanyu Feng, Xin Lv, Huanqi Cao, Chuanfu Xiao, Xingcheng Zhang, Dahua Lin, and Chao Yang \\
<span style="color: #696969;">arXiv Preprint, 2024</span> \\
[[Paper](https://www.arxiv.org/abs/2406.15486)]

- <span style="color: #d2691e;">SKVQ: Sliding-window Key and Value Cache Quantization for Large Language Models</span> \\
Haojie Duanmu, Zhihang Yuan, Xiuhong Li, **Jiangfei Duan**, Xingcheng Zhang, and Dahua Lin \\
<span style="color: #696969;">In *Proceedings of the Conference on Language Modeling (COLM)*, October 2024.</span> \\
[[Paper](https://www.arxiv.org/abs/2405.06219)]

- <span style="color: #d2691e;">MuxServe: Flexible Spatial-Temporal Multiplexing for Multiple LLM Serving</span> \\
**Jiangfei Duan**, Runyu Lu, Haojie Duanmu, Xiuhong Li, Xingcheng Zhang, Dahua Lin, Ion Stoica, and Hao Zhang \\
<span style="color: #696969;">In *Proceedings of the International Conference on Machine Learning (ICML)*, July 2024.</span> \\
[[Paper](https://arxiv.org/abs/2404.02015)], [[Code](https://github.com/hao-ai-lab/MuxServe)], [[Blog](https://hao-ai-lab.github.io/blogs/muxserve/)], [[Video (Chinese)](https://youtu.be/3jL6CL_uVa0?si=zBqeeYlaKQsItKAg)]

- <span style="color: #d2691e;">Centauri: Enabling Efficient Scheduling for Communication-Computation Overlap in Large Model Training via Communication Partitioning</span> \\
Chang Chen, Xiuhong Li, Qianchao Zhu, **Jiangfei Duan**, Peng Sun, Xingcheng Zhang, and Chao Yang \\
<span style="color: #696969;">In *Proceedings of the ACM International Conference on Architectural Support for Programming Languages and Operating Systems (ASPLOS)*, April 2024.</span> \\
<span style="color: #ff0000;">**Best Paper Award**</span> \\
[[Paper](https://dl.acm.org/doi/10.1145/3620666.3651379)], [[Video (Chinese)](https://youtu.be/lpKzMAkQYNs?si=xoD0quGWDhwlngW_)]

- <span style="color: #d2691e;">SpotServe: Serving Generative Large Language Models on Preemptible Instances</span> \\
Xupeng Miao$^{\*}$, Chunan Shi$^{\*}$, **Jiangfei Duan**, Xiaoli Xi, Dahua Lin, Bin Cui, and Zhihao Jia \\
<span style="color: #696969;">In *Proceedings of the ACM International Conference on Architectural Support for Programming Languages and Operating Systems (ASPLOS)*, April 2024.</span> \\
<span style="color: #ff0000;">**Distinguished Artifact Award**</span> \\
[[Paper](https://dl.acm.org/doi/10.1145/3620665.3640411)], [[Code](https://github.com/Hsword/SpotServe)]

- <span style="color: #d2691e;">Parcae: Proactive, Liveput-Optimized DNN Training on Preemptible Instances</span> \\
**Jiangfei Duan**$^{\*}$, Ziang Song$^{\*}$, Xupeng Miao$^{\*}$, Xiaoli Xi, Dahua Lin, Harry Xu, Minjia Zhang, and Zhihao Jia \\
<span style="color: #696969;">In *Proceedings of the Symposium on Networked Systems Design and Implementation (NSDI)*, April 2024.</span> \\
[[Paper](https://www.usenix.org/conference/nsdi24/presentation/duan)], [[Code](https://github.com/JF-D/Parcae)]

- <span style="color: #d2691e;">Proteus: Simulating the Performance of Distributed DNN Training</span> \\
**Jiangfei Duan**, Xiuhong Li, Ping Xu, Xingcheng Zhang, Shengen Yan, Yun Liang, and Dahua Lin \\
<span style="color: #696969;">arXiv Preprint, 2023</span> \\
[[Paper](https://arxiv.org/abs/2306.02267)], [[Code](https://github.com/JF-D/Proteus)]

**Survey**

- <span style="color: #d2691e;">Efficient Training of Large Language Models on Distributed Infrastructures: A Survey</span> \\
**Jiangfei Duan**$^{\*}$, Shuo Zhang$^{\*}$, Zerui Wang$^{\*}$, Lijuan Jiang, Wenwen Qu, Qinghao Hu, Guoteng Wang, Qizhen Weng, Hang Yan, Xingcheng Zhang, Xipeng Qiu, Dahua Lin, Yonggang Wen, Xin Jin, Tianwei Zhang, and Peng Sun \\
<span style="color: #696969;">arXiv Preprint, 2024</span> \\
[[Paper](https://arxiv.org/abs/2407.20018)]

Teaching
==
----
TA, IERG3050: Simulation and Statistical Analysis, Fall 2021, CUHK \\
TA, CSCI2100: Data Structure, Spring 2022, CUHK


Services
==
----
**AEC Member**: MLSys 2023, OSDI 2024, ATC 2024


Awards
==
----
Best Paper Award, ASPLOS 2024 \\
Distinguished Artifact Award, ASPLOS 2024 \\
Outstanding Graduate of Beijing, 2020 \\
Outstanding Graduate of University of Chinese Academy of Sciences, 2020 \\
Tang Lixin Scholarship, 2019 \\
First-class Academic Scholarship, UCAS (top 5%), 2017,2018


<div style="display: flex; justify-content: center;">
    <script type="text/javascript" src="//rf.revolvermaps.com/0/0/8.js?i=5zxoogynyol&amp;m=0&amp;c=fc0303&amp;cr1=ffffff&amp;f=arial&amp;l=33&amp;s=170&amp;bv=100" async="async"></script>
</div>
