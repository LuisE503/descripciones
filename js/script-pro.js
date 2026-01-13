// =============================================
// GENERADOR DE DESCRIPCIONES SHOPIFY PRO
// Script Principal - Versión Profesional 2.0
// =============================================

// Estado global de la aplicación
const appState = {
    currentFilter: 'all',
    currentSearch: '',
    allProducts: [],
    filteredProducts: [],
    currentProduct: null,
    productsData: {},
    viewMode: 'grid'
};

// Mapeo de categorías a iconos de FontAwesome
const categoryIcons = {
    cartuchos: 'fa-fill-drip',
    case: 'fa-computer',
    cinta: 'fa-tape',
    cooler: 'fa-fan',
    fuente_de_poder: 'fa-bolt',
    impresora_de_inyeccion: 'fa-print',
    impresora_laser: 'fa-print',
    impresora_matricial: 'fa-print',
    impresora_termica: 'fa-receipt',
    laptop: 'fa-laptop',
    memoria_ram: 'fa-memory',
    monitores: 'fa-desktop',
    motherboard: 'fa-microchip',
    plotter: 'fa-ruler-combined',
    procesadores: 'fa-microchip',
    proyectores: 'fa-video',
    regletas: 'fa-plug',
    regulador_de_voltaje: 'fa-car-battery',
    software: 'fa-compact-disc',
    supresor_de_voltaje: 'fa-shield-halved',
    soporte_o_bracket: 'fa-tv',
    tarjetas_graficas: 'fa-gamepad',
    televisores: 'fa-tv',
    tintas: 'fa-droplet',
    toner: 'fa-cube',
    ups_y_ups_online: 'fa-battery-full',
    adaptador_de_red_usb: 'fa-network-wired',
    almacenamiento_externo: 'fa-hard-drive',
    amplificador_de_red: 'fa-tower-broadcast',
    audifonos_cableados_e_inalambricos: 'fa-headphones',
    bases_para_laptop: 'fa-laptop-file',
    bocina_e_inalambrica_y_sistema_de_audio: 'fa-volume-high',
    cable_hdmi: 'fa-plug',
    cable_usb: 'fa-usb',
    cable_utp_y_bobina_de_cable: 'fa-ethernet',
    cables_vga: 'fa-display',
    camara_de_video_web_dslr_digital: 'fa-camera',
    camaras_de_vigilancia_analoga_ip_wifi: 'fa-video',
    combo_teclado_y_mouse_cableados_e_inalambrico: 'fa-keyboard',
    dvr: 'fa-server',
    enclousure: 'fa-hdd',
    escaneres: 'fa-scanner',
    estacion_de_carga: 'fa-charging-station',
    gabinetes: 'fa-server',
    hostpot: 'fa-wifi',
    hub_usb: 'fa-hubspot',
    iot: 'fa-house-signal',
    memorias_extraibles: 'fa-sd-card',
    microfono: 'fa-microphone',
    mouse_cableados: 'fa-computer-mouse',
    mouse_inalambricos: 'fa-computer-mouse',
    mouse_pad: 'fa-square',
    nvr: 'fa-database',
    punto_de_acceso: 'fa-tower-cell',
    repetidores_de_red: 'fa-signal',
    router: 'fa-router',
    smartphone: 'fa-mobile-screen',
    smartwatches: 'fa-clock',
    switches: 'fa-code-branch',
    tablets: 'fa-tablet-screen-button',
    teclados_cableados_e_inalambricos: 'fa-keyboard',
    pasta_termica: 'fa-temperature-low',
    // NUEVAS CATEGORÍAS
    accesorios: 'fa-gift',
    infraestructura_de_red: 'fa-network-wired',
    portabilidad: 'fa-bag-shopping',
    smart_home: 'fa-house',
    drones: 'fa-helicopter',
    cargadores: 'fa-plug',
    tableta_grafica: 'fa-palette',
    cable_dvi: 'fa-link',
    internet_de_las_cosas: 'fa-globe'
};

// =============================================
// INICIALIZACIÓN
// =============================================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Inicializando aplicación PRO...');
    
    // Cargar datos de productos
    appState.allProducts = getAllProducts();
    appState.filteredProducts = appState.allProducts;
    
    console.log('📊 Productos cargados:', {
        total: appState.allProducts.length,
        productos: appState.allProducts
    });
    
    // Actualizar estadísticas del header
    document.getElementById('totalProducts').textContent = appState.allProducts.length;
    document.getElementById('totalCategories').textContent = appState.allProducts.length;
    
    // Cargar contenido de archivos .txt
    await loadAllProductData();
    
    // Renderizar productos
    renderProducts();
    
    // Generar categorías en el dropdown
    generateCategoryDropdown();
    
    // Inicializar event listeners
    initializeEventListeners();
    
    console.log('✅ Aplicación PRO inicializada correctamente');
});

// =============================================
// CARGAR DATOS DE PRODUCTOS
// =============================================
async function loadProductContent(fileName) {
    try {
        const response = await fetch(`productos-txt/${fileName}`);
        if (!response.ok) throw new Error(`Error loading ${fileName}`);
        return await response.text();
    } catch (error) {
        console.warn(`⚠️ No se pudo cargar ${fileName}:`, error);
        return '';
    }
}

