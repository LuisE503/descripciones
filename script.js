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
        cartuchos: {
            htmlCode: await loadProductContent('cartuchos.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA CARTUCHOS:

Color: El color del cartucho
• Negro → para cartuchos negros
• Tricolor → para cartuchos de color (CMY)
• NO uses "de Color", usa "Tricolor"

Compatibilidad con impresora: Los modelos compatibles
• Formato: PIXMA MP240 | MP250 | MP480 | MP490
• Separar modelos con " | "

Tamaño XL: SOLO si confirman que es tamaño XL
• Pon ✔ si es XL
• Si no dicen nada → omite esta fila

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        case: {
            htmlCode: await loadProductContent('case.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA CASE/GABINETE:

Clasificación: Escribe el tipo según el caso
• MID TOWER, FULL TOWER, MINI TOWER
• ATX, MICRO-ATX, MINI-ITX, EATX

Color: El color exacto del gabinete

Soporte para Motherboard: Formatos compatibles
• Ejemplo: ATX / MINI-ITX / MICRO-ATX

Paneles:
• Acrílico: Solo pon "Sí" si confirmas que tiene panel acrílico
• Vidrio Templado: Solo pon "Sí" si confirmas que tiene vidrio templado
• Si no mencionan → omite esa fila

Gestión:
• Soporte para cables: Solo si se menciona específicamente

Ventiladores:
• Si el case incluye ventiladores → agrega una fila con la cantidad
• Si no menciona ventiladores → omite esta característica

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        cinta: {
            htmlCode: await loadProductContent('cinta.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA CINTA:

Compatibilidad: Los modelos de impresora compatibles
• Formato: FX-890II / LQ-580IIII
• Separar con " / "

Color: El color de la cinta
• En su mayoría: Negro
• Si es dual (Negro y Rojo) → escribe "Negro"
• Primera letra mayúscula

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        cooler: {
            htmlCode: await loadProductContent('cooler.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA COOLER:

Serie: Solo si mencionan la serie del cooler (ej: Hyper 212, Wraith)

Estilo: El estilo del cooler según especificaciones

Tipo de socket: Compatibilidades del cooler
• Ejemplo: AM4 / AM5 / LGA1200 / LGA1700

Dimensiones: Solo si están especificadas
• Formato: 120 x 120 x 25 mm

Color: El color del cooler

Material: Solo si lo mencionan (ej: Aluminio, Cobre)

Refrigeración:
• Disipador de calor: Solo si confirman que tiene
• Enfriamiento líquido: Solo si confirman que es líquido

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        fuente_de_poder: {
            htmlCode: await loadProductContent('fuente_de_poder.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA FUENTE DE PODER:

Potencia: En Watts
• Ejemplo: 650W, 750W, 850W

Clasificación 80 PLUS: SOLO si tiene certificación
• Opciones: Bronze, Silver, Gold, Platinum, Titanium
• Si NO mencionan certificación 80 PLUS → omite esta fila completamente

Modularidad:
• Modular: Solo si confirman que es totalmente modular
• Semimodular: Solo si confirman que es semimodular
• Si no dicen nada sobre modularidad → omite ambas filas

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        impresora_de_inyeccion: {
            htmlCode: await loadProductContent('impresora de inyeccion.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA IMPRESORA DE INYECCIÓN:

SECCIÓN IMPRESIÓN:
• Tecnología de impresión: Ej: Inyección de tinta, PrecisionCore
• Resolución máxima: Ej: 4800 x 1200 dpi
• Velocidad de impresión: Ej: 15 ppm B/N, 10 ppm Color
• Dúplex automático: SOLO si confirman que tiene

SECCIÓN COPIADO (SOLO si es multifuncional):
• Velocidad de copiado: Ej: 20 cpm
• Cantidad de copias: Ej: 1 - 99

SECCIÓN ESCANEO (SOLO si tiene escáner):
• Tipo de escáner: Ej: Cama plana, ADF
• Resolución óptica: Ej: 1200 dpi

SECCIÓN CONECTIVIDAD:
• Propiedades de conexión: Ej: USB / Wi-Fi / Ethernet

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        impresora_laser: {
            htmlCode: await loadProductContent('impresora_laser.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA IMPRESORA LÁSER:

INFORMACIÓN DEL PRODUCTO:
• Modelo: El modelo exacto de la impresora

CONECTIVIDAD:
• Propiedades de conexión: Ej: Wi‑Fi / USB / Ethernet

CARACTERÍSTICAS:
• Impresión: ✔ (siempre)
• Escaneo: ✔ solo si tiene escáner
• Copiado: ✔ solo si tiene copiadora

VELOCIDAD Y CALIDAD:
• Velocidad de Impresión: Ej: 11.0 ipm B/N, 6.0 ipm Color
• Resolución de Escaneo: SOLO si tiene escáner

IMPRESIÓN:
• Color de Impresión: Negro o Colores

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        impresora_matricial: {
            htmlCode: await loadProductContent('impresora_matricial.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA IMPRESORA MATRICIAL:

INFORMACIÓN DEL PRODUCTO:
• Modelo: El modelo exacto

IMPRESIÓN:
• Método de impresión: Matricial
• Capacidad de la columna: Ej: 66 cps / 88 cps
• Interfaces: Ej: USB + RJ11 para apertura de cajón
• Formato de papel: Ej: 70 - 210 mm (Ancho) x 70 - 297 mm (Alto)
• Color de impresión: Negro (típicamente)

ESPECIFICACIONES TÉCNICAS:
• Matriz de pines: Ej: 9 pines, 24 pines

CARACTERÍSTICAS:
• Oficina: ✔ si es para uso en oficina

VELOCIDAD Y DURABILIDAD:
• Velocidad de impresión: Ej: 233 / 311 cps
• Fiabilidad: Ej: 29.000.000 líneas | 180.000 horas
• Vida útil cinta: SOLO si lo mencionan
• Vida útil cabezal: SOLO si lo mencionan

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        impresora_termica: {
            htmlCode: await loadProductContent('impresora_termica.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA IMPRESORA TÉRMICA:

INFORMACIÓN DEL PRODUCTO:
• Serie: La serie del modelo
• Modelo: El modelo completo

CONECTIVIDAD:
• Propiedades de conexión: Ej: USB / LAN / Wireless
• WiFi: ✔ solo si tiene WiFi

CARACTERÍSTICAS:
• Cortado automático: ✔ solo si lo confirman

VELOCIDAD Y CALIDAD:
• Velocidad de impresión: Ej: 200 mm/s · 260 mm/s

IMPRESIÓN:
• Ancho de papel: Ej: 80 mm / 3"

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        laptop: {
            htmlCode: await loadProductContent('Laptop.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA LAPTOP:

═══════════════════════════════════════
SECCIÓN GENERAL:
═══════════════════════════════════════

Nivel de complejidad - Determina según el procesador:
• Essential: Ryzen 3 o Intel i3 (procesadores básicos)
• Standard: Ryzen 5 o Intel i5
• Premium: Ryzen 7 o Intel i7
• Gaming: Ryzen 5/7 o i5/i7 CON gráfica dedicada

Tipo - Determina según el Windows:
• Consumer: Si tiene Windows Home
• Corporativo: Si tiene Windows Pro / Professional

═══════════════════════════════════════
SECCIÓN PROCESAMIENTO:
═══════════════════════════════════════

Marca de Procesador: Intel o AMD

Tipo de Procesador: El modelo completo
• Ejemplo: Core i5-10400, Ryzen 5 5600H

Tarjeta gráfica (IMPORTANTE):
• Si tiene gráfica DEDICADA → agrega fila con el modelo (NVIDIA GTX 1650, RTX 3060)
• Si NO tiene dedicada → agrega fila y escribe "Integrada"

═══════════════════════════════════════
SECCIÓN ALMACENAMIENTO:
═══════════════════════════════════════

Almacenamiento: Capacidad
• Ejemplo: 512GB, 1TB

Tipo de almacenamiento:
• Opciones: SSD, HDD, SSD + HDD

═══════════════════════════════════════
SECCIÓN MEMORIA:
═══════════════════════════════════════

Memoria RAM: Capacidad
• Ejemplo: 8GB RAM, 16GB RAM

Tipo de Memoria RAM:
• Ejemplo: DDR4, DDR5

═══════════════════════════════════════
SECCIÓN PANTALLA:
═══════════════════════════════════════

Tamaño de Pantalla: En pulgadas
• Ejemplo: 15.6 Plg, 14 Plg

Tipo de Pantalla:
• Ejemplo: LED, IPS, OLED

Resolución máxima:
• Ejemplo: 1920 x 1080, 2560 x 1440

═══════════════════════════════════════
SECCIÓN SOFTWARE:
═══════════════════════════════════════

Sistema Operativo:
• Ejemplo: Windows 11 Home, Windows 11 Pro

Idioma del sistema operativo:
• Ejemplo: Español, Inglés

═══════════════════════════════════════
SECCIÓN CARACTERÍSTICAS (CRÍTICO):
═══════════════════════════════════════

⚠️ DEBES INCLUIR TODAS ESTAS FILAS:

Color: El color de la laptop

Tarjeta gráfica:
• Si tiene dedicada → el modelo
• Si no tiene → "Integrada"

Teclado numérico: Sí o No
Teclado retroiluminado: Sí o No
Teclas de función especial: Sí o No
Pantalla antirreflejo: Sí o No
Pantalla táctil: Sí o No
Pantalla IPS: Sí o No
Pantalla rotable: Sí o No
Pantalla inclinable: Sí o No
Lector de huella digital: Sí o No
Lector de tarjetas: Sí o No

REGLA CRÍTICA:
• Si NO confirmas que tiene la característica → escribe "No"
• NUNCA omitas estas características
• NUNCA dejes celdas vacías
• Por defecto es "No" si no hay información`
        },
        memoria_ram: {
            htmlCode: await loadProductContent('memoria_ram.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA MEMORIA RAM:

Clasificación: El tipo de memoria
• Ejemplo: DDR3, DDR4, DDR5

Dispositivo electrónico: Para qué tipo de equipo
• Ejemplo: Laptop, Desktop, Servidor

Capacidad: La capacidad en GB
• Ejemplo: 8GB, 16GB, 32GB

Velocidad: SOLO si mencionan la velocidad
• Formato: 3200 MHz, 3600 MHz
• Si NO mencionan velocidad → omite esta fila

Latencia CAS: SOLO si la especifican
• Ejemplo: CL16, CL18
• Si NO mencionan → omite esta fila

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        monitores: {
            htmlCode: await loadProductContent('monitores.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA MONITORES:

Tecnología de pantalla:
• Ejemplo: IPS, LCD, VA, OLED

Retroiluminación: SOLO si lo especifican
• Ejemplo: WLED, LED, LCD

Tamaño de pantalla: Con unidad "Plg"
• Ejemplo: 24 Plg, 27 Plg, 32 Plg

Resolución: Sin espacios
• Ejemplo: 1920x1080, 2560x1440, 3840x2160

Tipo de resolución:
• Ejemplo: Full HD, 2K, 4K, 8K

Propiedades de conexión: Puertos disponibles
• Ejemplo: HDMI / DisplayPort / USB

VESA: SOLO si mencionan compatibilidad VESA
• Formato: VESA 100x100, VESA 75x75

Peso: SOLO si lo especifican
• Formato: 7.5 lb, 10 lb

Tiempo de Respuesta: SOLO si lo mencionan
• Formato: 1ms, 5ms

Tasa de Refrescamiento:
• Formato: 60Hz, 144Hz, 165Hz, 240Hz

Características adicionales (SOLO si las confirman):
• Curvo: Sí o No
• FreeSync: Sí o No
• G-Sync: Sí o No
• HDR: Sí o No

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        motherboard: {
            htmlCode: await loadProductContent('motherboard.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA MOTHERBOARD:

Factor de forma:
• Ejemplo: ATX, MICRO-ATX, MINI-ITX, E-ATX

Serie: SOLO si especifican la serie
• Ejemplo: PRIME, ROG STRIX, AORUS

Chipset: El modelo del chipset
• Ejemplo: B550, Z690, X570, H610

Tipo socket del procesador:
• Ejemplo: AM4, AM5, LGA1700, LGA1200

Slots de memoria RAM: Cantidad y tipo
• Ejemplo: 4 Slots DDR4, 2 Slots DDR5

Slots PCI: SOLO si los detallan
• Ejemplo: 2x PCIe 4.0 x16, 1x PCIe 3.0 x1

Puertos USB: SOLO si los detallan
• Ejemplo: USB 3.2, USB-C, USB 2.0

Puerto HDMI: SOLO si confirman que tiene

Puerto DisplayPort: SOLO si confirman que tiene

Conectividad inalámbrica (SOLO si la confirman):
• WiFi: Sí (con versión si mencionan, ej: WiFi 6)
• Bluetooth: Sí (con versión si mencionan, ej: Bluetooth 5.2)

Iluminación RGB: SOLO si mencionan que tiene RGB

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        plotter: {
            htmlCode: await loadProductContent('plotter.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA PLOTTER:

IMPRESIÓN:
• Gota de tinta: Tamaños de gota (Ej: 5.5 pl (C,M,Y); 12 pl (N))
• Tipos de tinta: Tipos usados (Ej: Colorantes (C,M,Y); Pigmento (N))

MANEJO DE SOPORTES:
• Manejo de impresiones: Cómo maneja el papel
• Tipos de soportes: Tipos de papel compatibles

CARTUCHOS Y VOLUMEN:
• Volumen de cartucho/botella: Capacidades (Ej: 80 ml (K); 29 ml (C,M,Y))
• Número de botellas/cartuchos: Cantidad (Ej: 4 (C,M,Y,K))

CONECTIVIDAD:
• Conectividad estándar: Opciones de conexión disponibles

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        procesadores: {
            htmlCode: await loadProductContent('procesadores.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA PROCESADORES:

Marca:
• Ejemplo: Intel, AMD

Serie: SOLO si especifican la serie
• Ejemplo: Core i5, Ryzen 5, Core i7, Ryzen 7

Socket:
• Ejemplo: LGA1700, AM5, AM4, LGA1200

Espacio de caché: Con formato "MB Caché"
• Ejemplo: 20 MB Caché, 30 MB Caché

Frecuencia básica: En GHz
• Ejemplo: 3.6 GHz, 4.2 GHz

Frecuencia máxima: SOLO si la especifican
• Ejemplo: 4.8 GHz, 5.2 GHz

Cantidad de núcleos:
• Ejemplo: 4, 6, 8, 12, 16

Cantidad de hilos:
• Ejemplo: 8, 12, 16, 24, 32

Gráficos integrados: SOLO si tiene gráficos integrados
• Ejemplo: Intel UHD Graphics 770, Radeon Graphics

TDP: SOLO si lo especifican
• Formato: 65W, 125W, 95W

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        proyectores: {
            htmlCode: await loadProductContent('proyectores.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA PROYECTORES:

CARACTERÍSTICAS DE IMAGEN:
• Flujo luminoso: Ej: 3400 lúmenes
• Resolución: Ej: 1024 × 768
• Contraste: Ej: 15,000:1
• Distancia de proyección: Ej: 1.76 m (imagen de 60")

CONECTIVIDAD:
• Propiedades de conexión: Puertos disponibles (Ej: HDMI / VGA / USB)

CARACTERÍSTICAS:
• Duración de lámpara: Ej: 6,000 horas (normal) / 12,000 horas (eco)
• Bocinas incorporadas: Ej: Sí (5 W)
• Control remoto: Sí o No

ACCESORIOS Y GARANTÍA:
• Accesorios: Qué incluye y qué no
• Garantía: Tiempo de garantía

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        regletas: {
            htmlCode: await loadProductContent('regletas.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA REGLETAS:

Número de salidas: Con palabra "salidas"
• Ejemplo: 4 salidas, 6 salidas, 8 salidas

Longitud del cable: Con formato "Cable"
• Ejemplo: Cable 1.5m, Cable 3m, Cable 5m

Voltaje: Sin espacios
• Ejemplo: 110V, 220V, 120V

Puertos USB: SOLO si tiene puertos USB
• Formato: 2 Puertos USB, 4 Puertos USB

Protección contra sobretensiones: SOLO si confirman que tiene

Botón de encendido: SOLO si mencionan que tiene

Montaje en pared: SOLO si confirman que se puede montar

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        regulador_de_voltaje: {
            htmlCode: await loadProductContent('regulador_de_voltaje.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA REGULADOR DE VOLTAJE:

Número de salidas: Con palabra "salidas"
• Ejemplo: 4 salidas, 6 salidas, 8 salidas

Salidas con protección: SOLO si especifican cuántas tienen protección
• Formato: 3 salidas con Protección

Salidas con regulación: SOLO si especifican cuántas tienen regulación
• Formato: 2 salidas con Regulación

Longitud del cable: Con formato "Cable"
• Ejemplo: Cable 1.5m, Cable 3m

Voltaje: Sin espacios
• Ejemplo: 110V, 220V

Capacidad VA: Sin espacio entre número y VA
• Ejemplo: 600VA, 1000VA, 1500VA

Protecciones (SOLO si las confirman):
• Protección contra sobrecargas
• Protección contra picos
• AVR (Regulación Automática de Voltaje)

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        software: {
            htmlCode: await loadProductContent('software.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA SOFTWARE:

Serie / Versión: La versión del software
• Ejemplo: 2024, 365, 2021, 11

Licencia: Tipo de licencia
• Ejemplo: Comercial, Gratis, Suscripción, Perpetua

Plataforma: Sistemas operativos compatibles
• Ejemplo: Windows, macOS, Linux, Multiplataforma

Idioma: Idiomas disponibles
• Ejemplo: Español, Inglés, Multidioma

Requisitos mínimos: Especificaciones mínimas
• Formato: CPU: ...; RAM: ...; Almacenamiento: ...; OS: ...

Requisitos recomendados: SOLO si los especifican
• Mismo formato que mínimos

Tamaño de descarga: SOLO si lo mencionan
• Formato: 500 MB, 2 GB, 5.5 GB

Instalación en la nube: SOLO si confirman que está disponible

Actualizaciones automáticas: SOLO si mencionan que tiene

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        supresor_de_voltaje: {
            htmlCode: await loadProductContent('supresor_de_voltaje.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA SUPRESOR DE VOLTAJE:

Número de salidas: Con palabra "salidas"
• Ejemplo: 4 salidas, 6 salidas

Salidas con supresión: SOLO si especifican cuántas
• Formato: 4 salidas con Supresión

Salidas con regulación: SOLO si especifican cuántas
• Formato: 2 salidas con Regulación

Longitud del cable: Con formato "Cable"
• Ejemplo: Cable 1.5m, Cable 3m

Voltaje: Sin espacios
• Ejemplo: 110V, 220V

Protecciones especiales (SOLO si las confirman):
• Protección RJ11 (para línea telefónica)
• Protección RJ45 (para red ethernet)
• Protección Coaxial (para cable/TV)
• AVR (Regulación Automática)

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        soporte_o_bracket: {
            htmlCode: await loadProductContent('soporte o bracket.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA SOPORTE O BRACKET:

INFORMACIÓN DEL PRODUCTO:
• Modelo: Modelo completo del soporte
• Material: Ej: Acero, Aluminio

INSTALACIÓN:
• Propiedades de instalación: Ej: Pared, Techo
• Tipo de montaje: Ej: Inclinable, Fijo, Articulado

CAPACIDAD:
• Tamaño Soportado: Ej: 55/90 Plg, 32-55 Plg
• Peso soportado: Ej: 110 lb, 50 kg

CARACTERÍSTICAS:
• Ajustable: Sí o No
• Desplazamiento lateral: Sí o No
• Accesorios: Qué incluye

COMPATIBILIDAD:
• Compatibilidad VESA: Medidas compatibles (Ej: 200x200; 400x400; 800x600)

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        tarjetas_graficas: {
            htmlCode: await loadProductContent('tarjetas_graficas.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA TARJETAS GRÁFICAS:

Chipset: Modelo completo de la GPU
• Ejemplo: NVIDIA GeForce RTX 4060, AMD Radeon RX 7600

Serie: SOLO si especifican la serie
• Ejemplo: Gaming, Professional, TUF

Memoria: Capacidad con espacio
• Formato: 8 GB, 12 GB, 16 GB

Tipo de Memoria: En mayúsculas
• Ejemplo: GDDR5, GDDR6, GDDR6X

Velocidad de núcleo: En MHz sin decimales
• Ejemplo: 1500 MHz, 2400 MHz

Boost Clock: SOLO si lo especifican
• Formato: 2500 MHz, 2800 MHz

Velocidad de memoria: SOLO si la mencionan
• Formato: 14 Gbps, 16 Gbps

Ancho de banda de memoria: SOLO si lo especifican
• Formato: 128 bits, 256 bits, 384 bits

Conectores de alimentación: SOLO si los mencionan
• Ejemplo: 8-pin, 6+8 pin, 12VHPWR

TDP: SOLO si lo especifican
• Formato: 200W, 320W

Puertos de salida: Los puertos disponibles
• Ejemplo: 2x DisplayPort / 1x HDMI

Tecnologías adicionales (SOLO si las confirman):
• Overclocking
• Ray Tracing
• DLSS / FSR

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        televisores: {
            htmlCode: await loadProductContent('televisores.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA TELEVISORES:

CARACTERÍSTICAS DE PANTALLA:
• Tamaño de pantalla: Con "Plg" (Ej: 75 Plg, 55 Plg)

CALIDAD DE IMAGEN:
• Resolución: Sin espacios (Ej: 3840 x 2160, 1920 x 1080)
• Tipo de resolución: Ej: 4K UHD, Full HD, 8K

CONECTIVIDAD:
• Puerto HDMI: ✔ si tiene
• Otros puertos: SOLO si los mencionan

CARACTERÍSTICAS:
• SmartTV: ✔ si es Smart TV
• Peso: SOLO si lo especifican (Ej: 22.45 kg)

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        tintas: {
            htmlCode: await loadProductContent('tintas.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA TINTAS:

CARACTERÍSTICAS:
• Color: El color de la tinta (Negro, Cyan, Magenta, Amarillo)
• Contenido: Cantidad en ml (Ej: 500 ml, 70 ml)
• Presentación: Formato (Ej: Botella, Frasco)

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        toner: {
            htmlCode: await loadProductContent('toner.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA TÓNER:

INFORMACIÓN DEL PRODUCTO:
• Modelo del cartucho: Modelo/código del tóner
• Tamaño: SOLO si es XL o especial

CARACTERÍSTICAS:
• Color: Negro, Cyan, Magenta, Amarillo
• Tecnología de impresión: Láser

RENDIMIENTO:
• Cantidad de páginas: Ej: Aprox. 3,000 páginas (cobertura 5%)

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        ups_y_ups_online: {
            htmlCode: await loadProductContent('ups_y_ups_online.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA UPS:

Clasificación: Tipo de UPS
• Opciones: Offline (Standby), Online (Doble Conversión), Line-Interactive

Número de salidas: Con palabra "salidas"
• Ejemplo: 4 salidas, 6 salidas, 8 salidas

Salidas con batería: Cuántas funcionan con batería
• Formato: 4 salidas de Batería, 6 salidas de Batería

Salidas con supresión: SOLO si especifican cuántas
• Formato: 3 salidas con Supresión

Salidas con regulación: SOLO si especifican cuántas
• Formato: 2 salidas con Regulación

Longitud del cable: Con formato "Cable"
• Ejemplo: Cable 1.5m, Cable 3m

Tiempo de autonomía: IMPORTANTE - duración con batería
• Formato: 10min, 30min, 1h, 2h

Voltaje: Sin espacios
• Ejemplo: 110V, 220V

Capacidad: Con formato VA/W o solo VA
• Ejemplo: 1000VA/600W, 1500VA, 2000VA/1200W

Tipo de batería: SOLO si lo especifican
• Ejemplo: Sellada, Li-Ion, AGM

Pantalla LCD: SOLO si confirman que tiene

Protecciones (SOLO si las mencionan):
• Protección RJ11 / RJ45
• Puerto USB
• Alarma sonora

REGLA: Si algo no se menciona → NO lo incluyas en el código`
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
        // Codificar el nombre del archivo para manejar espacios y caracteres especiales
        const encodedFileName = encodeURIComponent(fileName).replace(/%2F/g, '/');
        const response = await fetch(encodedFileName);
        if (!response.ok) {
            console.error(`❌ No se pudo cargar: ${fileName} - Status: ${response.status}`);
            return `<!-- Error: No se pudo cargar ${fileName} - Status: ${response.status} -->`;
        }
        const content = await response.text();
        
        // Extraer el HTML completo desde el comentario inicial hasta el cierre de </style>
        // Esto captura: <!-- BLOQUE: ... --> ... <div class="row"> ... </style>
        const htmlMatch = content.match(/<!--[\s\S]*?<\/style>/);
        
        if (htmlMatch) {
            console.log(`✅ Cargado correctamente: ${fileName}`);
            return htmlMatch[0];
        } else {
            console.warn(`⚠️ No se encontró estructura HTML/CSS en: ${fileName}`);
            return content; // Retornar todo el contenido si no hay match
        }
    } catch (error) {
        console.error(`❌ Error cargando ${fileName}:`, error);
        return `<!-- Error cargando ${fileName}: ${error.message} -->`;
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
    
    // Deshabilitar botón desde el inicio
    const copyBtn = document.getElementById('copyFullPromptBtn');
    copyBtn.disabled = true;
    
    // Reset status
    const status = document.getElementById('descriptionStatus');
    status.querySelector('.status-icon').textContent = 'ℹ️';
    status.querySelector('.status-text').textContent = 'Pega la descripción del producto para activar el botón de copiar';
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
    
    // Verificar que haya descripción
    if (!officialDescription) {
        showToast('⚠️ Por favor pega la descripción del producto primero');
        return;
    }
    
    // Debug: Verificar que los datos sean correctos
    console.log('🔍 Debug - Producto:', product.name);
    console.log('🔍 Debug - Categoría:', product.category);
    console.log('🔍 Debug - Tiene promptRules:', !!productData.promptRules);
    console.log('🔍 Debug - PromptRules preview:', productData.promptRules.substring(0, 100));
    
    // Generar prompt completo con la descripción
    const fullPrompt = generateFullPrompt(product, productData.htmlCode, productData.promptRules, officialDescription);
    copyToClipboard(fullPrompt);
    
    showToast('✅ ¡Prompt completo copiado! Pégalo en ChatGPT-5, Copilot o QWEN');
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
        statusText.textContent = 'Pega la descripción del producto para activar el botón de copiar';
        status.className = 'description-status';
        copyBtn.disabled = true;
        copyBtnText.textContent = 'Copiar Todo con Prompt';
    } else if (text.trim().length < 50) {
        statusIcon.textContent = '⚠️';
        statusText.textContent = `${text.trim().length} caracteres - considera agregar más detalles para un mejor resultado`;
        status.className = 'description-status warning';
        copyBtn.disabled = false;
        copyBtnText.textContent = 'Copiar Todo con Prompt';
    } else {
        statusIcon.textContent = '✅';
        statusText.textContent = `¡Perfecto! ${text.trim().length} caracteres detectados - listo para copiar`;
        status.className = 'description-status success';
        copyBtn.disabled = false;
        copyBtnText.textContent = '🚀 Copiar Todo con Prompt';
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
