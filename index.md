---
layout: default
title: Home
---

<section class="section" style="margin-top: 0.5rem;">
  <div class="section-title">
    <h2>Interactive Console</h2>
    <span style="font-size:0.78rem;color:var(--dim);">optional — type <code>help</code> · or use the menu above</span>
  </div>
  <div class="terminal-widget" data-terminal data-base="{{ site.baseurl }}">
    <div class="terminal-titlebar">
      <span class="terminal-dots"><span></span><span></span><span></span></span>
      <span class="terminal-title">visitor@jpl11: ~</span>
      <span class="terminal-hint">try: help · projects · resume · contact</span>
    </div>
    <div class="terminal-body" aria-live="polite"></div>
    <div class="term-input-row">
      <span class="term-prompt">visitor@jpl11:~$</span>
      <input class="term-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Terminal input">
    </div>
  </div>
</section>

<section class="hero">
  <div class="hero-card">
    <p class="eyebrow">Edge AI · Embedded Systems · Software Engineer</p>
    <h1>{{ site.profile.name }}</h1>
    <p class="lead">
      {{ site.profile.title }} at {{ site.profile.affiliation }}. I build on-device ML,
      embedded firmware, real-time control, and AI-enabled user-facing applications —
      with a focus on neuromorphic vision and edge-efficient inference.
    </p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="{{ '/resume/' | relative_url }}">Download Resume</a>
      <a class="btn btn-ghost" href="mailto:{{ site.profile.email }}">Email</a>
      <a class="btn btn-ghost" href="{{ site.profile.github }}">GitHub</a>
    </div>
    <div class="callout">
      Open to research collaborations and industry partnerships in edge AI, embedded
      systems, and applied ML. Reach me at
      <a href="mailto:{{ site.profile.email }}">{{ site.profile.email }}</a>.
    </div>
  </div>
  <aside class="hero-card profile-card">
    <img src="{{ site.profile.headshot | relative_url }}" alt="Headshot">
    <div class="profile-meta">
      <div><strong>Location:</strong> {{ site.profile.location }}</div>
      <div><strong>Website:</strong> <a href="{{ site.profile.website }}">{{ site.profile.website }}</a></div>
      <div><strong>GitHub:</strong> <a href="{{ site.profile.github }}">{{ site.profile.github }}</a></div>
      <div><strong>Email:</strong> <a href="mailto:{{ site.profile.email }}">{{ site.profile.email }}</a></div>
    </div>
    <div class="tag-list">
      <span class="tag">Edge AI</span>
      <span class="tag">Embedded</span>
      <span class="tag">SNN / GNN</span>
      <span class="tag alt">Neuromorphic Vision</span>
    </div>
  </aside>
</section>

<section class="section">
  <div class="section-title">
    <h2>Featured Projects</h2>
    <a href="{{ '/projects/' | relative_url }}">View all</a>
  </div>
  <div class="card-grid">
    {% for project in site.data.projects limit:2 %}
    <div class="card">
      <h3>{{ project.name }}</h3>
      <div class="card-meta">{{ project.role }}</div>
      <p>{{ project.description }}</p>
      <div class="tag-list">
        {% for tech in project.tech %}
        <span class="tag">{{ tech }}</span>
        {% endfor %}
      </div>
    </div>
    {% endfor %}
  </div>
</section>

<section class="section">
  <div class="section-title">
    <h2>Recent Experience</h2>
    <a href="{{ '/experience/' | relative_url }}">View all</a>
  </div>
  <div class="card-grid">
    {% for role in site.data.experience limit:2 %}
    <div class="card">
      <h3>{{ role.role }}</h3>
      <div class="card-meta">{{ role.org }} | {{ role.start }} - {{ role.end }}</div>
      <p>{{ role.summary }}</p>
    </div>
    {% endfor %}
  </div>
</section>