async function loadAllProductData() {
    console.log('📁 Cargando datos de productos...');
    
    const productConfigs = {
        cartuchos: { file: 'cartuchos.txt', rules: getRulesForCategory('cartuchos') },
        case: { file: 'case.txt', rules: getRulesForCategory('case') },
        cinta: { file: 'cinta.txt', rules: getRulesForCategory('cinta') },
        cooler: { file: 'cooler.txt', rules: getRulesForCategory('cooler') },
        fuente_de_poder: { file: 'fuente_de_poder.txt', rules: getRulesForCategory('fuente_de_poder') },
        impresora_de_inyeccion: { file: 'impresora de inyeccion.txt', rules: getRulesForCategory('impresora_de_inyeccion') },
        impresora_laser: { file: 'impresora_laser.txt', rules: getRulesForCategory('impresora_laser') },
        impresora_matricial: { file: 'impresora_matricial.txt', rules: getRulesForCategory('impresora_matricial') },
        impresora_termica: { file: 'impresora_termica.txt', rules: getRulesForCategory('impresora_termica') },
        laptop: { file: 'Laptop.txt', rules: getRulesForCategory('laptop') },
        memoria_ram: { file: 'memoria_ram.txt', rules: getRulesForCategory('memoria_ram') },
        monitores: { file: 'monitores.txt', rules: getRulesForCategory('monitores') },
        motherboard: { file: 'motherboard.txt', rules: getRulesForCategory('motherboard') },
        plotter: { file: 'plotter.txt', rules: getRulesForCategory('plotter') },
        procesadores: { file: 'procesadores.txt', rules: getRulesForCategory('procesadores') },
        proyectores: { file: 'proyectores.txt', rules: getRulesForCategory('proyectores') },
        regletas: { file: 'regletas.txt', rules: getRulesForCategory('regletas') },
        regulador_de_voltaje: { file: 'regulador_de_voltaje.txt', rules: getRulesForCategory('regulador_de_voltaje') },
        software: { file: 'software.txt', rules: getRulesForCategory('software') },
        supresor_de_voltaje: { file: 'supresor_de_voltaje.txt', rules: getRulesForCategory('supresor_de_voltaje') },
        soporte_o_bracket: { file: 'soporte o bracket.txt', rules: getRulesForCategory('soporte_o_bracket') },
        tarjetas_graficas: { file: 'tarjetas_graficas.txt', rules: getRulesForCategory('tarjetas_graficas') },
        televisores: { file: 'televisores.txt', rules: getRulesForCategory('televisores') },
        tintas: { file: 'tintas.txt', rules: getRulesForCategory('tintas') },
        toner: { file: 'toner.txt', rules: getRulesForCategory('toner') },
        ups_y_ups_online: { file: 'ups_y_ups_online.txt', rules: getRulesForCategory('ups_y_ups_online') },
        adaptador_de_red_usb: { file: 'adaptador_de_red_usb.txt', rules: getRulesForCategory('adaptador_de_red_usb') },
        almacenamiento_externo: { file: 'almacenamiento_externo.txt', rules: getRulesForCategory('almacenamiento_externo') },
        amplificador_de_red: { file: 'amplificador_de_red.txt', rules: getRulesForCategory('amplificador_de_red') },
        audifonos_cableados_e_inalambricos: { file: 'audifonos_cableados_e_inalambricos.txt', rules: getRulesForCategory('audifonos_cableados_e_inalambricos') },
        bases_para_laptop: { file: 'bases_para_laptop.txt', rules: getRulesForCategory('bases_para_laptop') },
        bocina_e_inalambrica_y_sistema_de_audio: { file: 'bocina_e_inalambrica_y_sistema_de_audio.txt', rules: getRulesForCategory('bocina_e_inalambrica_y_sistema_de_audio') },
        cable_hdmi: { file: 'cable_hdmi.txt', rules: getRulesForCategory('cable_hdmi') },
        cable_usb: { file: 'cable_usb.txt', rules: getRulesForCategory('cable_usb') },
        cable_utp_y_bobina_de_cable: { file: 'cable_utp_y_bobina_de_cable.txt', rules: getRulesForCategory('cable_utp_y_bobina_de_cable') },
        cables_vga: { file: 'cables_vga.txt', rules: getRulesForCategory('cables_vga') },
        camara_de_video_web_dslr_digital: { file: 'camara_de_video_web_dslr_digital.txt', rules: getRulesForCategory('camara_de_video_web_dslr_digital') },
        camaras_de_vigilancia_analoga_ip_wifi: { file: 'camaras_de_vigilancia_analoga_ip_wifi.txt', rules: getRulesForCategory('camaras_de_vigilancia_analoga_ip_wifi') },
        combo_teclado_y_mouse_cableados_e_inalambrico: { file: 'combo_teclado_y_mouse_cableados_e_inalambrico.txt', rules: getRulesForCategory('combo_teclado_y_mouse_cableados_e_inalambrico') },
        dvr: { file: 'dvr.txt', rules: getRulesForCategory('dvr') },
        enclousure: { file: 'enclousure.txt', rules: getRulesForCategory('enclousure') },
        escaneres: { file: 'escaneres.txt', rules: getRulesForCategory('escaneres') },
        estacion_de_carga: { file: 'estacion_de_carga.txt', rules: getRulesForCategory('estacion_de_carga') },
        gabinetes: { file: 'gabinetes.txt', rules: getRulesForCategory('gabinetes') },
        hostpot: { file: 'hostpot.txt', rules: getRulesForCategory('hostpot') },
        hub_usb: { file: 'hub_usb.txt', rules: getRulesForCategory('hub_usb') },
        iot: { file: 'iot.txt', rules: getRulesForCategory('iot') },
        memorias_extraibles: { file: 'memorias_extraibles.txt', rules: getRulesForCategory('memorias_extraibles') },
        microfono: { file: 'microfono.txt', rules: getRulesForCategory('microfono') },
        mouse_cableados: { file: 'mouse_cableados.txt', rules: getRulesForCategory('mouse_cableados') },
        mouse_inalambricos: { file: 'mouse_inalambricos.txt', rules: getRulesForCategory('mouse_inalambricos') },
        mouse_pad: { file: 'mouse_pad.txt', rules: getRulesForCategory('mouse_pad') },
        nvr: { file: 'nvr.txt', rules: getRulesForCategory('nvr') },
        punto_de_acceso: { file: 'punto_de_acceso.txt', rules: getRulesForCategory('punto_de_acceso') },
        repetidores_de_red: { file: 'repetidores_de_red.txt', rules: getRulesForCategory('repetidores_de_red') },
        router: { file: 'router.txt', rules: getRulesForCategory('router') },
        smartphone: { file: 'smartphone.txt', rules: getRulesForCategory('smartphone') },
        smartwatches: { file: 'smartwatches.txt', rules: getRulesForCategory('smartwatches') },
        switches: { file: 'switches.txt', rules: getRulesForCategory('switches') },
        tablets: { file: 'tablets.txt', rules: getRulesForCategory('tablets') },
        teclados_cableados_e_inalambricos: { file: 'teclados_cableados_e_inalambricos.txt', rules: getRulesForCategory('teclados_cableados_e_inalambricos') },
        pasta_termica: { file: 'pasta_termica.txt', rules: getRulesForCategory('pasta_termica') },
        // NUEVAS CATEGORÍAS
        accesorios: { file: 'accesorios.txt', rules: getRulesForCategory('accesorios') },
        infraestructura_de_red: { file: 'infraestructura_de_red.txt', rules: getRulesForCategory('infraestructura_de_red') },
        portabilidad: { file: 'portabilidad.txt', rules: getRulesForCategory('portabilidad') },
        smart_home: { file: 'smart_home.txt', rules: getRulesForCategory('smart_home') },
        drones: { file: 'drones.txt', rules: getRulesForCategory('drones') },
        cargadores: { file: 'cargadores.txt', rules: getRulesForCategory('cargadores') },
        tableta_grafica: { file: 'tableta_grafica.txt', rules: getRulesForCategory('tableta_grafica') },
        cable_dvi: { file: 'cable_dvi.txt', rules: getRulesForCategory('cable_dvi') },
        internet_de_las_cosas: { file: 'internet_de_las_cosas.txt', rules: getRulesForCategory('internet_de_las_cosas') }
    };
    
    const loadPromises = Object.entries(productConfigs).map(async ([category, config]) => {
        const htmlCode = await loadProductContent(config.file);
        appState.productsData[category] = {
            htmlCode: htmlCode,
            promptRules: config.rules
        };
    });
    
    await Promise.all(loadPromises);
    console.log('✅ Datos de productos cargados');
}

