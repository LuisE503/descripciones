# ANÁLISIS COMPLETO: PROMPTS PROBLEMÁTICOS EN GENERADOR SHOPIFY

**Fecha:** 12 de Enero 2026  
**Total de categorías:** 61 (todas con archivos .txt)  
**Problemas identificados:** 9 prompts con defectos  
**Nuevas categorías faltantes:** 9 categorías  

---

## PARTE 1: PROMPTS EXISTENTES CON PROBLEMAS

### 1. **Combo Teclado y Mouse** 
**Archivo:** `combo_teclado_y_mouse_cableados_e_inalambrico.txt`

**Problema identificado:**
- **Campo problemático:** "DPI Ajustable" en la sección de especificaciones del mouse
- **Comportamiento actual:** Muestra "No especificado" en la tabla cuando el campo viene vacío
- **Causa raíz:** El prompt incluye campos con valores por defecto "No especificado" aunque el usuario no ingresó datos
- **Impacto:** Los usuarios ven información incompleta y el campo se hace visible aunque no aplique
- **Solución necesaria:** Modificar el prompt para omitir campos sin datos, en lugar de mostrar "No especificado"

**Líneas afectadas en archivo:**
- Línea 69-70 (tabla de especificaciones técnicas mouse, campo DPI Ajustable)

---

### 2. **Memorias Extraíbles** 
**Archivo:** `memorias_extraibles.txt`

**Problema identificado:**
- **Campo problemático:** Tabla completa (especialmente "Velocidad de lectura/escritura")
- **Comportamiento actual:** Agrega información de "SD" (tarjetas de memoria) cuando el usuario carga datos de USB flash drives
- **Causa raíz:** El prompt mezcla especificaciones de USB con especificaciones de tarjetas SD sin diferenciación
- **Impacto:** Descripciones confusas que mezclan tecnologías incompatibles (USB Flash vs SD card)
- **Solución necesaria:** Separar o condicionalizar las filas según el tipo de memoria (USB, SD, microSD)

**Líneas afectadas:**
- Línea 12-24 (tabla de conectividad - velocidades que aplican a USB pero se cruzan con SD)

---

### 3. **Cámaras de Vigilancia** 
**Archivo:** `camaras_de_vigilancia_analoga_ip_wifi.txt`

**Problema identificado:**
- **Campo problemático:** Descripción SEO y tabla completa
- **Comportamiento actual:** Demasiado minimalista, proporciona muy poca información específica del producto
- **Causa raíz:** El prompt tiene solo 5 filas en la tabla sin detallar características importantes
- **Impacto:** Descripciones genéricas que no diferencian cámaras análogas de IP
- **Solución necesaria:** Expandir con campos adicionales para: tipo de cámara (análoga/IP/WiFi), sensor, protección IP, montaje, grabación, etc.

**Líneas afectadas:**
- Línea 1-31 (tabla incompleta con solo Video y Conectividad)

---

### 4. **Hub USB** 
**Archivo:** `hub_usb.txt`

**Problema identificado:**
- **Campo problemático:** Descripción SEO estática
- **Comportamiento actual:** No cambia la descripción del producto según especificaciones ingresadas
- **Causa raíz:** La descripción base es una plantilla fija que no incorpora datos dinámicos (número de puertos, tipo USB, velocidad)
- **Impacto:** Cada Hub USB describe lo mismo, sin reflejar diferencias entre modelos
- **Solución necesaria:** Modificar la descripción SEO para ser dinámmica según el número de puertos (4, 7, 10) y tipo de USB

**Línea afectada:**
- Línea 6: `<p>Expansor de puertos USB con transferencia de datos de alta velocidad...` (debe ser dinámico)

---

### 5. **Micrófono** 
**Archivo:** `microfono.txt`

**Problema identificado:**
- **Campo problemático:** Descripción SEO estática
- **Comportamiento actual:** No cambia la descripción según especificaciones técnicas ingresadas
- **Causa raíz:** La descripción es genérica y no incorpora datos como tipo (Condensador/Dinámico), interfaz, o patrón polar
- **Impacto:** Todos los micrófonos suenan igual en la descripción
- **Solución necesaria:** Hacer dinámico el párrafo SEO incluyendo el tipo de micrófono, conectividad principal, y aplicación

**Línea afectada:**
- Línea 4: `<p>Micrófono profesional con excelente calidad de audio...` (debe incorporar tipo de micrófono)

---

