# pizca.sec — interactive terminal portfolio

A single-page, dependency-free portfolio for **Pablo Soler** (soler) — EASA drone pilot and operator,
technical writer and CTI/OSINT researcher, with a security and rural-tech background. It is a
working terminal: boot log, clickable command chips and a real command line with history, tab
completion and three terminal themes.



**Repository:** https://github.com/holasoysoler/PizcaWeb

**Live:** https://www.pizca.me/ — deployed 2026-10-22 on Vercel (project pizca, Framework: Other, Node 24.x).

The narrative is deliberately specific: fifteen years of professional kitchens → three years as an
SRE → independent radio/hardware research → Pizca gastronomy venture → **Rural Tech** repair bench →
EASA drone operations, technical writing and CTI/OSINT. Sources: LinkedIn, the previous site, the
mid-career page at https://pizca-web.vercel.app/ and the public GitHub profile
https://github.com/holasoysoler.

---

## What is in here

~~~
PizcaWeb/
├── index.html                  # markup, meta, JSON-LD, noscript fallback
├── assets/
│   ├── css/terminal.css        # Ghostty chrome, CRT, 3 themes, all components
│   ├── js/content.js           # ← EDIT THIS to change the English copy
│   ├── js/content.es.js        # Spanish mirror of the copy
│   ├── js/terminal.js          # command engine, boot, input, locales, easter eggs
│   ├── fonts/                  # self-hosted JetBrains Mono (latin + latin-ext)
│   └── img/                    # favicon.svg, PNG icons, og.png (1200×630)
├── site.webmanifest
├── sitemap.xml
├── robots.txt
├── vercel.json                 # static deploy + cache/security headers
├── .well-known/security.txt    # security contact (update Expires)
├── .vercelignore               # keeps docs out of deployments
├── SPEC.md                     # build contract (internal)
├── README.md
└── handoff/
    ├── preview/                # screenshots (ignored by Vercel)
    └── pizca-sec-site.zip      # deploy snapshot (ignored by Vercel)
~~~

No frameworks, no build step, no runtime dependencies, no analytics, no cookies. The only browser
storage is localStorage for the selected theme, CRT preference and language (en/es). The site is
bilingual: Spanish visitors get Spanish automatically, everyone else gets English.

## Preview locally

~~~bash
cd PizcaWeb
python3 -m http.server 4173
# open http://127.0.0.1:4173/
~~~

Useful test URLs:

- http://127.0.0.1:4173/?skipboot=1 — skip the boot animation
- http://127.0.0.1:4173/?cmd=projects — open a command directly
- http://127.0.0.1:4173/?theme=amber — force a theme
- http://127.0.0.1:4173/?crt=off — disable CRT effects
- http://127.0.0.1:4173/?still=1 — freeze animations (deterministic screenshots)
- http://127.0.0.1:4173/?lang=es — force Spanish
- http://127.0.0.1:4173/?lang=en — force English

## Deploy to Vercel (current host)

The previous pizca.me site was a Next.js export. This rebuild is static and the existing Vercel
project **pizca** was switched to **Framework: Other**, Node **24.x**, with pizca.me and www.pizca.me
aliased to it. The project currently has no Git repo connected, so a CLI or dashboard deploy is the
source of truth.

### Option A — Vercel CLI (what was used)

~~~bash
cd PizcaWeb
npx vercel login
npx vercel link --project pizca
npx vercel deploy --prod --yes --archive=tgz
~~~

If the CLI asks, pick the team **holasoysolers-projects** and confirm the framework is Other.
Deploying does not update Git; if you later connect a repository, keep the static/Other preset.

### Option B — dashboard

Drag the **PizcaWeb** folder (or the contents of the deploy zip) into the existing Vercel project.
Keep Framework Preset **Other**, Build Command empty, Output Directory empty. The aliases stay in place.

### Option C — new project + move the domain

Create a project at https://vercel.com/new, drag the folder in, set framework Other, deploy, then move
pizca.me and www.pizca.me to it from Project → Settings → Domains.

### Notes

- vercel.json revalidates CSS/JS and keeps fonts/images immutable, plus basic security headers.
  Adjust or delete it if your project already manages headers.
- The HTML is intentionally uncached ("max-age=0, must-revalidate") so copy changes appear on reload.
  CSS and JS are revalidated on every load too; fonts and images are immutable. The index links use
  ?v=8 as an extra cache-buster — bump that suffix when you make a visually obvious asset change.
- No redirects are required. Navigation is in-page; everything is one URL plus hash/query shortcuts.
- If you deploy under a subpath instead of the domain root, asset URLs are relative and will work,
  but the canonical/OG URLs in index.html should be updated.

## Editing the copy

Everything visitor-facing lives in **assets/js/content.js** (English) and **assets/js/content.es.js**
(Spanish, window.SITE_ES). They share the same schema. Edit both, then run:

~~~bash
node --check assets/js/content.js
node --check assets/js/content.es.js
~~~

Allowed HTML classes inside output strings are listed in SPEC.md section 4. Use them; they are
already styled. You can add an inline command button anywhere:

~~~html
<button class="cmd-link" data-cmd="projects">projects</button>
~~~

### Identity

- Prompt is built from meta.handle + meta.host: currently soler@archlinux, while the brand/domain
  stays pizca.sec. Change both in content.js if you want a different shell identity.
- index.html also contains static copies of the prompt/title for first paint; search for
  soler@archlinux and update if you change the handle.
- Name, GitHub, LinkedIn, Instagram, email, phone and location are in meta and in the output strings; keep them
  consistent in both language files.
- The language switch is the "EN/ES" button in the titlebar or the `lang [en|es]` command. It reloads the
  page and persists in localStorage; a Spanish browser opens Spanish automatically.

### Add / update a project

In the projects array, copy an entry and change id, name, status, tone (ok/warn/dim), summary,
tags and html detail. The projects command and open <id> update automatically. Current entries:
uas-ops, rural-monitor, drone-re, ics-lab, rural-tech, pizca-me, pizca.

### Add a CV

Drop cv.pdf into assets/ and add a link in content.js:

~~~html
<a class="link" href="assets/cv.pdf" target="_blank" rel="noopener">download cv (pdf)</a>
~~~

## Editing the look

- Themes and tokens: terminal.css, blocks :root (Nordic default), html[data-theme="amber"],
  html[data-theme="ice"]. The default palette is the Nordic Ghostty theme from
  https://terminalcolors.com/themes/nordic/default/ — change the CSS custom properties; no JS
  changes needed.
- Accent/glow/signal degradation: same file, sections "CRT overlay" and "Keyframes". There are no
  scanlines, background grid or matrix rain; the screen only drifts through a very soft, occasional
  glitch. Effects are
  disabled under prefers-reduced-motion and ?still=1.
- Default theme is set in index.html (data-theme="nordic") and in terminal.js.
- Fonts are self-hosted in assets/fonts. If you swap fonts, update the @font-face rules.

## Before you publish — honesty checklist

The copy is based on the public facts above. It deliberately avoids inventing certifications,
employers and clients. Please review:

- [ ] Name/handle, GitHub, LinkedIn, email, phone, location and languages are current.
- [ ] Availability line in meta and contact output is still accurate.
- [ ] Project statuses (uas-ops, rural-monitor, drone-re, ics-lab, rural-tech) reflect reality; keep
      "lab / bench / self-directed" framing. Add client work only if you can name it.
- [ ] Skill percentages are self-assessed placeholders — adjust or replace with plain categories.
- [ ] The phone number is published (it was on the old site). Remove it from content.js if you no
      longer want it public.
- [ ] Add real certifications only if you have them; do not add badge walls.
- [ ] Add write-ups once they exist (social output is ready).
- [ ] Update the Expires date in .well-known/security.txt (currently 2027-12-31).
- [ ] Update og.png if you rename the brand or change the tagline (regenerate with any headless
      browser or a design tool).
- [ ] Update sitemap.xml <lastmod> if you care about crawlers.

## Command line reference

Type help inside the site. Highlights:

| Command | What it does |
|---|---|
| whoami / about / now | who I am, longer story, current status |
| focus / skills / stack | four pillars, self-assessment, daily drivers |
| projects / open <id> | lab + bench work and detail |
| journey | kitchens → SRE → radio → rural tech → drones |
| contact / social / email | ways to reach me |
| neofetch | ASCII identity card |
| btop | system monitor (simulated telemetry) |
| ls / cat <file> | browse the portfolio as a filesystem |
| lang [en\|es] | switch language (also the EN/ES titlebar button) |
| theme [nordic\|amber\|ice] | switch terminal palette |
| crt [on\|off] | toggle bloom/glitch effects |
| clear / history / date / uname | standard shell business |
| scan / drone / glitch / sudo / exit | easter eggs |

Keyboard: Enter runs, ↑/↓ history, Tab completes, Esc clears, Ctrl+C cancels, Ctrl+L clears.

## Accessibility & performance

- Semantic landmarks, skip link, labelled input, aria-live output, focus-visible styles.
- Full keyboard operation; chips and inline command links are real buttons.
- prefers-reduced-motion disables typing, glitch pulses, bloom and animated scrolling.
- Works without JavaScript (styled noscript card with contact details).
- Self-hosted fonts; no third-party requests; roughly 300 KB total (mostly fonts + OG image).
- Automated Selenium/Firefox suite: 90/90 English checks + 23/23 bilingual checks (every command, files, chips, keyboard, theme and
  CRT persistence, deep links, mobile 390/320, no-JS, reduced motion, no external requests, no console
  errors). Also checked at 1440×900, 1024×768, 768×1024 and 390×844, all three themes. Check
  Chrome/Safari on a real device before announcing.

## Credits

Typeface: JetBrains Mono (SIL Open Font License — see assets/fonts/OFL.txt). Terminal inspiration: Ghostty, bash, tmux, Arch
Linux and the ghost of every amber CRT that ever warmed a room. Built for Pablo Soler with a little
help from the DeepSeek Harness team.