// =============================================
// REGLAS POR CATEGORÍA
// =============================================
function getRulesForCategory(category) {
    const rules = {
        // CATEGORÍAS PROBLÉMÁTICAS REPARADAS
        combo_teclado_y_mouse_cableados_e_inalambrico: `⚠️ REGLAS CRÍTICAS PARA COMBO TECLADO Y MOUSE:

OMISIÓN ESTRICTA:
• JAMÁS incluyas "No especificado" en NINGÚN campo
• Si una característica NO tiene información → OMITE la fila completa
• NO escribas "N/A", "No disponible" o similares
• SOLO incluye lo que está confirmado en los datos

ESTRUCTURA REQUERIDA (si hay datos):
• Identificación: Solo si hay Serie, Modelo o Nombre real
• Teclado: Solo si hay especificaciones (dimensiones, peso, tipo de tecla)
• Mouse: Solo si hay especificaciones (dimensiones, peso, tipo sensor)
• Conexión: Tipo de tecnología (USB, Bluetooth, 2.4GHz)
• Características: Solo las que apliquen (DPI, Retroiluminación, etc.)
• Duración batería: Números exactos "X meses"

META DESCRIPTION SEO (máx 160 caracteres):
"Combo teclado y mouse [tipo de conexión] [material/características]. Compatible con [sistemas]. Compra ahora."`,

        memorias_extraibles: `⚠️ REGLAS CRÍTICAS PARA MEMORIAS EXTRAÍBLES (USB/SD):

DIFERENCIACIÓN CLARA:
• Si es USB DRIVE: Solo especificaciones de USB
• Si es SD CARD: Solo especificaciones de tarjeta SD
• NO MEZCLES ambos tipos en la misma tabla
• Secciones: Almacenamiento, Velocidades, Interfaz, Compatibilidad

OMISIÓN ESTRICTA:
• Características genéricas → OMITE
• Información no confirmada → OMITE
• Campos vacíos → NO aparecen en la tabla

ESTRUCTURA (SOLO lo que existe):
• Capacidades disponibles (16GB, 32GB, etc.)
• Velocidades de lectura/escritura reales
• Tipo de interfaz (USB 2.0, USB 3.0, USB-C, UHS-II)
• Compatible con: sistemas operativos

META DESCRIPTION SEO (máx 160 caracteres):
"[USB drive/Tarjeta SD] [capacidad] con velocidad [MB/s]. Compatible con [dispositivos]. Almacenamiento portátil seguro."`,

        camaras_de_vigilancia_analoga_ip_wifi: `⚠️ REGLAS CRÍTICAS PARA CÁMARAS DE VIGILANCIA:

INFORMACIÓN COMPLETA (NO minimalista):
• Resolución: 720p, 1080p, 2K, 4K (ser específico)
• Sensor: Tipo y tamaño si está disponible
• Lente: Ángulo de visión, zoom (óptico/digital)
• Visión nocturna: Rango en metros, tipo IR
• Compresión: H.264, H.265 si especifican

TIPOS Y CONECTIVIDAD:
• Tecnología: Analógica, IP, WiFi (especificar cuál)
• Conectores: RCA, BNC, RJ45, inalámbrico
• Almacenamiento: Local (MicroSD), Cloud, NVR/DVR

CARACTERÍSTICA CRÍTICA:
• Audio: Incluir si tiene micrófono/speaker
• Detección: Movimiento, personas (AI), animales si aplica
• PTZ: Pan-Tilt-Zoom solo si tiene

META DESCRIPTION SEO (máx 160 caracteres):
"Cámara [720p-4K] [tipo] con visión nocturna [Xm]. [Tecnología]. Monitorea tu hogar u oficina. Compra aquí."`,

        hub_usb: `⚠️ REGLAS CRÍTICAS PARA HUB USB:

CAMBIO DE DESCRIPCIÓN OBLIGATORIO:
• Descripción genérica NO VÁLIDA
• Debe incluir: cantidad de puertos, velocidad máxima, características únicas
• Ejemplo: "Hub USB 7 puertos con velocidad 5 Gbps, alimentación independiente"

INFORMACIÓN REQUERIDA:
• Número exacto de puertos (4, 7, 10, etc.)
• Tipo de puerto: USB 2.0, USB 3.0, USB 3.1, USB-C
• Velocidad: 480 Mbps, 5 Gbps, 10 Gbps
• Alimentación: Bus-powered o Self-powered (con especificación de W)
• Características: LED indicador, switch individual, protección

OMISIÓN:
• Especificaciones no confirmadas → OMITE
• Campos sin datos → NO incluyas

META DESCRIPTION SEO (máx 160 caracteres):
"Hub USB [X puertos] [velocidad] Gbps con [características]. Compatible Windows/Mac/Linux. Expande conectividad ahora."`,

        microfono: `⚠️ REGLAS CRÍTICAS PARA MICRÓFONO:

CAMBIO DE DESCRIPCIÓN OBLIGATORIO:
• Descripción genérica NO es suficiente
• Debe incluir: tipo (condensador/dinámico), interfaz (USB/XLR), patrón polar

INFORMACIÓN ESPECÍFICA POR TIPO:
SI ES USB:
  - Patrón polar: Cardioide, Omnidireccional, Bidireccional
  - Frecuencia: 20Hz-20kHz (o rango específico)
  - Sensibilidad: -38dB, -42dB (valor exacto)
  - Cancelación de ruido: Sí/No (luego OMITE si No)

SI ES XLR:
  - Impedancia: 2.5kΩ o especificación
  - SPL máximo: dB especificado
  - Requiere phantom power: Sí/No

ACCESORIOS INCLUIDOS:
• Cable, soporte, pop filter, windscreen (solo los presentes)

META DESCRIPTION SEO (máx 160 caracteres):
"Micrófono [tipo] [interfaz] con patrón [cardinal]. [Característica única]. Ideal para [uso]. Orden ahora."`,

        cable_utp_y_bobina_de_cable: `⚠️ REGLAS CRÍTICAS PARA CABLE UTP/BOBINA:

SEPARACIÓN CLARA:
• Si es CABLE INDIVIDUAL: Longitud, categoría, velocidad máxima
• Si es BOBINA: Cantidad de metros, categoría, velocidad máxima
• NO MEZCLES especificaciones de cable con accesorios (conectores, etc.)

INFORMACIÓN REQUERIDA:
• Categoría: CAT5e, CAT6, CAT6A, CAT7 (especificar)
• Velocidad máxima: 1 Gbps, 10 Gbps (según categoría)
• Impedancia: 100Ω (incluir si aplica)
• AWG: 24 AWG o especificación
• Apantallamiento: UTP, FTP, SFTP (si aplica)
• Longitud: Metros exactos

OMISIÓN:
• Información de "otros" productos → OMITE completamente
• Características sin confirmar → OMITE

META DESCRIPTION SEO (máx 160 caracteres):
"Cable UTP CAT[X] [metros/bobina] para redes. Velocidad hasta [Gbps]. Instalación profesional. Compra segura."`,

        bocina_e_inalambrica_y_sistema_de_audio: `⚠️ REGLAS CRÍTICAS PARA BOCINAS/SISTEMA AUDIO:

ESTRUCTURA HTML VÁLIDA:
• Verifica que <div class="row"> esté correctamente cerrado
• Asegura que todas las etiquetas <tr> y <td> estén balanceadas
• CSS debe ser válido y NO agregar estilos extraños

TIPOS DE BOCINAS:
• Inalámbrica: Tecnología Bluetooth, alcance, batería
• Sistemas: 2.1, 5.1, Surround (especificar)
• Cableada: Conectores RCA, 3.5mm, óptico digital

ESPECIFICACIONES CRÍTICAS:
• Potencia: W reales, RMS si especifican
• Respuesta de frecuencia: 20Hz-20kHz (rango exacto)
• Impedancia: Ohms si aplica
• Tecnología: Drivers, woofers, tweeters (solo si confirman)
• Conectividad: Bluetooth 5.0, WiFi, USB, AUX, óptico

META DESCRIPTION SEO (máx 160 caracteres):
"Bocina [tipo] [potencia]W con Bluetooth/[conexión]. Sonido [característica]. Compatible [dispositivos]. Cómprala."`,

        nvr: `⚠️ REGLAS CRÍTICAS PARA NVR:

CAMBIO DE DESCRIPCIÓN OBLIGATORIO:
• NO uses descripción genérica de vigilancia
• Debe especificar: canales IP, resolución máxima, almacenamiento

INFORMACIÓN REQUERIDA:
• Canales IP: 4, 8, 16, 32 (número exacto)
• Resolución máxima: 4K UHD, 2K, Full HD
• Almacenamiento interno: Capacidad en TB
• Bahías HDD: Número de slots disponibles
• Codificación: H.265, H.264
• Ancho de banda: Mbps máximo

CONECTIVIDAD:
• Ethernet: RJ45 Gigabit
• HDMI: Puerto de salida
• USB: Puertos para backup
• Red: LAN, PoE+

META DESCRIPTION SEO (máx 160 caracteres):
"NVR [X canales] IP [resolución] con [TB almacenamiento]. Grabación continua. Vigilancia profesional. Compra segura."`,

        smartphone: `⚠️ REGLAS CRÍTICAS PARA SMARTPHONE:

CAMBIO DE DESCRIPCIÓN OBLIGATORIO:
• NO descripción genérica
• DEBE incluir: SO (Android/iOS), procesador, RAM, almacenamiento

INFORMACIÓN ESPECÍFICA:
• Sistema operativo: iOS versión, Android versión
• Procesador: Nombre exacto (Apple A16, Snapdragon 8 Gen 2, etc.)
• RAM: GB exactos (4GB, 6GB, 8GB, 12GB)
• Almacenamiento: GB/TB (64GB, 128GB, 256GB, 512GB)
• Pantalla: Tamaño pulgadas, tecnología (AMOLED, LCD, IPS)
• Cámara trasera: Megapíxeles, número de sensores
• Cámara frontal: Megapíxeles

CARACTERÍSTICAS ADICIONALES (solo si confirman):
• Batería: mAh y duración estimada
• Carga rápida: W especificados
• Resistencia: IP rating si tiene
• Conectividad: 5G, NFC, sensor huella

META DESCRIPTION SEO (máx 160 caracteres):
"[Modelo] [SO] [procesador] [RAM]GB [almacenamiento]. Pantalla [tamaño]. Cámara [MP]. Última tecnología. Orden ya."`,

        // CATEGORÍAS ESTÁNDAR
        cartuchos: `REGLAS PARA CARTUCHOS:
• Color: Negro, Tricolor, o colores específicos (NO "de Color")
• Compatibilidad: Modelos separados con " | "
• Rendimiento: Páginas si especifican
• Tamaño: Standard, XL solo si confirman`,

        case: `REGLAS PARA CASE/GABINETE:
• Clasificación: MID TOWER, FULL TOWER, MINI TOWER según forma
• Socket CPU: LGA, AM según motherboard
• Soporte Motherboard: ATX, MICRO-ATX, MINI-ITX exactos
• Paneles: Acrílico, Vidrio Templado solo si confirman`,

        laptop: `REGLAS PARA LAPTOP:
• Nivel: Essential (Celeron/Pentium), Standard (i5/R5), Premium (i7/R7), Gaming
• TODAS características Sí/No DEBEN estar (escribe "No" si no confirman)
• Peso: En kilogramos exactos
• Batería: Horas de duración`,

        monitores: `REGLAS PARA MONITORES:
• Panel: IPS, VA, OLED, Tipo exacto
• Resolución: 1920x1080, 2560x1440, 3840x2160 sin espacios
• Hz: 60Hz, 144Hz, 240Hz exactos
• VESA: Compatibilidad si especifican`,

        impresora_de_inyeccion: `REGLAS PARA IMPRESORA INYECCIÓN:
• Tecnología: Inyección térmica (especificar)
• Resolución: DPI exacto
• Velocidad: PPM (páginas por minuto)
• Conectividad: USB, WiFi, Ethernet disponibles`,

        procesadores: `REGLAS PARA PROCESADORES:
• Marca: Intel, AMD (especificar)
• Socket: LGA1700, AM5, etc.
• Núcleos/Hilos: Números exactos
• Frecuencia: Base y Turbo en GHz`,

        motherboard: `REGLAS PARA MOTHERBOARD:
• Chipset: Z790, X670, B660 exacto
• Socket: Procesador compatible
• RAM: Máximo y tipo (DDR4/DDR5)
• Slots M.2 y PCIe: Cantidad`,

        tarjetas_graficas: `REGLAS PARA TARJETAS GRÁFICAS:
• Memoria: GB exactos y tipo (GDDR6, HBM2)
• Chip: RTX 4080, RX 7900 XT exacto
• TDP: Watts de consumo
• Conectores: HDMI, DP cantidad`,

        televisores: `REGLAS PARA TELEVISORES:
• Tamaño: Pulgadas exactas (55", 65")
• Resolución: Full HD, 4K, 8K específico
• Panel: IPS, VA, QLED, OLED tipo
• Smart: SO (Tizen, webOS, Android TV)`,

        ups_y_ups_online: `REGLAS PARA UPS:
• Capacidad: VA y W especificados
• Autonomía: Minutos/horas de respaldo
• Salidas: Número exacto de tomas
• Tipo: Línea interactiva, Online, Standby`,

        // NUEVAS CATEGORÍAS RECIBIDAS
        adaptador_de_red_usb: `REGLAS PARA ADAPTADOR RED USB:
• Tipo: USB WiFi, USB Ethernet, USB LTE
• Velocidad: Mbps o Gbps exacto
• Tecnología: 802.11n, 802.11ac, Gigabit exacto
• Compatibilidad: Windows, Mac, Linux`,

        almacenamiento_externo: `REGLAS PARA ALMACENAMIENTO EXTERNO:
• Tipo: HDD, SSD, especificar
• Capacidad: TB/GB exactos
• Interfaz: USB 2.0, 3.0, 3.1, USB-C
• Velocidad: MB/s de transferencia`,

        amplificador_de_red: `REGLAS PARA AMPLIFICADOR RED:
• Estándar: 802.11n, 802.11ac, WiFi 6
• Cobertura: Metros/área aproximada
• Compatibilidad: Doble banda, banda única
• Antenas: Cantidad y tipo`,

        audifonos_cableados_e_inalambricos: `REGLAS PARA AUDÍFONOS:
• Tipo: Over-ear, On-ear, In-ear
• Drivers: Tamaño mm exacto
• Impedancia: Ohms especificados
• Cable: Longitud si cableado`,

        bases_para_laptop: `REGLAS PARA BASE LAPTOP:
• Ángulo: Grados ajustables si permite
• Material: Aluminio, plástico, bambú exacto
• Puertos: Hub USB, cables integrados si tiene
• Refrigeración: Ventiladores si incluye`,

        cable_hdmi: `REGLAS PARA CABLE HDMI:
• Versión: HDMI 2.0, 2.1 exacto
• Longitud: Metros exactos
• Tipo: Estándar, Mini, Micro especificar
• Características: 4K, HDR si soporta`,

        cable_usb: `REGLAS PARA CABLE USB:
• Tipo: USB-A, USB-C, Micro USB, Lightning
• Versión: 2.0, 3.0, 3.1 exacto
• Longitud: Metros exactos
• Características: Carga rápida mA si tiene`,

        cables_vga: `REGLAS PARA CABLE VGA:
• Longitud: Metros exactos
• Densidad: 15 pin o especificación
• Ferrita: Incluida si tiene
• Blindaje: Doble, triple si aplica`,

        camara_de_video_web_dslr_digital: `REGLAS PARA CÁMARA VIDEO/WEB:
• Resolución: 720p, 1080p, 4K
• Sensor: Tamaño y tipo si especifican
• Velocidad: FPS a cada resolución
• Conectividad: USB, HDMI, red`,

        dvr: `REGLAS PARA DVR:
• Canales: 4, 8, 16 canales exactos
• Resolución: CIF, D1, 720p, 1080p
• Almacenamiento: TB máximo
• Video: PAL, NTSC especificar`,

        enclousure: `REGLAS PARA ENCLOSURE:
• Compatibilidad: 2.5", 3.5" disco exacto
• Interfaz: USB 2.0, 3.0, SATA
• Material: Aluminio, plástico
• Cable: Incluido o no`,

        escaneres: `REGLAS PARA ESCÁNER:
• Tipo: Plano, ADF, Rollo
• Resolución: DPI máximo exacto
• Velocidad: Páginas por minuto
• Conectividad: USB, Red`,

        estacion_de_carga: `REGLAS PARA ESTACIÓN CARGA:
• Puertos: USB-A, USB-C cantidad
• Potencia: W máximo de salida
• Dispositivos: Cantidad simultánea
• Características: Rápida, inalámbrica si tiene`,

        gabinetes: `REGLAS PARA GABINETE:
• Factor: ATX, MICRO-ATX, MINI-ITX exacto
• Bahías: 3.5", 2.5" cantidad
• Slots: Tarjeta gráfica máximo
• Refrigeración: Ventiladores incluidos`,

        hostpot: `REGLAS PARA HOTSPOT:
• Red: 3G, 4G, 5G tecnología
• Batería: Horas autonomía
• Velocidad: Mbps teórico
• Conectividad: WiFi estándar 802.11`,

        iot: `REGLAS PARA DISPOSITIVO IOT:
• Tecnología: WiFi, Bluetooth, Zigbee exacta
• Función: Automatización específica
• Control: App, voz asistente si tiene
• Compatibilidad: Ecosistemas (Alexa, Google)`,

        microfono: `REGLAS PARA MICRÓFONO:
• Tipo: Condensador, Dinámico exacto
• Interfaz: USB, XLR, 3.5mm
• Patrón: Cardioide, Omnidireccional exacto
• Frecuencia: Rango Hz exacto`,

        mouse_cableados: `REGLAS PARA MOUSE CABLEADO:
• Sensor: Óptico, láser tipo exacto
• DPI: Máximo exacto
• Botones: Cantidad y funcionalidad
• Cable: Longitud metros exacta`,

        mouse_inalambricos: `REGLAS PARA MOUSE INALÁMBRICO:
• Tecnología: Bluetooth, 2.4GHz
• Batería: Horas autonomía
• DPI: Máximo exacto
• Rango: Metros de conectividad`,

        mouse_pad: `REGLAS PARA MOUSE PAD:
• Tamaño: Dimensiones exactas cm
• Material: Tela, caucho tipo exacto
• Base: Antideslizante especificar
• Características: RGB, Inalámbrico si tiene`,

        punto_de_acceso: `REGLAS PARA PUNTO ACCESO:
• Estándar: WiFi 5, WiFi 6 exacto
• Puertos: Ethernet cantidad
• Potencia: W de consumo
• Cobertura: Metros aproximado`,

        repetidores_de_red: `REGLAS PARA REPETIDOR RED:
• Estándar: 802.11ac, WiFi 6 exacto
• Velocidad: Mbps máximo
• Cobertura: Metros adicionales
• Antenas: Cantidad tipo`,

        router: `REGLAS PARA ROUTER:
• Estándar: WiFi 5, WiFi 6 exacto
• Velocidad: Mbps teórico
• Antenas: Cantidad
• Puertos: Ethernet WAN/LAN cantidad`,

        smartwatches: `REGLAS PARA SMARTWATCH:
• SO: watchOS, Wear OS exacto
• Pantalla: AMOLED, LCD tipo
• Batería: Días de autonomía
• Conectividad: Bluetooth, Cellular si tiene`,

        switches: `REGLAS PARA SWITCH RED:
• Puertos: Cantidad y velocidad
• Velocidad: Gigabit, 10 Gigabit exacta
• Tipo: Managed, Unmanaged
• Especificaciones: PoE si soporta`,

        tablets: `REGLAS PARA TABLET:
• SO: iOS, Android versión
• Pantalla: Tamaño pulgadas, tecnología
• Procesador: Nombre exacto del chip
• RAM/Almacenamiento: GB exactos`,

        teclados_cableados_e_inalambricos: `REGLAS PARA TECLADO:
• Tipo: Mecánico, Membrana, Chiclet
• Distribución: QWERTY, DVORAK exacta
• Retroiluminación: RGB, Monocolors si tiene
• Conexión: USB, Wireless, Bluetooth`,

        pasta_termica: `REGLAS PARA PASTA TÉRMICA:
• Composición: Tipo base exacta
• Conductividad: W/mK especificado
• Densidad: g/cm³ si especifican
• Consistencia: Tipo para aplicación`,

        // NUEVAS CATEGORÍAS
        accesorios: `REGLAS PARA ACCESORIOS:
• Tipo: Limpieza, protección, organización, repuestos
• Compatibilidad: Dispositivos compatibles específicos
• Material: Composición del producto
• Incluye: Contenido del paquete
📝 META DESCRIPTION: "[Tipo accesorio] para [dispositivo]. [Material/característica]. [Beneficio]. [CTA]" (max 160 chars)`,

        infraestructura_de_red: `REGLAS PARA INFRAESTRUCTURA DE RED:
• Tipo: Rack, patch panel, organizador, herramientas
• Capacidad: U de rack, puertos de panel
• Material: Acero, aluminio, plástico
• Compatibilidad: Categoría de cable, estándares
📝 META DESCRIPTION: "[Tipo producto] para infraestructura de red. [Capacidad/puertos]. [Material]. [CTA]" (max 160 chars)`,

        portabilidad: `REGLAS PARA PORTABILIDAD:
• Tipo: Mochila, maletín, funda, estuche
• Capacidad: Tamaño laptop máximo en pulgadas
• Material: Nylon, poliéster, cuero, impermeable
• Compartimentos: Número y tipo de bolsillos
📝 META DESCRIPTION: "[Tipo producto] para laptop [tamaño]. [Material]. [Característica destacada]. [CTA]" (max 160 chars)`,

        smart_home: `REGLAS PARA SMART HOME:
• Tipo: Bombilla, enchufe, sensor, hub, cámara
• Conectividad: WiFi, Zigbee, Z-Wave, Bluetooth
• Compatibilidad: Alexa, Google Home, HomeKit
• Control: App específica, voz, programación
📝 META DESCRIPTION: "[Tipo dispositivo] inteligente. Compatible [asistentes]. [Característica clave]. [CTA]" (max 160 chars)`,

        drones: `REGLAS PARA DRONES:
• Tipo: Fotografía, recreativo, profesional, FPV
• Cámara: Resolución MP, video 4K/1080p, estabilización
• Autonomía: Tiempo de vuelo en minutos
• Alcance: Distancia máxima en metros/km
• Características: GPS, Follow Me, RTH
📝 META DESCRIPTION: "Drone [tipo] con cámara [resolución]. [Autonomía] min de vuelo. [Característica]. [CTA]" (max 160 chars)`,

        cargadores: `REGLAS PARA CARGADORES:
• Tipo: Pared, auto, inalámbrico, multi-puerto
• Potencia: Watts totales y por puerto
• Protocolo: Quick Charge, PD, SuperCharge
• Puertos: Número, tipos (USB-A, USB-C)
📝 META DESCRIPTION: "Cargador [tipo] [potencia]W. [Protocolo carga rápida]. [Puertos]. [CTA]" (max 160 chars)`,

        tableta_grafica: `REGLAS PARA TABLETA GRÁFICA:
• Área activa: Dimensiones en pulgadas
• Niveles presión: 2048, 4096, 8192
• Resolución: LPI especificado
• Conexión: USB, Bluetooth, inalámbrico
• Teclas: Número de teclas programables
📝 META DESCRIPTION: "Tableta gráfica [área activa]. [Niveles presión] niveles. [Teclas] express keys. [CTA]" (max 160 chars)`,

        cable_dvi: `REGLAS PARA CABLE DVI:
• Tipo: DVI-D, DVI-I, DVI-A, Single Link, Dual Link
• Resolución: Máxima soportada
• Longitud: Metros exactos
• Conectores: Tipo en cada extremo
📝 META DESCRIPTION: "Cable [tipo DVI] [longitud]m. Soporta [resolución]. [Calidad/blindaje]. [CTA]" (max 160 chars)`,

        internet_de_las_cosas: `REGLAS PARA IoT:
• Tipo: Sensor, actuador, módulo, kit desarrollo
• Conectividad: WiFi, LoRa, Sigfox, NB-IoT
• Protocolos: MQTT, HTTP, CoAP
• Alimentación: Voltaje, batería, solar
• Compatibilidad: Arduino, Raspberry Pi, ESP32
📝 META DESCRIPTION: "Dispositivo IoT [tipo]. Conectividad [protocolo]. Compatible [plataformas]. [CTA]" (max 160 chars)`
    };
    
    return rules[category] || `REGLAS GENERALES:
⚠️ SIEMPRE:
• Solo incluye información CONFIRMADA y específica
• Omite filas completas si NO hay datos (NO escribas "No", "N/A", "No especificado")
• Mantén EXACTAMENTE el formato del ejemplo HTML
• Asegura HTML válido y CSS consistente
• Secciones vacías → OMITE completamente

📝 META DESCRIPTION (máx 160 caracteres):
Crea descripción SEO concisa que incluya características clave + CTA`;
}

