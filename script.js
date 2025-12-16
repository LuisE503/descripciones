// =============================================
// GENERADOR DE DESCRIPCIONES SHOPIFY
// Script Principal - Funcionalidad Completa
// =============================================

// Estado global de la aplicación
const appState = {
    currentFilter: 'all',
    currentSearch: '',
    allProducts: [],
    filteredProducts: [],
    currentProduct: null,
    productsData: {}
};

// =============================================
// INICIALIZACIÓN
// =============================================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Inicializando aplicación...');
    
    // Cargar datos de productos
    appState.allProducts = getAllProducts();
    appState.filteredProducts = appState.allProducts;
    
    // Cargar contenido de archivos .txt
    await loadAllProductData();
    
    // Renderizar productos
    renderProducts();
    
    // Inicializar event listeners
    initializeEventListeners();
    
    console.log('✅ Aplicación inicializada correctamente');
});

// =============================================
// CARGAR DATOS DE PRODUCTOS DESDE ARCHIVOS TXT
// =============================================
async function loadAllProductData() {
    console.log('📁 Cargando datos de productos...');
    
    const productFiles = {
        case: {
            htmlCode: await loadProductContent('case.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA CASE/GABINETE:
- "Clasificación": MID TOWER, ATX, MINI-ITX, MICRO-ATX o EATX según especificación
- "Color": Color del case
- "Soporte para Motherboard": Formatos compatibles (ATX / MINI-ITX / MICRO-ATX)
- "Acrílico" y "Vidrio Templado": Solo si se menciona explícitamente en las especificaciones
- "Soporte para cables": Solo si se menciona
- Si hay ventiladores incluidos: Agrega fila con cantidad
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        cooler: {
            htmlCode: await loadProductContent('cooler.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA COOLER:
- "Serie": Solo si se menciona la serie específica
- "Estilo": Según especificaciones del producto
- "Tipo de socket": Compatibilidades (AM4, LGA1200, etc.)
- "Dimensiones": Solo si están especificadas
- "Material": Solo si se menciona
- "Disipador de calor" y "Enfriamiento líquido": Solo si se confirma
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        fuente_de_poder: {
            htmlCode: await loadProductContent('fuente_de_poder.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA FUENTE DE PODER:
- "Potencia": En W (650W, 750W, etc.)
- "Clasificación 80 PLUS": Bronze, Silver, Gold, Platinum o Titanium
  * Si NO se especifica certificación 80 PLUS, OMITE completamente esta fila
- "Modular": Solo si se confirma que es modular
- "Semimodular": Solo si se confirma que es semimodular
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        laptop: {
            htmlCode: await loadProductContent('Laptop.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA LAPTOP:

**SECCIÓN GENERAL:**
- "Nivel de complejidad":
  • Essential: Ryzen 3 o Intel i3 inferiores
  • Standard: Ryzen 5 o Intel i5
  • Premium: Ryzen 7 o Intel i7
  • Gaming: Ryzen 5/7 o i5/i7 con gráfica dedicada
- "Tipo":
  • Consumer: Windows Home
  • Corporativo: Windows Pro/Professional

**SECCIÓN PROCESAMIENTO:**
- Incluye Marca de Procesador (Intel/AMD)
- Incluye Tipo de Procesador (ej: Core i5-10400, Ryzen 5 5600H)
- Si tiene gráfica dedicada, agrega una fila adicional con "Tarjeta gráfica" y el modelo específico (ej: NVIDIA GTX 1650, RTX 3060)

**SECCIÓN ALMACENAMIENTO:**
- Almacenamiento: Capacidad (ej: 512GB, 1TB)
- Tipo de almacenamiento: SSD, HDD, o SSD + HDD

**SECCIÓN MEMORIA:**
- Memoria RAM: Capacidad (ej: 8GB RAM, 16GB RAM)
- Tipo de Memoria RAM: DDR4, DDR5, etc.

**SECCIÓN PANTALLA:**
- Tamaño de Pantalla: En pulgadas (ej: 15.6 Plg, 14 Plg)
- Tipo de Pantalla: LED, IPS, OLED, etc.
- Resolución máxima de la pantalla: (ej: 1920 x 1080, 2560 x 1440)

**SECCIÓN SOFTWARE:**
- Sistema Operativo: (ej: Windows 11 Home, Windows 11 Pro)
- Idioma del sistema operativo: Español, Inglés, etc.

**SECCIÓN CARACTERÍSTICAS (IMPORTANTE):**
Esta sección incluye características de tipo Sí/No. DEBES incluir TODAS estas características en el código:
- Color: Describe el color del equipo
- Tarjeta gráfica: Integrada (si no tiene dedicada) o el modelo si es dedicada
- Teclado numérico: Sí o No
- Teclado retroiluminado: Sí o No
- Teclas de función especial: Sí o No
- Pantalla antirreflejo: Sí o No
- Pantalla táctil: Sí o No
- Pantalla IPS: Sí o No
- Pantalla rotable: Sí o No
- Pantalla inclinable: Sí o No
- Lector de huella digital: Sí o No
- Lector de tarjetas: Sí o No

⚠️ REGLA CRÍTICA PARA CARACTERÍSTICAS:
- Para TODAS las características de Sí/No: Si no tienes información específica que confirme que la característica EXISTE, coloca "No"
- NUNCA dejes una celda vacía
- NUNCA omitas una característica de la lista
- El valor por defecto cuando no hay información es "No"
- Solo pon "Sí" cuando la información confirme explícitamente que la característica está presente`
        },
        memoria_ram: {
            htmlCode: await loadProductContent('memoria_ram.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA MEMORIA RAM:
- "Clasificación": DDR3, DDR4, DDR5, etc.
- "Dispositivo electrónico": Laptop, Desktop, Servidor, etc.
- "Capacidad": En GB (8GB, 16GB, 32GB)
- "Velocidad": En MHz (3200 MHz, 3600 MHz)
  * Si NO se menciona velocidad, OMITE esta fila
- "Latencia CAS": Solo si está especificada
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        monitores: {
            htmlCode: await loadProductContent('monitores.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA MONITORES:
- "Tecnología de pantalla": IPS, LCD, VA, OLED, etc.
- "Retroiluminación": WLED, LED, LCD (solo si se especifica)
- "Tamaño de pantalla": Con unidad Plg (24 Plg, 27 Plg)
- "Resolución": Sin espacios (1920x1080, 2560x1440)
- "Tipo de resolución": Full HD, 2K, 4K, etc.
- "VESA": Formato completo (VESA 100x100) - Solo si se menciona
- "Peso": En libras (lb) - Solo si se especifica
- "Tiempo de Respuesta": Con ms (1ms, 5ms) - Solo si se menciona
- "Tasa de Refrescamiento": Con Hz (60Hz, 144Hz, 165Hz)
- Características adicionales (Curvo, FreeSync, G-Sync, HDR): Solo si se confirman
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        motherboard: {
            htmlCode: await loadProductContent('motherboard.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA MOTHERBOARD:
- "Factor de forma": ATX, MICRO-ATX, MINI-ITX, E-ATX
- "Serie": Solo si se especifica
- "Chipset": Modelo del chipset (B550, Z690, X570, etc.)
- "Tipo socket del procesador": AM4, AM5, LGA1700, LGA1200, etc.
- "Slots de memoria RAM": Número y tipo (4 Slots DDR4)
- "Slots PCI": Cantidad y tipo (2x PCIe 4.0 x16) - Solo si se especifica
- "Puertos USB": Tipos disponibles (USB 3.2, USB-C) - Solo si se detallan
- "Puerto HDMI": Solo si se confirma
- "WiFi" y "Bluetooth": Solo si se confirman como incluidos
- "Iluminación RGB": Solo si se menciona
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        procesadores: {
            htmlCode: await loadProductContent('procesadores.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA PROCESADORES:
- "Marca": Intel, AMD, etc.
- "Serie": Core i5, Ryzen 5, etc. (solo si se especifica)
- "Socket": LGA1700, AM5, AM4, etc.
- "Espacio de caché": En MB (20 MB Caché, 30 MB Caché)
- "Frecuencia básica": En GHz (3.6 GHz, 4.2 GHz)
- "Frecuencia máxima": En GHz (solo si se especifica)
- "Cantidad de núcleos": 4, 6, 8, 12, 16, etc.
- "Cantidad de hilos": 8, 12, 16, 24, etc.
- "Gráficos integrados": Solo si tiene (Intel UHD Graphics, Radeon Graphics)
- "TDP": En W (65W, 125W) - Solo si se especifica
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        regletas: {
            htmlCode: await loadProductContent('regletas.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA REGLETAS:
- "Número de salidas": Con palabra (4 salidas, 6 salidas)
- "Longitud del cable": Formato Cable 1.5m, Cable 3m, Cable 5m
- "Voltaje": Sin espacios (110V, 220V)
- "Puertos USB": Número si tiene (2 Puertos USB) - Solo si se menciona
- "Protección contra sobretensiones": Solo si se confirma
- "Interruptor de encendido": Solo si se menciona
- "Montaje en pared": Solo si se confirma
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        regulador_de_voltaje: {
            htmlCode: await loadProductContent('regulador_de_voltaje.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA REGULADOR DE VOLTAJE:
- "Número de salidas": Con palabra (4 salidas, 6 salidas, 8 salidas)
- "Salidas con protección": Si se especifica (3 salidas con Protección)
- "Salidas con regulación": Si se especifica (2 salidas con Regulación)
- "Longitud del cable": Formato Cable 1.5m, Cable 3m
- "Voltaje": Sin espacios (110V, 220V)
- "Capacidad VA": Sin espacio (600VA, 1000VA, 1500VA)
- "Protección contra sobrecargas": Solo si se confirma
- "Protección contra picos": Solo si se confirma
- "AVR (Regulación Automática de Voltaje)": Solo si se confirma
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        software: {
            htmlCode: await loadProductContent('software.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA SOFTWARE:
- "Serie / Versión": Número de versión (2024, 365, 11, etc.)
- "Tipo de licencia": Comercial, Gratis, Suscripción, Perpetua
- "Plataforma": Windows, macOS, Linux, multiplataforma
- "Idioma": Español, Inglés, Multidioma
- "Requisitos mínimos": Procesador, RAM, Almacenamiento, Sistema Operativo
- "Requisitos recomendados": Solo si se especifican
- "Tamaño de descarga": En MB o GB - Solo si se menciona
- "Instalación en la nube": Solo si se confirma
- "Actualizaciones automáticas": Solo si se menciona
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        supresor_de_voltaje: {
            htmlCode: await loadProductContent('supresor_de_voltaje.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA SUPRESOR DE VOLTAJE:
- "Número de salidas": Con palabra (4 salidas, 6 salidas)
- "Salidas con supresión": Si se especifica (4 salidas con Supresión)
- "Salidas con regulación": Si se especifica (2 salidas con Regulación)
- "Longitud del cable": Formato Cable 1.5m, Cable 3m
- "Voltaje": Sin espacios (110V, 220V)
- "Protección RJ11": Solo si se confirma (para línea telefónica)
- "Protección RJ45": Solo si se confirma (para red ethernet)
- "Protección Coaxial": Solo si se confirma (para cable/TV)
- "AVR (Regulación Automática)": Solo si se confirma
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        tarjetas_graficas: {
            htmlCode: await loadProductContent('tarjetas_graficas.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA TARJETAS GRÁFICAS:
- "Chipset": Modelo completo (NVIDIA GeForce RTX 4060, AMD Radeon RX 7600)
- "Serie": Solo si se especifica (Gaming, Professional, etc.)
- "Memoria": Capacidad con espacio (8 GB, 12 GB, 16 GB)
- "Tipo de Memoria": En mayúsculas (GDDR5, GDDR6, GDDR6X)
- "Velocidad de núcleo": En MHz sin decimales (1500 MHz, 2400 MHz)
- "Boost Clock": Solo si se especifica
- "Velocidad de memoria": En Gbps o MHz (14 Gbps) - Solo si se menciona
- "Ancho de banda de memoria": En bits (128 bits, 256 bits) - Solo si se especifica
- "Conectores de alimentación": Solo si se mencionan (8-pin, 6+8 pin)
- "TDP": En W - Solo si se especifica
- "Puertos de salida": DisplayPort, HDMI, DVI - Solo los que tiene
- "Overclocking": Solo si se confirma como compatible
- "Ray Tracing": Solo si se confirma
- "DLSS/FSR": Solo si se menciona
- Si una característica no se menciona, OMITE esa fila completamente`
        },
        ups_y_ups_online: {
            htmlCode: await loadProductContent('ups_y_ups_online.txt'),
            promptRules: `REGLAS ESPECÍFICAS PARA UPS:
- "Clasificación": Offline (Standby), Online (Doble Conversión), Line-Interactive
- "Número de salidas": Con palabra (4 salidas, 6 salidas, 8 salidas)
- "Salidas con batería": Salidas que funcionan con batería (4 salidas de Batería)
- "Salidas con supresión": Si se especifica
- "Salidas con regulación": Si se especifica
- "Longitud del cable": Formato Cable 1.5m, Cable 3m
- "Tiempo de autonomía": En minutos o horas (10min, 30min, 1h) - Importante
- "Voltaje": Sin espacios (110V, 220V)
- "Capacidad": Formato VA/W o solo VA (1000VA/600W, 1500VA)
- "Tipo de batería": Solo si se especifica (Sellada, Li-Ion)
- "Pantalla LCD": Solo si se confirma
- "Protección RJ11/RJ45": Solo si se menciona
- "Puerto USB": Solo si se confirma
- "Alarma sonora": Solo si se menciona
- Si una característica no se menciona, OMITE esa fila completamente`
        }
    };
    
    appState.productsData = productFiles;
    console.log('✅ Datos de productos cargados');
    
    // Validación: Verificar que cada categoría tiene sus datos correctos
    console.log('🔍 Validando datos de productos...');
    for (const [category, data] of Object.entries(productFiles)) {
        const hasHtml = data.htmlCode && data.htmlCode.length > 100;
        const hasRules = data.promptRules && data.promptRules.length > 50;
        console.log(`  ${category}: HTML=${hasHtml ? '✓' : '✗'}, Rules=${hasRules ? '✓' : '✗'}`);
        if (!hasHtml || !hasRules) {
            console.error(`  ⚠️ ${category} tiene datos incompletos`);
        }
    }
}

// Función para cargar contenido de archivo txt
async function loadProductContent(fileName) {
    try {
        const response = await fetch(fileName);
        if (!response.ok) {
            console.error(`❌ No se pudo cargar: ${fileName}`);
            return `<!-- Error: No se pudo cargar ${fileName} -->`;
        }
        const content = await response.text();
        // Extraer solo el HTML (antes de las instrucciones)
        const htmlMatch = content.match(/<div class="row">[\s\S]*?<\/style>/);
        return htmlMatch ? htmlMatch[0] : content;
    } catch (error) {
        console.error(`❌ Error cargando ${fileName}:`, error);
        return `<!-- Error cargando ${fileName} -->`;
    }
}

// =============================================
// RENDERIZAR PRODUCTOS
// =============================================
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    if (appState.filteredProducts.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'flex';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    grid.innerHTML = appState.filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}" data-id="${product.id}">
            <div class="product-icon">${product.icon}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-tags">
                ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <button class="btn btn-view" onclick="viewProduct(${product.id})">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3C5 3 2.5 5.5 1 8c1.5 2.5 4 5 7 5s5.5-2.5 7-5c-1.5-2.5-4-5-7-5z" stroke="currentColor" stroke-width="2"/>
                    <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="2"/>
                </svg>
                Ver Código y Prompt
            </button>
        </div>
    `).join('');
}

// =============================================
// VER PRODUCTO (ABRIR MODAL)
// =============================================
function viewProduct(productId) {
    const product = appState.allProducts.find(p => p.id === productId);
    if (!product) return;
    
    appState.currentProduct = product;
    const productData = appState.productsData[product.category];
    
    if (!productData) {
        showToast('❌ Error: Datos del producto no disponibles');
        return;
    }
    
    // Actualizar contenido del modal
    document.getElementById('modalTitle').textContent = `${product.icon} ${product.name}`;
    document.getElementById('previewContainer').innerHTML = productData.htmlCode;
    document.getElementById('codeContent').textContent = productData.htmlCode;
    
    // Limpiar textarea de descripción
    document.getElementById('officialDescription').value = '';
    
    // Habilitar botón desde el inicio
    const copyBtn = document.getElementById('copyFullPromptBtn');
    copyBtn.disabled = false;
    
    // Reset status
    const status = document.getElementById('descriptionStatus');
    status.querySelector('.status-icon').textContent = 'ℹ️';
    status.querySelector('.status-text').textContent = 'Campo opcional - puedes dejarlo vacío';
    status.className = 'description-status';
    
    // Mostrar modal
    document.getElementById('previewModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// =============================================
// COPIAR CÓDIGO
// =============================================
function copyCode() {
    if (!appState.currentProduct) return;
    
    const productData = appState.productsData[appState.currentProduct.category];
    if (!productData) {
        showToast('❌ Error: Código no disponible');
        return;
    }
    
    copyToClipboard(productData.htmlCode);
    showToast('✅ Código copiado al portapapeles');
}

// =============================================
// COPIAR PROMPT COMPLETO CON DESCRIPCIÓN
// =============================================
function copyFullPrompt() {
    if (!appState.currentProduct) return;
    
    const product = appState.currentProduct;
    const productData = appState.productsData[product.category];
    const officialDescription = document.getElementById('officialDescription').value.trim();
    
    if (!productData) {
        showToast('❌ Error: Datos no disponibles');
        return;
    }
    
    // Debug: Verificar que los datos sean correctos
    console.log('🔍 Debug - Producto:', product.name);
    console.log('🔍 Debug - Categoría:', product.category);
    console.log('🔍 Debug - Tiene promptRules:', !!productData.promptRules);
    console.log('🔍 Debug - PromptRules preview:', productData.promptRules.substring(0, 100));
    
    // La descripción oficial es OPCIONAL - se puede copiar sin ella
    const fullPrompt = generateFullPrompt(product, productData.htmlCode, productData.promptRules, officialDescription);
    copyToClipboard(fullPrompt);
    
    if (officialDescription) {
        showToast('✅ ¡Todo copiado con descripción! Pega en ChatGPT-5');
    } else {
        showToast('✅ ¡Prompt copiado! (Sin descripción oficial)');
    }
}

// =============================================
// ACTUALIZAR ESTADO DE DESCRIPCIÓN
// =============================================
function updateDescriptionStatus(text) {
    const status = document.getElementById('descriptionStatus');
    const statusIcon = status.querySelector('.status-icon');
    const statusText = status.querySelector('.status-text');
    const copyBtn = document.getElementById('copyFullPromptBtn');
    const copyBtnText = document.getElementById('copyFullPromptText');
    
    if (text.trim().length === 0) {
        statusIcon.textContent = 'ℹ️';
        statusText.textContent = 'Campo opcional - puedes dejarlo vacío';
        status.className = 'description-status';
        copyBtn.disabled = true;
        copyBtnText.textContent = 'Copiar Todo para ChatGPT';
    } else if (text.trim().length < 50) {
        statusIcon.textContent = 'ℹ️';
        statusText.textContent = `${text.length} caracteres - escribe más para una mejor descripción`;
        status.className = 'description-status';
        copyBtn.disabled = false;
        copyBtnText.textContent = 'Copiar Todo para ChatGPT';
    } else {
        statusIcon.textContent = '✅';
        statusText.textContent = `Perfecto! ${text.length} caracteres detectados`;
        status.className = 'description-status success';
        copyBtn.disabled = false;
        copyBtnText.textContent = '🚀 Copiar Todo para ChatGPT';
    }
}

// =============================================
// BUSCAR PRODUCTOS
// =============================================
function searchProductsFunc() {
    const searchTerm = document.getElementById('searchInput').value;
    appState.currentSearch = searchTerm;
    applyFilters();
}

// =============================================
// FILTRAR POR CATEGORÍA
// =============================================
function filterProducts(category) {
    appState.currentFilter = category;
    
    // Actualizar chips activos
    document.querySelectorAll('.chip').forEach(chip => {
        chip.classList.remove('active');
        if (chip.dataset.filter === category) {
            chip.classList.add('active');
        }
    });
    
    applyFilters();
}

// =============================================
// APLICAR FILTROS
// =============================================
function applyFilters() {
    let products = appState.allProducts;
    
    // Filtrar por categoría
    if (appState.currentFilter !== 'all') {
        products = products.filter(p => p.category === appState.currentFilter);
    }
    
    // Filtrar por búsqueda
    if (appState.currentSearch.trim()) {
        products = searchProducts(appState.currentSearch);
    }
    
    appState.filteredProducts = products;
    renderProducts();
}

// =============================================
// MODAL - TABS
// =============================================
function switchTab(tabName) {
    // Actualizar tabs
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Actualizar contenido
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// =============================================
// CERRAR MODAL
// =============================================
function closeModal() {
    document.getElementById('previewModal').classList.remove('active');
    document.body.style.overflow = '';
    appState.currentProduct = null;
}

// =============================================
// UTILIDADES
// =============================================
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// =============================================
// EVENT LISTENERS
// =============================================
function initializeEventListeners() {
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', searchProductsFunc);
    
    // Filtros
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            filterProducts(chip.dataset.filter);
        });
    });
    
    // Modal - Cerrar
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', closeModal);
    
    // Modal - Tabs
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });
    
    // Botones de copiar
    document.getElementById('copyCodeBtn').addEventListener('click', copyCode);
    document.getElementById('copyFullPromptBtn').addEventListener('click', copyFullPrompt);
    
    // Textarea de descripción oficial
    const officialDescriptionTextarea = document.getElementById('officialDescription');
    officialDescriptionTextarea.addEventListener('input', (e) => {
        updateDescriptionStatus(e.target.value);
    });
    
    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}
