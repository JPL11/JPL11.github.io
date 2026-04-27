# JPL11.github.io

Personal portfolio site for **Jacky Li** — Edge AI, embedded systems, and software engineer. Built with Jekyll and styled as a terminal-themed UI with a conventional navigation rail.

🌐 Live: [jpl11.github.io](https://jpl11.github.io)

## Highlights

- **Terminal aesthetic** — JetBrains Mono, dark GitHub-style palette, prompt-style headings, traffic-light card chrome, subtle scanline overlay.
- **Standard navigation rail** — Home / Projects / Experience / Resume stays accessible to non-technical visitors (recruiters, collaborators).
- **Interactive console widget** on the home page — type `help` to discover commands (`about`, `skills`, `projects`, `experience`, `resume`, `contact`, `social`, `clear`). Supports command history (↑/↓) and Ctrl+L. Every command mirrors a page reachable from the nav.
- **Papers section** is temporarily disabled while manuscripts are in submission.

## Structure

```
_config.yml              # site metadata, nav, profile info
_data/
  experience.yml         # work history (rendered on /experience/)
  projects.yml           # selected projects (rendered on /projects/)
  publications.yml       # publications (currently empty — papers in submission)
_includes/
  head.html              # <head>, loads CSS + terminal.js
  nav.html               # top navigation
  footer.html
_layouts/
  default.html           # base layout
  page.html              # inner page layout
assets/
  css/main.css           # terminal-themed styles
  js/terminal.js         # interactive console widget
  resume.pdf             # latest resume
  img/headshot.svg
index.md                 # home page (hero + console + featured sections)
projects.md  experience.md  papers.md  resume.md
```

## Updating content

| Want to change…                | Edit                              |
| ------------------------------ | --------------------------------- |
| Name, title, email, links      | `_config.yml` → `profile`         |
| Nav items                      | `_config.yml` → `nav`             |
| Experience entries             | `_data/experience.yml`            |
| Project entries                | `_data/projects.yml`              |
| Publications (when ready)      | `_data/publications.yml` + `papers.md` |
| Resume PDF                     | replace `assets/resume.pdf`       |
| Console commands / responses   | `assets/js/terminal.js`           |
| Visual theme                   | `assets/css/main.css`             |

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Deployment

This is a GitHub Pages user site (`JPL11.github.io`) — pushing to `main` triggers an automatic rebuild. `baseurl` is left empty in `_config.yml`.

## Credits

Hand-built layout and terminal theme. Inspired in spirit by terminal-portfolio aesthetics, but designed as a hybrid so non-technical visitors can navigate without typing a single command.