// =============================================
// EVENT LISTENERS
// =============================================
function initializeEventListeners() {
    // ===========================================
    // NAVBAR PRINCIPAL
    // ===========================================
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    // Toggle menú móvil
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navbarMenu.classList.toggle('active');
        });
    }
    
    // ===========================================
    // MEGA MENU
    // ===========================================
    const megaMenuBtn = document.getElementById('megaMenuBtn');
    const megaMenuContainer = document.getElementById('megaMenuContainer');
    const megaMenuOverlay = document.getElementById('megaMenuOverlay');
    const megaMenuItems = document.querySelectorAll('.mega-menu-item');
    
    // Toggle mega menu
    if (megaMenuBtn && megaMenuContainer) {
        megaMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = megaMenuContainer.classList.contains('active');
            
            // Cerrar otros dropdowns primero
            document.querySelectorAll('.nav-item.nav-dropdown').forEach(d => {
                if (d !== megaMenuContainer) d.classList.remove('active');
            });
            
            // Toggle mega menu y overlay
            megaMenuContainer.classList.toggle('active', !isActive);
            if (megaMenuOverlay) {
                megaMenuOverlay.classList.toggle('active', !isActive);
            }
        });
    }
    
    // Cerrar mega menu al hacer clic en overlay
    if (megaMenuOverlay) {
        megaMenuOverlay.addEventListener('click', () => {
            if (megaMenuContainer) megaMenuContainer.classList.remove('active');
            megaMenuOverlay.classList.remove('active');
        });
    }
    
    // Manejar clics en items del mega menu
    megaMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const category = item.getAttribute('data-category');
            if (category) {
                // Actualizar filtro
                appState.currentFilter = category;
                
                // Remover active de todos los items
                megaMenuItems.forEach(i => i.classList.remove('active'));
                // Agregar active al item clickeado
                item.classList.add('active');
                
                // Cerrar mega menu
                if (megaMenuContainer) megaMenuContainer.classList.remove('active');
                if (megaMenuOverlay) megaMenuOverlay.classList.remove('active');
                
                // Actualizar dropdown de categorías tradicional también
                const filterBtn = document.getElementById('filterBtn');
                if (filterBtn) {
                    const categoryText = item.querySelector('span').textContent;
                    filterBtn.innerHTML = `<i class="${item.querySelector('i').className}"></i> ${categoryText}`;
                }
                
                // Filtrar productos
                filterProducts();
                
                // Scroll a la sección de productos
                const productsSection = document.querySelector('.products-section');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Dropdowns del navbar (versiones)
    document.querySelectorAll('.nav-item.nav-dropdown:not(.nav-mega) .nav-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = btn.closest('.nav-item.nav-dropdown');
            const isActive = dropdown.classList.contains('active');
            
            // Cerrar mega menu si está abierto
            if (megaMenuContainer) megaMenuContainer.classList.remove('active');
            if (megaMenuOverlay) megaMenuOverlay.classList.remove('active');
            
            // Cerrar otros dropdowns
            document.querySelectorAll('.nav-item.nav-dropdown').forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active', !isActive);
        });
    });
    
    // Búsqueda en navbar (sincronizada)
    const searchInputNav = document.getElementById('searchInputNav');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    
    if (searchInputNav) {
        searchInputNav.addEventListener('input', (e) => {
            const value = e.target.value;
            appState.currentSearch = value;
            if (searchInput) searchInput.value = value;
            if (searchClear) searchClear.style.display = value ? 'flex' : 'none';
            filterProducts();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value;
            appState.currentSearch = value;
            if (searchInputNav) searchInputNav.value = value;
            if (searchClear) searchClear.style.display = value ? 'flex' : 'none';
            filterProducts();
        });
    }
    
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (searchInputNav) searchInputNav.value = '';
            searchClear.style.display = 'none';
            appState.currentSearch = '';
            filterProducts();
        });
    }
    
    // ===========================================
    // DROPDOWN DE CATEGORÍAS (tradicional)
    // ===========================================
    const filterBtn = document.getElementById('filterBtn');
    const filterDropdown = document.querySelector('.filter-dropdown');
    const dropdownClose = document.getElementById('dropdownClose');
    const categorySearch = document.getElementById('categorySearch');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            // Cerrar mega menu si está abierto
            if (megaMenuContainer) megaMenuContainer.classList.remove('active');
            if (megaMenuOverlay) megaMenuOverlay.classList.remove('active');
            
            filterDropdown.classList.toggle('active');
        });
    }
    
    if (dropdownClose) {
        dropdownClose.addEventListener('click', () => {
            if (filterDropdown) filterDropdown.classList.remove('active');
        });
    }
    
    // Cerrar dropdown y mega menu al hacer clic fuera
    document.addEventListener('click', (e) => {
        // Cerrar dropdown tradicional
        if (!e.target.closest('.filter-dropdown') && !e.target.closest('#filterBtn')) {
            if (filterDropdown) filterDropdown.classList.remove('active');
        }
        
        // Cerrar mega menu
        if (!e.target.closest('#megaMenuContainer') && !e.target.closest('#megaMenuBtn')) {
            if (megaMenuContainer) megaMenuContainer.classList.remove('active');
            if (megaMenuOverlay) megaMenuOverlay.classList.remove('active');
        }

        // Cerrar menú móvil
        if (!e.target.closest('.navbar-main')) {
            if (navbarMenu) navbarMenu.classList.remove('active');
        }
        
        // Cerrar dropdowns del navbar
        if (!e.target.closest('.nav-item.nav-dropdown')) {
            document.querySelectorAll('.nav-item.nav-dropdown').forEach(d => {
                d.classList.remove('active');
            });
        }
    });
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            appState.viewMode = btn.dataset.view;
            const grid = document.getElementById('productsGrid');
            grid.classList.toggle('list-view', appState.viewMode === 'list');
        });
    });
    
    // Modal
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', closeModal);
    
    // Tabs del modal
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });
    
    // Textarea
    const officialDescription = document.getElementById('officialDescription');
    const charCount = document.getElementById('charCount');
    const clearText = document.getElementById('clearText');
    
    officialDescription.addEventListener('input', () => {
        charCount.textContent = `${officialDescription.value.length} caracteres`;
        updateButtonStates();
    });
    
    clearText.addEventListener('click', () => {
        officialDescription.value = '';
        charCount.textContent = '0 caracteres';
        updateButtonStates();
    });
    
    // Botones de copiar
    document.getElementById('copyCodeBtn').addEventListener('click', copyCode);
    document.getElementById('copyCodeInline').addEventListener('click', copyCode);
    document.getElementById('copyFullPromptBtn').addEventListener('click', copyFullPrompt);
    document.getElementById('copyMetaPromptBtn').addEventListener('click', copyMetaPrompt);
    document.getElementById('copyGroqPromptBtn').addEventListener('click', copyGroqPrompt);
    
    // Atajos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// =============================================
