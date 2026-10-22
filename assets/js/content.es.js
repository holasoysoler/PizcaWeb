/* ============================================================================
   pizca.sec — CONTENIDO (window.SITE_ES)
   Pablo Soler — operador de drones EASA · redacción técnica · CTI/OSINT.
   Traducción al español de content.js. Mismo esquema, mismas clases, mismos
   hechos. Solo cambia el idioma de las cadenas visibles.
   ========================================================================== */
window.SITE_ES = {
  meta: {
    handle: "soler",
    host: "archlinux",
    name: "Pablo Soler",
    role: "Piloto y operador de drones EASA · redacción técnica · CTI/OSINT",
    location: "La Puebla de Híjar, Teruel · España",
    locationShort: "Teruel, España",
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
    availability: "Abierto a operaciones con drones, redacción técnica, CTI/OSINT y trabajo de seguridad",
    year: 2026
  },

  banner: {
    tagline: "operaciones con drones EASA · CTI/OSINT · redacción técnica",
    sub: "Documento sistemas, investigo señales y piloto drones para inspección, topografía y monitorización."
  },

  page: {
    title: "Pablo Soler — operador de drones EASA, OSINT y redacción técnica",
    description: "Pablo Soler — piloto y operador de drones EASA (A1/A2/A3, STS-01/02), redactor técnico e investigador CTI/OSINT en el medio rural de Aragón. Inspección con drones, fotogrametría, SIGINT y seguridad en la Industria 4.0."
  },

  boot: [
    { text: "[ 0.000] pizcacos 1.0.0 — arranca", tone: "dim" },
    { text: "[ 0.021] sondeando hardware ............... OK", tone: "ok" },
    { text: "[ 0.049] montando /dev/identity ........... OK", tone: "ok" },
    { text: "[ 0.102] cargando rtl_sdr.ko .............. OK", tone: "ok" },
    { text: "[ 0.146] cargando uas_ops.ko .............. OK", tone: "ok" },
    { text: "[ 0.202] sin blobs privativos ........... WARN", tone: "warn" },
    { text: "[ 0.231] /dev/gastronomy solo lectura", tone: "dim" },
    { text: "[ 0.266] arrancando shell en tty1 ......... OK", tone: "ok" },
    { text: "[ 0.278] soler@archlinux: ~/pizca.sec", tone: "accent" }
  ],

  hints: ["help", "whoami", "focus", "projects", "contact"],

  help: [
    { group: "identidad", items: [
      ["whoami", "la versión en 10 segundos"],
      ["about", "cocinas, SRE, radio, drones"],
      ["now", "volando, escribiendo, construyendo"],
      ["journey", "el camino largo hasta aquí"]
    ]},
    { group: "trabajo", items: [
      ["focus", "las cuatro cosas que hago"],
      ["skills", "herramientas y barras autoevaluadas"],
      ["projects", "operaciones, laboratorio y taller"],
      ["open <id>", "detalle de un proyecto"],
      ["stack", "herramientas del día a día"]
    ]},
    { group: "contacto", items: [
      ["contact", "email, teléfono, LinkedIn, ubicación"],
      ["social", "LinkedIn, GitHub, Instagram"],
      ["email", "abrir tu cliente de correo"]
    ]},
    { group: "shell", items: [
      ["help", "esta lista (también ? y h)"],
      ["lang", "inglés / español"],
      ["neofetch", "sistema e identidad"],
      ["ls", "listar archivos (ls -la para detalle)"],
      ["cat <file>", "imprimir un archivo"],
      ["banner", "redibujar la cabecera ASCII"],
      ["btop", "monitor del sistema, el divertido"],
      ["clear", "limpiar la salida (también cls)"],
      ["history", "comandos recientes"],
      ["pwd", "¿dónde estoy?"],
      ["uname -a", "información del sistema"],
      ["echo <text>", "repetirlo"],
      ["theme", "nordic / amber / ice"],
      ["crt", "brillo / glitch on/off"]
    ]},
    { group: "diversión", items: [
      ["scan", "nmap simulado contra pizca.me"],
      ["drone", "una pequeña máquina voladora"],
      ["glitch", "degradación suave de señal"],
      ["sudo", "no"],
      ["rm -rf /", "definitivamente no"],
      ["exit", "salir en silencio"]
    ]}
  ],

  outputs: {
    whoami:
      "<p class='out-h'>Pablo Soler</p>" +
      "<p class='out-p dim'>Piloto y operador de drones EASA · redacción técnica · CTI/OSINT</p>" +
      "<div class='kv'>" +
        "<span class='kv__k'>certificaciones</span><span class='kv__v'>EASA A1/A2/A3 · STS-01 · STS-02</span>" +
        "<span class='kv__k'>enfoque</span><span class='kv__v'>operaciones RPAS · OSINT/SIGINT · redacción técnica</span>" +
        "<span class='kv__k'>base</span><span class='kv__v'>La Puebla de Híjar, Teruel · ES/EN</span>" +
        "<span class='kv__k'>estado</span><span class='kv__v'>abierto a operaciones con drones, redacción " +
          "técnica, CTI/OSINT y trabajo de seguridad · " +
          "<button type='button' class='cmd-link' data-cmd='contact'>contacto</button></span>" +
      "</div>",

    about:
      "<p class='out-p'>Quince años en cocinas profesionales — DiverXO, Coya, El Willy, Manfreds " +
      "&amp; Relae — me enseñaron a trabajar bajo presión, documentar procedimientos y hacer que " +
      "sistemas complejos funcionen con lo que haya a mano.</p>" +
      "<p class='out-p'>Después, tres años como SRE en dftek y Codeoscopic: fiabilidad de " +
      "infraestructura, monitorización, respuesta a incidentes, runbooks. Desde 2020 también llevo " +
      "investigación técnica independiente: instrumentación LoRaWAN, RTL-SDR, radiosondas, " +
      "imágenes de satélite y OSINT/SIGINT.</p>" +
      "<p class='out-p'>Hoy: operaciones UAS con licencia EASA, redacción técnica, CTI/OSINT y un " +
      "taller de reparación para drones agrícolas y electrónica industrial. Entiende el sistema, " +
      "documéntalo, prueba dónde cede.</p>" +
      "<div class='box'><p class='box__title'>método</p>" +
      "<p class='out-p'>entiéndelo. documéntalo. rómpelo. haz que aguante. luego repáralo.</p></div>" +
      "<p class='out-p dim'>En remoto desde el medio rural de Aragón. Oko, el perro, lo aprueba.</p>",

    now:
      "<p class='out-h'>ahora <span class='dim'>// otoño 2026</span></p>" +
      "<div class='kv'>" +
        "<span class='kv__k'>volando</span><span class='kv__v'>operaciones UAS EASA — inspección, " +
          "monitorización de infraestructuras, fotogrametría, topografía de precisión</span>" +
        "<span class='kv__k'>construyendo</span><span class='kv__v'>una estación de monitorización " +
          "rural de código abierto: LoRaWAN + RTL-SDR + imágenes de satélite</span>" +
        "<span class='kv__k'>escribiendo</span><span class='kv__v'>documentación de hardware y " +
          "runbooks de infraestructura; con la vista puesta en HardwareX para instrumentación abierta</span>" +
        "<span class='kv__k'>investigando</span><span class='kv__v'>OSINT/SIGINT — radiosonda RS41, " +
          "Meteor-M2 LRPT, ADS-B/AIS, imágenes de satélite</span>" +
        "<span class='kv__k'>estudiando</span><span class='kv__v'>licencia de radioaficionado HAREC</span>" +
        "<span class='kv__k'>abierto a</span><span class='kv__v'>operaciones con drones · redacción " +
          "técnica · CTI/OSINT · trabajo de seguridad</span>" +
        "<span class='kv__k'>base</span><span class='kv__v'>Teruel, España · remoto</span>" +
      "</div>" +
      "<p class='out-p dim'>más: <button type='button' class='cmd-link' data-cmd='projects'>proyectos</button> " +
      "<span class='dim'>·</span> <button type='button' class='cmd-link' data-cmd='contact'>contacto</button></p>",

    focus:
      "<div class='focus'>" +
        "<div class='focus__item'>" +
          "<p class='out-h'><span class='accent'>01</span> operaciones RPAS</p>" +
          "<p class='out-p'>Trabajo con drones bajo normativa EASA: categoría abierta A1/A2/A3 y " +
          "categoría específica STS-01/STS-02, VLOS y BVLOS con observadores del espacio aéreo. " +
          "Inspección, monitorización de infraestructuras, fotogrametría y topografía de precisión " +
          "en toda España.</p>" +
          "<p class='note'>A1/A2/A3 · STS-01 · STS-02 · VLOS/BVLOS · fotogrametría · topografía</p>" +
        "</div>" +
        "<div class='focus__item'>" +
          "<p class='out-h'><span class='accent'>02</span> CTI / OSINT / SIGINT</p>" +
          "<p class='out-p'>Investigación de fuentes abiertas y análisis de señales: recepción " +
          "RTL-SDR, decodificación de radiosondas Vaisala RS41 a 403 MHz, imágenes Meteor-M2 LRPT " +
          "a 137 MHz, seguimiento ADS-B y AIS, geolocalización y análisis de imágenes de " +
          "satélite.</p>" +
          "<p class='note'>RTL-SDR · RS41 · Meteor-M2 · ADS-B/AIS · imágenes de satélite · geolocalización</p>" +
        "</div>" +
        "<div class='focus__item'>" +
          "<p class='out-h'><span class='accent'>03</span> redacción técnica</p>" +
          "<p class='out-p'>Documentación de hardware, runbooks de infraestructura, postmortems, " +
          "diagramas de arquitectura y procedimientos. Bilingüe ES/EN, escrito para quien tiene " +
          "que operar el cacharro a las 3 de la mañana.</p>" +
          "<p class='note'>docs de hardware · runbooks · postmortems · diagramas · objetivo HardwareX</p>" +
        "</div>" +
        "<div class='focus__item'>" +
          "<p class='out-h'><span class='accent'>04</span> sistemas, seguridad y reparación</p>" +
          "<p class='out-p'>Instrumentación ESP32/LoRaWAN, stacks de datos autoalojados y sistemas " +
          "Linux. En seguridad: ingeniería inversa de drones, OT/Industria 4.0 y práctica de " +
          "seguridad ofensiva, con un taller de reparación debajo de todo.</p>" +
          "<p class='note'>ESP32 · LoRaWAN · Linux · RE de drones · Modbus/OT · seguridad ofensiva</p>" +
        "</div>" +
      "</div>" +
      "<p class='out-p dim'>operaciones, investigación y trabajo de taller. <button type='button' " +
      "class='cmd-link' data-cmd='projects'>proyectos</button> tiene las pruebas.</p>",

    skills:
      "<div class='skills'>" +
        "<div class='skill-group'>" +
          "<p class='out-h'>operaciones con drones</p>" +
          "<div class='skill'><span class='skill__name'>EASA A1/A2/A3</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>STS-01</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>STS-02</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
          "<div class='skill'><span class='skill__name'>VLOS / BVLOS</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>fotogrametría</span>" +
            "<span class='skill__bar'>██████░░░░</span><span class='skill__pct'>60%</span></div>" +
        "</div>" +
        "<div class='skill-group'>" +
          "<p class='out-h'>SIGINT / OSINT</p>" +
          "<div class='skill'><span class='skill__name'>RTL-SDR</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>radiosonda RS41</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
          "<div class='skill'><span class='skill__name'>Meteor-M2 LRPT</span>" +
            "<span class='skill__bar'>██████░░░░</span><span class='skill__pct'>60%</span></div>" +
          "<div class='skill'><span class='skill__name'>ADS-B / AIS</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
          "<div class='skill'><span class='skill__name'>imágenes satélite</span>" +
            "<span class='skill__bar'>██████░░░░</span><span class='skill__pct'>60%</span></div>" +
          "<div class='skill'><span class='skill__name'>geolocalización</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
        "</div>" +
        "<div class='skill-group'>" +
          "<p class='out-h'>redacción técnica</p>" +
          "<div class='skill'><span class='skill__name'>docs de hardware</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>runbooks</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
          "<div class='skill'><span class='skill__name'>diagramas</span>" +
            "<span class='skill__bar'>███████░░░</span><span class='skill__pct'>70%</span></div>" +
          "<div class='skill'><span class='skill__name'>redacción ES/EN</span>" +
            "<span class='skill__bar'>████████░░</span><span class='skill__pct'>80%</span></div>" +
        "</div>" +
        "<div class='skill-group'>" +
          "<p class='out-h'>sistemas / instrumentación</p>" +
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
          "<p class='out-h'>seguridad / ing. inversa</p>" +
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
      "<p class='note'>autoevaluado; el taller, el campo de vuelo y los informes son el CV real.</p>",

    journey:
      "<div class='timeline'>" +
        "<div class='tl'><span class='tl__when'>2006–2015</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>Cocinas profesionales: Kursaal, DiverXO, Coya London, El Willy " +
          "Shanghai. Precisión, presión, procedimientos.</span></div>" +
        "<div class='tl'><span class='tl__when'>2015–2020</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>Copenhague y Zaragoza: sous chef en Manfreds &amp; Relae; " +
          "copropietario de Bar Pollería San Pablo. Cuentas de resultados, equipos, proveedores, " +
          "cero residuos.</span></div>" +
        "<div class='tl'><span class='tl__when'>2020–2023</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>SRE en dftek y Codeoscopic: fiabilidad de infraestructura, " +
          "monitorización, respuesta a incidentes, postmortems y runbooks.</span></div>" +
        "<div class='tl'><span class='tl__when'>2020–ahora</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>Investigación técnica independiente: instrumentación LoRaWAN, " +
          "RTL-SDR, radiosondas, imágenes de satélite y OSINT/SIGINT.</span></div>" +
        "<div class='tl'><span class='tl__when'>2023</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>Pizca, consultoría de innovación gastronómica en La Puebla de " +
          "Híjar. Tradición e innovación gastronómica: asesoría, divulgación, producción, " +
          "ideación.</span></div>" +
        "<div class='tl'><span class='tl__when'>2024–2025</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>Taller de reparación de Rural Tech: drones agrícolas, reparación " +
          "a nivel de PCB, CAN/ISOBUS, LoRa. Derecho a reparar, sin obsolescencia programada.</span></div>" +
        "<div class='tl'><span class='tl__when'>2025–2026</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>Certificaciones UAS EASA, operaciones con drones, redacción " +
          "técnica, CTI/OSINT y práctica de seguridad.</span></div>" +
        "<div class='tl'><span class='tl__when'>ahora</span><span class='tl__dot'></span>" +
          "<span class='tl__what'>pizca.sec está en línea. Abierto a operaciones con drones, " +
          "redacción técnica, CTI/OSINT y trabajo de seguridad.</span></div>" +
      "</div>",

    contact:
      "<p class='out-h'>hablemos</p>" +
      "<p class='out-p'>¿Inspección con drones, fotogrametría o topografía? ¿Documentación de " +
      "hardware, runbooks o una investigación OSINT/CTI? ¿Una red agrícola o industrial que " +
      "necesita otros ojos? El email es lo más rápido.</p>" +
      "<div class='contact'><div class='kv'>" +
        "<span class='kv__k'>email</span><span class='kv__v'>" +
          "<a class='link' href='mailto:hola@pizca.me'>hola@pizca.me</a></span>" +
        "<span class='kv__k'>teléfono</span><span class='kv__v'>" +
          "<a class='link' href='tel:+34722119798'>+34 722 11 97 98</a></span>" +
        "<span class='kv__k'>linkedin</span><span class='kv__v'>" +
          "<a class='link' href='https://www.linkedin.com/in/pablo-soler-540a4931/' rel='me noopener' " +
          "target='_blank'>linkedin.com/in/pablo-soler</a></span>" +
        "<span class='kv__k'>github</span><span class='kv__v'>" +
          "<a class='link' href='https://github.com/holasoysoler' rel='me noopener'>" +
          "github.com/holasoysoler</a></span>" +
        "<span class='kv__k'>ubicación</span><span class='kv__v'>La Puebla de Híjar, Teruel, " +
          "España · remoto</span>" +
        "<span class='kv__k'>certificaciones</span><span class='kv__v'>EASA A1/A2/A3 · STS-01 · " +
          "STS-02 · HAREC en curso</span>" +
        "<span class='kv__k'>idiomas</span><span class='kv__v'>Español (nativo) · Inglés " +
          "(bilingüe) · Italiano (profesional) · Chino (básico)</span>" +
        "<span class='kv__k'>disponibilidad</span><span class='kv__v'>abierto a operaciones con " +
          "drones, redacción técnica, CTI/OSINT y trabajo de seguridad</span>" +
        "<span class='kv__k'>instagram</span><span class='kv__v'>" +
          "<a class='link' href='https://instagram.com/pizca.me' rel='me noopener'>@pizca.me</a></span>" +
      "</div></div>" +
      "<p class='out-p dim'><button type='button' class='cmd-link' data-cmd='email'>escríbeme</button> " +
      "// o copia la dirección de arriba; sin formularios, sin calendarios.</p>",

    social:
      "<p class='out-h'>en otros sitios</p>" +
      "<div class='kv'>" +
        "<span class='kv__k'>linkedin</span><span class='kv__v'>" +
          "<a class='link' href='https://www.linkedin.com/in/pablo-soler-540a4931/' rel='me noopener' " +
          "target='_blank'>pablo-soler</a> <span class='dim'>· historial profesional completo</span></span>" +
        "<span class='kv__k'>github</span><span class='kv__v'>" +
          "<a class='link' href='https://github.com/holasoysoler' rel='me noopener'>" +
          "github.com/holasoysoler</a> <span class='dim'>· etapa de infraestructura + fork de topografía DJI</span></span>" +
        "<span class='kv__k'>instagram</span><span class='kv__v'>" +
          "<a class='link' href='https://instagram.com/pizca.me' rel='me noopener'>@pizca.me</a> " +
          "<span class='dim'>· algún trabajo en curso</span></span>" +
        "<span class='kv__k'>email</span><span class='kv__v'>" +
          "<a class='link' href='mailto:hola@pizca.me'>hola@pizca.me</a></span>" +
        "<span class='kv__k'>web</span><span class='kv__v'>" +
          "<a class='link' href='https://www.pizca.me'>pizca.me</a></span>" +
      "</div>" +
      "<p class='note'>el historial profesional completo está en LinkedIn; los repos son sobre " +
      "todo experimentos de la etapa de infraestructura y una herramienta de topografía DJI. las " +
      "notas de campo y los informes llegan después.</p>",

    stack:
      "<p class='out-h'>herramientas del día a día</p>" +
      "<div class='kv'>" +
        "<span class='kv__k'>sistemas</span><span class='kv__v'>Arch Linux (a diario desde los " +
          "12), ghostty, tmux, neovim, zsh, git</span>" +
        "<span class='kv__k'>infra</span><span class='kv__v'>terraform, aws (ec2/rds/s3), " +
          "kubernetes, docker, prometheus/grafana, opentelemetry</span>" +
        "<span class='kv__k'>UAS</span><span class='kv__v'>operaciones EASA, dji, qgroundcontrol, " +
          "fotogrametría, espacio aéreo/notams</span>" +
        "<span class='kv__k'>SIGINT</span><span class='kv__v'>rtl-sdr, dump1090, " +
          "radiosonde_auto_rx, meteor-m2 lrpt, ads-b/ais, imágenes de satélite</span>" +
        "<span class='kv__k'>instrumentación</span><span class='kv__v'>esp32-s3/heltec v3, " +
          "lorawan, chirpstack, influxdb, grafana, node-red, sht31/bmp280/pt1000/ads1115, solar, " +
          "impresión 3D</span>" +
        "<span class='kv__k'>taller</span><span class='kv__v'>aire caliente, microscopio, " +
          "soldadura, flashrom, openocd, can-utils, kicad, freecad</span>" +
        "<span class='kv__k'>RE</span><span class='kv__v'>ghidra, radare2, binwalk, gdb, " +
          "analizador lógico</span>" +
        "<span class='kv__k'>redacción</span><span class='kv__v'>markdown, runbooks, postmortems, " +
          "diagramas de arquitectura, hardwarex</span>" +
        "<span class='kv__k'>dev</span><span class='kv__v'>python, c++/arduino, bash, platformio, " +
          "sqlite, html/css/js</span>" +
        "<span class='kv__k'>identidad</span><span class='kv__v'>active directory, microsoft " +
          "identity manager</span>" +
      "</div>" +
      "<p class='note'>nada exótico. las herramientas son baratas; las notas son el activo.</p>"
  },

  projects: [
    {
      id: "uas-ops",
      name: "UAS / OPS",
      status: "available",
      tone: "ok",
      summary: "Operaciones con drones con licencia EASA: inspección, monitorización, fotogrametría y topografía.",
      tags: ["EASA", "A1/A2/A3", "STS-01", "STS-02", "VLOS/BVLOS"],
      html:
        "<p class='out-p'>Operaciones UAS con licencia bajo normativa EASA: categoría abierta " +
        "A1/A2/A3 y categoría específica STS-01/STS-02. VLOS, y BVLOS con observadores del espacio " +
        "aéreo.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>servicios</span><span class='kv__v'>inspección aérea · monitorización " +
          "de infraestructuras · fotogrametría · topografía de precisión</span>" +
          "<span class='kv__k'>dónde</span><span class='kv__v'>España · base en el Aragón rural · " +
          "desplazamiento por el trabajo adecuado</span>" +
          "<span class='kv__k'>estado</span><span class='kv__v'>disponible · operaciones y seguro " +
          "en regla</span>" +
        "</div>" +
        "<p class='out-p dim'>Solo operaciones comerciales. Dime el sitio y el entregable.</p>"
    },
    {
      id: "rural-monitor",
      name: "RURAL / MONITOR",
      status: "building",
      tone: "warn",
      summary: "Monitorización ambiental rural de código abierto: LoRaWAN + RTL-SDR + imágenes de satélite.",
      tags: ["LoRaWAN", "ESP32", "RTL-SDR", "satellite"],
      html:
        "<p class='out-p'>Una estación de monitorización ambiental rural de código abierto: nodos " +
        "LoRaWAN, recepción RTL-SDR e imágenes de satélite fusionados en un solo stack de " +
        "datos.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>nodos</span><span class='kv__v'>ESP32-S3 / Heltec V3 · SHT31 · BMP280 " +
          "· Pt1000 · ADS1115 · solar · garita Stevenson impresa en 3D</span>" +
          "<span class='kv__k'>radio</span><span class='kv__v'>RS41 403 MHz · Meteor-M2 137 MHz LRPT " +
          "· ADS-B · AIS</span>" +
          "<span class='kv__k'>stack</span><span class='kv__v'>ChirpStack · InfluxDB · Grafana · " +
          "Node-RED · servidor del homelab</span>" +
          "<span class='kv__k'>estado</span><span class='kv__v'>construyendo · código abierto · " +
          "informe para HardwareX</span>" +
        "</div>" +
        "<p class='out-p dim'>instrumentación de campo, no un producto de cliente.</p>"
    },
    {
      id: "drone-re",
      name: "DRONE / RE",
      status: "in progress",
      tone: "warn",
      summary: "Un cuadricóptero agrícola, abierto: firmware, UART, RF y bastante estaño.",
      tags: ["firmware", "UART", "RF", "ghidra"],
      html:
        "<p class='out-p'>Una unidad de laboratorio personal: un cuadricóptero agrícola comprado " +
        "de segunda mano para el taller. No es un dispositivo de cliente ni un encargo de red team. " +
        "Quiero saber de qué se fía antes de que vuele sobre un campo.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>objetivo</span><span class='kv__v'>mapear la cadena de arranque, el " +
          "firmware, el enlace de radio y el bus de sensores, de principio a fin</span>" +
          "<span class='kv__k'>haciendo</span><span class='kv__v'>volcado de la flash SPI en mano, " +
          "pads UART localizados, capturas RF en proceso de decodificación</span>" +
          "<span class='kv__k'>herramientas</span><span class='kv__v'>flashrom · UART · JTAG · SPI · " +
          "HackRF · Ghidra · radare2</span>" +
          "<span class='kv__k'>estado</span><span class='kv__v'>en curso · mapa del protocolo a " +
          "trozos · informe pendiente</span>" +
        "</div>" +
        "<p class='out-p dim'>sin nombre de fabricante y sin hallazgos hasta que el informe sea honesto.</p>"
    },
    {
      id: "ics-lab",
      name: "ICS / LAB",
      status: "building",
      tone: "warn",
      summary: "Un laboratorio AgTech/OT casero: PLC, HMI, Modbus/TCP, nodos CAN/ISOBUS y sensores LoRa.",
      tags: ["modbus", "CAN/ISOBUS", "PLC", "LoRa", "IEC 62443"],
      html:
        "<p class='out-p'>Un pequeño laboratorio AgTech/OT en un escritorio: un PLC de segunda " +
        "mano, un HMI barato, nodos CAN/ISOBUS, sensores LoRa y un switch gestionado. Maquinaria " +
        "agrícola y protocolos de fábrica, en una sola sala.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>objetivo</span><span class='kv__v'>aprender qué se rompe cuando las " +
          "costumbres de IT se cruzan con los protocolos agrícolas e industriales, y arreglarlo</span>" +
          "<span class='kv__k'>haciendo</span><span class='kv__v'>capturas de tráfico, lógica de " +
          "PLC, ataques simulados, reglas de segmentación, pruebas de alcance LoRa</span>" +
          "<span class='kv__k'>leyendo</span><span class='kv__v'>modelo Purdue · IEC 62443 · todos " +
          "los manuales de PLC e ISOBUS que encuentro</span>" +
          "<span class='kv__k'>estado</span><span class='kv__v'>construyendo · hardware en el " +
          "escritorio, laboratorio medio cableado</span>" +
        "</div>" +
        "<p class='out-p dim'>solo simulaciones, con mi propio hardware. la idea es encontrar la " +
        "costura débil antes de que la encuentre una explotación.</p>"
    },
    {
      id: "rural-tech",
      name: "RURAL TECH",
      status: "running",
      tone: "ok",
      summary: "El taller de reparación: drones agrícolas, averías a nivel de PCB y diagnóstico CAN/ISOBUS.",
      tags: ["PCB", "drones", "CAN/ISOBUS", "LoRa", "right-to-repair"],
      html:
        "<p class='out-p'>El taller de donde salen las horas de trabajo real: maquinaria agrícola e " +
        "industrial, reparada a nivel de componente en vez de sustituida a nivel de placa.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>qué</span><span class='kv__v'>reparación a nivel de PCB · drones " +
          "agrícolas (mantenimiento y sensores) · diagnóstico CAN/ISOBUS · automatización IoT y " +
          "LoRa</span>" +
          "<span class='kv__k'>postura</span><span class='kv__v'>primero el componente · derecho a " +
          "reparar · sin obsolescencia programada</span>" +
          "<span class='kv__k'>estado</span><span class='kv__v'>en marcha · trabajo de taller, no " +
          "una pieza de portafolio para cliente</span>" +
        "</div>" +
        "<p class='out-p dim'>cuando el servicio oficial dice 'cambia la placa entera', el taller " +
        "cambia el componente que falló. esa frase es toda la filosofía.</p>"
    },
    {
      id: "pizca-me",
      name: "PIZCA.ME",
      status: "live",
      tone: "ok",
      summary: "Este sitio: HTML, CSS y JS escritos a mano. Sin framework, sin rastreadores, teclado primero.",
      tags: ["html", "css", "js", "no-deps"],
      html:
        "<p class='out-p'>El sitio que estás leyendo. Un archivo HTML, una hoja de estilos, un " +
        "script, sin build, sin analítica, sin fuentes del servidor de nadie. Si necesitara un " +
        "framework para decir quién soy, sería el sitio equivocado.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>objetivo</span><span class='kv__v'>un portafolio que también es " +
          "prueba de trabajo</span>" +
          "<span class='kv__k'>haciendo</span><span class='kv__v'>motor de comandos, estilo CRT, " +
          "contenido, accesibilidad, de 320px a 1440px</span>" +
          "<span class='kv__k'>estado</span><span class='kv__v'>en línea · todavía afinándose</span>" +
        "</div>"
    },
    {
      id: "pizca",
      name: "PIZCA",
      status: "archived",
      tone: "dim",
      summary: "La aventura de innovación gastronómica: clientes reales, restricciones reales, 2023.",
      tags: ["gastronomy", "r&d", "consulting"],
      html:
        "<p class='out-p'>Antes del taller, Pizca: una consultoría de innovación gastronómica en " +
        "La Puebla de Híjar. Tradición e innovación gastronómica: asesoría, divulgación, " +
        "producción e ideación de producto para gente que cocina para vivir.</p>" +
        "<div class='kv'>" +
          "<span class='kv__k'>qué</span><span class='kv__v'>tradición e innovación gastronómica · " +
          "asesoría · divulgación · producción · ideación</span>" +
          "<span class='kv__k'>dónde</span><span class='kv__v'>La Puebla de Híjar, Teruel</span>" +
          "<span class='kv__k'>estado</span><span class='kv__v'>archivado, 2023</span>" +
        "</div>" +
        "<p class='out-p dim'>lo que me enseñó: una idea no vale nada hasta que sobrevive a una " +
        "cocina, un presupuesto y un cliente. la adopción es un problema de sistemas. la seguridad " +
        "también.</p>"
    }
  ],

  files: [
    { name: "about.txt", target: "about", note: "Pablo, en breve" },
    { name: "contact.txt", target: "contact", note: "escríbeme" },
    { name: "focus.txt", target: "focus", note: "qué hago" },
    { name: "journey.txt", target: "journey", note: "cocinas, SRE, drones" },
    { name: "skills.txt", target: "skills", note: "herramientas, autoevaluadas" },
    { name: "stack.txt", target: "stack", note: "día a día" },
    { name: "projects.txt", target: "projects", note: "operaciones, laboratorio, taller" }
  ]
};