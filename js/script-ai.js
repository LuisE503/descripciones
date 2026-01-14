// =============================================
// GENERADOR DE DESCRIPCIONES SHOPIFY AI
// Script con Agente de IA Integrado
// Soporta: Groq API y OpenAI ChatGPT API
// =============================================

// Estado global de la aplicación
const appState = {
    currentFilter: 'all',
    currentSearch: '',
    allProducts: [],
    filteredProducts: [],
    currentProduct: null,
    productsData: {},
    viewMode: 'grid',
    // Configuración de IA
    aiConfig: {
        provider: 'groq', // 'groq' o 'chatgpt'
        groq: {
            apiKey: '',
            model: 'llama-3.3-70b-versatile'
        },
        chatgpt: {
            apiKey: '',
            model: 'gpt-4o'
        }
    },
    // Resultados de generación
    generatedHtml: '',
    generatedMeta: '',
    generatedTags: []
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
    escaneres: 'fa-expand',
    estacion_de_carga: 'fa-charging-station',
    gabinetes: 'fa-server',
    hostpot: 'fa-wifi',
    hub_usb: 'fa-usb',
    iot: 'fa-house-signal',
    memorias_extraibles: 'fa-sd-card',
    microfono: 'fa-microphone',
    mouse_cableados: 'fa-computer-mouse',
    mouse_inalambricos: 'fa-computer-mouse',
    mouse_pad: 'fa-square',
    nvr: 'fa-database',
    punto_de_acceso: 'fa-tower-cell',
    repetidores_de_red: 'fa-signal',
    router: 'fa-wifi',
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

// Grupos de categorías para navegación organizada
const categoryGroups = {
    'Computadoras': ['laptop', 'procesadores', 'motherboard', 'tarjetas_graficas', 'memoria_ram', 'cooler', 'pasta_termica', 'fuente_de_poder', 'gabinetes', 'case'],
    'Protección Eléctrica': ['ups_y_ups_online', 'regulador_de_voltaje', 'supresor_de_voltaje', 'regletas'],
    'Impresoras': ['impresora_de_inyeccion', 'impresora_laser', 'impresora_matricial', 'impresora_termica', 'plotter', 'escaneres'],
    'Consumibles': ['cartuchos', 'tintas', 'toner', 'cinta'],
    'Periféricos': ['teclados_cableados_e_inalambricos', 'mouse_cableados', 'mouse_inalambricos', 'combo_teclado_y_mouse_cableados_e_inalambrico', 'mouse_pad', 'audifonos_cableados_e_inalambricos', 'microfono'],
    'Almacenamiento': ['almacenamiento_externo', 'memorias_extraibles', 'enclousure'],
    'Conectividad': ['router', 'switches', 'punto_de_acceso', 'repetidores_de_red', 'amplificador_de_red', 'hostpot', 'adaptador_de_red_usb', 'hub_usb', 'infraestructura_de_red'],
    'Cables': ['cable_hdmi', 'cable_usb', 'cable_utp_y_bobina_de_cable', 'cables_vga', 'cable_dvi'],
    'CCTV y Vigilancia': ['camaras_de_vigilancia_analoga_ip_wifi', 'dvr', 'nvr'],
    'Video': ['monitores', 'televisores', 'proyectores', 'soporte_o_bracket'],
    'Electrónica': ['smartphone', 'tablets', 'smartwatches', 'camara_de_video_web_dslr_digital', 'drones', 'tableta_grafica'],
    'Smart Home e IoT': ['smart_home', 'iot', 'internet_de_las_cosas'],
    'Audio': ['bocina_e_inalambrica_y_sistema_de_audio'],
    'Portabilidad': ['bases_para_laptop', 'portabilidad'],
    'Office': ['software', 'estacion_de_carga', 'cargadores', 'accesorios']
};

// =============================================
// INICIALIZACIÓN
// =============================================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Inicializando aplicación AI...');
    
    // Cargar configuración guardada
    loadSavedConfig();
    
    // Cargar datos de productos
    appState.allProducts = getAllProducts();
    appState.filteredProducts = appState.allProducts;
    
    // Actualizar estadísticas
    document.getElementById('totalProducts').textContent = appState.allProducts.length;
    
    // Cargar contenido de archivos .txt
    await loadAllProductData();
    
    // Renderizar productos
    renderProducts();
    
    // Generar categorías
    generateCategoryDropdown();
    
    // Inicializar event listeners
    initializeEventListeners();
    
    // Actualizar estado de API
    updateApiStatus();
    
    console.log('✅ Aplicación AI inicializada correctamente');
});

// =============================================
// CONFIGURACIÓN DE API
// =============================================
function loadSavedConfig() {
    const savedConfig = localStorage.getItem('shopify_ai_config');
    if (savedConfig) {
        try {
            const config = JSON.parse(savedConfig);
            appState.aiConfig = { ...appState.aiConfig, ...config };
            console.log('📁 Configuración cargada desde localStorage');
        } catch (e) {
            console.warn('⚠️ Error al cargar configuración:', e);
        }
    }
}

function saveConfig() {
    localStorage.setItem('shopify_ai_config', JSON.stringify(appState.aiConfig));
    console.log('💾 Configuración guardada');
}