// GENERAR DROPDOWN DE CATEGORÍAS
// =============================================
// Definición de grupos de categorías
const categoryGroups = {
    'Computadoras': ['laptop', 'procesadores', 'motherboard', 'memoria_ram', 'tarjetas_graficas', 'cooler', 'fuente_de_poder', 'case', 'gabinetes', 'pasta_termica'],
    'Protección Eléctrica': ['ups_y_ups_online', 'regulador_de_voltaje', 'supresor_de_voltaje', 'regletas'],
    'Impresoras': ['impresora_de_inyeccion', 'impresora_laser', 'impresora_matricial', 'impresora_termica', 'plotter', 'escaneres'],
    'Consumibles': ['cartuchos', 'tintas', 'toner', 'cinta'],
    'Periféricos': ['monitores', 'teclados_cableados_e_inalambricos', 'mouse_cableados', 'mouse_inalambricos', 'combo_teclado_y_mouse_cableados_e_inalambrico', 'audifonos_cableados_e_inalambricos', 'microfono', 'mouse_pad', 'accesorios'],
    'Almacenamiento': ['almacenamiento_externo', 'memorias_extraibles', 'enclousure'],
    'Conectividad': ['router', 'switches', 'punto_de_acceso', 'repetidores_de_red', 'amplificador_de_red', 'adaptador_de_red_usb', 'hostpot', 'hub_usb', 'infraestructura_de_red'],
    'Cables': ['cable_hdmi', 'cable_usb', 'cable_utp_y_bobina_de_cable', 'cables_vga', 'cable_dvi'],
    'CCTV / Vigilancia': ['camaras_de_vigilancia_analoga_ip_wifi', 'dvr', 'nvr'],
    'Video': ['proyectores', 'televisores', 'soporte_o_bracket', 'camara_de_video_web_dslr_digital'],
    'Electrónica': ['smartphone', 'tablets', 'smartwatches', 'drones', 'tableta_grafica', 'cargadores', 'estacion_de_carga'],
    'Smart Home / IoT': ['smart_home', 'iot', 'internet_de_las_cosas'],
    'Audio': ['bocina_e_inalambrica_y_sistema_de_audio'],
    'Portabilidad': ['bases_para_laptop', 'portabilidad'],
    'Office': ['software']
};

function generateCategoryDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    
    // Opción "Todas"
    let html = `
        <div class="dropdown-item active" data-category="all" onclick="selectCategory('all')">
            <div class="item-icon">
                <i class="fas fa-layer-group"></i>
            </div>
            <span class="item-name">Todas las categorías</span>
            <span class="item-count">${appState.allProducts.length}</span>
        </div>
    `;
    
    // Categorías agrupadas
    Object.entries(categoryGroups).forEach(([groupName, categories]) => {
        const groupProducts = appState.allProducts.filter(p => categories.includes(p.category));
        if (groupProducts.length === 0) return;
        
        html += `
            <div class="dropdown-group-header">
                <span>${groupName}</span>
                <span class="group-count">${groupProducts.length}</span>
            </div>
        `;
        
        groupProducts.forEach(product => {
            const iconClass = categoryIcons[product.category] || 'fa-box';
            html += `
                <div class="dropdown-item" data-category="${product.category}" onclick="selectCategory('${product.category}')">
                    <div class="item-icon">
                        <i class="fas ${iconClass}"></i>
                    </div>
                    <span class="item-name">${product.name}</span>
                </div>
            `;
        });
    });
    
    dropdownContent.innerHTML = html;
}

function filterCategoryList(search) {
    const items = document.querySelectorAll('.dropdown-item');
    const term = search.toLowerCase();
    
    items.forEach(item => {
        const name = item.querySelector('.item-name').textContent.toLowerCase();
        item.style.display = name.includes(term) ? 'flex' : 'none';
    });
}

