---
layout: page
title: Papers
subtitle: "Peer-reviewed publications, preprints, and selected talks."
permalink: /papers/
---

## Publications

<div class="card-grid">
  {% for p in site.data.publications %}
  <div class="card">
    <h3>{{ p.title }}</h3>
    <div class="card-meta">{{ p.venue }} · {{ p.status }}</div>
    <p>{{ p.description }}</p>
    <div class="tag-list">
      {% for tech in p.tech %}
      <span class="tag">{{ tech }}</span>
      {% endfor %}
    </div>
    <div class="tag-list">
      {% if p.links.paper %}<a class="tag alt" href="{{ p.links.paper }}">Paper</a>{% endif %}
      {% if p.links.github %}<a class="tag alt" href="{{ p.links.github }}">Code</a>{% endif %}
    </div>
  </div>
  {% endfor %}
</div>

<div class="card">
  <p>
    Additional manuscripts are currently <strong>in submission and under revision</strong>;
    they will appear here once they are published or available as preprints.
  </p>
  <p class="card-meta">
    For inquiries about ongoing research, please reach out at
    <a href="mailto:{{ site.profile.email }}">{{ site.profile.email }}</a>.
  </p>
</div>
