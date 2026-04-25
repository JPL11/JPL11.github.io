---
layout: page
title: Resume
subtitle: "Download a PDF copy or view it inline."
permalink: /resume/
---

<div class="card">
  <p>
    <a class="btn btn-primary" href="{{ '/assets/resume.pdf' | relative_url }}">Download Resume (PDF)</a>
    <a class="btn btn-ghost" href="mailto:{{ site.profile.email }}">Request an updated copy</a>
  </p>
</div>

<div class="card" style="margin-top: 1.5rem;">
  <iframe
    title="Resume"
    src="{{ '/assets/resume.pdf' | relative_url }}"
    width="100%"
    height="680"
    style="border: 1px solid var(--border); border-radius: 12px;">
  </iframe>
</div>