### 6. **Cable UTP y Bobina de Cable** 
**Archivo:** `cable_utp_y_bobina_de_cable.txt`

**Problema identificado:**
- **Campo problemático:** Nombre de la categoría + especificaciones
- **Comportamiento actual:** Agrega información de "bobinas de cable" cuando debería ser solo especificaciones de cable UTP, causando fuera de contexto
- **Causa raíz:** La categoría combina dos productos distintos (Cable UTP individual y Bobinas de cable Cat5e/Cat6 de 305m)
- **Impacto:** Especificaciones contradictorias (Longitud: "No especificado" en cables, pero deben especificar metros)
- **Solución necesaria:** Separar en dos categorías o crear lógica condicional para bobinas vs. cables individuales

**Líneas afectadas:**
- Línea 1-8 (descripción mezcla Cable UTP con Bobinas)
- Línea 29-36 (Longitud y conectores son diferentes para bobinas)

---

### 7. **Bocinas e Inalámbrica y Sistema de Audio** 
**Archivo:** `bocina_e_inalambrica_y_sistema_de_audio.txt`

**Problema identificado (DOBLE):**
- **Problema 1 - Campos problemáticos:** "Entrada para memoria USB/SD/microSD", "Entrada para micrófono", "Entrada para cable auxiliar"
- **Comportamiento:** Agrega demasiadas opciones "No especificado" que no aplican a bocinas simples portátiles
- **Causa raíz:** El template incluye todas las posibles características de un sistema de audio completo, sin filtrar
- **Impacto 1:** Tabla excesivamente larga con muchas filas irrelevantes

- **Problema 2 - CSS extraño:**
- **Comportamiento:** El bloque HTML inicial tiene estructura inconsistente (falta `<div class="col-sm-8...">`)
- **Causa raíz:** Línea 3-4 abre `<div class="row">` pero carece del `col-sm-8` para centrar contenido
- **Impacto 2:** Posible desalineación en móviles y problemas de visualización

**Líneas afectadas:**
- Línea 3-4: HTML incorrectamente formado (falta div de columna)
- Línea 95-105: Filas innecesarias de "Entrada para..." que muestran "No especificado"

**Solución necesaria:** 
- Reparar estructura HTML para incluir columna correcta
- Remover o condicionalizar filas que no aplican a bocinas portátiles

---

### 8. **NVR** 
**Archivo:** `nvr.txt`

**Problema identificado:**
- **Campo problemático:** Descripción SEO y especificaciones de "Serie" y "Uso"
- **Comportamiento actual:** No cambia la descripción según el tipo de NVR o especificaciones
- **Causa raíz:** Descripción genérica + muchas filas con "No especificado" que no se adaptan al producto
- **Impacto:** Descripción idéntica para todos los NVRs; campos obligatorios que no deberían mostrarse
- **Solución necesaria:** 
  1. Hacer dinámico el párrafo SEO según canales de vídeo (8, 16, etc.)
  2. Condicionalizar o remover filas que no aplican

**Líneas afectadas:**
- Línea 5-7: Descripción genérica sin incorporar especificaciones técnicas
- Línea 17-22: Filas "Serie" y "Uso" muestran "No especificado"

---

### 9. **Smartphones** 
**Archivo:** `smartphone.txt`

**Problema identificado:**
- **Campo problemático:** Descripción SEO estática
- **Comportamiento actual:** No cambia la descripción según especificaciones ingresadas
- **Causa raíz:** El párrafo introductorio es genérico y no refleja características reales (pantalla, cámaras, almacenamiento)
- **Impacto:** Descripción idéntica para todos los smartphones
- **Solución necesaria:** Hacer dinámico el párrafo incorporando tamaño de pantalla, capacidad de almacenamiento, cámaras principales

**Línea afectada:**
- Línea 24-25: `<p>Smartphone con batería de alta capacidad...` (debe ser dinámico con especificaciones reales)

---

## PARTE 2: NUEVAS CATEGORÍAS A CREAR

Estas 9 categorías están **FALTANDO** del proyecto. Solo necesitan archivos `.txt` con estructura de campos (SIN HTML/CSS).

### Estructura estándar para nuevas categorías:
```
[Campo]	[Descripción / Instrucciones]
[Campo]	[Valores posibles / Especificaciones]
[...]
```

---

### 1. **Accesorios**
**Archivo requerido:** `accesorios.txt`  
**Subcategoría:** Accesorios para periféricos