function selectCategory(category) {
    appState.currentFilter = category;
    
    // Actualizar UI
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.toggle('active', item.dataset.category === category);
    });
    
    const selectedItem = document.querySelector(`.dropdown-item[data-category="${category}"]`);
    const filterBtnText = document.getElementById('filterBtnText');
    filterBtnText.textContent = selectedItem.querySelector('.item-name').textContent;
    
    // Cerrar dropdown
    document.getElementById('filterBtn').parentElement.classList.remove('active');
    
    filterProducts();
}

// =============================================
// FILTRAR PRODUCTOS
// =============================================
function filterProducts() {
    let filtered = appState.allProducts;
    
    // Filtrar por categoría
    if (appState.currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === appState.currentFilter);
    }
    
    // Filtrar por búsqueda
    if (appState.currentSearch) {
        const term = appState.currentSearch.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            p.tags.some(tag => tag.toLowerCase().includes(term))
        );
    }
    
    appState.filteredProducts = filtered;
    renderProducts();
}

function resetFilters() {
    appState.currentFilter = 'all';
    appState.currentSearch = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchClear').style.display = 'none';
    document.getElementById('filterBtnText').textContent = 'Todas las categorías';
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.toggle('active', item.dataset.category === 'all');
    });
    appState.filteredProducts = appState.allProducts;
    renderProducts();
}

// =============================================
// RENDERIZAR PRODUCTOS
// =============================================
function renderProducts() {
    console.log('📦 Renderizando productos...', {
        total: appState.filteredProducts.length,
        productos: appState.filteredProducts
    });
    
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!grid) {
        console.error('❌ ERROR: No se encontró el elemento productsGrid');
        return;
    }
    
    resultsCount.textContent = `${appState.filteredProducts.length} productos`;
    
    if (appState.filteredProducts.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'flex';
        console.warn('⚠️ No hay productos para mostrar');
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    grid.innerHTML = appState.filteredProducts.map(product => {
        const iconClass = categoryIcons[product.category] || 'fa-box';
        
        return `
            <div class="product-card" data-category="${product.category}" data-id="${product.id}">
                <div class="product-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-tags">
                    ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="btn-view" onclick="viewProduct(${product.id})">
                    <i class="fas fa-eye"></i>
                    Ver Código y Prompts
                </button>
            </div>
        `;
    }).join('');
    
    console.log('✅ Productos renderizados correctamente');
}

