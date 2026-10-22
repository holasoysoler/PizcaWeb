/* ============================================================================
   pizca.sec — CONTENT (window.SITE)
   Pablo Soler — EASA drone operator · technical writer · CTI/OSINT.
   Schema: SPEC.md section 4. Copy facts come from LinkedIn, pizca-web and the
   public GitHub profile. No invented employers or certifications.
   ========================================================================== */
window.SITE = {
  meta: {
    handle: "soler",
    host: "archlinux",
    name: "Pablo Soler",
    role: "EASA drone pilot & operator · technical writer · CTI/OSINT",
    location: "La Puebla de Híjar, Teruel · Spain",
    locationShort: "Teruel, ES",
    timezone: "Europe/Madrid",
    email: "hola@pizca.me",
    phone: "+34 722 11 97 98",
    phoneHref: "+34722119798",
    instagram: "https://instagram.com/pizca.me",
    instagramHandle: "@pizca.me",
    github: "https://github.com/holasoysoler",
    githubHandle: "holasoysoler",
    linkedin: "https://www.linkedin.com/in/pablo-soler-540a4931/",
    linkedinHandle: "pablo-soler-540a4931",
    website: "https://www.pizca.me",
    availability: "Open to drone operations, technical writing, CTI/OSINT and security work",
    year: 2026
  },

  banner: {
    tagline: "EASA drone operations · CTI/OSINT · technical writing",
    sub: "I document systems, investigate signals, and fly drones — for inspection, survey and monitoring."
  },

  page: {
    title: "Pablo Soler — EASA drone operator, OSINT & technical writer",
    description: "Pablo Soler — EASA drone pilot and operator (A1/A2/A3, STS-01/02), technical writer and CTI/OSINT researcher in rural Aragón. Drone inspection, photogrammetry, SIGINT and Industry 4.0 security."
  },

  boot: [
    { text: "[ 0.000] pizcacos 1.0.0 — boots /dev/curiosity", tone: "dim" },
    { text: "[ 0.021] probing hardware ................. OK", tone: "ok" },
    { text: "[ 0.049] mounting /dev/identity ........... OK", tone: "ok" },
    { text: "[ 0.102] loading rtl_sdr.ko ............... OK", tone: "ok" },
    { text: "[ 0.146] loading uas_ops.ko ............... OK", tone: "ok" },
    { text: "[ 0.202] no proprietary blobs ........... WARN", tone: "warn" },
    { text: "[ 0.231] /dev/gastronomy read-only", tone: "dim" },
    { text: "[ 0.266] starting shell on tty1 ........... OK", tone: "ok" },
    { text: "[ 0.278] soler@archlinux: ~/pizca.sec", tone: "accent" }
  ],

  hints: ["help", "whoami", "focus", "projects", "contact"],

  help: [
    { group: "identity", items: [
      ["whoami", "the 10-second version"],
      ["about", "kitchens, SRE, radio, drones"],
      ["now", "flying, writing, building"],
      ["journey", "the long way here"]
    ]},
    { group: "work", items: [
      ["focus", "the four things I do"],
      ["skills", "self-assessed tools and bars"],
      ["projects", "operations, lab and bench"],
      ["open <id>", "detail for one project"],
      ["stack", "daily drivers"]
    ]},
    { group: "contact", items: [
      ["contact", "email, phone, LinkedIn, location"],
      ["social", "LinkedIn, GitHub, Instagram"],
      ["email", "open your mail client"]
    ]},
    { group: "shell", items: [
      ["help", "this list (also ? and h)"],
      ["lang", "english / español"],
      ["neofetch", "system and identity"],
      ["ls", "list files (ls -la for detail)"],
      ["cat <file>", "print a file"],
      ["banner", "redraw the ASCII header"],
      ["btop", "system monitor, the fun kind"],
      ["clear", "wipe the output (also cls)"],
      ["history", "recent commands"],
      ["pwd", "where am I"],
      ["uname -a", "system information"],
      ["echo <text>", "say it back"],
      ["theme", "nordic / amber / ice"],
      ["crt", "bloom / glitch on or off"]
    ]},
    { group: "fun", items: [
      ["scan", "simulated nmap against pizca.me"],
      ["drone", "a small flying machine"],
      ["glitch", "soft signal degradation"],
      ["sudo", "do not"],
      ["rm -rf /", "definitely do not"],
      ["exit", "leave quietly"]
    ]}
  ],

  outputs: {
    whoami:
      "<p class='out-h'>Pablo Soler</p>" +
      "<p class='out-p dim'>EASA drone pilot &amp; operator · technical writer · CTI/OSINT</p>" +
      "<div class='kv'>" +
        "<span class='kv__k'>certs</span><span class='kv__v'>EASA A1/A2/A3 · STS-01 · STS-02</span>" +
        "<span class='kv__k'>focus</span><span class='kv__v'>RPAS operations · OSINT/SIGINT · technical writing</span>" +
        "<span class='kv__k'>based</span><span class='kv__v'>La Puebla de Híjar, Teruel · ES/EN</span>" +
        "<span class='kv__k'>status</span><span class='kv__v'>open to drone operations, technical writing, " +
          "CTI/OSINT and security work · <button type='button' class='cmd-link' data-cmd='contact'>contact</button></span>" +
      "</div>",

    about:
      "<p class='out-p'>Fifteen years in professional kitchens — DiverXO, Coya, El Willy, Manfreds &amp; " +
      "Relae — taught me to work under pressure, document procedures, and make complex systems work " +
      "with whatever is on hand.</p>" +
      "<p class='out-p'>Then three years as an SRE at dftek and Codeoscopic: infrastructure reliability, " +
      "monitoring, incident response, runbooks. Since 2020 I have also run independent technical " +
      "research — LoRaWAN instrumentation, RTL-SDR, radiosondes, satellite imagery and OSINT/SIGINT.</p>" +
      "<p class='out-p'>Today: EASA-licensed UAS operations, technical writing, CTI/OSINT, and a repair " +
      "bench for agricultural drones and industrial electronics. Understand the system, write it down, " +
      "test where it gives.</p>" +
      "<div class='box'><p class='box__title'>method</p>" +
      "<p class='out-p'>understand it. document it. break it. make it hold. then repair it.</p></div>" +
      "<p class='out-p dim'>Remote from rural Aragón. Oko, the dog, approves.</p>",

    now:
      "<p class='out-h'>now <span class='dim'>// autumn 2026</span></p>" +
      "<div class='kv'>" +
        "<span class='kv__k'>flying</span><span class='kv__v'>EASA UAS operations — inspection, " +
          "infrastructure monitoring, photogrammetry, precision survey</span>" +
        "<span class='kv__k'>building</span><span class='kv__v'>an open-source rural monitoring station: " +
          "LoRaWAN + RTL-SDR + satellite imagery</span>" +
        "<span class='kv__k'>writing</span><span class='kv__v'>hardware documentation and infrastructure " +
          "runbooks; targeting HardwareX for open instrumentation</span>" +
        "<span class='kv__k'>investigating</span><span class='kv__v'>OSINT/SIGINT — RS41 radiosonde, " +
          "Meteor-M2 LRPT, ADS-B/AIS, satellite imagery</span>" +
        "<span class='kv__k'>studying</span><span class='kv__v'>HAREC amateur radio licence</span>" +
        "<span class='kv__k'>open to</span><span class='kv__v'>drone operations · technical writing · " +
          "CTI/OSINT · security work</span>" +
        "<span class='kv__k'>based</span><span class='kv__v'>Teruel, Spain · remote-friendly</span>" +
      "</div>" +
      "<p class='out-p dim'>more: <button type='button' class='cmd-link' data-cmd='projects'>projects</button> " +
      "<span class='dim'>·</span> <button type='button' class='cmd-link' data-cmd='contact'>contact</button></p>",

    focus:
      "<div class='focus'>" +
        "<div class='focus__item'>" +
          "<p class='out-h'><span class='accent'>01</span> RPAS operations</p>" +
          "<p class='out-p'>Licensed drone work under EASA rules: Open Category A1/A2/A3 and Specific " +
          "Category STS-01/STS-02, VLOS and BVLOS with airspace observers. Inspection, infrastructure " +
          "monitoring, photogrammetry and precision survey across Spain.</p>" +
          "<p class='note'>A1/A2/A3 · STS-01 · STS-02 · VLOS/BVLOS · photogrammetry · survey</p>" +
        "</div>" +
        "<div class='focus__item'>" +
          "<p class='out-h'><span class='accent'>02</span> CTI / OSINT / SIGINT</p>" +
          "<p class='out-p'>Open-source investigation and signal analysis: RTL-SDR reception, Vaisala " +
          "RS41 radiosonde decoding at 403 MHz, Meteor-M2 LRPT imagery at 137 MHz, ADS-B and AIS " +
          "tracking, geolocation and satellite imagery analysis.</p>" +
          "<p class='note'>RTL-SDR · RS41 · Meteor-M2 · ADS-B/AIS · satellite imagery · geolocation</p>" +
        "</div>" +
        "<div class='focus__item'>" +
          "<p class='out-h'><span class='accent'>03</span> technical writing</p>" +
          "<p class='out-p'>Hardware documentation, infrastructure runbooks, postmortems, architecture " +
          "diagrams and procedures. Bilingual ES/EN, written for the person who has to operate the " +
          "thing at 3 a.m.</p>" +
          "<p class='note'>hardware docs · runbooks · postmortems · diagrams · HardwareX target</p>" +
        "</div>" +
        "<div class='focus__item'>" +
          "<p class='out-h'><span class='accent'>04</span> systems, security &amp; repair</p>" +
          "<p class='out-p'>ESP32/LoRaWAN instrumentation, self-hosted data stacks and Linux systems. " +
          "On the security side: drone reverse engineering, OT/Industry 4.0 and offensive security " +
          "practice, with a repair bench underneath it all.</p>" +
          "<p class='note'>ESP32 · LoRaWAN · Linux · drone RE · Modbus/OT · offensive security</p>" +
        "</div>" +
      "</div>" +
      "<p class='out-p dim'>operations, research and bench work. <button type='button' " +
      "class='cmd-link' data-cmd='projects'>projects</button> has the receipts.</p>",

    skills:
      "<div class='skills'>" +
        "<div class='skill-group'>" +
          "<p class='out-h'>drone operations</p>" +
          "<div class='skill'><span class='skill__name'>EASA A1/A2/A3</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>STS-01</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>STS-02</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
          "<div class='skill'><span class='skill__name'>VLOS / BVLOS</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>photogrammetry</span>" +
            "<span class='skill__bar'>██████░░░░</span><span class='skill__pct'>60%</span></div>" +
        "</div>" +
        "<div class='skill-group'>" +
          "<p class='out-h'>SIGINT / OSINT</p>" +
          "<div class='skill'><span class='skill__name'>RTL-SDR</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>RS41 radiosonde</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
          "<div class='skill'><span class='skill__name'>Meteor-M2 LRPT</span>" +
            "<span class='skill__bar'>██████░░░░</span><span class='skill__pct'>60%</span></div>" +
          "<div class='skill'><span class='skill__name'>ADS-B / AIS</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
          "<div class='skill'><span class='skill__name'>satellite imagery</span>" +
            "<span class='skill__bar'>██████░░░░</span><span class='skill__pct'>60%</span></div>" +
          "<div class='skill'><span class='skill__name'>geolocation</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
        "</div>" +
        "<div class='skill-group'>" +
          "<p class='out-h'>technical writing</p>" +
          "<div class='skill'><span class='skill__name'>hardware docs</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>runbooks</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>diagrams</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
          "<div class='skill'><span class='skill__name'>ES/EN writing</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
        "</div>" +
        "<div class='skill-group'>" +
          "<p class='out-h'>systems / instrumentation</p>" +
          "<div class='skill'><span class='skill__name'>Linux</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>ESP32 / LoRaWAN</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
          "<div class='skill'><span class='skill__name'>ChirpStack</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
          "<div class='skill'><span class='skill__name'>Docker / K8s</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
          "<div class='skill'><span class='skill__name'>AWS</span>" +
            "<span class='skill__bar'>██████░░░░</span><span class='skill__pct'>60%</span></div>" +
          "<div class='skill'><span class='skill__name'>Python / C++</span>" +
            "<span class='skill__bar'>██████░░░░</span><span class='skill__pct'>60%</span></div>" +
          "<div class='skill'><span class='skill__name'>KiCad / FreeCAD</span>" +
            "<span class='skill__bar'>█████░░░░░</span><span class='skill__pct'>50%</span></div>" +
        "</div>" +
        "<div class='skill-group'>" +
          "<p class='out-h'>security / reverse engineering</p>" +
          "<div class='skill'><span class='skill__name'>offsec</span>" +
            "<span class='skill__bar'>████░░░░░░</span><span class='skill__pct'>40%</span></div>" +
          "<div class='skill'><span class='skill__name'>drone RE</span>" +
            "<span class='skill__bar'>█████░░░░░</span><span class='skill__pct'>50%</span></div>" +
          "<div class='skill'><span class='skill__name'>UART / JTAG</span>" +
            "<span class='skill__bar'>█████░░░░░</span><span class='skill__pct'>50%</span></div>" +
          "<div class='skill'><span class='skill__name'>Modbus / OT</span>" +
            "<span class='skill__bar'>█████░░░░░</span><span class='skill__pct'>50%</span></div>" +
          "<div class='skill'><span class='skill__name'>Ghidra / radare2</span>" +
            "<span class='skill__bar'>█████░░░░░</span><span class='skill__pct'>50%</span></div>" +
        "</div>" +
      "</div>" +
      "<p class='note'>self-assessed; the bench, the airfield and the write-ups are the real CV.</p>",

    journey:
      "<div class='timeline'>" +
        "<div class='tl'><span class='tl__when'>2006–2015</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>Professional kitchens: Kursaal, DiverXO, Coya London, El Willy " +
          "Shanghai. Precision, pressure, procedures.</span></div>" +
        "<div class='tl'><span class='tl__when'>2015–2020</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>Copenhagen and Zaragoza: sous chef at Manfreds &amp; Relae; " +
          "co-owner of Bar Pollería San Pablo. P&amp;L, teams, suppliers, zero waste.</span></div>" +
        "<div class='tl'><span class='tl__when'>2020–2023</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>SRE at dftek and Codeoscopic: infrastructure reliability, " +
          "monitoring, incident response, postmortems and runbooks.</span></div>" +
        "<div class='tl'><span class='tl__when'>2020–now</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>Independent technical research: LoRaWAN instrumentation, RTL-SDR, " +
          "radiosondes, satellite imagery and OSINT/SIGINT.</span></div>" +
        "<div class='tl'><span class='tl__when'>2023</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>Pizca, a gastronomy innovation consultancy in La Puebla de Híjar. " +
          "Tradición e innovación gastronómica: consulting, outreach, production, ideation.</span></div>" +
        "<div class='tl'><span class='tl__when'>2024–2025</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>Rural Tech repair bench: agricultural drones, PCB-level repair, " +
          "CAN/ISOBUS, LoRa. Right to repair, no planned obsolescence.</span></div>" +
        "<div class='tl'><span class='tl__when'>2025–2026</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>EASA UAS certifications, drone operations, technical writing, " +
          "CTI/OSINT and security practice.</span></div>" +
        "<div class='tl'><span class='tl__when'>now</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>pizca.sec is live. Open to drone operations, technical writing, " +
          "CTI/OSINT and security work.</span></div>" +
      "</div>",

    contact:
      "<p class='out-h'>let's talk</p>" +
      "<p class='out-p'>Drone inspection, photogrammetry or survey? Hardware documentation, runbooks, " +
      "or an OSINT/CTI investigation? A farm or factory network that needs another pair of eyes? " +
      "Email is fastest.</p>" +
      "<div class='contact'><div class='kv'>" +
        "<span class='kv__k'>email</span><span class='kv__v'>" +
          "<a class='link' href='mailto:hola@pizca.me'>hola@pizca.me</a></span>" +
        "<span class='kv__k'>phone</span><span class='kv__v'>" +
          "<a class='link' href='tel:+34722119798'>+34 722 11 97 98</a></span>" +
        "<span class='kv__k'>linkedin</span><span class='kv__v'>" +
          "<a class='link' href='https://www.linkedin.com/in/pablo-soler-540a4931/' rel='me noopener' " +
          "target='_blank'>linkedin.com/in/pablo-soler</a></span>" +
        "<span class='kv__k'>github</span><span class='kv__v'>" +
          "<a class='link' href='https://github.com/holasoysoler' rel='me noopener'>" +
          "github.com/holasoysoler</a></span>" +
        "<span class='kv__k'>location</span><span class='kv__v'>La Puebla de Híjar, Teruel, Spain " +
          "· remote-friendly</span>" +
        "<span class='kv__k'>certs</span><span class='kv__v'>EASA A1/A2/A3 · STS-01 · STS-02 · " +
          "HAREC in progress</span>" +
        "<span class='kv__k'>languages</span><span class='kv__v'>Spanish (native) · English " +
          "(bilingual) · Italian (professional) · Chinese (basic)</span>" +
        "<span class='kv__k'>availability</span><span class='kv__v'>open to drone operations, " +
          "technical writing, CTI/OSINT and security work</span>" +
        "<span class='kv__k'>instagram</span><span class='kv__v'>" +
          "<a class='link' href='https://instagram.com/pizca.me' rel='me noopener'>@pizca.me</a></span>" +
      "</div></div>" +
      "<p class='out-p dim'><button type='button' class='cmd-link' data-cmd='email'>email me</button> " +
      "// or copy the address above; no forms, no calendars.</p>",

    social:
      "<p class='out-h'>elsewhere</p>" +
      "<div class='kv'>" +
        "<span class='kv__k'>linkedin</span><span class='kv__v'>" +
          "<a class='link' href='https://www.linkedin.com/in/pablo-soler-540a4931/' rel='me noopener' " +
          "target='_blank'>pablo-soler</a> <span class='dim'>· full professional history</span></span>" +
        "<span class='kv__k'>github</span><span class='kv__v'>" +
          "<a class='link' href='https://github.com/holasoysoler' rel='me noopener'>" +
          "github.com/holasoysoler</a> <span class='dim'>· infra era + DJI survey fork</span></span>" +
        "<span class='kv__k'>instagram</span><span class='kv__v'>" +
          "<a class='link' href='https://instagram.com/pizca.me' rel='me noopener'>@pizca.me</a> " +
          "<span class='dim'>· the occasional work-in-progress</span></span>" +
        "<span class='kv__k'>email</span><span class='kv__v'>" +
          "<a class='link' href='mailto:hola@pizca.me'>hola@pizca.me</a></span>" +
        "<span class='kv__k'>website</span><span class='kv__v'>" +
          "<a class='link' href='https://www.pizca.me'>pizca.me</a></span>" +
      "</div>" +
      "<p class='note'>the full professional history is on LinkedIn; repos are mostly infra-era " +
      "experiments plus a DJI survey tool. field notes and write-ups come next.</p>",

    stack:
      "<p class='out-h'>daily drivers</p>" +
      "<div class='kv'>" +
        "<span class='kv__k'>systems</span><span class='kv__v'>Arch Linux (daily since age 12), " +
          "ghostty, tmux, neovim, zsh, git</span>" +
        "<span class='kv__k'>infra</span><span class='kv__v'>terraform, aws (ec2/rds/s3), kubernetes, " +
          "docker, prometheus/grafana, opentelemetry</span>" +
        "<span class='kv__k'>UAS</span><span class='kv__v'>EASA operations, dji, qgroundcontrol, " +
          "photogrammetry, airspace/notams</span>" +
        "<span class='kv__k'>SIGINT</span><span class='kv__v'>rtl-sdr, dump1090, radiosonde_auto_rx, " +
          "meteor-m2 lrpt, ads-b/ais, satellite imagery</span>" +
        "<span class='kv__k'>instrumentation</span><span class='kv__v'>esp32-s3/heltec v3, lorawan, " +
          "chirpstack, influxdb, grafana, node-red, sht31/bmp280/pt1000/ads1115, solar, 3d printing</span>" +
        "<span class='kv__k'>bench</span><span class='kv__v'>hot air, microscope, soldering, " +
          "flashrom, openocd, can-utils, kicad, freecad</span>" +
        "<span class='kv__k'>RE</span><span class='kv__v'>ghidra, radare2, binwalk, gdb, logic " +
          "analyzer</span>" +
        "<span class='kv__k'>writing</span><span class='kv__v'>markdown, runbooks, postmortems, " +
          "architecture diagrams, hardwarex</span>" +
        "<span class='kv__k'>dev</span><span class='kv__v'>python, c++/arduino, bash, platformio, " +
          "sqlite, html/css/js</span>" +
        "<span class='kv__k'>identity</span><span class='kv__v'>active directory, microsoft identity " +
          "manager</span>" +
      "</div>" +
      "<p class='note'>nothing exotic. the tools are cheap; the notes are the asset.</p>"
  },

  projects: [
    {
      id: "uas-ops",
      name: "UAS / OPS",
      status: "available",
      tone: "ok",
      summary: "EASA-licensed drone operations: inspection, monitoring, photogrammetry and survey.",
      tags: ["EASA", "A1/A2/A3", "STS-01", "STS-02", "VLOS/BVLOS"],
      html:
        "<p class='out-p'>Licensed UAS operations under EASA rules: Open Category A1/A2/A3 and " +
        "Specific Category STS-01/STS-02. VLOS, and BVLOS with airspace observers.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>services</span><span class='kv__v'>aerial inspection · infrastructure " +
          "monitoring · photogrammetry · precision survey</span>" +
          "<span class='kv__k'>where</span><span class='kv__v'>Spain · rural Aragón base · travel for " +
          "the right job</span>" +
          "<span class='kv__k'>status</span><span class='kv__v'>available · operations and insurance " +
          "in order</span>" +
        "</div>" +
        "<p class='out-p dim'>Commercial operations only. Tell me the site and the deliverable.</p>"
    },
    {
      id: "rural-monitor",
      name: "RURAL / MONITOR",
      status: "building",
      tone: "warn",
      summary: "Open-source rural environmental monitoring: LoRaWAN + RTL-SDR + satellite imagery.",
      tags: ["LoRaWAN", "ESP32", "RTL-SDR", "satellite"],
      html:
        "<p class='out-p'>An open-source rural environmental monitoring station: LoRaWAN nodes, " +
        "RTL-SDR reception and satellite imagery fused into one data stack.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>nodes</span><span class='kv__v'>ESP32-S3 / Heltec V3 · SHT31 · BMP280 " +
          "· Pt1000 · ADS1115 · solar · 3D-printed Stevenson screen</span>" +
          "<span class='kv__k'>radio</span><span class='kv__v'>RS41 403 MHz · Meteor-M2 137 MHz LRPT " +
          "· ADS-B · AIS</span>" +
          "<span class='kv__k'>stack</span><span class='kv__v'>ChirpStack · InfluxDB · Grafana · " +
          "Node-RED · homelab server</span>" +
          "<span class='kv__k'>status</span><span class='kv__v'>building · open source · write-up " +
          "targeting HardwareX</span>" +
        "</div>" +
        "<p class='out-p dim'>field instrumentation, not a client product.</p>"
    },
    {
      id: "drone-re",
      name: "DRONE / RE",
      status: "in progress",
      tone: "warn",
      summary: "An agricultural quadcopter, opened: firmware, UART, RF and a fair amount of solder.",
      tags: ["firmware", "UART", "RF", "ghidra"],
      html:
        "<p class='out-p'>A personal lab unit: an agricultural quadcopter bought second-hand for " +
        "the bench. Not a client device and not a red-team engagement. I want to know what it " +
        "trusts before it flies over a field.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>goal</span><span class='kv__v'>map the boot chain, firmware, radio " +
          "link and sensor bus, end to end</span>" +
          "<span class='kv__k'>doing</span><span class='kv__v'>SPI flash dump in hand, UART pads " +
          "located, RF captures being decoded</span>" +
          "<span class='kv__k'>tools</span><span class='kv__v'>flashrom · UART · JTAG · SPI · " +
          "HackRF · Ghidra · radare2</span>" +
          "<span class='kv__k'>status</span><span class='kv__v'>in progress · protocol map in " +
          "pieces · write-up pending</span>" +
        "</div>" +
        "<p class='out-p dim'>no vendor name and no findings until the write-up is honest.</p>"
    },
    {
      id: "ics-lab",
      name: "ICS / LAB",
      status: "building",
      tone: "warn",
      summary: "A home AgTech / OT range: PLC, HMI, Modbus/TCP, CAN/ISOBUS nodes and LoRa sensors.",
      tags: ["modbus", "CAN/ISOBUS", "PLC", "LoRa", "IEC 62443"],
      html:
        "<p class='out-p'>A small AgTech / OT range on a desk: a used PLC, a cheap HMI, " +
        "CAN/ISOBUS nodes, LoRa sensors and a managed switch. Farm machinery and factory " +
        "protocols, in one room.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>goal</span><span class='kv__v'>learn what breaks when IT habits meet " +
          "farm and factory protocols, then fix it</span>" +
          "<span class='kv__k'>doing</span><span class='kv__v'>traffic captures, PLC logic, " +
          "simulated attacks, segmentation rules, LoRa range tests</span>" +
          "<span class='kv__k'>reading</span><span class='kv__v'>Purdue model · IEC 62443 · every " +
          "PLC and ISOBUS manual I can find</span>" +
          "<span class='kv__k'>status</span><span class='kv__v'>building · hardware on the desk, " +
          "range half wired</span>" +
        "</div>" +
        "<p class='out-p dim'>simulations only, on my own hardware. the point is to find the weak " +
        "seam before a farm does.</p>"
    },
    {
      id: "rural-tech",
      name: "RURAL TECH",
      status: "running",
      tone: "ok",
      summary: "The repair bench: agricultural drones, PCB-level faults and CAN/ISOBUS diagnostics.",
      tags: ["PCB", "drones", "CAN/ISOBUS", "LoRa", "right-to-repair"],
      html:
        "<p class='out-p'>The bench where the hands-on hours come from: agricultural and " +
        "industrial machinery, repaired at component level instead of swapped out at board " +
        "level.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>what</span><span class='kv__v'>PCB-level repair · agricultural " +
          "drones (maintenance and sensors) · CAN/ISOBUS diagnostics · IoT and LoRa " +
          "automation</span>" +
          "<span class='kv__k'>stance</span><span class='kv__v'>component first · right to repair " +
          "· no planned obsolescence</span>" +
          "<span class='kv__k'>status</span><span class='kv__v'>running · bench work, not a client " +
          "portfolio piece</span>" +
        "</div>" +
        "<p class='out-p dim'>where the official service says 'replace the whole board', the bench " +
        "replaces the failed component. that sentence is the whole philosophy.</p>"
    },
    {
      id: "pizca-me",
      name: "PIZCA.ME",
      status: "live",
      tone: "ok",
      summary: "This site: hand-written HTML, CSS and JS. No framework, no trackers, keyboard first.",
      tags: ["html", "css", "js", "no-deps"],
      html:
        "<p class='out-p'>The site you are reading. One HTML file, one stylesheet, one script, no " +
        "build step, no analytics, no fonts from anyone else's server. If it needed a framework " +
        "to say who I am, it would be the wrong site.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>goal</span><span class='kv__v'>a portfolio that is also proof of " +
          "work</span>" +
          "<span class='kv__k'>doing</span><span class='kv__v'>command engine, CRT styling, " +
          "content, accessibility, 320px to 1440px</span>" +
          "<span class='kv__k'>status</span><span class='kv__v'>live · still being tuned</span>" +
        "</div>"
    },
    {
      id: "pizca",
      name: "PIZCA",
      status: "archived",
      tone: "dim",
      summary: "The gastronomy innovation venture: real clients, real constraints, 2023.",
      tags: ["gastronomy", "r&d", "consulting"],
      html:
        "<p class='out-p'>Before the bench, Pizca: a gastronomy innovation consultancy in La " +
        "Puebla de Híjar. Tradición e innovación gastronómica: consulting, outreach, production " +
        "and product ideation for people who cook for a living.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>what</span><span class='kv__v'>tradición e innovación gastronómica " +
          "· advisory · outreach · production · ideation</span>" +
          "<span class='kv__k'>where</span><span class='kv__v'>La Puebla de Híjar, Teruel</span>" +
          "<span class='kv__k'>status</span><span class='kv__v'>archived, 2023</span>" +
        "</div>" +
        "<p class='out-p dim'>what it taught me: an idea is worth nothing until it survives a " +
        "kitchen, a budget and a customer. adoption is a systems problem. so is security.</p>"
    }
  ],

  files: [
    { name: "about.txt", target: "about", note: "Pablo, briefly" },
    { name: "contact.txt", target: "contact", note: "reach me" },
    { name: "focus.txt", target: "focus", note: "what I do" },
    { name: "journey.txt", target: "journey", note: "kitchens, SRE, drones" },
    { name: "skills.txt", target: "skills", note: "tools, self-assessed" },
    { name: "stack.txt", target: "stack", note: "daily drivers" },
    { name: "projects.txt", target: "projects", note: "operations, lab, bench" }
  ]
};