function updateApiStatus() {
    const statusEl = document.getElementById('aiStatus');
    const banner = document.getElementById('apiConfigBanner');
    const noConfigSection = document.getElementById('aiNoConfig');
    const aiOptions = document.querySelector('.ai-options');
    
    const hasApiKey = appState.aiConfig.groq.apiKey || appState.aiConfig.chatgpt.apiKey;
    
    if (hasApiKey) {
        statusEl.classList.add('connected');
        statusEl.innerHTML = `<i class="fas fa-circle"></i><span>${appState.aiConfig.provider === 'groq' ? 'Groq' : 'ChatGPT'} Conectado</span>`;
        banner.classList.add('hidden');
        
        if (noConfigSection) noConfigSection.style.display = 'none';
        if (aiOptions) aiOptions.style.display = 'grid';
    } else {
        statusEl.classList.remove('connected');
        statusEl.innerHTML = '<i class="fas fa-circle"></i><span>Configurar API</span>';
        banner.classList.remove('hidden');
        
        if (noConfigSection) noConfigSection.style.display = 'block';
        if (aiOptions) aiOptions.style.display = 'none';
    }
}

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

function getRulesForCategory(category) {
    const rules = {
        // CATEGORÍAS PROBLEMÁTICAS REPARADAS
        combo_teclado_y_mouse_cableados_e_inalambrico: `COMBO TECLADO Y MOUSE: Omite "No especificado". Solo incluye datos confirmados. Estructura: Identificación, Teclado, Mouse, Conexión, Características. Meta: "Combo teclado y mouse [tipo de conexión] [material/características]."`,

        memorias_extraibles: `MEMORIAS EXTRAIBLES: Diferencia USB DRIVE de SD CARD. NO MEZCLES tipos. Secciones: Almacenamiento, Velocidades, Interfaz, Compatibilidad. Omite información no confirmada. Meta: "[USB/SD] [capacidad] velocidad [MB/s]. Compatible con [dispositivos]."`,

        camaras_de_vigilancia_analoga_ip_wifi: `CÁMARAS VIGILANCIA: Información COMPLETA (no minimalista). Resolución, Sensor, Lente, Visión nocturna (con rango), Compresión. Tipos y Conectividad: Analógica/IP/WiFi, Conectores. Audio, Detección (movimiento, personas, animales). Meta: "Cámara [720p-4K] [tipo] visión nocturna [Xm]. [Tecnología]."`,

        hub_usb: `HUB USB: CAMBIO DESCRIPCIÓN OBLIGATORIO. Incluye: cantidad puertos, velocidad, características únicas. Información: Número puertos exacto, Tipo puerto, Velocidad, Alimentación (W si self-powered), Características (LED, switch). Meta: "Hub USB [X puertos] [velocidad] Gbps con [características]."`,

        microfono: `MICRÓFONO: CAMBIO DESCRIPCIÓN OBLIGATORIO. Incluye: tipo, interfaz, patrón polar. Si USB: patrón, frecuencia, sensibilidad, cancelación ruido. Si XLR: impedancia, SPL máximo. Accesorios incluidos. Meta: "Micrófono [tipo] [interfaz] patrón [cardinal]. Ideal para [uso]."`,

        cable_utp_y_bobina_de_cable: `CABLE UTP/BOBINA: SEPARACIÓN CLARA. Individuales vs Bobinas. NO MEZCLES con accesorios. Categoría (CAT5e/6/6A/7), Velocidad máxima, Impedancia, AWG, Apantallamiento, Longitud exacta. Meta: "Cable UTP CAT[X] [metros/bobina]. Velocidad hasta [Gbps]."`,

        bocina_e_inalambrica_y_sistema_de_audio: `BOCINA/AUDIO: ESTRUCTURA HTML VÁLIDA. Verifica <div> y <td> balanceados. Tipos: Inalámbrica (Bluetooth, alcance, batería), Sistemas (2.1, 5.1, Surround), Cableada (conectores). Potencia (W RMS), Frecuencia exacta, Impedancia, Drivers, Conectividad. Meta: "Bocina [tipo] [potencia]W Bluetooth. Sonido [característica]."`,

        nvr: `NVR: CAMBIO DESCRIPCIÓN OBLIGATORIO. Especifica: canales IP, resolución máxima, almacenamiento. Información: Canales IP exactos, Resolución máxima, Almacenamiento TB, Bahías HDD, Codificación (H.265/H.264), Ancho banda. Conectividad: Ethernet, HDMI, USB, PoE+. Meta: "NVR [X canales] IP [resolución] [TB almacenamiento]. Grabación continua."`,

        smartphone: `SMARTPHONE: CAMBIO DESCRIPCIÓN OBLIGATORIO. Incluye: SO (versión), Procesador exacto, RAM, Almacenamiento. Información: SO versión, Procesador (A16, Snapdragon 8 Gen 2, etc.), RAM GB, Almacenamiento, Pantalla (tamaño, tecnología), Cámara trasera (MP, sensores), Cámara frontal. Adicionales: Batería mAh, Carga rápida W, IP rating, Conectividad 5G/NFC. Meta: "[Modelo] [SO] [procesador] [RAM]GB [almacenamiento]. Pantalla [tamaño]."`,

        // CATEGORÍAS ESTÁNDAR
        cartuchos: `Cartuchos: Color (Negro, Tricolor). Compatibilidad con modelos separados |. Rendimiento páginas si especifican. Tamaño Standard/XL solo si confirman.`,
        case: `Case: Clasificación (MID/FULL/MINI TOWER, ATX/MICRO/MINI). Socket CPU. Soporte Motherboard. Paneles (Acrílico, Vidrio) si confirman.`,
        laptop: `Laptop: Nivel (Essential, Standard, Premium, Gaming). TODAS características Sí/No DEBEN estar. Peso kg, Batería horas.`,
        monitores: `Monitores: Panel (IPS, VA, OLED). Resolución sin espacios. Hz exacto. VESA si especifican.`,
        impresora_de_inyeccion: `Inyección: Tecnología, Resolución DPI, Velocidad PPM, Conectividad (USB, WiFi, Ethernet).`,
        procesadores: `Procesadores: Marca, Socket, Núcleos/Hilos, Frecuencia Base y Turbo GHz.`,
        motherboard: `Motherboard: Chipset exacto, Socket, RAM máximo (DDR4/DDR5), Slots M.2/PCIe.`,
        tarjetas_graficas: `Gráficas: Memoria GB (GDDR6, HBM2), Chip exacto, TDP W, Conectores (HDMI, DP).`,
        televisores: `Televisores: Pulgadas exactas, Resolución (Full HD, 4K, 8K), Panel (IPS, VA, QLED, OLED), Smart SO.`,
        ups_y_ups_online: `UPS: Capacidad VA/W, Autonomía minutos/horas, Número salidas, Tipo (Línea, Online, Standby).`,
        adaptador_de_red_usb: `Adaptador: Tipo (WiFi, Ethernet, LTE), Velocidad Mbps/Gbps, Tecnología exacta, Compatibilidad SO.`,
        almacenamiento_externo: `Almacenamiento: Tipo (HDD, SSD), Capacidad TB/GB, Interfaz (USB 2.0/3.0/3.1/USB-C), Velocidad MB/s.`,
        amplificador_de_red: `Amplificador: Estándar (802.11n/ac/WiFi 6), Cobertura metros, Compatibilidad banda, Antenas cantidad.`,
        audifonos_cableados_e_inalambricos: `Audífonos: Tipo (Over/On/In-ear), Drivers tamaño mm, Impedancia Ohms, Cable longitud si cableado.`,
        bases_para_laptop: `Base Laptop: Ángulo grados, Material (Aluminio, Plástico, Bambú), Puertos (Hub USB), Refrigeración ventiladores.`,
        cable_hdmi: `Cable HDMI: Versión (2.0, 2.1), Longitud metros, Tipo (Estándar, Mini, Micro), 4K/HDR si soporta.`,
        cable_usb: `Cable USB: Tipo (USB-A, USB-C, Micro, Lightning), Versión (2.0, 3.0, 3.1), Longitud, Carga rápida mA.`,
        cables_vga: `Cable VGA: Longitud metros, Densidad 15 pin, Ferrita si tiene, Blindaje (Doble, Triple).`,
        camara_de_video_web_dslr_digital: `Cámara: Resolución (720p, 1080p, 4K), Sensor (tamaño, tipo), FPS cada resolución, Conectividad (USB, HDMI).`,
        dvr: `DVR: Canales exactos, Resolución (CIF, D1, 720p, 1080p), Almacenamiento TB máximo, Video PAL/NTSC.`,
        enclousure: `Enclosure: Compatibilidad (2.5", 3.5"), Interfaz (USB 2.0/3.0/SATA), Material, Cable incluido.`,
        escaneres: `Escáner: Tipo (Plano, ADF, Rollo), Resolución DPI máximo, Velocidad PPM, Conectividad (USB, Red).`,
        estacion_de_carga: `Estación: Puertos (USB-A, USB-C cantidad), Potencia W máximo, Dispositivos simultáneos, Carga rápida/inalámbrica.`,
        gabinetes: `Gabinete: Factor (ATX, MICRO, MINI), Bahías cantidad, Slots tarjeta gráfica máximo, Ventiladores incluidos.`,
        hostpot: `Hotspot: Red (3G, 4G, 5G), Batería autonomía horas, Velocidad Mbps, WiFi estándar 802.11.`,
        iot: `IoT: Tecnología (WiFi, Bluetooth, Zigbee), Función automatización, Control (App, Voz), Compatibilidad ecosistemas.`,
        mouse_cableados: `Mouse Cableado: Sensor (Óptico, Láser), DPI máximo, Botones cantidad, Cable longitud metros.`,
        mouse_inalambricos: `Mouse Inalámbrico: Tecnología (Bluetooth, 2.4GHz), Batería autonomía horas, DPI máximo, Rango metros.`,
        mouse_pad: `Mouse Pad: Dimensiones exactas cm, Material (Tela, Caucho), Base antideslizante, RGB/Inalámbrico.`,
        punto_de_acceso: `Punto Acceso: Estándar (WiFi 5, WiFi 6), Puertos Ethernet cantidad, Potencia W, Cobertura metros.`,
        repetidores_de_red: `Repetidor: Estándar (802.11ac, WiFi 6), Velocidad Mbps máximo, Cobertura metros adicionales, Antenas cantidad.`,
        router: `Router: Estándar (WiFi 5, WiFi 6), Velocidad Mbps, Antenas cantidad, Puertos Ethernet (WAN/LAN).`,
        smartwatches: `Smartwatch: SO (watchOS, Wear OS), Pantalla (AMOLED, LCD), Batería días autonomía, Conectividad (Bluetooth, Cellular).`,
        switches: `Switch: Puertos cantidad/velocidad, Velocidad (Gigabit, 10 Gigabit), Tipo (Managed, Unmanaged), PoE si soporta.`,
        tablets: `Tablet: SO (iOS, Android versión), Pantalla (tamaño pulgadas, tecnología), Procesador exacto, RAM/Almacenamiento GB.`,
        teclados_cableados_e_inalambricos: `Teclado: Tipo (Mecánico, Membrana, Chiclet), Distribución (QWERTY, DVORAK), Retroiluminación (RGB, Mono), Conexión (USB, Wireless).`,
        pasta_termica: `Pasta Térmica: Composición base exacta, Conductividad W/mK, Densidad g/cm³, Consistencia para aplicación.`,
        // NUEVAS CATEGORÍAS
        accesorios: `Accesorio: Tipo (limpieza, protección, organización), Compatibilidad dispositivos, Material, Contenido paquete.`,
        infraestructura_de_red: `Infraestructura Red: Tipo (rack, patch panel, organizador), Capacidad (U, puertos), Material, Compatibilidad categoría cable.`,
        portabilidad: `Portabilidad: Tipo (mochila, maletín, funda), Capacidad laptop pulgadas, Material, Compartimentos número.`,
        smart_home: `Smart Home: Tipo dispositivo, Conectividad (WiFi, Zigbee), Compatibilidad (Alexa, Google Home), Control (app, voz).`,
        drones: `Drone: Tipo (fotografía, FPV), Cámara resolución, Autonomía minutos vuelo, Alcance metros, Características (GPS, RTH).`,
        cargadores: `Cargador: Tipo (pared, auto, inalámbrico), Potencia Watts, Protocolo (QC, PD), Puertos número y tipo.`,
        tableta_grafica: `Tableta Gráfica: Área activa pulgadas, Niveles presión, Resolución LPI, Conexión, Teclas programables.`,
        cable_dvi: `Cable DVI: Tipo (DVI-D, DVI-I, Single/Dual Link), Resolución máxima, Longitud metros, Conectores.`,
        internet_de_las_cosas: `IoT: Tipo (sensor, módulo, kit), Conectividad (WiFi, LoRa), Protocolos (MQTT, HTTP), Compatibilidad (Arduino, ESP32).`
    };
    return rules[category] || `Solo información confirmada. Omite sin datos. META (máx 160 caracteres): Especificar características clave + CTA.`;
}

