/* ============================================================================
   pizca.sec - TERMINAL ENGINE
   Owner: terminal-engineer. One file, zero dependencies, ES2020.
   Boot sequence + interactive bash-flavoured shell for the frozen markup in
   index.html. Only window.SITE content HTML is trusted and inserted as HTML;
   every byte of user input goes through textContent.
   window.TERM is the single global this file creates.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ dom */
  var doc = document;

  function el(tag, cls, text) {
    var node = doc.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function clearNode(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function closest(node, selector) {
    while (node && node.nodeType === 1) {
      if (node.matches && node.matches(selector)) return node;
      node = node.parentNode;
    }
    return null;
  }

  function on(target, type, fn, opts) {
    if (target && target.addEventListener) target.addEventListener(type, fn, opts || false);
  }

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function readStore(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function writeStore(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  /* ------------------------------------------------------------ environment */
  var reduceMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var finePointerQuery = window.matchMedia ? window.matchMedia("(pointer: fine)") : null;
  var prefersReduced = !!(reduceMotionQuery && reduceMotionQuery.matches);
  if (reduceMotionQuery && reduceMotionQuery.addEventListener) {
    reduceMotionQuery.addEventListener("change", function (event) {
      prefersReduced = !!event.matches;
    });
  }
  function isFinePointer() {
    return !finePointerQuery || finePointerQuery.matches;
  }

  /* ---------------------------------------------------------- SITE contract */
  var LANG = (function () {
    var q = "";
    try {
      q = String(new URLSearchParams(window.location.search || "").get("lang") || "").toLowerCase();
    } catch (e) { /* ignore */ }
    if (q === "en" || q === "es") return q;
    try {
      var saved = localStorage.getItem("pizca.lang");
      if (saved === "en" || saved === "es") return saved;
    } catch (e) { /* ignore */ }
    try {
      if (String(navigator.language || "").toLowerCase().indexOf("es") === 0) return "es";
    } catch (e) { /* ignore */ }
    return "en";
  })();

  var SITE_EN = window.SITE && typeof window.SITE === "object" ? window.SITE : {};
  var SITE_ES = window.SITE_ES && typeof window.SITE_ES === "object" ? window.SITE_ES : null;
  var rawSite = LANG === "es" && SITE_ES ? SITE_ES : SITE_EN;
  var SITE_OK = !!(rawSite && Object.keys(rawSite).length);
  var SITE = SITE_OK ? rawSite : {};
  var metaRaw = SITE.meta && typeof SITE.meta === "object" ? SITE.meta : {};

  function pick(source, key, fallback) {
    if (!source) return fallback;
    var value = source[key];
    if (value === undefined || value === null || value === "") return fallback;
    return value;
  }

  var meta = {
    handle: String(pick(metaRaw, "handle", "pizca")),
    host: String(pick(metaRaw, "host", "sec")),
    role: String(pick(metaRaw, "role", "Security researcher & reverse engineer")),
    location: String(pick(metaRaw, "location", "La Puebla de Híjar, Teruel · Spain")),
    locationShort: String(pick(metaRaw, "locationShort", "Teruel, ES")),
    timezone: String(pick(metaRaw, "timezone", "Europe/Madrid")),
    email: String(pick(metaRaw, "email", "hola@pizca.me")),
    website: String(pick(metaRaw, "website", "https://www.pizca.me")),
    year: Number(pick(metaRaw, "year", new Date().getFullYear())) || new Date().getFullYear()
  };

  var CONTENT_INCOMPLETE = !SITE_OK || !SITE.meta || !SITE.outputs;

  var UI = {
    en: {
      skip: "Skip to terminal input",
      themeLabel: "theme",
      crtLabel: "crt",
      online: "online",
      helpIntro: "{handle}'s shell. type a command or tap one. every road leads to contact.",
      helpFooter: "Tab completes · ↑ ↓ history · Ctrl+C cancels · Ctrl+L clears",
      projectIntro: "selected work — lab, bench and past ventures. open one for the details.",
      projectTip: "open one with ",
      projectTipEnd: " · or jump straight to ",
      contactNudge: "every road here ends in ",
      contactNudgeEnd: " · or ",
      themeAvailable: "available: nordic · amber · ice. run theme with no argument to cycle.",
      themeUnknown: "theme: {arg}: unknown theme",
      themeCmd: "theme → ",
      crtCmd: "crt → ",
      crtOn: "   (soft bloom, slight signal decay)",
      crtOff: "   (flat screen, easier on the eyes)",
      crtExpected: "crt: {arg}: expected on or off",
      crtUsage: "usage: crt [on|off]. no argument toggles.",
      historyEmpty: "no history yet — this shell has a very short memory. type help.",
      noHelp: "no help groups in content — built-ins:",
      notFound: "bash: {name}: command not found",
      didYouMean: "did you mean '",
      tryHelp: "type ",
      helpHint: " for the full command list.",
      nfOS: "OS",
      nfUptime: "uptime",
      nfShell: "shell",
      nfFocus: "focus",
      nfLocation: "location",
      nfTheme: "theme",
      nfResolution: "resolution",
      btopMeta: "uptime {uptime} · {cores} cores · load {load}",
      btopStatic: "static snapshot · simulated telemetry (not /proc)",
      btopSnapshot: "snapshot · {uptime} · simulated telemetry (not /proc)",
      btopSwap: "swap 0% · page cache warm",
      skipLabel: "Skip to terminal input",
      langCurrent: "language → {lang}",
      langAvailable: "available: en · es. run lang en or lang es.",
      langSet: "language → {lang} · reloading…"
    },
    es: {
      skip: "Saltar a la entrada del terminal",
      themeLabel: "tema",
      crtLabel: "crt",
      online: "en línea",
      helpIntro: "shell de {handle}. escribe un comando o pulsa uno. todos los caminos llevan a contacto.",
      helpFooter: "Tab completa · ↑ ↓ historial · Ctrl+C cancela · Ctrl+L limpia",
      projectIntro: "trabajo seleccionado — laboratorio, taller y proyectos anteriores. abre uno para ver el detalle.",
      projectTip: "abre uno con ",
      projectTipEnd: " · o salta directo a ",
      contactNudge: "todos los caminos terminan en ",
      contactNudgeEnd: " · o ",
      themeAvailable: "disponibles: nordic · amber · ice. ejecuta theme sin argumento para rotar.",
      themeUnknown: "theme: {arg}: tema desconocido",
      themeCmd: "tema → ",
      crtCmd: "crt → ",
      crtOn: "   (brillo suave, ligera degradación de señal)",
      crtOff: "   (pantalla plana, más descansada)",
      crtExpected: "crt: {arg}: se esperaba on u off",
      crtUsage: "uso: crt [on|off]. sin argumento alterna.",
      historyEmpty: "todavía no hay historial — este shell tiene muy poca memoria. escribe help.",
      noHelp: "no hay grupos de ayuda en el contenido — comandos integrados:",
      notFound: "bash: {name}: comando no encontrado",
      didYouMean: "¿querías decir '",
      tryHelp: "escribe ",
      helpHint: " para ver la lista completa de comandos.",
      nfOS: "SO",
      nfUptime: "uptime",
      nfShell: "shell",
      nfFocus: "enfoque",
      nfLocation: "ubicación",
      nfTheme: "tema",
      nfResolution: "resolución",
      btopMeta: "uptime {uptime} · {cores} núcleos · carga {load}",
      btopStatic: "captura estática · telemetría simulada (no /proc)",
      btopSnapshot: "captura · {uptime} · telemetría simulada (no /proc)",
      btopSwap: "swap 0% · caché de página caliente",
      skipLabel: "Saltar a la entrada del terminal",
      langCurrent: "idioma → {lang}",
      langAvailable: "disponibles: en · es. ejecuta lang en o lang es.",
      langSet: "idioma → {lang} · recargando…"
    }
  };

  function uiText(key, vars) {
    var bag = UI[LANG] || UI.en;
    var value = bag[key] || UI.en[key] || key;
    if (vars) {
      for (var name in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, name)) {
          value = value.replace(new RegExp("\\{" + name + "\\}", "g"), String(vars[name]));
        }
      }
    }
    return value;
  }


  var THEMES = ["nordic", "amber", "ice"];
  var TONES = { ok: true, warn: true, dim: true, accent: true };
  var DEFAULT_BOOT = [
    { text: "[    0.000000] pizcacos 1.0.0 — secure boot", tone: "dim" },
    { text: "[    0.021400] probing hardware ............ OK", tone: "ok" },
    { text: "[    0.048900] starting shell@tty1 ......... OK", tone: "ok" },
    { text: "[    0.277900] reached target: portfolio", tone: "accent" }
  ];
  var NEOFETCH_ART = [
    "     .-------.",
    "    /         \\",
    "   |   o   o   |",
    "   |     ^     |",
    "   |    ---    |",
    "   |           |",
    "    \\         /",
    "     '-------'",
    "     /_/   \\_\\"
  ].join("\n");
  var DRONE_ART = [
    "     {o}           {o}",
    "       \\           /",
    "        \\         /",
    "     .-----------------.",
    "     |   drone / re    |",
    "     '-----------------'",
    "        /         \\",
    "       /           \\",
    "     {o}           {o}"
  ].join("\n");
  var SCAN_TEXT = [
    "Starting Nmap 7.95 ( https://nmap.org ) [SIMULATED]",
    "Nmap scan report for pizca.me (203.0.113.42)",
    "Host is up (0.00042s latency).",
    "Not shown: 995 filtered tcp ports (no-response)",
    "PORT      STATE   SERVICE     VERSION",
    "22/tcp    open    ssh         OpenSSH 9.6 (protocol 2.0)",
    "80/tcp    open    http        nginx 1.26.1",
    "443/tcp   open    ssl/https   nginx 1.26.1",
    "8080/tcp  closed  http-proxy  —",
    "Service detection performed. Please report any bugs to the terminal operator.",
    "Nmap done: 1 IP address (1 host up) scanned in 2.14 seconds"
  ].join("\n");
  var GLITCH_MS = 1100;

  /* ------------------------------------------------------------- dom cache */
  var dom = {
    terminal: doc.getElementById("terminal"),
    screen: doc.getElementById("screen"),
    boot: doc.getElementById("boot"),
    output: doc.getElementById("output"),
    hints: doc.getElementById("hints"),
    form: doc.getElementById("cmdForm"),
    input: doc.getElementById("cmdInput"),
    typed: doc.getElementById("cmdTyped"),
    cursor: doc.getElementById("cursor"),
    statusTheme: doc.getElementById("statusTheme"),
    statusClock: doc.getElementById("statusClock"),
    btnTheme: doc.getElementById("btnTheme"),
    btnCrt: doc.getElementById("btnCrt"),
    btnLang: doc.getElementById("btnLang"),
    titlePath: doc.getElementById("titlePath"),
    banner: doc.getElementById("banner"),
    bannerTagline: doc.getElementById("bannerTagline"),
    bannerSub: doc.getElementById("bannerSub"),
    statusOnline: doc.getElementById("statusOnline"),
    skipLink: doc.getElementById("skipLink")
  };

  /* ---------------------------------------------------------------- state */
  var startedAt = Date.now();
  var history = [];
  var histIndex = 0;
  var booting = true;
  var bootTimer = null;
  var bootLines = [];
  var bootIndex = 0;
  var pinnedUp = false;
  var autoScrollUntil = 0;
  var activeBtop = null;
  var clockTimer = null;
  var clockFmt = null;

  var params = (function () {
    try { return new URLSearchParams(window.location.search || ""); }
    catch (e) { return { get: function () { return null; } }; }
  })();
  var skipBootParam = (function () {
    var value = params.get("skipboot");
    return value === "1" || value === "true";
  })();
  var stillParam = params.get("still");
  var STILL = stillParam === "1" || stillParam === "true";
  var langParam = String(params.get("lang") || "").toLowerCase();
  if (langParam === "en" || langParam === "es") {
    try { localStorage.setItem("pizca.lang", langParam); } catch (e) { /* ignore */ }
  }
  function motionOff() {
    return STILL || prefersReduced;
  }

  /* ------------------------------------------------------- identity / chrome */
  function promptText() {
    return meta.handle + "@" + meta.host + ":~$";
  }

  function syncIdentity() {
    var users = doc.querySelectorAll(".prompt__user");
    var i;
    for (i = 0; i < users.length; i++) users[i].textContent = meta.handle;
    var hosts = doc.querySelectorAll(".prompt__host");
    for (i = 0; i < hosts.length; i++) hosts[i].textContent = meta.host;
    if (dom.titlePath) dom.titlePath.textContent = meta.handle + "@" + meta.host + ": ~/portfolio";
    var statusUser = doc.querySelector('[data-status="user"]');
    if (statusUser) statusUser.textContent = meta.handle + "@" + meta.host;
  }

  function applyLocaleChrome() {
    doc.documentElement.lang = LANG;
    var page = SITE.page || {};
    if (page.title) doc.title = String(page.title);
    function setMeta(selector, value) {
      if (!value) return;
      var node = doc.querySelector(selector);
      if (node) node.setAttribute("content", String(value));
    }
    setMeta('meta[name="description"]', page.description);
    setMeta('meta[property="og:title"]', page.title);
    setMeta('meta[property="og:description"]', page.description);
    setMeta('meta[name="twitter:title"]', page.title);
    setMeta('meta[name="twitter:description"]', page.description);
    if (dom.bannerTagline && SITE.banner && SITE.banner.tagline) {
      dom.bannerTagline.textContent = String(SITE.banner.tagline);
    }
    if (dom.bannerSub && SITE.banner && SITE.banner.sub) {
      dom.bannerSub.textContent = String(SITE.banner.sub);
    }
    if (dom.skipLink) dom.skipLink.textContent = uiText("skip");
    if (dom.statusOnline) dom.statusOnline.textContent = uiText("online");
    if (dom.btnTheme) {
      dom.btnTheme.textContent = uiText("themeLabel");
      dom.btnTheme.setAttribute("aria-label", LANG === "es" ? "Cambiar tema de color" : "Cycle color theme");
      dom.btnTheme.setAttribute("title", LANG === "es" ? "tema: clic para cambiar" : "theme: click to cycle");
    }
    if (dom.btnCrt) {
      dom.btnCrt.textContent = uiText("crtLabel");
      dom.btnCrt.setAttribute("aria-label", LANG === "es" ? "Activar o desactivar efectos CRT" : "Toggle CRT effects");
    }
    if (dom.btnLang) {
      dom.btnLang.textContent = LANG === "es" ? "EN" : "ES";
      dom.btnLang.setAttribute("aria-label", LANG === "es" ? "Switch to English" : "Cambiar a español");
      dom.btnLang.setAttribute("title", LANG === "es" ? "switch to english" : "cambiar a español");
    }
    syncIdentity();
  }

  function changeLanguage(next) {
    if (next !== "en" && next !== "es") return;
    try { localStorage.setItem("pizca.lang", next); } catch (e) { /* ignore */ }
    var url;
    try {
      url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.location.assign(url.toString());
    } catch (e) {
      window.location.reload();
    }
  }

  function getTheme() {
    var current = doc.documentElement.getAttribute("data-theme");
    return THEMES.indexOf(current) !== -1 ? current : "nordic";
  }

  function nextTheme(current) {
    var index = THEMES.indexOf(current);
    return THEMES[(index + 1) % THEMES.length];
  }

  function applyTheme(name, opts) {
    var theme = THEMES.indexOf(name) !== -1 ? name : "nordic";
    doc.documentElement.setAttribute("data-theme", theme);
    if (dom.statusTheme) dom.statusTheme.textContent = theme;
    if (dom.btnTheme) {
      dom.btnTheme.setAttribute("data-current", theme);
      dom.btnTheme.setAttribute("aria-label", LANG === "es" ? "Cambiar tema de color (actual: " + theme + ")" : "Cycle color theme (current: " + theme + ")");
      dom.btnTheme.setAttribute("title", LANG === "es" ? "tema: " + theme + " — clic para cambiar" : "theme: " + theme + " — click to cycle");
    }
    if (opts && opts.persist) writeStore("pizca.theme", theme);
  }

  function crtIsOn() {
    return !doc.documentElement.classList.contains("crt-off");
  }

  function applyCrt(isOn, opts) {
    doc.documentElement.classList.toggle("crt-off", !isOn);
    if (dom.btnCrt) {
      dom.btnCrt.setAttribute("aria-pressed", isOn ? "true" : "false");
      dom.btnCrt.setAttribute("data-current", isOn ? "on" : "off");
      dom.btnCrt.setAttribute("aria-label", LANG === "es" ? "Activar o desactivar efectos CRT (ahora " + (isOn ? "on" : "off") + ")" : "Toggle CRT effects (currently " + (isOn ? "on" : "off") + ")");
      dom.btnCrt.setAttribute("title", LANG === "es" ? "efectos CRT: " + (isOn ? "on" : "off") + " — clic para cambiar" : "CRT effects: " + (isOn ? "on" : "off") + " — click to toggle");
    }
    if (opts && opts.persist) writeStore("pizca.crt", isOn ? "on" : "off");
  }

  function initChromePreferences() {
    var storedTheme = SITE_OK ? doc.documentElement.getAttribute("data-theme") : null;
    applyTheme(THEMES.indexOf(storedTheme) !== -1 ? storedTheme : "nordic", { persist: false });
    applyCrt(!doc.documentElement.classList.contains("crt-off"), { persist: false });

    var queryTheme = params.get("theme");
    if (queryTheme && THEMES.indexOf(String(queryTheme).toLowerCase()) !== -1) {
      applyTheme(String(queryTheme).toLowerCase(), { persist: false });
    }
    var queryCrt = params.get("crt");
    if (queryCrt === "off") applyCrt(false, { persist: false });
    else if (queryCrt === "on") applyCrt(true, { persist: false });
  }

  function buildClockFormatter() {
    try {
      clockFmt = new Intl.DateTimeFormat(LANG === "es" ? "es-ES" : "en-GB", {
        timeZone: meta.timezone, hour: "2-digit", minute: "2-digit", hourCycle: "h23"
      });
    } catch (e) {
      try {
        clockFmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
      } catch (e2) {
        clockFmt = null;
      }
    }
  }

  function updateClock() {
    if (!dom.statusClock) return;
    var text = "";
    if (clockFmt) {
      try { text = clockFmt.format(new Date()); } catch (e) { text = ""; }
    }
    if (!text) {
      var now = new Date();
      text = pad2(now.getHours()) + ":" + pad2(now.getMinutes());
    }
    dom.statusClock.textContent = text;
    dom.statusClock.setAttribute("title", "local time · " + meta.timezone);
  }

  /* ----------------------------------------------------------- shell output */
  function buildEcho(text) {
    var line = el("div", "out out--cmd");
    line.appendChild(el("span", "out__prompt", promptText()));
    line.appendChild(doc.createTextNode(" "));
    line.appendChild(el("span", "out__text", text || ""));
    return line;
  }

  function cmdLink(cmd, label) {
    var button = el("button", "cmd-link", label || cmd);
    button.type = "button";
    button.setAttribute("data-cmd", cmd);
    return button;
  }

  function noteLine(text) {
    return el("p", "out-p dim", text);
  }

  function kvBlock(rows) {
    var kv = el("div", "kv");
    for (var i = 0; i < rows.length; i++) {
      kv.appendChild(el("span", "kv__k", rows[i][0]));
      kv.appendChild(el("span", "kv__v", rows[i][1]));
    }
    return kv;
  }

  function toneClasses(tone, base) {
    var value = String(tone || "").toLowerCase();
    if (!TONES[value]) return base;
    return base + " tone--" + value + " " + value;
  }

  function appendContactNudge(box, key) {
    if (key === "contact" || key === "social") return;
    var markup = (box.innerHTML || "").toLowerCase();
    if (markup.indexOf("contact") !== -1 || markup.indexOf("mailto:") !== -1) return;
    var p = el("p", "out-p dim");
    p.appendChild(doc.createTextNode(uiText("contactNudge")));
    p.appendChild(cmdLink("contact", "contact"));
    p.appendChild(doc.createTextNode(uiText("contactNudgeEnd")));
    p.appendChild(cmdLink("projects", "projects"));
    box.appendChild(p);
  }

  function missingContent(key) {
    var box = el("div", "out out--err");
    box.appendChild(el("p", "out-p", key + ": content unavailable."));
    box.appendChild(el("p", "out-p dim", "assets/js/content.js did not provide this section. built-in commands still work — try help."));
    return box;
  }

  function getOutputHtml(key) {
    return SITE.outputs && typeof SITE.outputs[key] === "string" ? SITE.outputs[key] : "";
  }

  function contentCommand(key) {
    return function () {
      var html = getOutputHtml(key);
      if (!html.trim()) return [missingContent(key)];
      var box = el("div", "out");
      box.innerHTML = html;
      appendContactNudge(box, key);
      return [box];
    };
  }

  function projectList() {
    var source = Array.isArray(SITE.projects) ? SITE.projects : [];
    var list = [];
    for (var i = 0; i < source.length; i++) {
      var project = source[i];
      if (project && typeof project.id === "string" && project.id) list.push(project);
    }
    return list;
  }

  function fileList() {
    var source = Array.isArray(SITE.files) ? SITE.files : [];
    var list = [];
    for (var i = 0; i < source.length; i++) {
      var file = source[i];
      if (file && typeof file.name === "string" && file.name) list.push(file);
    }
    return list;
  }

  function findProject(id) {
    var needle = String(id || "").toLowerCase();
    var projects = projectList();
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].id.toLowerCase() === needle) return projects[i];
    }
    for (var j = 0; j < projects.length; j++) {
      if (String(projects[j].name || "").toLowerCase() === needle) return projects[j];
    }
    return null;
  }

  function findFile(name) {
    var needle = String(name || "").toLowerCase();
    var files = fileList();
    for (var i = 0; i < files.length; i++) {
      if (files[i].name.toLowerCase() === needle) return files[i];
    }
    return null;
  }

  function closestMatch(values, name) {
    var needle = String(name || "").toLowerCase();
    if (!needle) return null;
    var best = null;
    var bestDistance = 99;
    for (var i = 0; i < values.length; i++) {
      var candidate = String(values[i]);
      var lower = candidate.toLowerCase();
      if (lower.indexOf(needle) === 0) return candidate;
      var distance = levenshtein(needle, lower);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = candidate;
      }
    }
    var threshold = Math.max(1, Math.min(3, Math.floor(needle.length / 2) + 1));
    return bestDistance <= threshold ? best : null;
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    var alen = a.length;
    var blen = b.length;
    if (!alen) return blen;
    if (!blen) return alen;
    var previous = [];
    var current = [];
    var i;
    var j;
    for (j = 0; j <= blen; j++) previous[j] = j;
    for (i = 1; i <= alen; i++) {
      current[0] = i;
      for (j = 1; j <= blen; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
      }
      for (j = 0; j <= blen; j++) previous[j] = current[j];
    }
    return previous[blen];
  }

  /* -------------------------------------------------------------- scrolling */
  function scrollToBottom(force, instant) {
    if (!dom.screen) return;
    if (!force && pinnedUp) return;
    if (instant) {
      autoScrollUntil = Date.now() + 80;
      dom.screen.scrollTop = dom.screen.scrollHeight;
      return;
    }
    autoScrollUntil = Date.now() + (motionOff() ? 80 : 700);
    if (motionOff()) {
      dom.screen.scrollTop = dom.screen.scrollHeight;
      return;
    }
    if (typeof dom.screen.scrollTo === "function") {
      try {
        dom.screen.scrollTo({ top: dom.screen.scrollHeight, behavior: "smooth" });
        return;
      } catch (e) { /* fall through */ }
    }
    dom.screen.scrollTop = dom.screen.scrollHeight;
  }

  function handleScreenScroll() {
    if (!dom.screen) return;
    var distance = dom.screen.scrollHeight - dom.screen.scrollTop - dom.screen.clientHeight;
    if (distance <= 48) {
      pinnedUp = false;
    } else if (Date.now() > autoScrollUntil) {
      pinnedUp = true;
    }
  }

  function appendNodes(nodes) {
    if (!nodes || !nodes.length) return;
    var fragment = doc.createDocumentFragment();
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i]) fragment.appendChild(nodes[i]);
    }
    if (fragment.childNodes.length) {
      dom.output.appendChild(fragment);
      scrollToBottom();
    }
  }

  /* ------------------------------------------------------------------ boot */
  function toneClass(tone) {
    var value = String(tone || "").toLowerCase();
    return TONES[value] ? " tone--" + value + " " + value : "";
  }

  function getBootLines() {
    var source = Array.isArray(SITE.boot) ? SITE.boot : DEFAULT_BOOT;
    var lines = [];
    for (var i = 0; i < source.length && lines.length < 24; i++) {
      var item = source[i];
      if (typeof item === "string") {
        lines.push({ text: item, tone: "" });
      } else if (item && typeof item.text === "string") {
        lines.push({ text: item.text, tone: typeof item.tone === "string" ? item.tone : "" });
      }
    }
    return lines.length ? lines : DEFAULT_BOOT;
  }

  function addBootLine(line) {
    if (!dom.boot) return;
    dom.boot.appendChild(el("div", "boot__line" + toneClass(line.tone), line.text));
  }

  function renderRemainingBoot() {
    while (bootIndex < bootLines.length) {
      addBootLine(bootLines[bootIndex]);
      bootIndex++;
    }
  }

  function appendContentWarning() {
    var box = el("div", "out out--err");
    box.appendChild(el("p", "out-p", "warning: portfolio content is missing or incomplete."));
    box.appendChild(el("p", "out-p dim", "assets/js/content.js did not load, or it is missing required keys. built-in commands still work — try help."));
    appendNodes([box]);
  }

  function finishBoot(focusOk) {
    if (!booting) return;
    booting = false;
    if (bootTimer) {
      window.clearTimeout(bootTimer);
      bootTimer = null;
    }
    renderRemainingBoot();
    if (dom.terminal) dom.terminal.classList.add("is-ready");
    if (CONTENT_INCOMPLETE) appendContentWarning();
    if (!hasDeepLink()) execute("whoami", { auto: true });
    runDeepLinks();
    var active = doc.activeElement;
    if (focusOk !== false && isFinePointer() && (!active || active === doc.body || active === doc.documentElement)) {
      focusInput(false);
    }
  }

  function bootNextLine() {
    if (!booting) return;
    if (bootIndex >= bootLines.length) {
      finishBoot(true);
      return;
    }
    addBootLine(bootLines[bootIndex]);
    bootIndex++;
    bootTimer = window.setTimeout(bootNextLine, 55);
  }

  function startBoot() {
    bootLines = getBootLines();
    bootIndex = 0;
    if (skipBootParam || motionOff()) {
      renderRemainingBoot();
      finishBoot(true);
      return;
    }
    bootNextLine();
  }

  /* ------------------------------------------------------- command plumbing */
  function parse(text) {
    var match = /^(\S+)(?:\s+([\s\S]*))?$/.exec(text);
    var name = match ? match[1] : "";
    var rest = match && match[2] ? match[2] : "";
    return {
      name: name,
      rest: rest,
      args: rest ? rest.split(/\s+/) : []
    };
  }

  function pushHistory(text) {
    if (!text) return;
    history.push(text);
    if (history.length > 200) history.shift();
  }

  function focusInput(force) {
    if (!force && !isFinePointer()) return;
    if (!dom.input) return;
    try {
      dom.input.focus({ preventScroll: true });
    } catch (e) {
      try { dom.input.focus(); } catch (e2) { /* ignore */ }
    }
  }

  function isAuto(ctx) {
    return !!(ctx && ctx.auto);
  }

  function runCommand(parsed, raw, ctx) {
    var handler = registry[parsed.name];
    if (typeof handler !== "function") return unknownCommand(parsed.name);
    try {
      var result = handler(parsed.args, parsed.rest, ctx || {});
      return result || [];
    } catch (error) {
      return commandFailure(parsed.name);
    }
  }

  function commandFailure(name) {
    var box = el("div", "out out--err");
    box.appendChild(el("p", "out-p", "bash: " + name + ": command failed unexpectedly"));
    box.appendChild(el("p", "out-p dim", "the shell caught it so the page did not. type help, or clear to tidy up."));
    return [box];
  }

  function execute(raw, opts) {
    opts = opts || {};
    stopBtop();
    var text = String(raw === undefined || raw === null ? "" : raw).replace(/^\s+|\s+$/g, "");
    var nodes = [];
    var cleared = false;
    var parsed = null;

    if (text) {
      parsed = parse(text);
      if (!opts.auto) pushHistory(text);
      histIndex = history.length;
      if (parsed.name === "clear" || parsed.name === "cls") {
        doClear();
        cleared = true;
      } else {
        nodes = runCommand(parsed, text, opts) || [];
      }
    } else {
      histIndex = history.length;
    }

    var echoNode = null;
    if (!cleared) {
      var fragment = doc.createDocumentFragment();
      echoNode = buildEcho(text);
      fragment.appendChild(echoNode);
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i]) fragment.appendChild(nodes[i]);
      }
      dom.output.appendChild(fragment);
      if (!pinnedUp) scrollToBottom(false, !!opts.auto);
    }

    if (!opts.auto) focusInput(!!opts.forceFocus);
    return echoNode;
  }

  function doClear() {
    stopBtop();
    if (dom.output) clearNode(dom.output);
    pinnedUp = false;
    autoScrollUntil = 0;
    if (dom.screen) {
      try { dom.screen.scrollTop = 0; } catch (e) { /* ignore */ }
    }
  }

  function stopBtop() {
    if (activeBtop && activeBtop.timer) {
      window.clearInterval(activeBtop.timer);
    }
    activeBtop = null;
  }

  function hashCommand() {
    var hash = "";
    try {
      hash = decodeURIComponent((window.location.hash || "").replace(/^#/, ""));
    } catch (e) {
      hash = (window.location.hash || "").replace(/^#/, "");
    }
    hash = String(hash).trim();
    return hash && registry[hash] ? hash : "";
  }

  function deepLinkCommand() {
    var commandParam = params.get("cmd");
    if (commandParam && String(commandParam).trim()) return String(commandParam).trim();
    return hashCommand();
  }

  function hasDeepLink() {
    return !!deepLinkCommand();
  }

  function anchorCommand(node) {
    if (!node || !dom.screen) return;
    var screen = dom.screen;
    var screenRect = screen.getBoundingClientRect();
    var nodeRect = node.getBoundingClientRect();
    var offset = nodeRect.top - screenRect.top + screen.scrollTop;
    var target = 0;
    if (screen.scrollHeight > screen.clientHeight + 1) {
      target = Math.max(0, offset - 8);
    }
    autoScrollUntil = Date.now() + 120;
    screen.scrollTop = target;
    pinnedUp = false;
  }

  function runDeepLinks() {
    var ran = "";
    var node = null;
    var commandParam = params.get("cmd");
    if (commandParam && String(commandParam).trim()) {
      ran = String(commandParam).trim();
      node = execute(ran, { auto: true }) || node;
    }
    var hash = hashCommand();
    if (hash && hash !== ran.split(/\s+/)[0]) {
      node = execute(hash, { auto: true }) || node;
    }
    if (node) anchorCommand(node);
  }

  /* --------------------------------------------------------------- unknown */
  function unknownCommand(name) {
    var box = el("div", "out out--err");
    box.appendChild(el("p", "out-p", uiText("notFound", { name: name })));
    var suggestion = closestMatch(ALL_COMMANDS, name);
    if (suggestion) {
      var line = el("p", "out-p");
      line.appendChild(doc.createTextNode(uiText("didYouMean")));
      line.appendChild(cmdLink(suggestion, suggestion));
      line.appendChild(doc.createTextNode("'?"));
      box.appendChild(line);
    }
    var hint = el("p", "out-p dim");
    hint.appendChild(doc.createTextNode(uiText("tryHelp")));
    hint.appendChild(cmdLink("help", "help"));
    hint.appendChild(doc.createTextNode(uiText("helpHint")));
    box.appendChild(hint);
    return [box];
  }

  /* -------------------------------------------------------------- commands */
  function fnProjects() {
    var projects = projectList();
    var box = el("div", "out");
    if (!projects.length) return [missingContent("projects")];
    box.appendChild(el("p", "out-p dim", uiText("projectIntro")));
    for (var i = 0; i < projects.length; i++) box.appendChild(projectCard(projects[i], false));
    var tip = el("p", "out-p dim");
    tip.appendChild(doc.createTextNode(uiText("projectTip")));
    tip.appendChild(cmdLink("open " + projects[0].id, "open <id>"));
    tip.appendChild(doc.createTextNode(uiText("projectTipEnd")));
    tip.appendChild(cmdLink("contact", "contact"));
    box.appendChild(tip);
    return [box];
  }

  function projectCard(project, detail) {
    var card = el("div", "project" + (detail ? " project--detail" : ""));
    if (!detail) {
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("data-cmd", "open " + project.id);
      card.setAttribute("aria-label", "Open project " + (project.name || project.id));
    }
    var head = el("div", "project__head");
    head.appendChild(el("span", "project__id", project.id));
    head.appendChild(el("span", toneClasses(project.tone, "project__status"), project.status || "active"));
    card.appendChild(head);
    card.appendChild(el("div", "project__name", project.name || project.id));
    var metaBox = el("div", "project__meta");
    metaBox.appendChild(el("span", "", project.summary || ""));
    var tags = Array.isArray(project.tags) ? project.tags : [];
    var tagWrap = el("span", "tags");
    for (var i = 0; i < tags.length; i++) {
      if (typeof tags[i] === "string" && tags[i]) tagWrap.appendChild(el("span", "tag", tags[i]));
    }
    if (tagWrap.childNodes.length) metaBox.appendChild(tagWrap);
    card.appendChild(metaBox);
    return card;
  }

  function fnOpen(args) {
    var id = String(args[0] || "").trim();
    var projects = projectList();
    if (!id) {
      var usage = el("div", "out out--err");
      usage.appendChild(el("p", "out-p", "open: missing project id"));
      usage.appendChild(el("p", "out-p dim", "usage: open <id>"));
      if (projects.length) {
        var list = el("p", "out-p");
        list.appendChild(doc.createTextNode("available: "));
        for (var i = 0; i < projects.length; i++) {
          if (i) list.appendChild(doc.createTextNode("  "));
          list.appendChild(cmdLink("open " + projects[i].id, projects[i].id));
        }
        usage.appendChild(list);
      } else {
        usage.appendChild(el("p", "out-p dim", "no projects in content."));
      }
      return [usage];
    }
    var project = findProject(id);
    if (!project) {
      var error = el("div", "out out--err");
      error.appendChild(el("p", "out-p", "open: " + id + ": no such project"));
      var ids = projects.map(function (item) { return item.id; });
      var near = closestMatch(ids, id);
      if (near) {
        var suggestion = el("p", "out-p");
        suggestion.appendChild(doc.createTextNode("did you mean '"));
        suggestion.appendChild(cmdLink("open " + near, near));
        suggestion.appendChild(doc.createTextNode("'?"));
        error.appendChild(suggestion);
      }
      var hint = el("p", "out-p dim");
      hint.appendChild(doc.createTextNode("run "));
      hint.appendChild(cmdLink("projects", "projects"));
      hint.appendChild(doc.createTextNode(" to see every id."));
      error.appendChild(hint);
      if (!near && ids.length) {
        var available = el("p", "out-p dim");
        available.appendChild(doc.createTextNode("available: "));
        for (var index = 0; index < ids.length; index++) {
          if (index) available.appendChild(doc.createTextNode("  "));
          available.appendChild(cmdLink("open " + ids[index], ids[index]));
        }
        error.appendChild(available);
      }
      return [error];
    }
    var box = el("div", "out");
    box.appendChild(projectCard(project, true));
    var body = el("div", "project__body");
    var html = typeof project.html === "string" ? project.html.trim() : "";
    if (html) body.innerHTML = html;
    else body.appendChild(el("p", "out-p dim", "the details for this project are still being written."));
    box.appendChild(body);
    var footer = el("p", "out-p dim");
    footer.appendChild(doc.createTextNode("back to "));
    footer.appendChild(cmdLink("projects", "projects"));
    footer.appendChild(doc.createTextNode(" · talk to me about this one: "));
    footer.appendChild(cmdLink("contact", "contact"));
    box.appendChild(footer);
    return [box];
  }

  function fnHelp() {
    var groups = Array.isArray(SITE.help) ? SITE.help : [];
    var box = el("div", "out help");
    box.appendChild(el("p", "out-p dim", uiText("helpIntro", { handle: meta.handle })));
    var rendered = 0;
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];
      if (!group || typeof group !== "object") continue;
      var items = Array.isArray(group.items) ? group.items : [];
      var groupNode = el("div", "help__group");
      groupNode.appendChild(el("div", "help__label", String(group.group || "shell")));
      var rows = 0;
      for (var j = 0; j < items.length; j++) {
        var item = items[j];
        if (!Array.isArray(item) || !item.length) continue;
        var commandText = String(item[0]);
        var descText = item.length > 1 ? String(item[1]) : "";
        var row = el("div", "help__row");
        var button = el("button", "help__cmd", commandText);
        button.type = "button";
        var dataCmd = /[<\[]/.test(commandText) ? commandText.split(/\s+/)[0] : commandText;
        button.setAttribute("data-cmd", dataCmd);
        button.setAttribute("title", "run: " + dataCmd);
        row.appendChild(button);
        row.appendChild(el("span", "help__desc", descText));
        groupNode.appendChild(row);
        rows++;
      }
      if (rows) {
        box.appendChild(groupNode);
        rendered++;
      }
    }
    if (!rendered) {
      box.appendChild(el("p", "out-p dim", uiText("noHelp")));
      var pre = el("pre", "out__pre dim", ALL_COMMANDS.filter(function (name) { return name.length > 1; }).join("  "));
      box.appendChild(pre);
    }
    box.appendChild(el("p", "out-p dim", uiText("helpFooter")));
    return [box];
  }

  function fnNeofetch() {
    var box = el("div", "out");
    var nf = el("div", "neofetch");
    var art = el("pre", "neofetch__art", NEOFETCH_ART);
    art.setAttribute("aria-hidden", "true");
    nf.appendChild(art);
    var info = el("div", "neofetch__info");
    var head = el("p", "out-p");
    head.appendChild(el("span", "accent", meta.handle));
    head.appendChild(el("span", "dim", "@"));
    head.appendChild(el("span", "accent", meta.host));
    info.appendChild(head);
    info.appendChild(kvBlock([
      [uiText("nfOS"), "pizca.sec 1.0.0"],
      [uiText("nfUptime"), uptimeText()],
      [uiText("nfShell"), "bash 5.2"],
      [uiText("nfFocus"), meta.role],
      [uiText("nfLocation"), meta.locationShort],
      [uiText("nfTheme"), getTheme()],
      [uiText("nfResolution"), viewportText()]
    ]));
    nf.appendChild(info);
    box.appendChild(nf);
    return [box];
  }

  function uptimeText() {
    var seconds = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
    return Math.floor(seconds / 60) + "m " + (seconds % 60) + "s";
  }

  function viewportText() {
    return (window.innerWidth || 0) + "x" + (window.innerHeight || 0);
  }

  function fnLs(args) {
    var files = fileList();
    var long = false;
    for (var i = 0; i < args.length; i++) {
      if (/^-[a-z]*l[a-z]*$/i.test(args[i])) long = true;
    }
    var box = el("div", "out");
    if (!files.length) {
      box.className = "out out--err";
      box.appendChild(el("p", "out-p", "ls: no files (content data missing)"));
      box.appendChild(el("p", "out-p dim", "assets/js/content.js should provide SITE.files."));
      return [box];
    }
    box.appendChild(el("p", "out-p dim", long ? "total " + files.length + " · read-only" : "total " + files.length + " · tap a file to read it"));
    var list = el("ul", "files");
    for (var j = 0; j < files.length; j++) {
      var file = files[j];
      var row = el("li", "files__item");
      if (long) {
        row.appendChild(el("span", "dim", "-rw-r--r--  " + sizeLabel(fileBytes(file)) + "  "));
      }
      row.appendChild(cmdLink("cat " + file.name, file.name));
      if (file.note) row.appendChild(el("span", "dim", "  — " + file.note));
      list.appendChild(row);
    }
    box.appendChild(list);
    var tip = el("p", "out-p dim");
    tip.appendChild(doc.createTextNode("cat <file> reads one · "));
    tip.appendChild(cmdLink("cat projects.txt", "projects.txt"));
    tip.appendChild(doc.createTextNode(" lists the lab work"));
    box.appendChild(tip);
    return [box];
  }

  function fileBytes(file) {
    var html = getOutputHtml(file.target || "");
    return Math.max(180, Math.round(html.length * 1.2) + 64);
  }

  function sizeLabel(bytes) {
    if (bytes < 1024) return bytes + "B";
    return (bytes / 1024).toFixed(1) + "K";
  }

  function fnCat(args) {
    var name = String(args[0] || "").trim();
    var files = fileList();
    if (!name) {
      var usage = el("div", "out out--err");
      usage.appendChild(el("p", "out-p", "cat: missing file operand"));
      usage.appendChild(el("p", "out-p dim", "usage: cat <file>"));
      if (files.length) {
        var list = el("p", "out-p");
        list.appendChild(doc.createTextNode("available: "));
        for (var i = 0; i < files.length; i++) {
          if (i) list.appendChild(doc.createTextNode("  "));
          list.appendChild(cmdLink("cat " + files[i].name, files[i].name));
        }
        usage.appendChild(list);
      }
      return [usage];
    }
    var file = findFile(name);
    if (!file && name.indexOf(".") === -1) file = findFile(name + ".txt");
    if (!file) {
      var error = el("div", "out out--err");
      error.appendChild(el("p", "out-p", "cat: " + name + ": No such file or directory"));
      var names = files.map(function (item) { return item.name; });
      var near = closestMatch(names, name);
      if (near) {
        var suggestion = el("p", "out-p");
        suggestion.appendChild(doc.createTextNode("did you mean '"));
        suggestion.appendChild(cmdLink("cat " + near, near));
        suggestion.appendChild(doc.createTextNode("'?"));
        error.appendChild(suggestion);
      }
      var hint = el("p", "out-p dim");
      hint.appendChild(doc.createTextNode("run "));
      hint.appendChild(cmdLink("ls", "ls"));
      hint.appendChild(doc.createTextNode(" to see everything in this directory."));
      error.appendChild(hint);
      if (!near && names.length) {
        var available = el("p", "out-p dim");
        available.appendChild(doc.createTextNode("available: "));
        for (var index = 0; index < names.length; index++) {
          if (index) available.appendChild(doc.createTextNode("  "));
          available.appendChild(cmdLink("cat " + names[index], names[index]));
        }
        error.appendChild(available);
      }
      return [error];
    }
    if (file.target === "projects") return fnProjects();
    var html = getOutputHtml(file.target || "");
    if (!html.trim()) return [missingContent(file.target || file.name)];
    var box = el("div", "out");
    box.appendChild(el("p", "out-p dim", "~/portfolio/" + file.name));
    var body = el("div", "");
    body.innerHTML = html;
    box.appendChild(body);
    appendContactNudge(box, file.target);
    return [box];
  }

  function themeLine(name) {
    var line = el("p", "out-p");
    line.appendChild(doc.createTextNode(uiText("themeCmd")));
    line.appendChild(el("span", "accent", name));
    line.appendChild(el("span", "dim", "   (nordic · amber · ice)"));
    return line;
  }

  function fnTheme(args, rest, ctx) {
    var requested = String(args[0] || "").toLowerCase();
    var box = el("div", "out");
    if (!requested) {
      var cycled = nextTheme(getTheme());
      applyTheme(cycled, { persist: !isAuto(ctx) });
      box.appendChild(themeLine(cycled));
      return [box];
    }
    if (THEMES.indexOf(requested) === -1) {
      box.className = "out out--err";
      box.appendChild(el("p", "out-p", uiText("themeUnknown", { arg: String(args[0]) })));
      box.appendChild(el("p", "out-p dim", uiText("themeAvailable")));
      return [box];
    }
    applyTheme(requested, { persist: !isAuto(ctx) });
    box.appendChild(themeLine(requested));
    return [box];
  }

  function crtLine(isOn) {
    var line = el("p", "out-p");
    line.appendChild(doc.createTextNode(uiText("crtCmd")));
    line.appendChild(el("span", "accent", isOn ? "on" : "off"));
    line.appendChild(el("span", "dim", uiText(isOn ? "crtOn" : "crtOff")));
    return line;
  }

  function fnCrt(args, rest, ctx) {
    var requested = String(args[0] || "").toLowerCase();
    var box = el("div", "out");
    if (!requested) {
      var toggled = !crtIsOn();
      applyCrt(toggled, { persist: !isAuto(ctx) });
      box.appendChild(crtLine(toggled));
      return [box];
    }
    if (requested !== "on" && requested !== "off") {
      box.className = "out out--err";
      box.appendChild(el("p", "out-p", uiText("crtExpected", { arg: String(args[0]) })));
      box.appendChild(el("p", "out-p dim", uiText("crtUsage")));
      return [box];
    }
    var wanted = requested === "on";
    applyCrt(wanted, { persist: !isAuto(ctx) });
    box.appendChild(crtLine(wanted));
    return [box];
  }

  function fnLang(args) {
    var requested = String(args[0] || "").toLowerCase();
    var box = el("div", "out");
    if (!requested) {
      box.appendChild(el("p", "out-p", uiText("langCurrent", { lang: LANG })));
      box.appendChild(el("p", "out-p dim", uiText("langAvailable")));
      return [box];
    }
    var next = null;
    if (requested === "en" || requested === "english" || requested === "inglés" || requested === "ingles") next = "en";
    if (requested === "es" || requested === "spanish" || requested === "español" || requested === "espanol") next = "es";
    if (!next) {
      box.className = "out out--err";
      box.appendChild(el("p", "out-p", "lang: " + String(args[0]) + (LANG === "es" ? ": idioma desconocido" : ": unknown language")));
      box.appendChild(el("p", "out-p dim", uiText("langAvailable")));
      return [box];
    }
    if (next === LANG) {
      box.appendChild(el("p", "out-p", uiText("langCurrent", { lang: LANG })));
      return [box];
    }
    box.appendChild(el("p", "out-p", uiText("langSet", { lang: next })));
    window.setTimeout(function () { changeLanguage(next); }, 160);
    return [box];
  }

  function fnBanner() {
    var box = el("div", "out");
    var artText = "";
    var artSvg = null;
    var tagline = "";
    var sub = "";
    if (dom.banner) {
      var artNode = dom.banner.querySelector(".banner__art");
      var taglineNode = dom.banner.querySelector(".banner__tagline");
      var subNode = dom.banner.querySelector(".banner__sub");
      if (artNode) {
        artSvg = artNode.querySelector("svg");
        artText = artNode.textContent || "";
      }
      if (taglineNode) tagline = taglineNode.textContent || "";
      if (subNode) sub = subNode.textContent || "";
    }
    if (!artText && !artSvg) artText = "pizca.sec";
    var pre;
    if (artSvg) {
      pre = el("div", "out__pre banner-reprint");
      pre.setAttribute("aria-hidden", "true");
      pre.appendChild(artSvg.cloneNode(true));
    } else {
      pre = el("pre", "out__pre banner-reprint", artText);
      pre.setAttribute("aria-hidden", "true");
    }
    box.appendChild(pre);
    if (tagline) box.appendChild(el("p", "out-p", tagline.replace(/\s+/g, " ").trim()));
    if (sub) box.appendChild(el("p", "out-p dim", sub));
    return [box];
  }

  function fnHistory() {
    var box = el("div", "out");
    if (!history.length) {
      box.appendChild(el("p", "out-p dim", uiText("historyEmpty")));
      return [box];
    }
    var list = el("ol", "history");
    for (var i = 0; i < history.length; i++) list.appendChild(el("li", "", history[i]));
    box.appendChild(list);
    return [box];
  }

  function formatDate() {
    var now = new Date();
    try {
      var parts = new Intl.DateTimeFormat(LANG === "es" ? "es-ES" : "en-GB", {
        timeZone: meta.timezone,
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
        timeZoneName: "short"
      }).formatToParts(now);
      var get = function (type) {
        for (var i = 0; i < parts.length; i++) if (parts[i].type === type) return parts[i].value;
        return "";
      };
      return [
        get("weekday"), get("day"), get("month"), get("year"),
        get("hour") + ":" + get("minute") + ":" + get("second"),
        get("timeZoneName")
      ].join(" ").replace(/\s+/g, " ").trim();
    } catch (e) {
      return now.toString();
    }
  }

  function fnDate() {
    var box = el("div", "out");
    box.appendChild(el("p", "out-p", formatDate()));
    return [box];
  }

  function fnPwd() {
    var box = el("div", "out");
    box.appendChild(el("p", "out-p", "/home/" + meta.handle + "/portfolio"));
    return [box];
  }

  function fnUname(args) {
    var all = false;
    for (var i = 0; i < args.length; i++) {
      if (/^-[a-z]*a[a-z]*$/i.test(args[i])) all = true;
    }
    var box = el("div", "out");
    box.appendChild(el("p", "out-p", all ? "PizcaSec 1.0.0 ghostty x86_64 GNU/Linux" : "Linux"));
    return [box];
  }

  function fnEcho(args, rest) {
    var box = el("div", "out");
    box.appendChild(el("p", "out-p", rest ? rest : "\u00a0"));
    return [box];
  }

  function fnEmail(args, rest, ctx) {
    var address = meta.email;
    var box = el("div", "out");
    var line = el("p", "out-p");
    line.appendChild(doc.createTextNode("mail: "));
    var link = el("a", "link", address);
    link.setAttribute("href", "mailto:" + address);
    line.appendChild(link);
    box.appendChild(line);
    if (isAuto(ctx)) {
      box.appendChild(el("p", "out-p dim", "deep link mode: click the address to open your mail client."));
      return [box];
    }
    box.appendChild(el("p", "out-p dim", "opening your mail client…"));
    try {
      var anchor = doc.createElement("a");
      anchor.href = "mailto:" + address;
      anchor.rel = "noopener";
      anchor.click();
    } catch (e) { /* the link above still works */ }
    return [box];
  }

  function fnSudo(args, rest) {
    var box = el("div", "out");
    var request = String(rest || "").trim();
    if (/^make me a sandwich$/i.test(request)) {
      box.appendChild(el("p", "out-p", "Okay."));
      box.appendChild(el("p", "out-p dim", "that was easier than expected. sudo is not even installed."));
      return [box];
    }
    if (!request) {
      box.appendChild(el("p", "out-p", "usage: sudo <command>"));
      box.appendChild(el("p", "out-p dim", "or sudo make me a sandwich. results may vary."));
      return [box];
    }
    box.appendChild(el("p", "out-p dim", "[sudo] password for " + meta.handle + ":"));
    box.appendChild(el("p", "out-p", meta.handle + " is not in the sudoers file. This incident will be reported."));
    box.appendChild(el("p", "out-p dim", "…to the cat. she has seen worse."));
    return [box];
  }

  function fnExit() {
    var box = el("div", "out");
    box.appendChild(el("p", "out-p", "logout"));
    box.appendChild(el("p", "out-p dim", "Connection to pizca.me closed."));
    box.appendChild(el("p", "out-p", "…not really. this shell is a static file; it has nowhere to go."));
    var nudge = el("p", "out-p dim");
    nudge.appendChild(doc.createTextNode("leave a message instead: "));
    nudge.appendChild(cmdLink("contact", "contact"));
    box.appendChild(nudge);
    return [box];
  }

  function fnRm(args, rest) {
    var target = String(args[0] || "").trim();
    var box = el("div", "out");
    if (!target) {
      box.className = "out out--err";
      box.appendChild(el("p", "out-p", "rm: missing operand"));
      box.appendChild(el("p", "out-p dim", "Try 'rm --help' for more information."));
      return [box];
    }
    var force = /(^|\s)(-rf|-fr|--recursive)(\s|$)/.test(rest);
    var root = /(^|\s)\/(\s|$)/.test(rest);
    if (force && root) {
      box.appendChild(el("p", "out-p", "rm: it is not possible to remove '/'"));
      box.appendChild(el("p", "out-p dim", "nice try. this is a static portfolio: read-only filesystem, no containers, one very alert cat."));
      box.appendChild(el("p", "out-p dim", "nothing here needs deleting. start with clear, or contact if you want a real target."));
      return [box];
    }
    box.appendChild(el("p", "out-p", "rm: cannot remove '" + target + "': Permission denied"));
    box.appendChild(el("p", "out-p dim", "the filesystem is read-only. try ls — it is friendlier."));
    return [box];
  }

  function fnScan() {
    var box = el("div", "out");
    box.appendChild(el("p", "out-p", "SIMULATED nmap report for pizca.me — no packets were sent."));
    box.appendChild(el("pre", "out__pre", SCAN_TEXT));
    var note = el("p", "out-p dim");
    note.appendChild(doc.createTextNode("the report is fiction. pizca.me is a static site; the only port worth opening is "));
    note.appendChild(cmdLink("contact", "contact"));
    note.appendChild(doc.createTextNode("."));
    box.appendChild(note);
    return [box];
  }

  function fnDrone() {
    var box = el("div", "out");
    var art = el("pre", "out__pre", DRONE_ART);
    art.setAttribute("aria-hidden", "true");
    box.appendChild(art);
    box.appendChild(kvBlock([
      ["status", "airborne (simulated)"],
      ["frame", "5 inch · carbon · questionable solder"],
      ["payload", "curiosity"],
      ["next", "RF capture, firmware diff, one confused flight controller"]
    ]));
    var note = el("p", "out-p dim");
    note.appendChild(doc.createTextNode("no drones were harmed. if you have one worth opening: "));
    note.appendChild(cmdLink("contact", "contact"));
    note.appendChild(doc.createTextNode("."));
    box.appendChild(note);
    return [box];
  }

  function btopBar(tone) {
    var bar = el("span", "btop__bar btop__bar--" + tone);
    var fill = el("span", "btop__fill");
    bar.appendChild(fill);
    return { bar: bar, fill: fill };
  }

  function btopPanel(title) {
    var panel = el("section", "btop__panel");
    panel.appendChild(el("h3", "btop__title", title));
    return panel;
  }

  function btopMetric(label, tone) {
    var row = el("div", "btop__row");
    if (label) row.appendChild(el("span", "btop__metric-name", label));
    var bar = btopBar(tone);
    var num = el("span", "btop__num", "0%");
    row.appendChild(bar.bar);
    row.appendChild(num);
    return { row: row, fill: bar.fill, num: num };
  }

  function fnBtop() {
    stopBtop();
    var box = el("div", "out btop");
    var head = el("div", "btop__head");
    head.appendChild(el("span", "btop__brand", "btop"));
    var metaNode = el("span", "btop__meta", "");
    head.appendChild(metaNode);
    box.appendChild(head);

    var cores = Math.max(2, Math.min(16, navigator.hardwareConcurrency || 8));
    var ticks = 0;

    function uptime() {
      var s = Math.floor((Date.now() - startedAt) / 1000);
      return pad2(Math.floor(s / 3600)) + ":" + pad2(Math.floor(s / 60) % 60) + ":" + pad2(s % 60);
    }
    function loadText() {
      var a = (0.18 + Math.random() * 0.55).toFixed(2);
      var b = (0.12 + Math.random() * 0.4).toFixed(2);
      var c = (0.08 + Math.random() * 0.3).toFixed(2);
      return a + " " + b + " " + c;
    }

    var grid = el("div", "btop__grid");

    var cpuPanel = btopPanel("cpu");
    var cpu = btopMetric("", "cpu");
    cpuPanel.appendChild(cpu.row);
    var coresWrap = el("div", "btop__cores");
    var coreNodes = [];
    for (var i = 0; i < cores; i++) {
      var core = el("span", "btop__core");
      core.style.setProperty("--v", "0.3");
      coresWrap.appendChild(core);
      coreNodes.push(core);
    }
    cpuPanel.appendChild(coresWrap);
    grid.appendChild(cpuPanel);

    var memPanel = btopPanel("mem");
    var mem = btopMetric("", "mem");
    memPanel.appendChild(mem.row);
    memPanel.appendChild(el("p", "btop__sub", uiText("btopSwap")));
    grid.appendChild(memPanel);

    var netPanel = btopPanel("net");
    var netLine = el("div", "btop__netline");
    function netStat(arrow) {
      var wrap = el("span", "btop__netstat");
      wrap.appendChild(el("b", "", arrow));
      var value = doc.createTextNode("0.0 MB/s");
      wrap.appendChild(value);
      return { node: wrap, value: value };
    }
    var down = netStat("▼ ");
    var up = netStat("▲ ");
    netLine.appendChild(down.node);
    netLine.appendChild(up.node);
    netPanel.appendChild(netLine);
    netPanel.appendChild(el("span", "btop__spark", "▁▂▃▄▅▆▇▆▅▄▃▂▁"));
    grid.appendChild(netPanel);

    var diskPanel = btopPanel("disk");
    var diskRoot = btopMetric("/", "disk");
    var diskHome = btopMetric("/home", "disk");
    diskPanel.appendChild(diskRoot.row);
    diskPanel.appendChild(diskHome.row);
    grid.appendChild(diskPanel);

    box.appendChild(grid);

    var proc = el("section", "btop__proc");
    var procHead = el("div", "btop__proc-head");
    ["pid", "user", "cpu%", "mem%", "command"].forEach(function (label) {
      procHead.appendChild(el("span", "", label));
    });
    proc.appendChild(procHead);
    var processes = [
      [1221, "soler", "3.2", "1.1", "ghostty"],
      [1302, "soler", "12.4", "2.8", "content.js"],
      [1417, "soler", "0.7", "0.8", "sshd"],
      [1511, "soler", "8.1", "4.2", "ghidra"],
      [1602, "soler", "2.3", "1.7", "wireshark"],
      [1719, "soler", "0.4", "0.3", "btop"]
    ];
    processes.forEach(function (p) {
      var row = el("div", "btop__proc-row");
      row.appendChild(el("span", "pid", String(p[0])));
      row.appendChild(el("span", "user", p[1]));
      row.appendChild(el("span", parseFloat(p[2]) >= 10 ? "hot" : "", p[2]));
      row.appendChild(el("span", "", p[3]));
      row.appendChild(el("span", "cmd", p[4]));
      proc.appendChild(row);
    });
    box.appendChild(proc);

    var foot = el("div", "btop__foot", "");
    box.appendChild(foot);

    function tick() {
      ticks++;
      var cpuPct = 17 + Math.random() * 23;
      cpu.fill.style.width = cpuPct.toFixed(1) + "%";
      cpu.num.textContent = Math.round(cpuPct) + "%";
      coreNodes.forEach(function (node) {
        node.style.setProperty("--v", (0.14 + Math.random() * 0.68).toFixed(2));
      });

      var memPct = 34 + Math.random() * 18;
      mem.fill.style.width = memPct.toFixed(1) + "%";
      mem.num.textContent = Math.round(memPct) + "%";

      var downRate = 0.35 + Math.random() * 2.4;
      var upRate = 40 + Math.random() * 420;
      down.value.nodeValue = downRate.toFixed(1) + " MB/s";
      up.value.nodeValue = Math.round(upRate) + " KB/s";

      diskRoot.fill.style.width = "42%";
      diskRoot.num.textContent = "42%";
      diskHome.fill.style.width = "61%";
      diskHome.num.textContent = "61%";

      metaNode.textContent = uiText("btopMeta", { uptime: uptime(), cores: cores, load: loadText() });

      if (ticks >= 10) {
        stopBtop();
        foot.textContent = uiText("btopSnapshot", { uptime: uptime() });
      }
    }

    tick();
    if (!motionOff()) {
      activeBtop = { timer: window.setInterval(tick, 850) };
    } else {
      foot.textContent = uiText("btopStatic");
    }
    return [box];
  }

  function fnGlitch() {
    var box = el("div", "out");
    box.appendChild(el("p", "out-p", "signal degradation: within tolerance."));
    box.appendChild(el("p", "out-p dim", "soft glitch is ambient now — no lines, no rain, just the screen losing a little grip."));
    if (!motionOff()) {
      doc.documentElement.classList.add("glitch-pulse");
      window.setTimeout(function () {
        doc.documentElement.classList.remove("glitch-pulse");
      }, GLITCH_MS);
    }
    return [box];
  }

  /* --------------------------------------------------------- tab / history */
  function setInputValue(value) {
    if (!dom.input) return;
    dom.input.value = value;
    mirrorInput();
    try {
      var end = value.length;
      dom.input.setSelectionRange(end, end);
    } catch (e) { /* ignore */ }
  }

  function mirrorInput() {
    if (dom.typed) dom.typed.textContent = dom.input ? dom.input.value : "";
    if (dom.cursor) dom.cursor.setAttribute("data-empty", dom.input && dom.input.value ? "false" : "true");
  }

  function cancelLine() {
    if (booting) finishBoot(true);
    setInputValue("");
    histIndex = history.length;
    var fragment = doc.createDocumentFragment();
    fragment.appendChild(buildEcho("^C"));
    dom.output.appendChild(fragment);
    if (!pinnedUp) scrollToBottom();
    focusInput(false);
  }

  function historyPrev() {
    if (!history.length) return;
    if (histIndex > 0) histIndex--;
    setInputValue(history[histIndex] || "");
  }

  function historyNext() {
    if (!history.length) return;
    if (histIndex < history.length) histIndex++;
    setInputValue(histIndex >= history.length ? "" : history[histIndex]);
  }

  function commonPrefix(list) {
    if (!list.length) return "";
    var prefix = String(list[0]);
    for (var i = 1; i < list.length; i++) {
      var value = String(list[i]);
      var j = 0;
      while (j < prefix.length && j < value.length && prefix.charAt(j).toLowerCase() === value.charAt(j).toLowerCase()) j++;
      prefix = prefix.slice(0, j);
      if (!prefix) break;
    }
    return prefix;
  }

  function showCompletions(list) {
    var box = el("div", "out");
    box.appendChild(el("pre", "out__pre dim", list.join("  ")));
    var fragment = doc.createDocumentFragment();
    fragment.appendChild(box);
    dom.output.appendChild(fragment);
    if (!pinnedUp) scrollToBottom();
  }

  function tabComplete() {
    var raw = dom.input.value;
    var trailingSpace = /\s$/.test(raw);
    var parts = raw.split(/\s+/);
    if (parts.length && parts[0] === "") parts.shift();

    if (parts.length <= 1 && !trailingSpace) {
      var token = raw.replace(/^\s+/, "");
      var low = token.toLowerCase();
      var matches = ALL_COMMANDS.filter(function (name) {
        return name.toLowerCase().indexOf(low) === 0;
      });
      matches.sort();
      if (matches.length === 1) {
        setInputValue(matches[0] + " ");
        return;
      }
      if (matches.length > 1) {
        var prefix = commonPrefix(matches);
        if (prefix.length > token.length) setInputValue(prefix);
        showCompletions(matches);
      }
      return;
    }

    var head = (parts[0] || "").toLowerCase();
    var lastToken = trailingSpace ? "" : parts[parts.length - 1] || "";
    var base = trailingSpace ? raw : raw.slice(0, raw.length - lastToken.length);
    var pool = null;
    if (head === "open") {
      pool = projectList().map(function (project) { return project.id; });
    } else if (head === "cat") {
      pool = fileList().map(function (file) { return file.name; });
    } else if (head === "theme") {
      pool = THEMES.slice();
    } else if (head === "crt") {
      pool = ["on", "off"];
    } else if (head === "help" || head === "?") {
      pool = ALL_COMMANDS.filter(function (name) { return name.length > 1; });
    }
    if (!pool) return;
    var needle = lastToken.toLowerCase();
    var hits = pool.filter(function (value) {
      return String(value).toLowerCase().indexOf(needle) === 0;
    });
    if (hits.length === 1) {
      setInputValue(base + hits[0]);
      return;
    }
    if (hits.length > 1) {
      var shared = commonPrefix(hits);
      if (shared.length > lastToken.length) setInputValue(base + shared);
      showCompletions(hits);
    }
  }

  /* ---------------------------------------------------------------- events */
  function handleSubmit(event) {
    event.preventDefault();
    if (booting) finishBoot(true);
    var value = dom.input.value;
    setInputValue("");
    execute(value, {});
  }

  function handleInputKeydown(event) {
    var key = event.key;
    if (event.ctrlKey && !event.metaKey && !event.altKey) {
      if (key === "c" || key === "C") {
        event.preventDefault();
        cancelLine();
        return;
      }
      if (key === "l" || key === "L") {
        event.preventDefault();
        doClear();
        return;
      }
      if (key === "u" || key === "U") {
        event.preventDefault();
        setInputValue("");
        return;
      }
      return;
    }
    if (event.metaKey || event.altKey) return;
    if (key === "Tab") {
      event.preventDefault();
      tabComplete();
    } else if (key === "Escape") {
      event.preventDefault();
      setInputValue("");
    } else if (key === "ArrowUp") {
      event.preventDefault();
      historyPrev();
    } else if (key === "ArrowDown") {
      event.preventDefault();
      historyNext();
    }
  }

  function handleScreenClick(event) {
    if (booting) return;
    var target = event.target;
    if (!target || target.nodeType !== 1) return;
    if (closest(target, "a, button, input, textarea, select, label, [data-cmd]")) return;
    var selection = window.getSelection ? String(window.getSelection() || "") : "";
    if (selection) return;
    focusInput(true);
  }

  function handleDataCmdClick(event) {
    if (event.button && event.button > 0) return;
    var target = event.target;
    var host = closest(target && target.nodeType === 1 ? target : target && target.parentNode, "[data-cmd]");
    if (!host) return;
    var command = host.getAttribute("data-cmd");
    if (!command) return;
    event.preventDefault();
    if (booting) finishBoot(true);
    execute(command, { forceFocus: event.detail === 0 });
  }

  function handleDataCmdKey(event) {
    if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    var host = closest(event.target, "[data-cmd]");
    if (!host) return;
    if (host.tagName === "BUTTON") return;
    var command = host.getAttribute("data-cmd");
    if (!command) return;
    event.preventDefault();
    if (booting) finishBoot(true);
    execute(command, { forceFocus: true });
  }

  function handleBootSkip(event) {
    if (!booting) return;
    if (event.type === "keydown") {
      var key = event.key || "";
      var modifierOnly = key === "Shift" || key === "Control" || key === "Alt" || key === "Meta" || key === "CapsLock";
      if (modifierOnly) return;
      finishBoot(true);
      if (event.cancelable) event.preventDefault();
      event.stopPropagation();
      return;
    }
    finishBoot(false);
  }

  function handleThemeButton(event) {
    event.preventDefault();
    if (booting) finishBoot(true);
    execute("theme", { forceFocus: event.detail === 0 });
  }

  function handleCrtButton(event) {
    event.preventDefault();
    if (booting) finishBoot(true);
    execute("crt", { forceFocus: event.detail === 0 });
  }

  function handleLangButton(event) {
    event.preventDefault();
    changeLanguage(LANG === "es" ? "en" : "es");
  }

  function handleWheel(event) {
    if (event.deltaY < 0) pinnedUp = true;
  }

  function handleTouchMove() {
    pinnedUp = true;
  }

  function renderHints() {
    if (!dom.hints) return;
    clearNode(dom.hints);
    var hints = Array.isArray(SITE.hints) ? SITE.hints : [];
    var clean = [];
    for (var i = 0; i < hints.length && clean.length < 6; i++) {
      if (typeof hints[i] === "string" && hints[i].trim()) clean.push(hints[i].trim());
    }
    if (!clean.length) clean = ["help", "whoami", "focus", "projects", "contact"];
    for (var j = 0; j < clean.length; j++) {
      var chip = el("button", "chip", clean[j]);
      chip.type = "button";
      chip.setAttribute("data-cmd", clean[j]);
      chip.setAttribute("aria-label", "Run " + clean[j] + " command");
      dom.hints.appendChild(chip);
    }
  }

  function bindEvents() {
    on(dom.form, "submit", handleSubmit);
    on(dom.input, "keydown", handleInputKeydown);
    on(dom.input, "input", mirrorInput);
    on(dom.screen, "click", handleScreenClick);
    on(dom.screen, "scroll", handleScreenScroll, { passive: true });
    on(dom.screen, "wheel", handleWheel, { passive: true });
    on(dom.screen, "touchmove", handleTouchMove, { passive: true });
    on(dom.btnTheme, "click", handleThemeButton);
    on(dom.btnCrt, "click", handleCrtButton);
    on(dom.btnLang, "click", handleLangButton);
    on(doc, "click", handleDataCmdClick);
    on(doc, "keydown", handleDataCmdKey);
    on(doc, "keydown", handleBootSkip, true);
    on(doc, "pointerdown", handleBootSkip, true);
    mirrorInput();
  }

  /* ------------------------------------------------------------------ init */
  function applyStillFlag() {
    if (!STILL) return;
    doc.documentElement.classList.add("still");
    doc.documentElement.setAttribute("data-still", "1");
    try {
      var style = doc.createElement("style");
      style.setAttribute("data-still-style", "");
      style.textContent = "html.still *,html.still *::before,html.still *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}";
      (doc.head || doc.documentElement).appendChild(style);
    } catch (e) { /* the class is still there for the stylesheet */ }
  }

  function init() {
    if (!dom.terminal || !dom.screen || !dom.boot || !dom.output || !dom.form || !dom.input) return;

    applyStillFlag();
    applyLocaleChrome();
    initChromePreferences();
    renderHints();
    bindEvents();
    buildClockFormatter();
    updateClock();
    if (clockTimer) window.clearInterval(clockTimer);
    clockTimer = window.setInterval(updateClock, 20000);

    window.TERM = {
      version: "1.0.0",
      run: function (command) { execute(String(command === undefined || command === null ? "" : command), {}); },
      clear: doClear,
      getTheme: getTheme,
      getHistory: function () { return history.slice(); },
      still: STILL,
      lang: LANG,
      setLang: changeLanguage,
      site: SITE
    };

    startBoot();
  }

  function emergency(error) {
    try {
      var output = doc.getElementById("output");
      if (!output) return;
      var box = el("div", "out out--err");
      box.appendChild(el("p", "out-p", "fatal: the shell failed to start."));
      box.appendChild(el("p", "out-p dim", "refresh the page, or write to " + meta.email + " and tell me what broke."));
      if (error && error.message) box.appendChild(el("p", "out-p dim", String(error.message)));
      output.appendChild(box);
    } catch (e) { /* nothing else we can do */ }
  }

  /* ------------------------------------------------------- command registry */
  var registry = {
    whoami: contentCommand("whoami"),
    about: contentCommand("about"),
    now: contentCommand("now"),
    focus: contentCommand("focus"),
    skills: contentCommand("skills"),
    projects: fnProjects,
    open: fnOpen,
    journey: contentCommand("journey"),
    stack: contentCommand("stack"),
    contact: contentCommand("contact"),
    social: contentCommand("social"),
    help: fnHelp,
    "?": fnHelp,
    h: fnHelp,
    neofetch: fnNeofetch,
    ls: fnLs,
    cat: fnCat,
    theme: fnTheme,
    crt: fnCrt,
    banner: fnBanner,
    clear: function () { return []; },
    cls: function () { return []; },
    history: fnHistory,
    date: fnDate,
    pwd: fnPwd,
    uname: fnUname,
    echo: fnEcho,
    email: fnEmail,
    sudo: fnSudo,
    exit: fnExit,
    rm: fnRm,
    scan: fnScan,
    drone: fnDrone,
    btop: fnBtop,
    glitch: fnGlitch,
    lang: fnLang
  };

  var ALL_COMMANDS = Object.keys(registry);

  /* ------------------------------------------------------------------ boot */
  function start() {
    try {
      init();
    } catch (error) {
      emergency(error);
    }
  }

  if (doc.readyState === "loading") {
    on(doc, "DOMContentLoaded", start);
  } else {
    start();
  }
})();
