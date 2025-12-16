// =============================================
// PRODUCTOS SHOPIFY - ARCHIVO COMPLETO
// 14 Categorías de Productos
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
            category: "case",
            name: "Case (Gabinete)",
            icon: "🖥️",
            description: "Especificaciones de Cases/Gabinetes",
            tags: ["hardware", "pc", "gabinete"],
            file: "case.txt"
        },
        {
            id: 2,
            category: "cooler",
            name: "Cooler",
            icon: "❄️",
            description: "Sistemas de refrigeración",
            tags: ["hardware", "refrigeración"],
            file: "cooler.txt"
        },
        {
            id: 3,
            category: "fuente_de_poder",
            name: "Fuente de Poder",
            icon: "⚡",
            description: "Fuentes de alimentación PSU",
            tags: ["hardware", "power", "psu"],
            file: "fuente_de_poder.txt"
        },
        {
            id: 4,
            category: "laptop",
            name: "Laptop",
            icon: "💻",
            description: "Computadoras portátiles",
            tags: ["laptop", "notebook", "portátil"],
            file: "Laptop.txt"
        },
        {
            id: 5,
            category: "memoria_ram",
            name: "Memoria RAM",
            icon: "🎯",
            description: "Módulos de memoria",
            tags: ["hardware", "ram", "memoria"],
            file: "memoria_ram.txt"
        },
        {
            id: 6,
            category: "monitores",
            name: "Monitores",
            icon: "🖥️",
            description: "Pantallas y displays",
            tags: ["monitor", "pantalla", "display"],
            file: "monitores.txt"
        },
        {
            id: 7,
            category: "motherboard",
            name: "Motherboard",
            icon: "🔌",
            description: "Placas base",
            tags: ["hardware", "placa", "motherboard"],
            file: "motherboard.txt"
        },
        {
            id: 8,
            category: "procesadores",
            name: "Procesadores",
            icon: "⚙️",
            description: "CPUs y procesadores",
            tags: ["hardware", "cpu", "procesador"],
            file: "procesadores.txt"
        },
        {
            id: 9,
            category: "regletas",
            name: "Regletas",
            icon: "🔌",
            description: "Regletas de corriente",
            tags: ["eléctrico", "regleta", "power"],
            file: "regletas.txt"
        },
        {
            id: 10,
            category: "regulador_de_voltaje",
            name: "Regulador de Voltaje",
            icon: "🔋",
            description: "Reguladores eléctricos",
            tags: ["eléctrico", "regulador", "voltaje"],
            file: "regulador_de_voltaje.txt"
        },
        {
            id: 11,
            category: "software",
            name: "Software",
            icon: "💿",
            description: "Licencias de software",
            tags: ["software", "licencia", "programa"],
            file: "software.txt"
        },
        {
            id: 12,
            category: "supresor_de_voltaje",
            name: "Supresor de Voltaje",
            icon: "⚡",
            description: "Supresores de picos",
            tags: ["eléctrico", "supresor", "protección"],
            file: "supresor_de_voltaje.txt"
        },
        {
            id: 13,
            category: "tarjetas_graficas",
            name: "Tarjetas Gráficas",
            icon: "🎮",
            description: "GPUs y tarjetas de video",
            tags: ["hardware", "gpu", "gráfica"],
            file: "tarjetas_graficas.txt"
        },
        {
            id: 14,
            category: "ups_y_ups_online",
            name: "UPS y UPS Online",
            icon: "🔋",
            description: "Sistemas de alimentación ininterrumpida",
            tags: ["eléctrico", "ups", "batería"],
            file: "ups_y_ups_online.txt"
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
        ? `\nINFORMACIÓN DEL PRODUCTO QUE DEBES USAR:\n\n${officialDescription}\n` 
        : '';
    
    // Determinar si es laptop para instrucciones especiales
    const isLaptop = product.category === 'laptop';
    
    const characteristicsRule = isLaptop 
        ? `⚠️ REGLA ESPECIAL PARA LAPTOPS - CARACTERÍSTICAS:
- Las características de tipo Sí/No (teclado retroiluminado, pantalla táctil, etc.) DEBEN estar TODAS presentes
- Si no tienes información que confirme que una característica existe, coloca "No"
- NUNCA dejes celdas vacías en la sección de Características
- NUNCA omitas características de Sí/No de la lista
- Para otras secciones (procesador, memoria, etc.): Solo incluye lo que tenga información verificable`
        : `⚠️ REGLA CRÍTICA SOBRE CARACTERÍSTICAS Y SECCIONES FALTANTES:
- Si una característica específica NO existe en la información proporcionada, OMITE completamente esa fila de la tabla
- Si una SECCIÓN COMPLETA no tiene información disponible (ejemplo: no se menciona conectividad), OMITE toda esa sección con su título
- NO pongas "No", "N/A", "No especificado" o cualquier indicador negativo
- SIMPLEMENTE NO INCLUYAS esa característica o sección en el código final
- Solo incluye las características y secciones que tienen información real y verificable
- Ejemplo: Si no hay información sobre WiFi o Bluetooth, omite toda la sección de Conectividad`;
    
    return `Necesito que generes un código HTML para la descripción de un producto ${product.name} en Shopify.

INSTRUCCIONES CRÍTICAS - DEBES SEGUIR ESTAS REGLAS EXACTAMENTE:

1. USA EL SIGUIENTE CÓDIGO COMO PLANTILLA BASE - NO CAMBIES NADA DE SU ESTRUCTURA HTML NI ESTILOS CSS
2. MANTÉN TODOS LOS NOMBRES DE CLASES CSS EXACTAMENTE IGUALES
3. MANTÉN LA ESTRUCTURA DE TABLA (pero puedes omitir secciones/filas completas sin información)
4. SOLO MODIFICA LOS VALORES DE CONTENIDO DE LAS CELDAS CON LA INFORMACIÓN DEL PRODUCTO
5. OMITE SECCIONES COMPLETAS SI NO HAY INFORMACIÓN PARA NINGUNA CARACTERÍSTICA DE ESA SECCIÓN

===== CÓDIGO DE EJEMPLO (USA ESTA ESTRUCTURA EXACTA) =====

${htmlCode}

===== FIN DEL CÓDIGO DE EJEMPLO =====${descriptionSection}
${promptInstructions}

${characteristicsRule}

OTRAS REGLAS IMPORTANTES:
- NO cambies ningún estilo CSS
- NO modifiques los nombres de las clases
- ${isLaptop ? 'Incluye TODAS las características de Sí/No, pero puedes omitir otras secciones sin info' : 'Omite filas y secciones completas sin información'}
- Si una sección de la tabla no tiene ninguna información disponible, omite toda la sección incluyendo su título
- Genera SOLO el código HTML modificado, sin explicaciones adicionales`;
}