// =============================================
// EVENT LISTENERS
// =============================================
function initializeEventListeners() {
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    
    searchInput.addEventListener('input', (e) => {
        appState.currentSearch = e.target.value;
        searchClear.style.display = e.target.value ? 'flex' : 'none';
        filterProducts();
    });
    
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        appState.currentSearch = '';
        filterProducts();
    });
    
    // Dropdown de filtros
    const filterBtn = document.getElementById('filterBtn');
    const dropdownClose = document.getElementById('dropdownClose');
    const categorySearch = document.getElementById('categorySearch');
    
    filterBtn.addEventListener('click', () => {
        filterBtn.parentElement.classList.toggle('active');
    });
    
    dropdownClose.addEventListener('click', () => {
        filterBtn.parentElement.classList.remove('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
            filterBtn.parentElement.classList.remove('active');
        }
    });
    
    categorySearch.addEventListener('input', (e) => {
        filterCategoryList(e.target.value);
    });
    
    // Modal de Configuración
    document.getElementById('openConfigBtn').addEventListener('click', openConfigModal);
    document.getElementById('configModalClose').addEventListener('click', closeConfigModal);
    document.getElementById('configModalOverlay').addEventListener('click', closeConfigModal);
    
    // Provider tabs
    document.querySelectorAll('.provider-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.provider-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.provider-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`${tab.dataset.provider}Config`).classList.add('active');
            
            appState.aiConfig.provider = tab.dataset.provider;
        });
    });
    
    // Toggle visibility
    document.querySelectorAll('.toggle-visibility').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            const icon = btn.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    });
    
    // Test API
    document.getElementById('testApiBtn').addEventListener('click', testApiConnection);
    
    // Save Config
    document.getElementById('saveConfigBtn').addEventListener('click', () => {
        saveApiConfig();
        closeConfigModal();
    });
    
    // Modal Principal
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
    
    // Go to AI tab
    document.getElementById('goToAiTab').addEventListener('click', () => {
        switchTab('ai');
    });
    
    // AI Buttons
    document.getElementById('generateHtmlBtn').addEventListener('click', () => generateWithAI('html'));
    document.getElementById('generateMetaBtn').addEventListener('click', () => generateWithAI('meta'));
    document.getElementById('generateBothBtn').addEventListener('click', () => generateWithAI('both'));
    
    // Copy generated
    document.getElementById('copyGeneratedHtml').addEventListener('click', () => {
        copyToClipboard(appState.generatedHtml);
        showToast('✅ Código HTML copiado');
    });
    
    document.getElementById('copyGeneratedMeta').addEventListener('click', () => {
        copyToClipboard(appState.generatedMeta);
        showToast('✅ Meta descripción copiada');
    });
    
    // Open config from AI tab
    document.getElementById('openConfigFromAi').addEventListener('click', openConfigModal);
    
    // Retry
    document.getElementById('retryBtn').addEventListener('click', () => {
        document.getElementById('aiError').style.display = 'none';
        document.querySelector('.ai-options').style.display = 'grid';
    });
    
    // Copy buttons footer
    document.getElementById('copyCodeBtn').addEventListener('click', copyCode);
    document.getElementById('copyCodeInline').addEventListener('click', copyCode);
    document.getElementById('copyFullPromptBtn').addEventListener('click', copyFullPrompt);
    document.getElementById('copyQwenPromptBtn').addEventListener('click', copyQwenPrompt);
    document.getElementById('copyMetaPromptBtn').addEventListener('click', copyMetaPrompt);
    document.getElementById('copyGroqPromptBtn').addEventListener('click', copyGroqPrompt);
    
    // Tags generation
    document.getElementById('generateTagsBtn').addEventListener('click', () => generateWithAI('tags'));
    document.getElementById('copyGeneratedTags').addEventListener('click', copyAllTags);
    
    // Atajos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeConfigModal();
        }
    });
}

