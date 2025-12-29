// =============================================
// PRODUCTOS SHOPIFY - ARCHIVO COMPLETO
// 26 Categorías de Productos
// =============================================

// Archivo muy extenso - ver archivo en: 
// https://github.com/tu-usuario/descripciones-shopify

const PRODUCTS_DATABASE = {
    // Los datos se cargarán de productsConfig.json para mejor mantenibilidad
};

// Plantilla HTML base compartida por todos los productos
const BASE_STYLE = `<style>
  .nav-tabs .nav-item.show .nav-link,
  .nav-tabs .nav-link .active {
    background: #f5f5f5;
    border-bottom: 2px solid #036cbf;
    border-radius: 5px 5px 0 0;
  }
  .row, .NEW-TABLE, .TableOverride-1, .tab-drag, .tt-title-sub,
  .tableCellMeta, .tableCellContent, .tableCellGroupTitle,
  .tableCellGroupTitleContent, .product-seo-intro, .div-drop {
    font-family: inherit;
    color: inherit;
  }
  .tt-title-sub {
    font-size: 12px;
    font-weight: 700;
    margin: 6px 0 10px;
    letter-spacing: 0.3px;
    text-align: center;
  }
  .div-drop { overflow-x: auto; }
  table { border-collapse: collapse; font-size: 14px; width: 100%; }
  .tableCellMeta {
    border: 1px solid #fbfbfb;
    padding: 3px 0 3px 15px;
    vertical-align: middle;
    background-color: #fdfdfd;
    width: 50%;
    text-align: left;
  }
  .tableCellContent {
    text-align: center;
    border: 1px solid #fbfbfb;
    padding: 3px 0 3px 15px;
    vertical-align: middle;
    background-color: #fafafa;
    width: 50%;
  }
  .tableCellGroupTitle {
    border: 1px solid #f8f8f8;
    padding: 3px 0 3px 5px;
    vertical-align: middle;
    background-color: #f7f7f7;
    font-weight: 800;
    text-transform: uppercase;
    text-align: center;
  }
  .tableCellGroupTitleContent {
    border: 1px solid #fbfbfb;
    padding: 3px 0 3px 15px;
    vertical-align: middle;
    background-color: #fafafa;
    width: 50%;
  }
  @media (max-width: 576px) {
    .tt-title-sub { font-size: 11px; }
    .tableCellMeta, .tableCellContent { font-size: 13px; padding-left: 10px; }
  }
</style>`;

// NOTA: Debido al tamaño extenso del contenido (14 productos con HTML completo),
// los datos completos se encuentran en el archivo productsConfig.js
// Esta es una arquitectura más eficiente y mantenible

// Función para cargar productos dinámicamente
async function loadProductsData() {
    try {
        const response = await fetch('productsConfig.js');
        if (!response.ok) {
            // Si no encuentra el archivo externo, usar datos embebidos
            return getEmbeddedProducts();
        }
        return await response.json();
    } catch (error) {
        console.log('Usando datos embebidos');
        return getEmbeddedProducts();
    }
}