**Campos sugeridos:**
- Tipo de accesorio
- Compatibilidad
- Material
- Color
- Dimensiones
- Peso
- Resistencia/Certificación
- Cantidad en paquete

---

### 2. **Infraestructura de Red**
**Archivo requerido:** `infraestructura_de_red.txt`  
**Subcategorías:** 
- Accesorios de red
- Bracket y bandejas
- Herramientas de red

**Campos sugeridos:**
- Subcategoría específica
- Tipo de infraestructura
- Estándar (Rack 19", Pared, etc.)
- Capacidad de peso
- Material
- Profundidad/Dimensiones
- Compatibilidad con estándares
- Color
- Protección/Certificación

---

### 3. **Internet of Things (IoT)** 
**Archivo requerido:** `internet_of_things.txt`  
*Nota: Ya existe `iot.txt` pero puede necesitar estructura formal*

**Campos sugeridos:**
- Tipo de dispositivo IoT
- Conectividad (WiFi, Bluetooth, Zigbee, Z-Wave)
- Rango de comunicación
- Protocolo soportado
- Compatibilidad con ecosistemas (Google Home, Alexa, etc.)
- Voltaje/Alimentación
- Sensores incluidos
- Aplicaciones principales
- API disponible

---

### 4. **Tableta Gráfica**
**Archivo requerido:** `tableta_grafica.txt`  
*Nota: No hay inventario actualmente, pero estructura lista para futuro*

**Campos sugeridos:**
- Tamaño de área activa
- Resolución
- Niveles de presión
- Teclas programables
- Conectividad (USB, Wireless)
- Botones y función
- Compatibilidad de software
- Tecnología de lápiz
- Dimensiones
- Peso

---

### 5. **Drones**
**Archivo requerido:** `drones.txt`  
**Subcategorías:** Cuadricópteros, aéreos, acuáticos

**Campos sugeridos:**
- Tipo de drone
- Tiempo de vuelo
- Velocidad máxima
- Altura máxima
- Cámara (Megapíxeles, resolución)
- Estabilización
- Alcance inalámbrico
- Tipo de batería
- Capacidad de carga
- Resistencia al clima
- Conectividad (WiFi, 2.4GHz, etc.)

---

### 6. **Cable DVI**
**Archivo requerido:** `cable_dvi.txt`  
*Nota: No hay inventario, pero estructura preparada*

**Campos sugeridos:**
- Tipo de conector DVI (DVI-D, DVI-I, DVI-A)
- Longitud
- Velocidad de transferencia
- Resolución máxima soportada
- Blindaje
- Tipo de cable (Nylon, Caucho)
- Compatibilidad (Full HD, 4K)
- Género de conectores (Macho-Macho)

---

### 7. **Cargadores**
**Archivo requerido:** `cargadores.txt`  
*Nota: Separar de `estacion_de_carga.txt`*

**Campos sugeridos:**
- Tipo de cargador (Wall Charger, Car Charger, Wireless, etc.)
- Compatibilidad (iPhone, Android, Universal)
- Voltaje/Amperaje (5V, 12V, 20V, etc.)
- Número de puertos
- Tecnología de carga rápida
- Longitud del cable (si aplica)
- Materiales
- Certificaciones (CE, FCC, etc.)
- Color
- Portabilidad

---

### 8. **Portabilidad**
**Archivo requerido:** `portabilidad.txt`  
**Subcategorías:** Mochilas, fundas, maletas, protectores

**Campos sugeridos:**
- Tipo de accesorio de portabilidad
- Compatibilidad (laptop 13", 15", universal, etc.)
- Material (Nylon, Poliéster, Cuero)
- Capacidad de almacenamiento (L o cm³)
- Peso
- Compartimientos especiales
- Dimensiones
- Color
- Protección (Impermeable, a prueba de golpes)
- Correas/Asas

---

### 9. **Smart Home**
**Archivo requerido:** `smart_home.txt`  
**Subcategorías:** Control de luz, termostatos, cerraduras inteligentes, sensores

**Campos sugeridos:**
- Tipo de dispositivo Smart Home
- Conectividad principal
- Compatible con (Google Home, Alexa, HomeKit, etc.)
- Protocolo (WiFi, Zigbee, Z-Wave, Bluetooth)
- Voltaje/Alimentación
- Sensor incluido (movimiento, temperatura, etc.)
- Control remoto (App, voz, manual)
- Automatización soportada
- Programación
- Rango operativo
- Instalación (Pared, lámpara, integración)

---

## RESUMEN DE ACCIONES NECESARIAS

### Prompts a Reparar (9 categorías):

| # | Categoría | Problema Principal | Acción |
|---|-----------|-------------------|--------|
| 1 | Combo Teclado y Mouse | "No especificado" excesivo | Omitir campos vacíos en DPI Ajustable |
| 2 | Memorias Extraíbles | Mezcla USB con SD | Condicionalizar especificaciones por tipo |
| 3 | Cámaras de Vigilancia | Demasiado minimalista | Expandir tabla con campos de análoga vs IP |
| 4 | Hub USB | Descripción estática | Dinamizar descripción SEO con especificaciones |
| 5 | Micrófono | Descripción estática | Dinamizar con tipo y conectividad |
| 6 | Cable UTP y Bobina | Categoría mixta confusa | Separar en dos o condicionalizar |
| 7 | Bocinas | HTML mal formado + campos innecesarios | Reparar estructura + remover filas "Entrada para..." |
| 8 | NVR | Descripción estática + "No especificado" | Dinamizar y condicionalizar filas |
| 9 | Smartphones | Descripción estática | Dinamizar con especificaciones reales |

### Nuevas Categorías a Crear (9 categorías):

| # | Nombre Archivo | Descripción |
|---|-----------------|-------------|
| 1 | `accesorios.txt` | Accesorios para periféricos (genéricos) |
| 2 | `infraestructura_de_red.txt` | Accesorios de rack, brackets, herramientas |
| 3 | `internet_of_things.txt` | Dispositivos IoT (puede reemplazar iot.txt) |
| 4 | `tableta_grafica.txt` | Tablets gráficas para diseñadores |
| 5 | `drones.txt` | Drones aéreos y acuáticos |
| 6 | `cable_dvi.txt` | Cables DVI para conexión de video |
| 7 | `cargadores.txt` | Cargadores de dispositivos (sin estación) |
| 8 | `portabilidad.txt` | Mochilas, fundas, maletas protectoras |
| 9 | `smart_home.txt` | Dispositivos domóticos y automatización |

---

## ESTRUCTURA RECOMENDADA PARA ARCHIVOS .TXT

Cada archivo de nueva categoría debe incluir:

1. **Encabezado comentado** (opcional pero recomendado):
   ```
   <!-- CATEGORÍA: [Nombre]
   Descripción breve de qué productos contiene
   Fecha de creación: [fecha]
   -->
   ```

2. **Tabla de campos sin HTML**:
   ```
   Campo	Instrucciones/Valores posibles
   [Campo]	[Descripción]
   [Campo]	[Instrucciones]
   ```

3. **NO incluir**:
   - Bloques HTML (`<div>`, `<table>`, `<style>`)
   - CSS
   - Descripciones SEO precargadas
   - Ejemplos de productos específicos

4. **Mantener consistencia** con otros .txt (accesorios, basadas_para_laptop, etc.)

---

## NOTAS TÉCNICAS

- **Total de archivos .txt existentes:** 61
- **Archivos problemáticos:** 9
- **Archivos nuevos necesarios:** 9
- **Total después de completar:** 70 categorías

- **Estructura HTML estándar correcta:**
  ```html
  <div class="row">
    <div class="col-sm-8 col-offset-sm-2 col-md-10 offset-md-1 mb-3">
      <div class="product-seo-intro">
        <p>[Descripción dinámica]</p>
      </div>
      <br>
      <h6 class="tt-title-sub text-center">ESPECIFICACIONES DEL PRODUCTO</h6>
      <div class="div-drop">
        <table class="NEW-TABLE TableOverride-1 tab-drag" width="100%">
          <!-- Filas dinámicas/condicionales -->
        </table>
      </div>
    </div>
  </div>
  ```

---

## PRÓXIMOS PASOS SUGERIDOS

1. **Prioridad Alta (Reparaciones):**
   - Bocinas (defecto HTML crítico)
   - Combo Teclado (campos innecesarios visibles)
   - Cable UTP (lógica condicional necesaria)

2. **Prioridad Media (Dinámización):**
   - Hub USB
   - NVR
   - Smartphones
   - Micrófono

3. **Prioridad Media (Expansión):**
   - Cámaras de Vigilancia
   - Memorias Extraíbles

4. **Prioridad Baja (Creación de nuevas):**
   - Crear los 9 archivos .txt nuevos según estructura
   - Actualizar `products-data.js` con nuevas categorías

---

**Documento generado:** 12 de Enero 2026  
**Estado:** Análisis completo listo para implementación