// =============================================
// MODAL DE CONFIGURACIÓN
// =============================================
function openConfigModal() {
    // Cargar valores actuales
    document.getElementById('groqApiKey').value = appState.aiConfig.groq.apiKey;
    document.getElementById('groqModel').value = appState.aiConfig.groq.model;
    document.getElementById('chatgptApiKey').value = appState.aiConfig.chatgpt.apiKey;
    document.getElementById('chatgptModel').value = appState.aiConfig.chatgpt.model;
    
    // Seleccionar provider activo
    document.querySelectorAll('.provider-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.provider === appState.aiConfig.provider);
    });
    document.querySelectorAll('.provider-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`${appState.aiConfig.provider}Config`).classList.add('active');
    
    document.getElementById('configModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeConfigModal() {
    document.getElementById('configModal').classList.remove('active');
    document.body.style.overflow = '';
}

function saveApiConfig() {
    appState.aiConfig.groq.apiKey = document.getElementById('groqApiKey').value.trim();
    appState.aiConfig.groq.model = document.getElementById('groqModel').value;
    appState.aiConfig.chatgpt.apiKey = document.getElementById('chatgptApiKey').value.trim();
    appState.aiConfig.chatgpt.model = document.getElementById('chatgptModel').value;
    
    saveConfig();
    updateApiStatus();
    showToast('✅ Configuración guardada');
}

async function testApiConnection() {
    const btn = document.getElementById('testApiBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Probando...';
    
    try {
        const provider = appState.aiConfig.provider;
        const apiKey = provider === 'groq' 
            ? document.getElementById('groqApiKey').value.trim()
            : document.getElementById('chatgptApiKey').value.trim();
        
        if (!apiKey) {
            throw new Error('Por favor ingresa una API Key');
        }
        
        // Test simple
        const response = await callAI('Di "conexión exitosa" en español.', provider, apiKey);
        
        if (response) {
            showToast('✅ Conexión exitosa con ' + (provider === 'groq' ? 'Groq' : 'ChatGPT'));
        }
    } catch (error) {
        showToast('❌ Error: ' + error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-vial"></i> Probar Conexión';
    }
}

// =============================================
// LLAMADAS A API DE IA
// =============================================
async function callAI(prompt, provider = null, apiKey = null) {
    provider = provider || appState.aiConfig.provider;
    
    if (provider === 'groq') {
        return await callGroqAPI(prompt, apiKey);
    } else {
        return await callChatGPTAPI(prompt, apiKey);
    }
}

async function callGroqAPI(prompt, apiKey = null) {
    apiKey = apiKey || appState.aiConfig.groq.apiKey;
    const model = appState.aiConfig.groq.model;
    
    if (!apiKey) {
        throw new Error('API Key de Groq no configurada');
    }
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            messages: [
                {
                    role: 'system',
                    content: 'Eres un experto en generación de código HTML para descripciones de productos de eCommerce en Shopify. Respondes solo con el código solicitado, sin explicaciones adicionales.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 4096
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Error en la API de Groq');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

async function callChatGPTAPI(prompt, apiKey = null) {
    apiKey = apiKey || appState.aiConfig.chatgpt.apiKey;
    const model = appState.aiConfig.chatgpt.model;
    
    if (!apiKey) {
        throw new Error('API Key de ChatGPT no configurada');
    }
    
    // ChatGPT usa la API de OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            messages: [
                {
                    role: 'system',
                    content: 'Eres un experto en generación de código HTML para descripciones de productos de eCommerce en Shopify. Respondes solo con el código solicitado, sin explicaciones adicionales.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 4096
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Error en la API de ChatGPT');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// =============================================
// GENERACIÓN CON IA
// =============================================
async function generateWithAI(type) {
    const product = appState.currentProduct;
    const productData = appState.productsData[product.category];
    const officialDescription = document.getElementById('officialDescription').value.trim();
    
    if (!officialDescription) {
        showToast('⚠️ Pega la información del producto primero', 'warning');
        switchTab('input');
        return;
    }
    
    // Mostrar loading
    document.querySelector('.ai-options').style.display = 'none';
    document.getElementById('aiResults').style.display = 'none';
    document.getElementById('aiError').style.display = 'none';
    document.getElementById('aiLoading').style.display = 'block';
    
    try {
        if (type === 'html' || type === 'both') {
            document.getElementById('loadingMessage').textContent = 'Generando código HTML...';
            const htmlPrompt = buildHtmlPrompt(product, productData, officialDescription);
            const htmlResult = await callAI(htmlPrompt);
            appState.generatedHtml = extractCode(htmlResult);
            
            // Actualizar preview
            document.getElementById('previewContainer').innerHTML = appState.generatedHtml;
            document.getElementById('codeContent').textContent = appState.generatedHtml;
        }
        
        if (type === 'meta' || type === 'both') {
            document.getElementById('loadingMessage').textContent = 'Generando meta descripción...';
            const metaPrompt = buildMetaPrompt(product, officialDescription);
            const metaResult = await callAI(metaPrompt);
            appState.generatedMeta = extractMetaDescription(metaResult);
        }
        
        if (type === 'tags') {
            document.getElementById('loadingMessage').textContent = 'Generando etiquetas Shopify...';
            const tagsPrompt = buildTagsPrompt(product, officialDescription);
            const tagsResult = await callAI(tagsPrompt);
            appState.generatedTags = extractTags(tagsResult);
            renderTags(appState.generatedTags);
        }
        
        // Mostrar resultados
        document.getElementById('aiLoading').style.display = 'none';
        document.getElementById('aiResults').style.display = 'block';
        
        if (type === 'html' || type === 'both') {
            document.getElementById('htmlResultSection').style.display = 'block';
            document.getElementById('generatedHtmlCode').textContent = appState.generatedHtml;
        } else if (type !== 'tags') {
            document.getElementById('htmlResultSection').style.display = 'none';
        }
        
        if (type === 'meta' || type === 'both') {
            document.getElementById('metaResultSection').style.display = 'block';
            document.getElementById('generatedMetaText').textContent = appState.generatedMeta;
            document.getElementById('metaCharCount').textContent = `${appState.generatedMeta.length} caracteres`;
        } else if (type !== 'tags') {
            document.getElementById('metaResultSection').style.display = 'none';
        }
        
        if (type === 'tags') {
            document.getElementById('tagsResultSection').style.display = 'block';
            document.getElementById('htmlResultSection').style.display = 'none';
            document.getElementById('metaResultSection').style.display = 'none';
        } else {
            document.getElementById('tagsResultSection').style.display = 'none';
        }
        
        showToast('✅ Generación completada');
        
    } catch (error) {
        console.error('Error en generación:', error);
        document.getElementById('aiLoading').style.display = 'none';
        document.getElementById('aiError').style.display = 'block';
        document.getElementById('errorMessage').textContent = error.message;
    }
}

function buildHtmlPrompt(product, productData, officialDescription) {
    const isLaptop = product.category === 'laptop';
    const rules = productData.promptRules;
    const exampleCode = productData.htmlCode;
    
    return `Genera código HTML para la descripción de un ${product.name} en Shopify.

INFORMACIÓN DEL PRODUCTO:
${officialDescription}

CÓDIGO DE EJEMPLO (usa esta estructura exacta):
${exampleCode}

REGLAS ESPECÍFICAS:
${rules}

${isLaptop ? 'IMPORTANTE: Todas las características Sí/No deben estar presentes. Si no hay información, escribe "No".' : 'IMPORTANTE: Omite las filas sin información. No escribas "N/A" o "No disponible".'}

Responde SOLO con el código HTML + CSS completo, sin explicaciones.`;
}

function buildMetaPrompt(product, officialDescription) {
    return `Genera una meta descripción SEO optimizada para un ${product.name} en una tienda Shopify.

INFORMACIÓN DEL PRODUCTO:
${officialDescription}

REQUISITOS:
- Longitud: Entre 150-160 caracteres (obligatorio)
- Incluir nombre del producto y característica principal
- Incluir una llamada a la acción sutil
- Tono comercial pero informativo
- Solo texto plano, sin HTML

Responde SOLO con la meta descripción, sin explicaciones ni formato adicional.`;
}

function extractCode(response) {
    // Intentar extraer código de bloques de código
    const codeBlockMatch = response.match(/```(?:html)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
        return codeBlockMatch[1].trim();
    }
    // Si no hay bloques, devolver todo el contenido
    return response.trim();
}

function extractMetaDescription(response) {
    // Limpiar la respuesta de posibles formatos
    let meta = response.replace(/^META DESCRIPCIÓN:\s*/i, '');
    meta = meta.replace(/^["']|["']$/g, '');
    meta = meta.split('\n')[0].trim();
    return meta;
}

// =============================================
// GENERAR DROPDOWN DE CATEGORÍAS
// =============================================
function generateCategoryDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    
    let html = `
        <div class="dropdown-item active" data-category="all" onclick="selectCategory('all')">
            <div class="item-icon">
                <i class="fas fa-layer-group"></i>
            </div>
            <span class="item-name">Todas las categorías</span>
            <span class="item-count">${appState.allProducts.length}</span>
        </div>
    `;
    
    // Crear un mapa de categorías disponibles para búsqueda rápida
    const availableCategories = new Map();
    appState.allProducts.forEach(product => {
        availableCategories.set(product.category, product);
    });
    
    // Generar dropdown agrupado
    for (const [groupName, categories] of Object.entries(categoryGroups)) {
        // Filtrar solo categorías que existen en los productos
        const groupProducts = categories.filter(cat => availableCategories.has(cat));
        
        if (groupProducts.length === 0) continue;
        
        // Header del grupo
        html += `
            <div class="dropdown-group-header">
                <span>${groupName}</span>
                <span class="group-count">${groupProducts.length}</span>
            </div>
        `;
        
        // Items del grupo
        groupProducts.forEach(category => {
            const product = availableCategories.get(category);
            const iconClass = categoryIcons[category] || 'fa-box';
            html += `
                <div class="dropdown-item" data-category="${category}" onclick="selectCategory('${category}')">
                    <div class="item-icon">
                        <i class="fas ${iconClass}"></i>
                    </div>
                    <span class="item-name">${product.name}</span>
                </div>
            `;
        });
    }
    
    // Categorías no agrupadas (si las hay)
    const groupedCategories = new Set(Object.values(categoryGroups).flat());
    const ungroupedProducts = appState.allProducts.filter(p => !groupedCategories.has(p.category));
    
    if (ungroupedProducts.length > 0) {
        html += `
            <div class="dropdown-group-header">
                <span>Otros</span>
                <span class="group-count">${ungroupedProducts.length}</span>
            </div>
        `;
        
        ungroupedProducts.forEach(product => {
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
    }
    
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
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.classList.toggle('active', item.dataset.category === category);
    });
    const selectedItem = document.querySelector(`.dropdown-item[data-category="${category}"]`);
    document.getElementById('filterBtnText').textContent = selectedItem.querySelector('.item-name').textContent;
    document.getElementById('filterBtn').parentElement.classList.remove('active');
    filterProducts();
}

// =============================================
// FILTRAR PRODUCTOS
// =============================================
function filterProducts() {
    let filtered = appState.allProducts;
    
    if (appState.currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === appState.currentFilter);
    }
    
    if (appState.currentSearch) {
        const term = appState.currentSearch.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
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
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');
    
    resultsCount.textContent = `${appState.filteredProducts.length} productos`;
    
    if (appState.filteredProducts.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'flex';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    const hasApiKey = appState.aiConfig.groq.apiKey || appState.aiConfig.chatgpt.apiKey;
    
    grid.innerHTML = appState.filteredProducts.map(product => {
        const iconClass = categoryIcons[product.category] || 'fa-box';
        return `
            <div class="product-card ${hasApiKey ? 'ai-enabled' : ''}" data-category="${product.category}" data-id="${product.id}">
                <div class="product-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-tags">
                    ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="btn-view" onclick="viewProduct(${product.id})">
                    <i class="fas ${hasApiKey ? 'fa-robot' : 'fa-eye'}"></i>
                    ${hasApiKey ? 'Generar con IA' : 'Ver Prompts'}
                </button>
            </div>
        `;
    }).join('');
}

// =============================================
// VER PRODUCTO
// =============================================
function viewProduct(productId) {
    const product = appState.allProducts.find(p => p.id === productId);
    if (!product) return;
    
    appState.currentProduct = product;
    const productData = appState.productsData[product.category];
    
    // Resetear estados
    appState.generatedHtml = '';
    appState.generatedMeta = '';
    
    // Actualizar modal
    const iconClass = categoryIcons[product.category] || 'fa-box';
    document.getElementById('modalIcon').innerHTML = `<i class="fas ${iconClass}"></i>`;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalCategory').textContent = product.description;
    
    if (productData) {
        document.getElementById('previewContainer').innerHTML = productData.htmlCode;
        document.getElementById('codeContent').textContent = productData.htmlCode;
    }
    
    // Limpiar textarea y actualizar placeholder dinámico
    const textarea = document.getElementById('officialDescription');
    textarea.value = '';
    textarea.placeholder = `Pega aquí las especificaciones de ${product.name} desde el sitio oficial del fabricante...`;
    document.getElementById('charCount').textContent = '0 caracteres';
    
    // Reset AI section
    document.getElementById('aiResults').style.display = 'none';
    document.getElementById('aiLoading').style.display = 'none';
    document.getElementById('aiError').style.display = 'none';
    
    const hasApiKey = appState.aiConfig.groq.apiKey || appState.aiConfig.chatgpt.apiKey;
    document.getElementById('aiNoConfig').style.display = hasApiKey ? 'none' : 'block';
    document.querySelector('.ai-options').style.display = hasApiKey ? 'grid' : 'none';
    
    updateButtonStates();
    switchTab('input');
    
    document.getElementById('previewModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('previewModal').classList.remove('active');
    document.body.style.overflow = '';
    appState.currentProduct = null;
}

function switchTab(tabName) {
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

function updateButtonStates() {
    const hasContent = document.getElementById('officialDescription').value.trim().length > 0;
    const hasApiKey = appState.aiConfig.groq.apiKey || appState.aiConfig.chatgpt.apiKey;
    
    document.getElementById('goToAiTab').disabled = !hasContent;
    document.getElementById('copyFullPromptBtn').disabled = !hasContent;
    document.getElementById('copyQwenPromptBtn').disabled = !hasContent;
    document.getElementById('copyMetaPromptBtn').disabled = !hasContent;
    document.getElementById('copyGroqPromptBtn').disabled = !hasContent;
    
    document.getElementById('generateHtmlBtn').disabled = !hasContent || !hasApiKey;
    document.getElementById('generateMetaBtn').disabled = !hasContent || !hasApiKey;
    document.getElementById('generateBothBtn').disabled = !hasContent || !hasApiKey;
    document.getElementById('generateTagsBtn').disabled = !hasContent || !hasApiKey;
}

// =============================================
// FUNCIONES DE COPIAR
// =============================================
function copyCode() {
    if (!appState.currentProduct) return;
    const productData = appState.productsData[appState.currentProduct.category];
    if (!productData) {
        showToast('❌ Código no disponible', 'error');
        return;
    }
    copyToClipboard(appState.generatedHtml || productData.htmlCode);
    showToast('✅ Código HTML copiado');
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
    
    const prompt = buildHtmlPrompt(product, productData, officialDescription);
    copyToClipboard(prompt);
    showToast('✅ Prompt ChatGPT copiado');
}

function copyMetaPrompt() {
    if (!appState.currentProduct) return;
    const product = appState.currentProduct;
    const officialDescription = document.getElementById('officialDescription').value.trim();
    
    if (!officialDescription) {
        showToast('⚠️ Pega la información del producto primero', 'warning');
        return;
    }
    
    const prompt = buildMetaPrompt(product, officialDescription);
    copyToClipboard(prompt);
    showToast('✅ Prompt Meta copiado');
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
    
    const prompt = `# Genera código HTML para ${product.name}

## Información del producto:
${officialDescription}

## Código de ejemplo:
\`\`\`html
${productData.htmlCode}
\`\`\`

## Reglas:
${productData.promptRules}

Responde solo con el código HTML + CSS completo.`;
    
    copyToClipboard(prompt);
    showToast('✅ Prompt Groq copiado');
}

function copyQwenPrompt() {
    if (!appState.currentProduct) return;
    const product = appState.currentProduct;
    const productData = appState.productsData[product.category];
    const officialDescription = document.getElementById('officialDescription').value.trim();
    
    if (!productData || !officialDescription) {
        showToast('⚠️ Pega la información del producto primero', 'warning');
        return;
    }
    
    const prompt = generateQwenPrompt(product, productData.htmlCode, productData.promptRules, officialDescription);
    copyToClipboard(prompt);
    showToast('✅ Prompt Qwen copiado');
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
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// =============================================
// GENERACIÓN DE TAGS DE SHOPIFY
// =============================================
function buildTagsPrompt(product, officialDescription) {
    return `Genera las mejores etiquetas/tags para un producto de Shopify.

PRODUCTO: ${product.name}
CATEGORÍA: ${product.category}

INFORMACIÓN DEL PRODUCTO:
${officialDescription}

REQUISITOS:
- Genera entre 10 y 15 etiquetas relevantes
- Las etiquetas deben ayudar a la búsqueda y organización en Shopify
- Incluir: marca, tipo de producto, características principales, uso, compatibilidad
- Las etiquetas deben ser cortas (1-3 palabras cada una)
- Usa español
- No uses caracteres especiales ni acentos
- Separa las etiquetas con comas

FORMATO DE RESPUESTA:
Responde SOLO con las etiquetas separadas por comas, sin explicaciones adicionales.
Ejemplo: laptop, gaming, intel, 16gb ram, ssd, nvidia, portatil, gamer`;
}

function extractTags(response) {
    // Limpiar la respuesta y extraer tags
    let tagsText = response.trim();
    
    // Remover posibles formatos de lista
    tagsText = tagsText.replace(/^(etiquetas?|tags?):\s*/i, '');
    tagsText = tagsText.replace(/^\d+\.\s*/gm, '');
    tagsText = tagsText.replace(/^[-•]\s*/gm, '');
    
    // Separar por comas o saltos de línea
    const tags = tagsText.split(/[,\n]/)
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0 && tag.length < 50);
    
    // Eliminar duplicados
    return [...new Set(tags)];
}

function renderTags(tags) {
    const container = document.getElementById('generatedTagsContainer');
    
    container.innerHTML = tags.map(tag => `
        <span class="generated-tag" onclick="copyTag('${tag}')" title="Click para copiar">
            <i class="fas fa-hashtag"></i>
            ${tag}
        </span>
    `).join('');
}

function copyTag(tag) {
    copyToClipboard(tag);
    showToast(`✅ Tag "${tag}" copiado`);
}

function copyAllTags() {
    if (appState.generatedTags.length === 0) {
        showToast('⚠️ No hay tags para copiar', 'warning');
        return;
    }
    
    const tagsText = appState.generatedTags.join(', ');
    copyToClipboard(tagsText);
    showToast('✅ Todas las etiquetas copiadas');
}