// Datos embebidos para funcionamiento sin servidor
function getEmbeddedProducts() {
    return [
        {
            id: 1,
            category: "cartuchos",
            name: "Cartuchos",
            icon: "🖨️",
            description: "Cartuchos de tinta para impresoras",
            tags: ["cartucho", "tinta", "impresora"],
            file: "cartuchos.txt"
        },
        {
            id: 2,
            category: "case",
            name: "Case (Gabinete)",
            icon: "🖥️",
            description: "Especificaciones de Cases/Gabinetes",
            tags: ["hardware", "pc", "gabinete"],
            file: "case.txt"
        },
        {
            id: 3,
            category: "cinta",
            name: "Cinta",
            icon: "📼",
            description: "Cintas de impresión matricial",
            tags: ["cinta", "impresora", "matricial"],
            file: "cinta.txt"
        },
        {
            id: 4,
            category: "cooler",
            name: "Cooler",
            icon: "❄️",
            description: "Sistemas de refrigeración",
            tags: ["hardware", "refrigeración"],
            file: "cooler.txt"
        },
        {
            id: 5,
            category: "fuente_de_poder",
            name: "Fuente de Poder",
            icon: "⚡",
            description: "Fuentes de alimentación PSU",
            tags: ["hardware", "power", "psu"],
            file: "fuente_de_poder.txt"
        },
        {
            id: 6,
            category: "impresora_de_inyeccion",
            name: "Impresora de Inyección",
            icon: "🖨️",
            description: "Impresoras de inyección de tinta",
            tags: ["impresora", "inyección", "multifuncional"],
            file: "impresora de inyeccion.txt"
        },
        {
            id: 7,
            category: "impresora_laser",
            name: "Impresora Láser",
            icon: "🖨️",
            description: "Impresoras láser",
            tags: ["impresora", "láser", "oficina"],
            file: "impresora_laser.txt"
        },
        {
            id: 8,
            category: "impresora_matricial",
            name: "Impresora Matricial",
            icon: "🖨️",
            description: "Impresoras matriciales de punto",
            tags: ["impresora", "matricial", "punto"],
            file: "impresora_matricial.txt"
        },
        {
            id: 9,
            category: "impresora_termica",
            name: "Impresora Térmica",
            icon: "🧾",
            description: "Impresoras térmicas para recibos",
            tags: ["impresora", "térmica", "recibo", "pos"],
            file: "impresora_termica.txt"
        },
        {
            id: 10,
            category: "laptop",
            name: "Laptop",
            icon: "💻",
            description: "Computadoras portátiles",
            tags: ["laptop", "notebook", "portátil"],
            file: "Laptop.txt"
        },
        {
            id: 11,
            category: "memoria_ram",
            name: "Memoria RAM",
            icon: "🎯",
            description: "Módulos de memoria",
            tags: ["hardware", "ram", "memoria"],
            file: "memoria_ram.txt"
        },
        {
            id: 12,
            category: "monitores",
            name: "Monitores",
            icon: "🖥️",
            description: "Pantallas y displays",
            tags: ["monitor", "pantalla", "display"],
            file: "monitores.txt"
        },
        {
            id: 13,
            category: "motherboard",
            name: "Motherboard",
            icon: "🔌",
            description: "Placas base",
            tags: ["hardware", "placa", "motherboard"],
            file: "motherboard.txt"
        },
        {
            id: 14,
            category: "plotter",
            name: "Plotter",
            icon: "🖨️",
            description: "Plotters de gran formato",
            tags: ["plotter", "impresión", "gran formato"],
            file: "plotter.txt"
        },
        {
            id: 15,
            category: "procesadores",
            name: "Procesadores",
            icon: "⚙️",
            description: "CPUs y procesadores",
            tags: ["hardware", "cpu", "procesador"],
            file: "procesadores.txt"
        },
        {
            id: 16,
            category: "proyectores",
            name: "Proyectores",
            icon: "📽️",
            description: "Proyectores multimedia",
            tags: ["proyector", "presentaciones", "multimedia"],
            file: "proyectores.txt"
        },
        {
            id: 17,
            category: "regletas",
            name: "Regletas",
            icon: "🔌",
            description: "Regletas de corriente",
            tags: ["eléctrico", "regleta", "power"],
            file: "regletas.txt"
        },
        {
            id: 18,
            category: "regulador_de_voltaje",
            name: "Regulador de Voltaje",
            icon: "🔋",
            description: "Reguladores eléctricos",
            tags: ["eléctrico", "regulador", "voltaje"],
            file: "regulador_de_voltaje.txt"
        },
        {
            id: 19,
            category: "software",
            name: "Software",
            icon: "💿",
            description: "Licencias de software",
            tags: ["software", "licencia", "programa"],
            file: "software.txt"
        },
        {
            id: 20,
            category: "soporte_o_bracket",
            name: "Soporte o Bracket",
            icon: "📺",
            description: "Soportes para televisores y monitores",
            tags: ["soporte", "bracket", "montaje", "tv"],
            file: "soporte o bracket.txt"
        },
        {
            id: 21,
            category: "supresor_de_voltaje",
            name: "Supresor de Voltaje",
            icon: "⚡",
            description: "Supresores de picos",
            tags: ["eléctrico", "supresor", "protección"],
            file: "supresor_de_voltaje.txt"
        },
        {
            id: 22,
            category: "tarjetas_graficas",
            name: "Tarjetas Gráficas",
            icon: "🎮",
            description: "GPUs y tarjetas de video",
            tags: ["hardware", "gpu", "gráfica"],
            file: "tarjetas_graficas.txt"
        },
        {
            id: 23,
            category: "televisores",
            name: "Televisores",
            icon: "📺",
            description: "Televisores y Smart TVs",
            tags: ["televisor", "tv", "smart tv", "4k"],
            file: "televisores.txt"
        },
        {
            id: 24,
            category: "tintas",
            name: "Tintas",
            icon: "🎨",
            description: "Botellas de tinta para impresoras",
            tags: ["tinta", "recarga", "impresora"],
            file: "tintas.txt"
        },
        {
            id: 25,
            category: "toner",
            name: "Tóner",
            icon: "🖨️",
            description: "Tóner para impresoras láser",
            tags: ["tóner", "láser", "impresora"],
            file: "toner.txt"
        },
        {
            id: 26,
            category: "ups_y_ups_online",
            name: "UPS y UPS Online",
            icon: "🔋",
            description: "Sistemas de alimentación ininterrumpida",
            tags: ["eléctrico", "ups", "batería"],
            file: "ups_y_ups_online.txt"
        },
        {
            id: 27,
            category: "adaptador_de_red_usb",
            name: "Adaptador de Red USB",
            icon: "🔌",
            description: "Adaptadores de red USB WiFi y Ethernet",
            tags: ["adaptador", "red", "usb", "wifi", "ethernet"],
            file: "adaptador_de_red_usb.txt"
        },
        {
            id: 28,
            category: "almacenamiento_externo",
            name: "Almacenamiento Externo",
            icon: "💾",
            description: "Discos duros externos y unidades de almacenamiento",
            tags: ["almacenamiento", "disco", "externo", "hdd", "ssd"],
            file: "almacenamiento_externo.txt"
        },
        {
            id: 29,
            category: "amplificador_de_red",
            name: "Amplificador de Red",
            icon: "📡",
            description: "Amplificadores y extensores de señal WiFi",
            tags: ["amplificador", "red", "wifi", "señal"],
            file: "amplificador_de_red.txt"
        },
        {
            id: 30,
            category: "audifonos_cableados_e_inalambricos",
            name: "Audífonos Cableados e Inalámbricos",
            icon: "🎧",
            description: "Audífonos y auriculares",
            tags: ["audífonos", "auriculares", "audio", "headphones"],
            file: "audifonos_cableados_e_inalambricos.txt"
        },
        {
            id: 31,
            category: "bases_para_laptop",
            name: "Bases para Laptop",
            icon: "🖥️",
            description: "Bases de refrigeración y soportes para laptop",
            tags: ["base", "laptop", "soporte", "refrigeración"],
            file: "bases_para_laptop.txt"
        },
        {
            id: 32,
            category: "bocina_e_inalambrica_y_sistema_de_audio",
            name: "Bocinas y Sistema de Audio",
            icon: "🔊",
            description: "Bocinas inalámbricas y sistemas de audio",
            tags: ["bocina", "audio", "altavoz", "speaker"],
            file: "bocina_e_inalambrica_y_sistema_de_audio.txt"
        },
        {
            id: 33,
            category: "cable_hdmi",
            name: "Cable HDMI",
            icon: "📺",
            description: "Cables HDMI para video y audio",
            tags: ["cable", "hdmi", "video", "audio"],
            file: "cable_hdmi.txt"
        },
        {
            id: 34,
            category: "cable_usb",
            name: "Cable USB",
            icon: "🔌",
            description: "Cables USB de diferentes tipos",
            tags: ["cable", "usb", "tipo-c", "micro-usb"],
            file: "cable_usb.txt"
        },
        {
            id: 35,
            category: "cable_utp_y_bobina_de_cable",
            name: "Cable UTP y Bobina de Cable",
            icon: "🔗",
            description: "Cables de red UTP y bobinas",
            tags: ["cable", "utp", "red", "ethernet", "bobina"],
            file: "cable_utp_y_bobina_de_cable.txt"
        },
        {
            id: 36,
            category: "cables_vga",
            name: "Cables VGA",
            icon: "🖥️",
            description: "Cables VGA para monitores",
            tags: ["cable", "vga", "video", "monitor"],
            file: "cables_vga.txt"
        },
        {
            id: 37,
            category: "camara_de_video_web_dslr_digital",
            name: "Cámara de Video Web DSLR Digital",
            icon: "📷",
            description: "Cámaras web y cámaras digitales",
            tags: ["cámara", "webcam", "dslr", "digital"],
            file: "camara_de_video_web_dslr_digital.txt"
        },
        {
            id: 38,
            category: "camaras_de_vigilancia_analoga_ip_wifi",
            name: "Cámaras de Vigilancia",
            icon: "📹",
            description: "Cámaras de seguridad análogas, IP y WiFi",
            tags: ["cámara", "vigilancia", "seguridad", "ip", "wifi"],
            file: "camaras_de_vigilancia_analoga_ip_wifi.txt"
        },
        {
            id: 39,
            category: "combo_teclado_y_mouse_cableados_e_inalambrico",
            name: "Combo Teclado y Mouse",
            icon: "⌨️",
            description: "Combos de teclado y mouse cableados e inalámbricos",
            tags: ["combo", "teclado", "mouse", "kit"],
            file: "combo_teclado_y_mouse_cableados_e_inalambrico.txt"
        },
        {
            id: 40,
            category: "dvr",
            name: "DVR",
            icon: "📼",
            description: "Grabadores digitales de video",
            tags: ["dvr", "grabador", "video", "vigilancia"],
            file: "dvr.txt"
        },
        {
            id: 41,
            category: "enclousure",
            name: "Enclosure",
            icon: "💾",
            description: "Carcasas para discos duros",
            tags: ["enclosure", "carcasa", "disco", "externo"],
            file: "enclousure.txt"
        },
        {
            id: 42,
            category: "escaneres",
            name: "Escáneres",
            icon: "🖨️",
            description: "Escáneres de documentos",
            tags: ["escáner", "scanner", "digitalización"],
            file: "escaneres.txt"
        },
        {
            id: 43,
            category: "estacion_de_carga",
            name: "Estación de Carga",
            icon: "🔌",
            description: "Estaciones de carga para dispositivos",
            tags: ["estación", "carga", "usb", "cargador"],
            file: "estacion_de_carga.txt"
        },
        {
            id: 44,
            category: "gabinetes",
            name: "Gabinetes",
            icon: "🖥️",
            description: "Gabinetes para PC",
            tags: ["gabinete", "case", "torre", "pc"],
            file: "gabinetes.txt"
        },
        {
            id: 45,
            category: "hostpot",
            name: "Hotspot",
            icon: "📶",
            description: "Dispositivos hotspot móviles",
            tags: ["hotspot", "móvil", "wifi", "portátil"],
            file: "hostpot.txt"
        },
        {
            id: 46,
            category: "hub_usb",
            name: "Hub USB",
            icon: "🔌",
            description: "Hubs y concentradores USB",
            tags: ["hub", "usb", "concentrador", "puertos"],
            file: "hub_usb.txt"
        },
        {
            id: 47,
            category: "iot",
            name: "IoT",
            icon: "🌐",
            description: "Dispositivos Internet de las Cosas",
            tags: ["iot", "smart", "inteligente", "conectado"],
            file: "iot.txt"
        },
        {
            id: 48,
            category: "memorias_extraibles",
            name: "Memorias Extraíbles",
            icon: "💾",
            description: "Memorias USB y tarjetas SD",
            tags: ["memoria", "usb", "sd", "flash", "pendrive"],
            file: "memorias_extraibles.txt"
        },
        {
            id: 49,
            category: "microfono",
            name: "Micrófono",
            icon: "🎤",
            description: "Micrófonos para grabación y streaming",
            tags: ["micrófono", "audio", "grabación", "streaming"],
            file: "microfono.txt"
        },
        {
            id: 50,
            category: "mouse_cableados",
            name: "Mouse Cableados",
            icon: "🖱️",
            description: "Mouse con cable",
            tags: ["mouse", "ratón", "cableado"],
            file: "mouse_cableados.txt"
        },
        {
            id: 51,
            category: "mouse_inalambricos",
            name: "Mouse Inalámbricos",
            icon: "🖱️",
            description: "Mouse inalámbricos",
            tags: ["mouse", "ratón", "inalámbrico", "wireless"],
            file: "mouse_inalambricos.txt"
        },
        {
            id: 52,
            category: "mouse_pad",
            name: "Mouse Pad",
            icon: "🖱️",
            description: "Alfombrillas para mouse",
            tags: ["mousepad", "alfombrilla", "mouse"],
            file: "mouse_pad.txt"
        },
        {
            id: 53,
            category: "nvr",
            name: "NVR",
            icon: "📹",
            description: "Grabadores de video en red",
            tags: ["nvr", "grabador", "red", "ip", "vigilancia"],
            file: "nvr.txt"
        },
        {
            id: 54,
            category: "punto_de_acceso",
            name: "Punto de Acceso",
            icon: "📡",
            description: "Puntos de acceso WiFi",
            tags: ["punto", "acceso", "wifi", "ap"],
            file: "punto_de_acceso.txt"
        },
        {
            id: 55,
            category: "repetidores_de_red",
            name: "Repetidores de Red",
            icon: "📡",
            description: "Repetidores y extensores WiFi",
            tags: ["repetidor", "extensor", "wifi", "red"],
            file: "repetidores_de_red.txt"
        },
        {
            id: 56,
            category: "router",
            name: "Router",
            icon: "📡",
            description: "Routers y enrutadores WiFi",
            tags: ["router", "wifi", "red", "enrutador"],
            file: "router.txt"
        },
        {
            id: 57,
            category: "smartphone",
            name: "Smartphone",
            icon: "📱",
            description: "Teléfonos inteligentes",
            tags: ["smartphone", "teléfono", "móvil", "celular"],
            file: "smartphone.txt"
        },
        {
            id: 58,
            category: "smartwatches",
            name: "Smartwatches",
            icon: "⌚",
            description: "Relojes inteligentes",
            tags: ["smartwatch", "reloj", "inteligente", "wearable"],
            file: "smartwatches.txt"
        },
        {
            id: 59,
            category: "switches",
            name: "Switches",
            icon: "🔀",
            description: "Switches de red",
            tags: ["switch", "red", "ethernet", "conmutador"],
            file: "switches.txt"
        },
        {
            id: 60,
            category: "tablets",
            name: "Tablets",
            icon: "📱",
            description: "Tabletas electrónicas",
            tags: ["tablet", "tableta", "ipad"],
            file: "tablets.txt"
        },
        {
            id: 61,
            category: "teclados_cableados_e_inalambricos",
            name: "Teclados Cableados e Inalámbricos",
            icon: "⌨️",
            description: "Teclados con y sin cable",
            tags: ["teclado", "keyboard", "mecánico", "gaming"],
            file: "teclados_cableados_e_inalambricos.txt"
        }
    ];
}

