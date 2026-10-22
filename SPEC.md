# pizca.sec — build spec v1 (FROZEN CONTRACT)

Note: identity was revised to Pablo Soler / soler@archlinux after the mid-career source page
was discovered; the contract shape is unchanged.

> Rebuild https://www.pizca.me/ as a single-page, static, interactive terminal portfolio for a
> security researcher moving into offensive security, drone reverse engineering and Industry 4.0 / OT
> security. It must feel like a real **Ghostty** window running **bash on a CRT**: modern, crisp,
> tactile — not a 1990s hacker-movie parody.

Read this whole file, then read **index.html** before writing anything. index.html is frozen.
Only edit the file assigned to you.

## 0. Non-negotiables

- **Zero dependencies / zero build step.** Static files only: HTML + CSS + vanilla ES2020 JS. No
  frameworks, no bundlers, no CDN, no external runtime requests (fonts are self-hosted).
- **English copy** (the old site was Spanish; this positions for an international security audience).
  Contact block notes ES / EN.
- **No fabricated credentials, employers, clients or certifications.** Projects are framed as lab /
  self-directed / ongoing. The previous Pizca gastronomy venture is real and may be referenced as
  past work.
- **Accessible**: semantic landmarks, skip link, labelled input, focus-visible styles, aria-live
  output, prefers-reduced-motion, WCAG AA contrast for body text, works at 320px wide.
- **Fast**: no layout shift after boot; total page weight target < 500 KB (fonts ~250 KB).
- **No tracking, no cookies, no analytics.** localStorage only for theme/CRT prefs.
- **Do not add files outside your scope.** No package.json, no node_modules, no build config.

## 1. Files & ownership

