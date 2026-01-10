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
    pasta_termica: 'fa-temperature-low'
};

// =============================================
// INICIALIZACIÓN
// =============================================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Inicializando aplicación PRO...');
    
    // Cargar datos de productos
    appState.allProducts = getAllProducts();
    appState.filteredProducts = appState.allProducts;
    
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
        const response = await fetch(fileName);
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
        pasta_termica: { file: 'pasta_termica.txt', rules: getRulesForCategory('pasta_termica') }
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
        cartuchos: `REGLAS PARA CARTUCHOS:
• Color: Negro o Tricolor (NO uses "de Color")
• Compatibilidad: Modelos separados con " | "
• Tamaño XL: Solo si confirman que es XL`,

        case: `REGLAS PARA CASE/GABINETE:
• Clasificación: MID TOWER, FULL TOWER, MINI TOWER, ATX, MICRO-ATX, MINI-ITX
• Soporte Motherboard: Formatos compatibles
• Paneles: Acrílico o Vidrio Templado solo si lo confirman`,

        laptop: `REGLAS PARA LAPTOP:
• Nivel: Essential (i3/R3), Standard (i5/R5), Premium (i7/R7), Gaming (con gráfica dedicada)
• Tipo: Consumer (Windows Home), Corporativo (Windows Pro)
• TODAS las características Sí/No DEBEN estar (escribe "No" si no hay info)`,

        monitores: `REGLAS PARA MONITORES:
• Tecnología: IPS, LCD, VA, OLED
• Resolución: Sin espacios (1920x1080)
• VESA: Solo si mencionan compatibilidad
• Características: Curvo, FreeSync, G-Sync, HDR solo si confirman`,

        impresora_de_inyeccion: `REGLAS PARA IMPRESORA DE INYECCIÓN:
• Tecnología de impresión y resolución
• Velocidad en ppm
• Dúplex solo si confirman
• Conectividad disponible`,

        procesadores: `REGLAS PARA PROCESADORES:
• Socket y caché
• Frecuencia base y máxima
• Núcleos e hilos
• Gráficos integrados solo si tiene`,

        motherboard: `REGLAS PARA MOTHERBOARD:
• Factor de forma y chipset
• Socket del procesador
• Slots de RAM y PCI
• WiFi y Bluetooth solo si tiene`,

        tarjetas_graficas: `REGLAS PARA TARJETAS GRÁFICAS:
• Memoria VRAM y tipo
• Interfaz (PCIe)
• Conectores de video
• Alimentación requerida`,

        televisores: `REGLAS PARA TELEVISORES:
• Tamaño en pulgadas
• Resolución (Full HD, 4K, 8K)
• Tecnología de panel
• Smart TV y sistema operativo`,

        ups_y_ups_online: `REGLAS PARA UPS:
• Capacidad VA/Watts
• Tiempo de respaldo
• Número de salidas
• Tipo: Línea interactiva u Online`
    };
    
    return rules[category] || `REGLAS GENERALES:
• Solo incluye información confirmada
• Omite características sin datos
• Mantén el formato del ejemplo`;
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
    const dropdownMenu = document.getElementById('dropdownMenu');
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
    
    // Toggle de vista
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
    document.getElementById('copyQwenPromptBtn').addEventListener('click', copyQwenPrompt);
    
    // Atajos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// =============================================
// GENERAR DROPDOWN DE CATEGORÍAS
// =============================================
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
    
    // Categorías individuales
    appState.allProducts.forEach(product => {
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
    
    // Limpiar textarea
    document.getElementById('officialDescription').value = '';
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
    document.getElementById('copyQwenPromptBtn').disabled = !hasContent;
    
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
    showToast('✅ Prompt Qwen copiado al portapapeles');
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

function generateQwenPrompt(product, htmlCode, promptRules, officialDescription) {
    const isLaptop = product.category === 'laptop';
    
    const characteristicsRule = isLaptop 
        ? `⚠️ PARA LAPTOPS: Características Sí/No DEBEN estar TODAS. Si no hay info, escribe "No".`
        : `⚠️ OMISIÓN: Si una característica NO aparece → OMITE esa fila. NO escribas "No" o "N/A".`;

    return `# 🎯 TAREA: Generar código HTML para ${product.name}

## ⚠️ FORMATO OBLIGATORIO

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