// =============================================
// VER PRODUCTO (ABRIR MODAL)
// =============================================
function viewProduct(productId) {
    const product = appState.allProducts.find(p => p.id === productId);
    if (!product) return;
    
    appState.currentProduct = product;
    const productData = appState.productsData[product.category];
    
    // Actualizar modal
    const iconClass = categoryIcons[product.category] || 'fa-box';
    document.getElementById('modalIcon').innerHTML = `<i class="fas ${iconClass}"></i>`;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalCategory').textContent = product.description;
    
    // Contenido
    if (productData) {
        document.getElementById('previewContainer').innerHTML = productData.htmlCode;
        document.getElementById('codeContent').textContent = productData.htmlCode;
    }
    
    // Limpiar textarea y actualizar placeholder dinámico
    const textarea = document.getElementById('officialDescription');
    textarea.value = '';
    textarea.placeholder = `Pega aquí las especificaciones de ${product.name} desde el sitio oficial del fabricante...`;
    document.getElementById('charCount').textContent = '0 caracteres';
    
    // Reset estados
    updateButtonStates();
    switchTab('input');
    
    // Mostrar modal
    document.getElementById('previewModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('previewModal').classList.remove('active');
    document.body.style.overflow = '';
    appState.currentProduct = null;
}

function switchTab(tabName) {
    // Actualizar tabs
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Actualizar contenido
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

function updateButtonStates() {
    const hasContent = document.getElementById('officialDescription').value.trim().length > 0;
    const status = document.getElementById('descriptionStatus');
    
    document.getElementById('copyFullPromptBtn').disabled = !hasContent;
    document.getElementById('copyMetaPromptBtn').disabled = !hasContent;
    document.getElementById('copyGroqPromptBtn').disabled = !hasContent;
    
    if (hasContent) {
        status.className = 'status-indicator success';
        status.innerHTML = '<i class="fas fa-check-circle"></i><span>¡Información lista! Puedes generar los prompts</span>';
    } else {
        status.className = 'status-indicator';
        status.innerHTML = '<i class="fas fa-info-circle"></i><span>Pega la información del producto para activar los botones de generación</span>';
    }
}

// =============================================
// FUNCIONES DE COPIAR
// =============================================
function copyCode() {
    if (!appState.currentProduct) return;
    
    const productData = appState.productsData[appState.currentProduct.category];
    if (!productData) {
        showToast('❌ Error: Código no disponible', 'error');
        return;
    }
    
    copyToClipboard(productData.htmlCode);
    showToast('✅ Código HTML copiado al portapapeles');
}

function copyFullPrompt() {
    if (!appState.currentProduct) return;
    
    const product = appState.currentProduct;
    const productData = appState.productsData[product.category];
    const officialDescription = document.getElementById('officialDescription').value.trim();
    
    if (!productData || !officialDescription) {
        showToast('⚠️ Pega la información del producto primero', 'warning');
        return;
    }
    
    const prompt = generateFullPrompt(product, productData.htmlCode, productData.promptRules, officialDescription);
    copyToClipboard(prompt);
    showToast('✅ Prompt ChatGPT copiado al portapapeles');
}

function copyMetaPrompt() {
    if (!appState.currentProduct) return;
    
    const product = appState.currentProduct;
    const officialDescription = document.getElementById('officialDescription').value.trim();
    
    if (!officialDescription) {
        showToast('⚠️ Pega la información del producto primero', 'warning');
        return;
    }
    
    const prompt = generateMetaDescriptionPrompt(product, officialDescription);
    copyToClipboard(prompt);
    showToast('✅ Prompt de Meta Descripción copiado');
}

function copyGroqPrompt() {
    if (!appState.currentProduct) return;
    
    const product = appState.currentProduct;
    const productData = appState.productsData[product.category];
    const officialDescription = document.getElementById('officialDescription').value.trim();
    
    if (!productData || !officialDescription) {
        showToast('⚠️ Pega la información del producto primero', 'warning');
        return;
    }
    
    const prompt = generateGroqPrompt(product, productData.htmlCode, productData.promptRules, officialDescription);
    copyToClipboard(prompt);
    showToast('✅ Prompt Groq copiado al portapapeles');
}

// =============================================
// GENERADORES DE PROMPTS
// =============================================
function generateFullPrompt(product, htmlCode, promptRules, officialDescription) {
    const isLaptop = product.category === 'laptop';
    
    const characteristicsRule = isLaptop 
        ? `⚠️ REGLA CRÍTICA PARA LAPTOPS: Las características Sí/No DEBEN estar TODAS. Si no hay info, escribe "No".`
        : `⚠️ REGLA CRÍTICA: Si una característica NO aparece → OMITE esa fila. NO escribas "No", "N/A".`;
    
    return `Eres un experto generando código HTML para descripciones de productos en Shopify.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 TAREA: Generar código HTML para ${product.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO con HTML + CSS juntos.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 INFORMACIÓN DEL PRODUCTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${officialDescription}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 CÓDIGO DE EJEMPLO (USA ESTA ESTRUCTURA):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${htmlCode}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 INSTRUCCIONES ESPECÍFICAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${promptRules}

${characteristicsRule}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ GENERA EL CÓDIGO HTML + CSS AHORA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function generateMetaDescriptionPrompt(product, officialDescription) {
    return `Eres un experto en SEO para eCommerce. Genera una meta descripción optimizada para Shopify.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 PRODUCTO: ${product.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 INFORMACIÓN DEL PRODUCTO:

${officialDescription}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 INSTRUCCIONES PARA META DESCRIPCIÓN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. LONGITUD: Entre 150-160 caracteres (obligatorio)
2. INCLUIR: Nombre del producto + característica principal + beneficio
3. CALL TO ACTION: Incluir una llamada a la acción sutil
4. KEYWORDS: Incluir palabras clave relevantes naturalmente
5. TONO: Comercial pero informativo, orientado a la conversión
6. FORMATO: Solo texto plano, sin HTML

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ FORMATO DE RESPUESTA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

META DESCRIPCIÓN:
[Tu meta descripción aquí - 150-160 caracteres]

CARACTERES: [número]

PALABRAS CLAVE INCLUIDAS:
• [palabra 1]
• [palabra 2]
• [palabra 3]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 GENERA LA META DESCRIPCIÓN AHORA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

function generateGroqPrompt(product, htmlCode, promptRules, officialDescription) {
    const isLaptop = product.category === 'laptop';
    
    const characteristicsRule = isLaptop 
        ? `⚠️ PARA LAPTOPS: Características Sí/No DEBEN estar TODAS. Si no hay info, escribe "No".`
        : `⚠️ OMISIÓN: Si una característica NO aparece → OMITE esa fila. NO escribas "No" o "N/A".`;

    return `# 🎯 TAREA: Generar código HTML para ${product.name}

## ⚠️ FORMATO OBLIGATORIO - GROQ API

Tu respuesta debe ser **ÚNICAMENTE UN BLOQUE DE CÓDIGO** con HTML + CSS juntos.

\`\`\`html
<!-- Tu código aquí -->
\`\`\`

---

## 📋 INFORMACIÓN DEL PRODUCTO:

\`\`\`
${officialDescription}
\`\`\`

---

## 📝 CÓDIGO DE EJEMPLO:

\`\`\`html
${htmlCode}
\`\`\`

---

## 📖 INSTRUCCIONES:

${promptRules}

${characteristicsRule}

---

## 🚀 GENERA EL CÓDIGO AHORA`;
}

// =============================================
// UTILIDADES
// =============================================
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('.toast-icon i');
    
    toastMessage.textContent = message;
    
    if (type === 'error') {
        toastIcon.className = 'fas fa-times-circle';
    } else if (type === 'warning') {
        toastIcon.className = 'fas fa-exclamation-circle';
    } else {
        toastIcon.className = 'fas fa-check-circle';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