| Path | Owner | Notes |
|---|---|---|
| index.html | Lead | Frozen markup contract — read it, do not edit. |
| assets/css/terminal.css | **designer** | Single stylesheet. All visual design. |
| assets/js/terminal.js | **terminal-engineer** | Single script. Boot, command engine, interactions. |
| assets/js/content.js | **content-writer** | window.SITE data + output HTML. |
| assets/fonts/*.woff2 | Lead | JetBrains Mono 400/500/700 + 400 italic, latin + latin-ext. |
| assets/img/*, site.webmanifest, robots.txt | Lead | Favicon, OG image, etc. |
| README.md | Lead | Handoff/deploy docs. |

## 2. Visual direction

**Mood:** a Ghostty terminal window (rounded chrome, three traffic lights, compact title, tmux-style
status bar) floating in a dark room. The screen is a Nordic phosphor display: soft bloom, vignette,
very soft glitch degradation, one power-on moment. No scanlines. Everything is monospace and grid-aligned. The
design is quiet and precise; the interaction is the spectacle.

**Rules**

- Default theme **nordic** (terminalcolors.com/themes/nordic/default, Ghostty palette). Also **amber**
  and **ice** (cool modern). Themes swap CSS
  custom properties on html[data-theme="..."]. Each theme defines every token below.
- No decorative gradients except the ambient glow/vignette. No rounded-everything, no cards with drop
  shadows, no glassmorphism. Borders are 1px, corners small.
- ASCII art is the hero. Keep it crisp; do not use letter-spacing that breaks alignment.
- Effects budget: no scanlines or matrix rain; noise <= 0.03, glitch displacement <= 0.8px, opacity
  delta <= 0.01, text glow <= 12px. Body text must stay easy to read. Disable all motion under
  prefers-reduced-motion: reduce.
- Desktop 1440x900 is the money shot; 390x844 must look deliberate, not squished.

**Required CSS custom properties** (names fixed; designer defines values):
--bg, --bg-elev, --bg-soft, --fg, --fg-dim, --fg-faint, --accent, --accent-dim, --accent-glow,
--warn, --error, --link, --line, --selection, --font-mono.

**Themes** (data-theme): nordic (default), amber, ice.

**Fonts** — files already exist in assets/fonts/: JetBrainsMono-Regular.woff2,
JetBrainsMono-Medium.woff2, JetBrainsMono-Bold.woff2, JetBrainsMono-Italic.woff2 plus -ext variants.
Declare @font-face with font-display: swap and these unicode ranges:

- latin: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308,
  U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
- latin-ext: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308,
  U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113,
  U+2C60-2C7F, U+A720-A7FF

### Layout (desktop)

- body dark, full viewport, no page scroll (the terminal screen scrolls internally).
- .stage centers a window: width:min(1180px, 100%), height:min(880px, calc(100dvh - 3rem)).
- .terminal is a flex column: .titlebar (44px) / .screen (flex:1, overflow-y:auto) / .hints /
  .cmdline / .statusbar (26px). Rounded 12–14px, 1px border, outer glow.
- Mobile <= 720px: no outer margin, window fills 100dvh, square corners, compact titlebar, hide
  status clutter, .hints scrolls horizontally, input font-size 16px (prevents iOS zoom).

## 3. Markup contract (index.html — do not edit)

Key nodes/IDs:

- .terminal#terminal — gets .is-ready after boot.
- .titlebar — traffic lights, ghost glyph, title, #btnTheme and #btnCrt buttons.
- .screen#screen — scroll container; .boot#boot (aria-hidden, lines typed here); .banner#banner
  (static ASCII art + taglines); .output#output (role="log" aria-live="polite").
- .hints#hints — engine fills with .chip buttons from SITE.hints.
- form#cmdForm / #cmdInput (invisible overlay input) / #cmdTyped (visible mirrored text) / #cursor.
- .statusbar#statusbar — #statusTheme, #statusClock, [data-status] hooks.
- .fx — fixed CRT overlay, aria-hidden, pointer-events none.
- noscript — styled fallback with real content and contact links.

The static prompt markup in .cmdline and .titlebar__path says soler@archlinux / ~/portfolio; the engine
refreshes these from SITE.meta.

## 4. Content schema (window.SITE — content-writer)

~~~js
window.SITE = {
  meta: {
    handle: "pizca",            // prompt user
    host: "sec",                // prompt host
    role: "Security researcher & reverse engineer",
    location: "La Puebla de Híjar, Teruel · Spain",
    locationShort: "Teruel, ES",
    timezone: "Europe/Madrid",
    email: "hola@pizca.me",
    phone: "+34 722 11 97 98",
    phoneHref: "+34722119798",
    instagram: "https://instagram.com/pizca.me",
    instagramHandle: "@pizca.me",
    website: "https://www.pizca.me",
    availability: "Open to freelance projects and junior security roles",
    year: 2026
  },
  boot: [                        // typed line by line; tone: "" | "ok" | "warn" | "dim" | "accent"
    { text: "[    0.000000] pizcacos 1.0.0 — secure boot", tone: "dim" },
    { text: "[    0.021400] probing hardware ............ OK", tone: "ok" }
  ],
  hints: ["help","whoami","focus","projects","contact"],  // chips, 5–6 max
  help: [                        // sections + rows, rendered by engine
    { group: "identity", items: [
      ["whoami", "one-screen introduction"],
      ["about", "the longer story"]
    ]}
  ],
  outputs: {                     // HTML strings, engine wraps each in <div class="out">
    whoami: "...", about: "...", now: "...", focus: "...", skills: "...",
    journey: "...", contact: "...", social: "...", stack: "..."
  },
  projects: [                    // engine renders list + open <id>
    {
      id: "drone-re",
      name: "DRONE / RE",
      status: "in progress",
      tone: "warn",              // "" | "ok" | "warn" | "dim"
      summary: "one-line description",
      tags: ["firmware", "rf", "ghidra"],
      html: "<p class='out-p'>full detail…</p>"   // used by open drone-re
    }
  ],
  files: [                       // ls + cat <name>
    { name: "about.txt", target: "about", note: "who I am" }
  ]
};
~~~

Output HTML may use **only** these classes (all styled by designer):
.out-h, .out-p, .note, .dim, .accent, .dim-link, .link, .cmd, .cmd-link, .kv > .kv__k + .kv__v,
.tags > .tag, .rule, .box > .box__title, .focus > .focus__item, .skills > .skill-group > .skill >
.skill__name/.skill__bar/.skill__pct, .timeline > .tl > .tl__when/.tl__dot/.tl__what, .project >
.project__head/.project__id/.project__status/.project__name/.project__meta, .contact, .help,
.help__group, .help__label, .help__row, .help__cmd, .help__desc, .chip, .chips.

Any button with class cmd-link and data-cmd="about" is wired by the engine to run that command.
Do **not** use inline styles, style tags, script tags, or external asset URLs (links are fine).
ASCII skill bar example: <span class="skill__bar">████████░░</span> (10 cells, 40–80% only).

## 5. Commands (terminal-engineer)

Content commands (read from SITE.outputs / SITE.projects): whoami, about, now, focus, skills,
projects, open <id>, journey, stack, contact, social.

Built-ins:

- help (groups from SITE.help) — also ? and h.
- neofetch — ASCII ghost/terminal mark + meta rows (user, host, OS "pizca.sec 1.0.0", uptime, shell
  "bash 5.2", focus, location, theme, resolution). Classes .neofetch, .neofetch__art, .neofetch__info,
  .kv.
- ls (+ ls -la) — files from SITE.files, clickable cat commands; cat <name> prints target output
  (cat projects.txt prints projects list; unknown file gives an error + suggestion).
- theme / theme nordic|amber|ice — list or set; persist pizca.theme; update #statusTheme,
  html[data-theme], titlebar button label; confirm in output. No arg cycles.
- crt / crt on|off — toggles html.crt-off; persist pizca.crt; confirm.
- banner — reprints the ASCII banner block (reuse static art from #banner).
- clear (also cls, Ctrl+L) — clears #output and scrolls screen to top; keeps boot/banner.
- history — numbered command history; date; pwd -> /home/pizca/portfolio; uname -a ->
  PizcaSec 1.0.0 ghostty x86_64 GNU/Linux; echo <text> (escaped text); email -> opens mailto + prints.
- Easter eggs (write good microcopy): sudo …, exit, rm -rf /, scan (simulated nmap against
  pizca.me — label it simulated), drone (ASCII quadcopter + cheeky status), glitch (short soft
  signal-degradation pulse; reduced-motion prints text only).
- Unknown command: bash: <cmd>: command not found + closest match via small Levenshtein + try 'help'.
- Empty enter: do nothing (maybe a new prompt line).

Interaction requirements:

- Clicking any [data-cmd], chip, or help__cmd runs it. Clicking screen focuses input; don't steal
  focus while the user is selecting text.
- History up/down, Tab completion (commands + open <id> + cat <file> + theme <name>), Esc clears line,
  Ctrl+C prints ^C and clears, Ctrl+L clears, Ctrl+U clears line.
- Typed text mirrored into #cmdTyped; visible block cursor; input itself visually transparent.
- Auto-scroll to bottom after output unless the user has scrolled up.
- Boot: type SITE.boot lines (~55ms between lines) into #boot; then add .is-ready to #terminal; then
  print a command echo + whoami output automatically; focus input on fine pointers. Any key/click/tap
  during boot finishes it immediately.
- prefers-reduced-motion: no boot typing (append instantly), no autoscroll animation, no glitch pulse.
- Query params for QA/deep links: ?skipboot=1, ?cmd=projects, ?theme=amber, ?crt=off; also #contact
  etc. runs that command after boot.
- Live clock in #statusClock every 20s in SITE.meta.timezone (HH:MM); #btnTheme cycles theme,
  #btnCrt toggles CRT.
- No console errors. Guard against missing SITE keys (render a readable error, don't die).
- Never inject raw user input with innerHTML.

## 6. QA acceptance

- Firefox + Chromium, desktop 1440x900 and mobile 390x844 (Lead screenshots with headless Firefox).
- No horizontal overflow at 320/390/768/1440; ASCII art fits; no clipped titlebar.
- Keyboard-only flow: skip link -> input; Tab completion; up history; Esc/Ctrl+C/Ctrl+L.
- prefers-reduced-motion and JS-disabled both show a usable page.
- No 404s, no console errors, meta/OG/JSON-LD present.
- Every command in help exists; every command runs without throwing.
- Visual: CRT effects subtle; body text >= 13px mobile / 14px desktop; accent used for emphasis, not
  wallpaper.

## 7. Integration

Lead integrates, runs the local server, screenshots, fixes conflicts, updates README.md, generates
assets/img/og.png, and zips the PizcaWeb project folder. Teammates: when your file is done and self-tested, report
exactly what you changed + how you tested + any contract deviations. Do not wait for the Lead to ask.