---
layout: page
title: Open Source
subtitle: "Maintained packages and upstream contributions across the edge-AI stack."
permalink: /opensource/
---

## Packages

<div class="card-grid">
  {% for pkg in site.data.opensource.packages %}
  <div class="card">
    <h3>{{ pkg.name }}</h3>
    <div class="card-meta"><code>{{ pkg.install }}</code></div>
    <p><em>{{ pkg.tagline }}</em></p>
    <p>{{ pkg.description }}</p>
    <div class="tag-list">
      {% for tech in pkg.tech %}
      <span class="tag">{{ tech }}</span>
      {% endfor %}
    </div>
    <div class="tag-list">
      {% if pkg.links.github %}<a class="tag alt" href="{{ pkg.links.github }}">GitHub</a>{% endif %}
      {% if pkg.links.pypi %}<a class="tag alt" href="{{ pkg.links.pypi }}">PyPI</a>{% endif %}
    </div>
  </div>
  {% endfor %}
</div>

## Contributions

<div class="card-grid">
  {% for c in site.data.opensource.contributions %}
  <div class="card">
    <h3>{{ c.project }}</h3>
    <p>{{ c.summary }}</p>
    <ul class="list-plain">
      {% for item in c.highlights %}
      <li>{{ item }}</li>
      {% endfor %}
    </ul>
    <div class="tag-list">
      {% if c.links.prs %}<a class="tag alt" href="{{ c.links.prs }}">Pull requests</a>{% endif %}
    </div>
  </div>
  {% endfor %}
</div>