// Funciones auxiliares
function getAllProducts() {
    return getEmbeddedProducts();
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase().trim();
    return getAllProducts().filter(product => {
        return product.name.toLowerCase().includes(searchTerm) ||
               product.description.toLowerCase().includes(searchTerm) ||
               product.category.toLowerCase().includes(searchTerm) ||
               product.tags.some(tag => tag.includes(searchTerm));
    });
}

function filterByCategory(category) {
    if (category === 'all') return getAllProducts();
    return getAllProducts().filter(product => product.category === category);
}

// Cargar contenido de archivo txt
async function loadProductFile(fileName) {
    try {
        const response = await fetch(fileName);
        if (!response.ok) throw new Error('Archivo no encontrado');
        return await response.text();
    } catch (error) {
        console.error('Error cargando archivo:', error);
        return null;
    }
}

// Función para generar prompt completo
function generateFullPrompt(product, htmlCode, promptInstructions, officialDescription = '') {
    const descriptionSection = officialDescription.trim() 
        ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n📋 INFORMACIÓN DEL PRODUCTO:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n${officialDescription}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` 
        : '';
    
    // Determinar si es laptop para instrucciones especiales
    const isLaptop = product.category === 'laptop';
    
    const characteristicsRule = isLaptop 
        ? `\n⚠️ REGLA CRÍTICA PARA LAPTOPS - CARACTERÍSTICAS DE SÍ/NO:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nLas características de tipo Sí/No (teclado retroiluminado, pantalla táctil, etc.) DEBEN estar TODAS en el código.\nSi NO confirmas que existe una característica → escribe "No"\nNUNCA omitas características de Sí/No.\nPara otras secciones: solo incluye lo que tenga información real.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
        : `\n⚠️ REGLA CRÍTICA - OMISIÓN DE INFORMACIÓN:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nSi una característica NO aparece en la información → OMITE esa fila completa.\nSi una SECCIÓN COMPLETA no tiene datos → OMITE la sección entera.\nNO escribas "No", "N/A", "No disponible".\nSOLO incluye lo que tenga información REAL.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    
    return `Eres un experto generando código HTML para descripciones de productos en Shopify. Debes generar código limpio y estructurado siguiendo EXACTAMENTE el formato del ejemplo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 TU TAREA: Generar código HTML completo para ${product.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️⚠️⚠️ MUY IMPORTANTE - LEE ESTO PRIMERO ⚠️⚠️⚠️

Tu respuesta DEBE ser UN SOLO BLOQUE DE CÓDIGO que contenga:

1. EL CÓDIGO HTML COMPLETO (desde <div class="row"> hasta </div>)
2. EL BLOQUE <style> COMPLETO (desde <style> hasta </style>)
3. TODO JUNTO EN UNA SOLA RESPUESTA

NO SEPARES EL HTML Y EL CSS EN BLOQUES DIFERENTES.
NO ESCRIBAS EXPLICACIONES FUERA DEL CÓDIGO.
NO OMITAS EL BLOQUE <style>.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 CÓDIGO DE EJEMPLO (USA ESTA ESTRUCTURA EXACTA)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${htmlCode}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 FIN DEL CÓDIGO DE EJEMPLO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${descriptionSection}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 INSTRUCCIONES ESPECÍFICAS PARA ${product.name.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${promptInstructions}
${characteristicsRule}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ FORMATO DE SALIDA REQUERIDO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Debes responder ÚNICAMENTE con el código HTML completo, en este formato:

<!-- Comentario inicial -->
<div class="row">
  ... todo el HTML con la tabla de especificaciones ...
</div>

<style>
  ... todos los estilos CSS completos ...
</style>

REGLAS FINALES:
✓ Mantén TODOS los estilos CSS del ejemplo
✓ Mantén TODAS las clases CSS exactamente iguales
✓ SOLO modifica el contenido de <td class="tableCellContent">
✓ ${isLaptop ? 'Incluye TODAS las características Sí/No (escribe "No" si no hay info)' : 'Omite filas sin información'}
✓ Adapta los valores según la información del producto
✓ NO agregues comentarios ni explicaciones
✓ Responde SOLO con el código

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 GENERA EL CÓDIGO AHORA (HTML + CSS JUNTOS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}
