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
        },
        adaptador_de_red_usb: {
            htmlCode: await loadProductContent('adaptador_de_red_usb.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA ADAPTADOR DE RED USB:

Tipo de conexión: WiFi, Ethernet, o Dual
• Ejemplo: WiFi, Ethernet USB, WiFi + Ethernet

Estándar WiFi: SOLO si es WiFi
• Ejemplo: WiFi 5 (802.11ac), WiFi 6 (802.11ax)

Velocidad máxima: En Mbps o Gbps
• Ejemplo: 300 Mbps, 1200 Mbps, 1 Gbps

Frecuencia: SOLO si es WiFi
• Ejemplo: 2.4 GHz, 5 GHz, Dual Band (2.4/5 GHz)

Puerto USB: Tipo de puerto USB
• Ejemplo: USB 2.0, USB 3.0, USB 3.1, USB-C

Sistemas operativos compatibles:
• Ejemplo: Windows / macOS / Linux

Antena: SOLO si mencionan tipo de antena
• Ejemplo: Antena externa, Antena interna

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        almacenamiento_externo: {
            htmlCode: await loadProductContent('almacenamiento_externo.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA ALMACENAMIENTO EXTERNO:

Capacidad: En GB o TB
• Ejemplo: 500 GB, 1 TB, 2 TB, 4 TB

Tipo: Tipo de dispositivo
• Ejemplo: HDD Externo, SSD Externo, SSD Portátil

Velocidad de transferencia: SOLO si la especifican
• Ejemplo: 5 Gbps, 10 Gbps

Interfaz: Puerto de conexión
• Ejemplo: USB 3.0, USB 3.1, USB-C, Thunderbolt

Tamaño: Formato físico
• Ejemplo: 2.5", 3.5", Portátil

Compatibilidad:
• Ejemplo: Windows / macOS / Linux / PS4 / PS5 / Xbox

Características adicionales (SOLO si las confirman):
• Cifrado por hardware
• Resistente a golpes
• Respaldo automático
• Incluye software

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        amplificador_de_red: {
            htmlCode: await loadProductContent('amplificador_de_red.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA AMPLIFICADOR DE RED:

Estándar WiFi:
• Ejemplo: WiFi 5 (802.11ac), WiFi 6 (802.11ax)

Velocidad máxima: En Mbps o Gbps
• Ejemplo: 300 Mbps, 1200 Mbps, 1800 Mbps

Frecuencia:
• Ejemplo: 2.4 GHz, 5 GHz, Dual Band (2.4/5 GHz)

Cobertura: SOLO si la especifican
• Ejemplo: Hasta 100 m², Hasta 150 m²

Puertos Ethernet: SOLO si tiene puertos Ethernet
• Ejemplo: 1 puerto, 2 puertos, 4 puertos

Número de antenas: SOLO si especifican
• Ejemplo: 2 antenas, 3 antenas, 4 antenas

Modos de operación:
• Ejemplo: Extensor, Punto de Acceso, Router

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        audifonos_cableados_e_inalambricos: {
            htmlCode: await loadProductContent('audifonos_cableados_e_inalambricos.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA AUDÍFONOS:

Tipo de conexión:
• Ejemplo: Cableados, Inalámbricos, Bluetooth, USB

Tipo de audífono:
• Ejemplo: Over-ear, On-ear, In-ear, Earbuds

Bluetooth: SOLO si es inalámbrico
• Ejemplo: Bluetooth 5.0, Bluetooth 5.3

Duración de batería: SOLO si es inalámbrico
• Ejemplo: 20 horas, 30 horas, 40 horas

Cancelación de ruido: SOLO si la tiene
• Ejemplo: ANC (Activa), Pasiva

Micrófono: Sí o SOLO si lo confirman

Resistencia al agua: SOLO si la tiene
• Ejemplo: IPX4, IPX5, IPX7

Respuesta de frecuencia: SOLO si la especifican
• Ejemplo: 20Hz - 20kHz

Impedancia: SOLO si la especifican
• Ejemplo: 32 Ohms, 16 Ohms

Compatibilidad:
• Ejemplo: Universal / iOS / Android / PC / Consolas

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        bases_para_laptop: {
            htmlCode: await loadProductContent('bases_para_laptop.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA BASES PARA LAPTOP:

Tipo: Tipo de base
• Ejemplo: Base de refrigeración, Soporte ergonómico, Base elevadora

Tamaño compatible: Tamaños de laptop compatibles
• Ejemplo: Hasta 15.6", Hasta 17", 11-15.6"

Número de ventiladores: SOLO si tiene ventiladores
• Ejemplo: 1 ventilador, 2 ventiladores, 4 ventiladores

Velocidad de ventiladores: SOLO si la especifican
• Ejemplo: 1000 RPM, Ajustable

Puertos USB: SOLO si tiene puertos USB
• Ejemplo: 2 puertos USB

Ángulos de ajuste: SOLO si es ajustable
• Ejemplo: 5 posiciones, Ajustable hasta 30°

Material:
• Ejemplo: Plástico, Metal, Malla metálica

Características adicionales (SOLO si las confirman):
• Antideslizante
• LED
• Plegable
• Portátil

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        bocina_e_inalambrica_y_sistema_de_audio: {
            htmlCode: await loadProductContent('bocina_e_inalambrica_y_sistema_de_audio.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA BOCINAS Y SISTEMAS DE AUDIO:

Tipo: Tipo de bocina
• Ejemplo: Bluetooth, WiFi, Sistema 2.1, Soundbar, Portátil

Potencia: En Watts (W)
• Ejemplo: 10W, 20W, 100W RMS

Conectividad:
• Ejemplo: Bluetooth / AUX / USB / SD

Bluetooth: SOLO si es inalámbrico
• Ejemplo: Bluetooth 5.0, Bluetooth 5.3

Duración de batería: SOLO si es portátil
• Ejemplo: 8 horas, 12 horas, 20 horas

Resistencia al agua: SOLO si la tiene
• Ejemplo: IPX5, IPX7

Rango de frecuencia: SOLO si lo especifican
• Ejemplo: 50Hz - 20kHz

Componentes: Para sistemas de audio
• Ejemplo: 2 bocinas + subwoofer

Características adicionales (SOLO si las confirman):
• Luces LED
• Control remoto
• Radio FM
• Micrófono incluido
• Manos libres

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        cable_hdmi: {
            htmlCode: await loadProductContent('cable_hdmi.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA CABLE HDMI:

Versión HDMI:
• Ejemplo: HDMI 1.4, HDMI 2.0, HDMI 2.1

Longitud: En metros o pies
• Ejemplo: 1.5m, 3m, 5m, 10m

Resolución soportada:
• Ejemplo: 1080p, 4K@60Hz, 4K@120Hz, 8K@60Hz

Características (SOLO si las confirman):
• HDR
• ARC (Audio Return Channel)
• eARC (Enhanced ARC)
• Ethernet
• 3D

Ancho de banda: SOLO si lo especifican
• Ejemplo: 18 Gbps, 48 Gbps

Conectores:
• Ejemplo: HDMI Tipo A, HDMI Mini, HDMI Micro

Material: SOLO si lo especifican
• Ejemplo: Cable trenzado, Recubierto en nylon

Blindaje: SOLO si lo mencionan
• Ejemplo: Triple blindaje, Chapado en oro

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        cable_usb: {
            htmlCode: await loadProductContent('cable_usb.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA CABLE USB:

Tipo de cable:
• Ejemplo: USB-A a USB-C, USB-C a USB-C, Micro USB, Lightning

Versión USB:
• Ejemplo: USB 2.0, USB 3.0, USB 3.1, USB 3.2

Longitud: En metros o pies
• Ejemplo: 1m, 2m, 3m

Velocidad de transferencia:
• Ejemplo: 480 Mbps, 5 Gbps, 10 Gbps

Corriente de carga: SOLO si la especifican
• Ejemplo: 2.4A, 3A, 5A

Potencia: SOLO si la especifican
• Ejemplo: 60W, 100W

Características (SOLO si las confirman):
• Carga rápida
• Trenzado
• Reforzado
• Datos + carga

Material: SOLO si lo especifican
• Ejemplo: Nylon trenzado, TPE

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        cable_utp_y_bobina_de_cable: {
            htmlCode: await loadProductContent('cable_utp_y_bobina_de_cable.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA CABLE UTP Y BOBINA:

Categoría:
• Ejemplo: Cat5e, Cat6, Cat6a, Cat7

Longitud: 
• Para cable: 1m, 3m, 5m, 10m
• Para bobina: 305m (1000ft), 152.5m (500ft)

Tipo de cable:
• Ejemplo: UTP, STP, FTP

Velocidad máxima:
• Ejemplo: 1 Gbps, 10 Gbps

Ancho de banda: SOLO si lo especifican
• Ejemplo: 250 MHz, 550 MHz, 600 MHz

Color: SOLO si lo especifican
• Ejemplo: Azul, Gris, Negro, Blanco

Blindaje: SOLO si es STP o FTP
• Ejemplo: Blindado, Apantallado

Presentación:
• Ejemplo: Cable individual, Bobina, Rollo

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        cables_vga: {
            htmlCode: await loadProductContent('cables_vga.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA CABLES VGA:

Tipo de cable:
• Ejemplo: VGA a VGA, VGA a HDMI, VGA a DVI

Longitud: En metros o pies
• Ejemplo: 1.5m, 3m, 5m, 10m

Resolución soportada:
• Ejemplo: 1920x1080, 1920x1200, 1024x768

Conectores:
• Ejemplo: VGA macho a VGA macho, VGA macho a HDMI macho

Blindaje: SOLO si lo mencionan
• Ejemplo: Doble blindaje, Triple blindaje

Núcleos de ferrita: SOLO si los tiene
• Ejemplo: Con núcleos de ferrita

Material: SOLO si lo especifican
• Ejemplo: Cable PVC, Chapado en oro

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        camara_de_video_web_dslr_digital: {
            htmlCode: await loadProductContent('camara_de_video_web_dslr_digital.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA CÁMARAS:

Tipo de cámara:
• Ejemplo: Webcam, DSLR, Mirrorless, Compacta, Acción

Resolución de video:
• Ejemplo: 720p, 1080p, 4K, 8K

FPS (Cuadros por segundo): SOLO si lo especifican
• Ejemplo: 30 fps, 60 fps, 120 fps

Resolución de fotos: SOLO para cámaras digitales
• Ejemplo: 24 MP, 32 MP, 50 MP

Sensor: SOLO para cámaras digitales
• Ejemplo: CMOS, CCD, Full Frame, APS-C

Conectividad:
• Ejemplo: USB, USB-C, WiFi, Bluetooth

Micrófono: Sí o especificar tipo
• Ejemplo: Micrófono estéreo, Micrófono incorporado

Enfoque: SOLO si lo especifican
• Ejemplo: Autofoco, Manual, Dual

Campo de visión: SOLO para webcams
• Ejemplo: 78°, 90°, 120°

Características adicionales (SOLO si las confirman):
• Corrección de luz
• Reducción de ruido
• HDR
• Montaje en trípode
• Pantalla táctil

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        camaras_de_vigilancia_analoga_ip_wifi: {
            htmlCode: await loadProductContent('camaras_de_vigilancia_analoga_ip_wifi.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA CÁMARAS DE VIGILANCIA:

Tipo de cámara:
• Ejemplo: Análoga, IP, WiFi, PoE

Resolución:
• Ejemplo: 720p, 1080p, 2K, 4K, 5MP, 8MP

Tipo de instalación:
• Ejemplo: Interior, Exterior, Domo, Bullet

Visión nocturna: SOLO si la tiene
• Ejemplo: Hasta 20m, Hasta 30m, Infrarroja

Ángulo de visión:
• Ejemplo: 90°, 110°, 180°, 360°

Conectividad:
• Ejemplo: WiFi / Ethernet / PoE

Almacenamiento: SOLO si lo especifican
• Ejemplo: MicroSD hasta 128GB, Nube, NVR

Características (SOLO si las confirman):
• Detección de movimiento
• Audio bidireccional
• Pan/Tilt/Zoom (PTZ)
• Resistente al agua (IP66, IP67)
• Visión nocturna a color
• Sirena integrada

Alimentación:
• Ejemplo: 12V DC, PoE, Batería

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        combo_teclado_y_mouse_cableados_e_inalambrico: {
            htmlCode: await loadProductContent('combo_teclado_y_mouse_cableados_e_inalambrico.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA COMBO TECLADO Y MOUSE:

Tipo de conexión:
• Ejemplo: Cableado USB, Inalámbrico 2.4GHz, Bluetooth

Idioma del teclado:
• Ejemplo: Español, Inglés, Latinoamérica

Tipo de teclado:
• Ejemplo: Membrana, Mecánico, Chiclet

Teclado numérico: Sí o No

Características del teclado (SOLO si las confirman):
• Retroiluminado (especificar color si lo mencionan)
• Resistente a salpicaduras
• Teclas multimedia
• Reposamuñecas

Tipo de mouse:
• Ejemplo: Óptico, Láser

DPI del mouse: SOLO si lo especifican
• Ejemplo: 1000 DPI, 1600 DPI, Ajustable

Duración de batería: SOLO si es inalámbrico
• Ejemplo: 12 meses, 24 meses

Compatibilidad:
• Ejemplo: Windows / macOS / Linux

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        dvr: {
            htmlCode: await loadProductContent('dvr.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA DVR:

Canales:
• Ejemplo: 4 canales, 8 canales, 16 canales

Resolución de grabación:
• Ejemplo: 720p, 1080p, 4K, 5MP

Tipo de cámaras compatibles:
• Ejemplo: Análogas, AHD, TVI, CVI, CVBS

Compresión de video:
• Ejemplo: H.264, H.265, H.265+

Almacenamiento:
• Ejemplo: 1 HDD hasta 4TB, 2 HDD hasta 8TB

Conectividad:
• Ejemplo: HDMI / VGA / Ethernet

Acceso remoto: SOLO si lo confirman
• Ejemplo: App móvil, Navegador web

FPS (Cuadros por segundo): SOLO si lo especifican
• Ejemplo: 30 fps por canal, 60 fps total

Características (SOLO si las confirman):
• Detección de movimiento
• Respaldo USB
• P2P
• Salida de audio
• Puerto PoE

Alimentación:
• Ejemplo: 12V DC, Fuente incluida

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        enclousure: {
            htmlCode: await loadProductContent('enclousure.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA ENCLOSURE:

Tipo de disco compatible:
• Ejemplo: 2.5", 3.5", M.2 NVMe, M.2 SATA

Interfaz del disco:
• Ejemplo: SATA III, NVMe PCIe

Puerto de conexión:
• Ejemplo: USB 3.0, USB 3.1, USB-C, Thunderbolt 3

Velocidad de transferencia:
• Ejemplo: 5 Gbps, 10 Gbps

Capacidad máxima: SOLO si la especifican
• Ejemplo: Hasta 4TB, Hasta 8TB

Material:
• Ejemplo: Aluminio, Plástico ABS

Compatibilidad:
• Ejemplo: Windows / macOS / Linux

Características (SOLO si las confirman):
• Hot-swap
• LED indicador
• Sistema de enfriamiento
• Sin herramientas

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        escaneres: {
            htmlCode: await loadProductContent('escaneres.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA ESCÁNERES:

Tipo de escáner:
• Ejemplo: Cama plana, Alimentador automático (ADF), Portátil

Resolución óptica:
• Ejemplo: 600 dpi, 1200 dpi, 4800 dpi

Tamaño de escaneo:
• Ejemplo: A4, Carta, A3

Velocidad de escaneo: SOLO si la especifican
• Ejemplo: 8 ppm, 25 ppm

Conectividad:
• Ejemplo: USB / WiFi / Ethernet

Capacidad del ADF: SOLO si tiene ADF
• Ejemplo: 35 hojas, 50 hojas

Escaneo dúplex: SOLO si lo tiene
• Ejemplo: Escaneo dúplex automático

Formatos de salida: SOLO si los especifican
• Ejemplo: PDF / JPEG / TIFF / PNG

Compatibilidad:
• Ejemplo: Windows / macOS / Linux

Características (SOLO si las confirman):
• OCR (Reconocimiento de texto)
• Escaneo a email
• Escaneo a nube

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        estacion_de_carga: {
            htmlCode: await loadProductContent('estacion_de_carga.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA ESTACIÓN DE CARGA:

Número de puertos:
• Ejemplo: 4 puertos, 6 puertos, 10 puertos

Tipo de puertos:
• Ejemplo: USB-A, USB-C, Lightning

Potencia total:
• Ejemplo: 60W, 100W, 200W

Potencia por puerto: SOLO si la especifican
• Ejemplo: 2.4A por puerto, 3A por puerto

Tecnologías de carga (SOLO si las confirman):
• Quick Charge
• Power Delivery (PD)
• Carga inteligente

Protecciones:
• Ejemplo: Sobrecarga, Sobrecalentamiento, Cortocircuito

Compatibilidad:
• Ejemplo: Universal / iPhone / Android / Tablets

Características adicionales (SOLO si las confirman):
• LED indicador
• Switch individual por puerto
• Base antideslizante
• Organizador de cables

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        gabinetes: {
            htmlCode: await loadProductContent('gabinetes.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA GABINETES:

Clasificación: Tipo y tamaño
• Ejemplo: Mid Tower ATX, Full Tower, Mini ITX

Factor de forma compatible:
• Ejemplo: ATX / Micro-ATX / Mini-ITX

Color:
• Ejemplo: Negro, Blanco, RGB

Panel lateral:
• Ejemplo: Vidrio templado, Acrílico, Metal

Bahías para unidades: SOLO si las especifican
• Ejemplo: 2x 3.5" / 2x 2.5"

Ventiladores incluidos: SOLO si vienen incluidos
• Ejemplo: 2x 120mm frontales, 1x 120mm trasero

Espacios para ventiladores: SOLO si lo especifican
• Ejemplo: 3x 120mm frontales, 2x 140mm superior

Radiador compatible: SOLO si soporta watercooling
• Ejemplo: Hasta 360mm frontal, Hasta 240mm superior

Puertos frontales:
• Ejemplo: 2x USB 3.0 / 1x USB-C / Audio

Filtros de polvo: SOLO si los tiene

Gestión de cables: SOLO si lo mencionan
• Ejemplo: Pasacables, Espacio para cables

Longitud máxima GPU: SOLO si la especifican
• Ejemplo: Hasta 350mm

Altura máxima CPU cooler: SOLO si la especifican
• Ejemplo: Hasta 165mm

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        hostpot: {
            htmlCode: await loadProductContent('hostpot.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA HOTSPOT:

Tipo de conexión:
• Ejemplo: 4G LTE, 5G, WiFi

Estándar WiFi:
• Ejemplo: WiFi 5 (802.11ac), WiFi 6 (802.11ax)

Velocidad máxima de descarga:
• Ejemplo: 150 Mbps, 300 Mbps, 1 Gbps

Dispositivos conectados:
• Ejemplo: Hasta 10 dispositivos, Hasta 32 dispositivos

Duración de batería:
• Ejemplo: 8 horas, 12 horas, 24 horas

Ranura para SIM:
• Ejemplo: Nano SIM, Micro SIM

Puerto Ethernet: SOLO si lo tiene
• Ejemplo: 1 puerto Gigabit

Pantalla: SOLO si la tiene
• Ejemplo: Pantalla LCD, Pantalla táctil

Características (SOLO si las confirman):
• MicroSD para compartir archivos
• Puerto USB
• Aplicación móvil
• VPN

Bandas compatibles: SOLO si las especifican
• Ejemplo: B1/B3/B7/B8/B20

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        hub_usb: {
            htmlCode: await loadProductContent('hub_usb.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA HUB USB:

Número de puertos:
• Ejemplo: 4 puertos, 7 puertos, 10 puertos

Tipo de puertos:
• Ejemplo: USB 3.0, USB 3.1, USB-C, Mezcla (2x USB-C + 4x USB-A)

Versión USB:
• Ejemplo: USB 3.0, USB 3.1 Gen 1, USB 3.2

Velocidad de transferencia:
• Ejemplo: 5 Gbps, 10 Gbps

Alimentación:
• Ejemplo: Bus-powered (sin adaptador), Con adaptador externo

Características (SOLO si las confirman):
• LED indicador por puerto
• Switch individual
• Carga rápida
• Protección contra sobrecarga

Compatibilidad:
• Ejemplo: Windows / macOS / Linux

Material: SOLO si lo especifican
• Ejemplo: Aluminio, Plástico ABS

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        iot: {
            htmlCode: await loadProductContent('iot.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA IOT:

Tipo de dispositivo:
• Ejemplo: Smart plug, Smart bulb, Sensor, Cámara, Thermostat

Conectividad:
• Ejemplo: WiFi / Bluetooth / Zigbee / Z-Wave

Compatibilidad con asistentes:
• Ejemplo: Alexa / Google Assistant / Siri / HomeKit

Control:
• Ejemplo: App móvil, Voz, Automatización

Características específicas según tipo:
• Para enchufes: Potencia máxima, Monitoreo de energía
• Para focos: Temperatura de color, RGB, Lumens
• Para sensores: Tipo de sensor, Rango de detección
• Para termostatos: Rango de temperatura

Alimentación:
• Ejemplo: 110V, USB, Batería

Hub requerido: SOLO si requiere hub
• Ejemplo: Requiere hub Zigbee, Funciona sin hub

Características adicionales (SOLO si las confirman):
• Temporizador
• Escenas
• IFTTT
• Consumo de energía

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        memorias_extraibles: {
            htmlCode: await loadProductContent('memorias_extraibles.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA MEMORIAS EXTRAÍBLES:

Tipo:
• Ejemplo: USB Flash Drive, MicroSD, SD Card, CompactFlash

Capacidad:
• Ejemplo: 16 GB, 32 GB, 64 GB, 128 GB, 256 GB, 512 GB

Velocidad de lectura: SOLO si la especifican
• Ejemplo: 100 MB/s, 150 MB/s

Velocidad de escritura: SOLO si la especifican
• Ejemplo: 50 MB/s, 90 MB/s

Clase de velocidad: Para tarjetas SD/MicroSD
• Ejemplo: Class 10, UHS-I U3, UHS-II U3, V30

Interfaz: Para USB
• Ejemplo: USB 2.0, USB 3.0, USB 3.1, USB-C

Características (SOLO si las confirman):
• Resistente al agua
• Resistente a golpes
• Resistente a rayos X
• Resistente a temperaturas

Compatibilidad:
• Ejemplo: Cámaras / Drones / Smartphones / Tablets / PC

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        microfono: {
            htmlCode: await loadProductContent('microfono.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA MICRÓFONO:

Tipo de micrófono:
• Ejemplo: Condensador, Dinámico, Lavalier, Shotgun

Patrón polar:
• Ejemplo: Cardioide, Omnidireccional, Bidireccional

Conectividad:
• Ejemplo: USB / XLR / 3.5mm / Inalámbrico

Frecuencia de muestreo: SOLO si la especifican
• Ejemplo: 48 kHz, 96 kHz

Resolución de bits: SOLO si la especifican
• Ejemplo: 16-bit, 24-bit

Respuesta de frecuencia: SOLO si la especifican
• Ejemplo: 20Hz - 20kHz

Monitoreo: SOLO si lo tiene
• Ejemplo: Jack de audífonos 3.5mm

Características (SOLO si las confirman):
• Botón de mute
• Control de ganancia
• Filtro pop incluido
• Brazo articulado
• Cancelación de ruido
• Monitoreo en tiempo real

Uso recomendado:
• Ejemplo: Streaming / Podcasting / Gaming / Música / Conferencias

Compatibilidad:
• Ejemplo: Windows / macOS / PS4 / PS5

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        mouse_cableados: {
            htmlCode: await loadProductContent('mouse_cableados.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA MOUSE CABLEADOS:

Tipo de sensor:
• Ejemplo: Óptico, Láser

DPI:
• Ejemplo: 1000 DPI, 1600 DPI, Ajustable hasta 16000 DPI

Número de botones:
• Ejemplo: 3 botones, 6 botones, 8 botones programables

Conectividad:
• Ejemplo: USB, USB-C

Tipo de uso:
• Ejemplo: Oficina, Gaming, Ergonómico

Cable: SOLO si especifican detalles
• Ejemplo: Cable trenzado 1.8m, Cable reforzado

Iluminación RGB: SOLO si la tiene

Peso: SOLO si lo especifican
• Ejemplo: 85g, 120g

Software: SOLO si incluye software
• Ejemplo: Software de personalización

Compatibilidad:
• Ejemplo: Windows / macOS / Linux

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        mouse_inalambricos: {
            htmlCode: await loadProductContent('mouse_inalambricos.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA MOUSE INALÁMBRICOS:

Tipo de conexión:
• Ejemplo: 2.4GHz con receptor USB, Bluetooth, Dual (2.4GHz + Bluetooth)

Tipo de sensor:
• Ejemplo: Óptico, Láser

DPI:
• Ejemplo: 1000 DPI, 1600 DPI, Ajustable hasta 16000 DPI

Número de botones:
• Ejemplo: 3 botones, 6 botones, 8 botones programables

Duración de batería:
• Ejemplo: 12 meses, 18 meses, 500 horas

Tipo de batería:
• Ejemplo: 1x AA, 2x AAA, Recargable

Alcance: SOLO si lo especifican
• Ejemplo: Hasta 10m

Iluminación RGB: SOLO si la tiene

Peso: SOLO si lo especifican
• Ejemplo: 85g, 120g

Compatibilidad:
• Ejemplo: Windows / macOS / Linux / Chrome OS

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        mouse_pad: {
            htmlCode: await loadProductContent('mouse_pad.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA MOUSE PAD:

Tamaño:
• Ejemplo: Pequeño (250x200mm), Mediano (350x250mm), Grande (900x400mm), XXL

Material de superficie:
• Ejemplo: Tela, Plástico duro, Aluminio, Vidrio

Base:
• Ejemplo: Goma antideslizante, Caucho natural

Grosor: SOLO si lo especifican
• Ejemplo: 2mm, 3mm, 4mm

Tipo:
• Ejemplo: Speed (rápido), Control, Híbrido

Iluminación RGB: SOLO si la tiene

Características (SOLO si las confirman):
• Bordes cosidos
• Resistente al agua
• Base con carga inalámbrica
• USB hub integrado

Uso recomendado:
• Ejemplo: Gaming, Oficina, Diseño

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        nvr: {
            htmlCode: await loadProductContent('nvr.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA NVR:

Canales:
• Ejemplo: 4 canales, 8 canales, 16 canales, 32 canales

Resolución de grabación:
• Ejemplo: 1080p, 4K, 5MP, 8MP

Tipo de cámaras compatibles:
• Ejemplo: IP, PoE

Compresión de video:
• Ejemplo: H.264, H.265, H.265+

Almacenamiento:
• Ejemplo: 1 HDD hasta 6TB, 2 HDD hasta 16TB

Puertos PoE: SOLO si tiene PoE integrado
• Ejemplo: 4 puertos PoE, 8 puertos PoE

Conectividad:
• Ejemplo: HDMI / VGA / Ethernet

Acceso remoto: SOLO si lo confirman
• Ejemplo: App móvil, P2P, DDNS

Ancho de banda de entrada: SOLO si lo especifican
• Ejemplo: 80 Mbps, 160 Mbps

FPS: SOLO si lo especifican
• Ejemplo: 30 fps por canal

Características (SOLO si las confirman):
• Detección de movimiento
• Respaldo USB
• Salida de alarma
• Audio bidireccional

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        punto_de_acceso: {
            htmlCode: await loadProductContent('punto_de_acceso.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA PUNTO DE ACCESO:

Estándar WiFi:
• Ejemplo: WiFi 5 (802.11ac), WiFi 6 (802.11ax), WiFi 6E

Velocidad máxima:
• Ejemplo: 1200 Mbps, 1800 Mbps, 3000 Mbps

Frecuencia:
• Ejemplo: 2.4 GHz, 5 GHz, Dual Band, Tri-band

Puertos Ethernet:
• Ejemplo: 1 puerto Gigabit, 2 puertos Gigabit

PoE: SOLO si soporta PoE
• Ejemplo: PoE 802.3af, PoE+ 802.3at

Número de antenas: SOLO si lo especifican
• Ejemplo: 2 antenas internas, 4 antenas externas

Dispositivos simultáneos: SOLO si lo especifican
• Ejemplo: Hasta 50 dispositivos, Hasta 100 dispositivos

Modos de operación:
• Ejemplo: AP, Router, Repetidor, Cliente

Montaje:
• Ejemplo: Pared, Techo, Escritorio

Características (SOLO si las confirman):
• MU-MIMO
• Beamforming
• VLAN
• Gestión centralizada
• Portal cautivo

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        repetidores_de_red: {
            htmlCode: await loadProductContent('repetidores_de_red.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA REPETIDORES DE RED:

Estándar WiFi:
• Ejemplo: WiFi 5 (802.11ac), WiFi 6 (802.11ax)

Velocidad máxima:
• Ejemplo: 300 Mbps, 1200 Mbps, 1800 Mbps

Frecuencia:
• Ejemplo: 2.4 GHz, 5 GHz, Dual Band (2.4/5 GHz)

Cobertura ampliada: SOLO si la especifican
• Ejemplo: Hasta 90 m², Hasta 150 m²

Puertos Ethernet: SOLO si tiene
• Ejemplo: 1 puerto, 2 puertos Gigabit

Número de antenas: SOLO si lo especifican
• Ejemplo: 2 antenas internas, 3 antenas externas

Modos de operación:
• Ejemplo: Repetidor, Punto de Acceso, Router

Características (SOLO si las confirman):
• WPS (configuración fácil)
• LED indicador de señal
• Puerto USB
• Aplicación móvil

Compatibilidad:
• Ejemplo: Compatible con cualquier router

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        router: {
            htmlCode: await loadProductContent('router.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA ROUTER:

Estándar WiFi:
• Ejemplo: WiFi 5 (802.11ac), WiFi 6 (802.11ax), WiFi 6E

Velocidad máxima:
• Ejemplo: AC1200 (1200 Mbps), AX3000 (3000 Mbps)

Frecuencia:
• Ejemplo: 2.4 GHz, 5 GHz, Dual Band, Tri-band

Número de antenas:
• Ejemplo: 2 antenas, 4 antenas, 6 antenas, 8 antenas

Puertos LAN:
• Ejemplo: 4 puertos Gigabit Ethernet

Puerto WAN:
• Ejemplo: 1 puerto Gigabit

Puerto USB: SOLO si lo tiene
• Ejemplo: 1x USB 3.0, 2x USB 2.0

Procesador: SOLO si lo especifican
• Ejemplo: Dual-core 1.5GHz, Quad-core 1.8GHz

RAM: SOLO si la especifican
• Ejemplo: 512 MB, 1 GB

Cobertura: SOLO si la especifican
• Ejemplo: Hasta 200 m², Casas de hasta 3 pisos

Características (SOLO si las confirman):
• MU-MIMO
• Beamforming
• QoS
• Control parental
• VPN
• Guest network
• IPv6

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        smartphone: {
            htmlCode: await loadProductContent('smartphone.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA SMARTPHONE:

Marca y modelo:
• Ejemplo: iPhone 14, Samsung Galaxy S23, Xiaomi 13

Sistema operativo:
• Ejemplo: iOS 17, Android 13, Android 14

Procesador:
• Ejemplo: A16 Bionic, Snapdragon 8 Gen 2, MediaTek Dimensity

RAM:
• Ejemplo: 6 GB, 8 GB, 12 GB

Almacenamiento:
• Ejemplo: 128 GB, 256 GB, 512 GB

Pantalla:
• Tamaño: 6.1", 6.7"
• Tipo: OLED, AMOLED, LCD
• Resolución: 1080 x 2400, 1170 x 2532
• Tasa de refresco: SOLO si la especifican (60Hz, 90Hz, 120Hz)

Cámara trasera:
• Ejemplo: Triple 50MP + 12MP + 10MP

Cámara frontal:
• Ejemplo: 12MP

Batería:
• Ejemplo: 4500 mAh, 5000 mAh

Carga rápida: SOLO si la tiene
• Ejemplo: 33W, 65W, 120W

Conectividad:
• Ejemplo: 5G / WiFi 6 / Bluetooth 5.3 / NFC

Características adicionales (SOLO si las confirman):
• Resistencia al agua (IP67, IP68)
• Carga inalámbrica
• Lector de huella
• Reconocimiento facial

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        smartwatches: {
            htmlCode: await loadProductContent('smartwatches.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA SMARTWATCHES:

Marca y modelo:
• Ejemplo: Apple Watch Series 9, Samsung Galaxy Watch 6

Compatibilidad:
• Ejemplo: iOS, Android, Universal

Pantalla:
• Tamaño: 1.2", 1.4", 1.9"
• Tipo: AMOLED, LCD, OLED
• Resolución: SOLO si la especifican

Duración de batería:
• Ejemplo: 18 horas, 2 días, 7 días

Sensores de salud (SOLO los que tenga):
• Monitor de frecuencia cardíaca
• SpO2 (Oxígeno en sangre)
• ECG
• Presión arterial
• Temperatura corporal
• Detección de caídas

Resistencia al agua:
• Ejemplo: 5 ATM, 10 ATM, IP68

Conectividad:
• Ejemplo: Bluetooth / WiFi / GPS / NFC / LTE

Funciones deportivas (SOLO si las tiene):
• Modos deportivos: Cantidad si especifican
• GPS integrado
• Brújula

Características adicionales (SOLO si las confirman):
• Llamadas desde el reloj
• Asistente de voz
• Reproducción de música
• Pagos contactless
• Pantalla siempre activa

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        switches: {
            htmlCode: await loadProductContent('switches.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA SWITCHES:

Número de puertos:
• Ejemplo: 5 puertos, 8 puertos, 16 puertos, 24 puertos

Velocidad de puertos:
• Ejemplo: 10/100 Mbps, Gigabit (10/100/1000), 2.5 Gigabit

Tipo:
• Ejemplo: No administrable, Administrable, Smart

PoE: SOLO si soporta PoE
• Puertos PoE: 4 puertos PoE, 8 puertos PoE+
• Presupuesto PoE: SOLO si lo especifican (Ej: 65W, 130W)

Backplane: SOLO si lo especifican
• Ejemplo: 10 Gbps, 16 Gbps

Puertos SFP: SOLO si los tiene
• Ejemplo: 2 puertos SFP, 4 puertos SFP+

Capa: SOLO para switches administrables
• Ejemplo: Capa 2, Capa 3

Características (SOLO si las confirman):
• VLAN
• QoS
• Link aggregation
• IGMP snooping
• Montaje en rack
• Ventilador

Montaje:
• Ejemplo: Escritorio, Rack, Pared

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        tablets: {
            htmlCode: await loadProductContent('tablets.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA TABLETS:

Marca y modelo:
• Ejemplo: iPad Air, Samsung Galaxy Tab S9, Lenovo Tab M10

Sistema operativo:
• Ejemplo: iPadOS 17, Android 13, Windows 11

Procesador:
• Ejemplo: M2, Snapdragon 8 Gen 2, MediaTek Helio

RAM:
• Ejemplo: 4 GB, 6 GB, 8 GB

Almacenamiento:
• Ejemplo: 64 GB, 128 GB, 256 GB

Pantalla:
• Tamaño: 8", 10.1", 11", 12.9"
• Tipo: LCD, OLED, AMOLED
• Resolución: 1920 x 1200, 2360 x 1640
• Tasa de refresco: SOLO si la especifican (60Hz, 120Hz)

Cámara trasera: SOLO si la especifican
• Ejemplo: 12MP, Dual 13MP + 5MP

Cámara frontal:
• Ejemplo: 8MP, 12MP

Batería:
• Ejemplo: 7000 mAh, 8600 mAh, 10000 mAh

Conectividad:
• Ejemplo: WiFi 6 / Bluetooth 5.3 / Opcional LTE/5G

Lápiz stylus: SOLO si es compatible
• Ejemplo: Compatible con Apple Pencil, S Pen incluido

Características adicionales (SOLO si las confirman):
• Teclado compatible
• Lector de huella
• Reconocimiento facial
• 4 bocinas
• Jack de audífonos

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        },
        teclados_cableados_e_inalambricos: {
            htmlCode: await loadProductContent('teclados_cableados_e_inalambricos.txt'),
            promptRules: `IMPORTANTE: Tu respuesta debe ser UN SOLO BLOQUE DE CÓDIGO que incluya el HTML completo Y el bloque <style> con los CSS. NO los separes.

REGLAS PARA TECLADOS:

Tipo de conexión:
• Ejemplo: Cableado USB, Inalámbrico 2.4GHz, Bluetooth, Dual mode

Tipo de teclado:
• Ejemplo: Membrana, Mecánico, Chiclet, Low-profile

Tipo de switches: SOLO para mecánicos
• Ejemplo: Cherry MX Red, Blue, Brown, Gateron

Idioma/Layout:
• Ejemplo: Español, Inglés, Latinoamérica

Teclado numérico: Sí o No
• Si no tiene, especificar: Formato TKL (sin numérico), 60%, 65%

Retroiluminación: SOLO si la tiene
• Ejemplo: LED blanco, RGB, RGB por tecla

Duración de batería: SOLO si es inalámbrico
• Ejemplo: 30 horas, 3 meses, 1 año

Características (SOLO si las confirman):
• Teclas multimedia
• Reposamuñecas
• Resistente a salpicaduras
• Hot-swappable
• Software de personalización
• Switches reemplazables
• Cable trenzado desmontable

Material: SOLO si lo especifican
• Ejemplo: Plástico ABS, Aluminio, Doble inyección (PBT)

Uso recomendado:
• Ejemplo: Gaming, Oficina, Programación

REGLA: Si algo no se menciona → NO lo incluyas en el código`
        }
    };
    
    appState.productsData = productFiles;
    console.log('✅ Datos de productos cargados');
    
    // Validación: Verificar que cada categoría tiene sus datos correctos
    console.log('🔍 Validando datos de productos...');
    console.log(`📦 Total de productos en database: ${appState.allProducts.length}`);
    console.log(`📁 Total de configuraciones cargadas: ${Object.keys(productFiles).length}`);
    
    // Verificar qué productos no tienen configuración
    const missingConfigs = [];
    appState.allProducts.forEach(product => {
        if (!productFiles[product.category]) {
            missingConfigs.push(product.category);
        }
    });
    
    if (missingConfigs.length > 0) {
        console.error('❌ Productos SIN configuración:', missingConfigs);
    } else {
        console.log('✅ Todos los productos tienen configuración');
    }
    
    // Validar que cada configuración tiene HTML y reglas
    for (const [category, data] of Object.entries(productFiles)) {
        const hasHtml = data.htmlCode && data.htmlCode.length > 100;
        const hasRules = data.promptRules && data.promptRules.length > 50;
        const status = (hasHtml && hasRules) ? '✅' : '❌';
        console.log(`  ${status} ${category}: HTML=${hasHtml ? '✓' : '✗'}, Rules=${hasRules ? '✓' : '✗'}`);
        if (!hasHtml || !hasRules) {
            console.error(`  ⚠️ ${category} tiene datos incompletos`);
            if (!hasHtml) console.error(`     - HTML vacío o muy corto: ${data.htmlCode ? data.htmlCode.length : 0} chars`);
            if (!hasRules) console.error(`     - Rules vacías o muy cortas: ${data.promptRules ? data.promptRules.length : 0} chars`);
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
    
    // Actualizar contador de resultados
    updateResultsCount(appState.filteredProducts.length);
    
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
    
    // Dropdown Filter
    initializeDropdownFilter();
    
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
            closeDropdown();
        }
    });
    
    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', (e) => {
        const dropdown = document.querySelector('.filter-dropdown');
        if (dropdown && !dropdown.contains(e.target)) {
            closeDropdown();
        }
    });
}

// =============================================
// DROPDOWN FILTER FUNCTIONALITY
// =============================================
function initializeDropdownFilter() {
    const filterBtn = document.getElementById('filterBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownClose = document.getElementById('dropdownClose');
    const categorySearch = document.getElementById('categorySearch');
    
    // Generar lista de categorías
    generateCategoryList();
    
    // Toggle dropdown
    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });
    
    // Cerrar dropdown
    dropdownClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDropdown();
    });
    
    // Buscar en categorías
    categorySearch.addEventListener('input', (e) => {
        filterCategoriesList(e.target.value);
    });
    
    // Prevenir cierre al hacer clic dentro del dropdown
    dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function generateCategoryList() {
    const dropdownContent = document.getElementById('dropdownContent');
    const allProducts = getAllProducts();
    
    // Crear categoría "Todas"
    const allItem = createCategoryItem({
        category: 'all',
        name: 'Todas las categorías',
        icon: '📦',
        count: allProducts.length
    }, true);
    
    dropdownContent.appendChild(allItem);
    
    // Crear items para cada categoría
    allProducts.forEach(product => {
        const item = createCategoryItem(product, false);
        dropdownContent.appendChild(item);
    });
}

function createCategoryItem(product, isAll) {
    const div = document.createElement('div');
    div.className = 'dropdown-item';
    if (isAll) div.classList.add('active');
    div.dataset.category = product.category;
    
    div.innerHTML = `
        <span class="dropdown-item-icon">${product.icon}</span>
        <span class="dropdown-item-text">${product.name}</span>
        ${!isAll ? '<span class="dropdown-item-count">1</span>' : `<span class="dropdown-item-count">${product.count}</span>`}
    `;
    
    div.addEventListener('click', () => {
        selectCategory(product.category, product.name);
    });
    
    return div;
}

function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const filterBtn = document.getElementById('filterBtn');
    
    if (dropdownMenu.classList.contains('show')) {
        closeDropdown();
    } else {
        dropdownMenu.classList.add('show');
        filterBtn.classList.add('active');
        document.getElementById('categorySearch').focus();
    }
}

function closeDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const filterBtn = document.getElementById('filterBtn');
    const categorySearch = document.getElementById('categorySearch');
    
    dropdownMenu.classList.remove('show');
    filterBtn.classList.remove('active');
    categorySearch.value = '';
    filterCategoriesList(''); // Mostrar todas las categorías
}

function selectCategory(category, categoryName) {
    const filterBtnText = document.getElementById('filterBtnText');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // Actualizar texto del botón
    filterBtnText.textContent = categoryName;
    
    // Actualizar clase activa
    dropdownItems.forEach(item => {
        if (item.dataset.category === category) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Filtrar productos
    filterProducts(category);
    
    // Cerrar dropdown
    closeDropdown();
}

function filterCategoriesList(searchTerm) {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const term = searchTerm.toLowerCase().trim();
    
    dropdownItems.forEach(item => {
        const text = item.querySelector('.dropdown-item-text').textContent.toLowerCase();
        if (text.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `${count} producto${count !== 1 ? 's' : ''}`;
    }
}
