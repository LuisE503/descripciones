# 📘 GUÍA DE USUARIO - Generador de Descripciones Shopify

## 🎯 Introducción

Esta aplicación web te permite generar códigos HTML profesionales para descripciones de productos en Shopify, utilizando plantillas estandarizadas y optimizadas para ser procesadas por ChatGPT-5.

---

## 🚀 Cómo Usar la Aplicación

### Paso 1: Acceder a la Aplicación

#### Opción A: Online (GitHub Pages) - RECOMENDADO
1. Abre tu navegador web
2. Visita: `https://tu-usuario.github.io/descripciones-shopify`
3. ¡Listo! Ya puedes usar la aplicación

#### Opción B: Local (Tu Computadora)
1. Abre una terminal/PowerShell en la carpeta del proyecto
2. Ejecuta uno de estos comandos:

**Con Python:**
```powershell
python -m http.server 8000
```

**Con Node.js:**
```powershell
npx http-server
```

**Con PHP:**
```powershell
php -S localhost:8000
```

3. Abre tu navegador en: `http://localhost:8000`

> ⚠️ **IMPORTANTE**: No abras el archivo `index.html` directamente, ya que los archivos .txt no se cargarán correctamente por seguridad del navegador.

---

## 🔍 Usando la Interfaz

### 1. PANTALLA PRINCIPAL

Al abrir la aplicación verás:
- **Header**: Título y descripción
- **Barra de Búsqueda**: Para buscar productos específicos
- **Filtros**: Botones para filtrar por categoría
- **Grid de Productos**: Tarjetas con todos los productos disponibles

### 2. BUSCAR PRODUCTOS

Escribe en la barra de búsqueda:
- Por nombre: "laptop", "case", "ups"
- Por tags: "hardware", "refrigeración", "gaming"
- Por descripción: "fuente", "monitor", "ram"

La búsqueda es en **tiempo real** y sin necesidad de presionar Enter.

### 3. FILTRAR POR CATEGORÍA

Haz clic en cualquier chip de categoría:
- **Todos**: Muestra todos los productos (predeterminado)
- **Case**, **Cooler**, **Laptop**, etc.: Filtra solo esa categoría

### 4. VER UN PRODUCTO

1. Haz clic en el botón **"Ver Código y Prompt"** de cualquier tarjeta
2. Se abrirá un modal con dos pestañas:
   - **Vista Previa**: Visualiza cómo se ve el HTML renderizado
   - **Código HTML**: Ve el código fuente completo

---

## 📋 Copiar Código

### Opción 1: Copiar Solo el Código HTML

1. Abre el modal del producto
2. Haz clic en el botón **"Copiar Código"** (icono de copiar)
3. Verás un mensaje: "✅ Código copiado al portapapeles"
4. Pega el código en Shopify (Ctrl+V o Cmd+V)

**¿Cuándo usar esto?**
- Cuando ya tienes toda la información del producto
- Cuando quieres modificar el código manualmente
- Para hacer pruebas rápidas

---

## 🤖 Usar con ChatGPT-5

### Paso a Paso Completo

#### 1. Copiar el Prompt Completo

1. Abre el modal del producto que necesitas
2. Haz clic en **"Copiar Prompt Completo"** (botón azul con icono +)
3. Verás: "✅ Prompt completo copiado - Listo para pegar en ChatGPT-5"

#### 2. Abrir ChatGPT-5

1. Ve a [ChatGPT](https://chat.openai.com)
2. Inicia una nueva conversación
3. Pega el prompt completo (Ctrl+V o Cmd+V)

#### 3. Agregar la Información del Producto

Busca la sección que dice:
```
[AQUÍ PEGA LA DESCRIPCIÓN OFICIAL DEL PRODUCTO]
```

Reemplázala con la información real del producto, por ejemplo:

**Para una Laptop:**
```
Laptop HP 15-dy2000
Procesador: Intel Core i5-1135G7 (2.4 GHz hasta 4.2 GHz)
Memoria RAM: 8GB DDR4
Almacenamiento: 256GB SSD NVMe
Pantalla: 15.6" Full HD (1920x1080) IPS
Sistema Operativo: Windows 11 Home
Color: Plata
Teclado numérico: Sí
Gráficos: Intel Iris Xe integrados
Peso: 3.75 lb
Puertos: 2x USB-A 3.2, 1x USB-C, HDMI, lector SD
```

**Para una Tarjeta Gráfica:**
```
NVIDIA GeForce RTX 3060 Ti
Chipset: NVIDIA GeForce RTX 3060 Ti
Memoria: 8GB GDDR6
Velocidad de memoria: 14 Gbps
Ancho de banda: 256 bits
Velocidad de núcleo: 1665 MHz
Puertos: 1x HDMI 2.1, 3x DisplayPort 1.4a
Overclocking: Sí
```

#### 4. Enviar y Obtener Resultado

1. Presiona Enter o clic en enviar
2. ChatGPT generará el código HTML con tus datos
3. Copia el código generado
4. Pégalo en Shopify

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Crear Descripción de Laptop

**Información del producto:**
```
Dell Inspiron 15 3000
Procesador: AMD Ryzen 5 5500U
RAM: 16GB DDR4
Almacenamiento: 512GB SSD
Pantalla: 15.6" Full HD
OS: Windows 11 Pro
Color: Negro
```

**Pasos:**
1. Busca "Laptop" o filtra por categoría
2. Clic en "Ver Código y Prompt"
3. Clic en "Copiar Prompt Completo"
4. Pega en ChatGPT-5
5. Reemplaza `[AQUÍ PEGA LA DESCRIPCIÓN OFICIAL DEL PRODUCTO]` con los datos de arriba
6. ChatGPT genera código con:
   - Nivel: Standard (Ryzen 5)
   - Tipo: Corporativo (Windows Pro)
   - Todos los datos formateados correctamente

### Ejemplo 2: Crear Descripción de Monitor

**Información del producto:**
```
Monitor LG 27" Gaming
Tamaño: 27 Plg
Resolución: 2560x1440 (QHD)
Panel: IPS
Tasa de refresco: 144Hz
Tiempo de respuesta: 1ms
Puertos: HDMI x2, DisplayPort x1
VESA: 100x100
```

**Resultado esperado:**
- Código HTML con tabla de especificaciones
- Formato correcto de unidades (Plg, Hz, ms)
- VESA formateado como "VESA 100x100"

---

## ❓ Preguntas Frecuentes

### ¿Por qué debo usar un servidor HTTP local?

Los navegadores modernos bloquean la carga de archivos locales (como .txt) por seguridad. Un servidor HTTP simula un sitio web real.

### ¿Puedo modificar las plantillas?

¡Sí! Edita los archivos `.txt` en la carpeta del proyecto. Los cambios se reflejarán automáticamente.

### ¿Cómo agrego un nuevo tipo de producto?

1. Crea un archivo `.txt` con la plantilla HTML
2. Agrega el producto en `products-data.js`
3. Actualiza `script.js` en `loadAllProductData()`

### ¿Funciona sin Internet?

Una vez cargada la página, sí. Pero necesitas internet para:
- Cargarla por primera vez (si usas GitHub Pages)
- Usar ChatGPT-5

### ¿Qué navegadores son compatibles?

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### ¿Los códigos funcionan en Shopify?

Sí, están diseñados específicamente para Shopify con:
- Clases CSS compatibles
- Estructura de tabla responsive
- Estilos que heredan el tema de Shopify

---

## 🎨 Personalización

### Cambiar el texto del header

Edita `index.html`, líneas 12-14:
```html
<h1>🛍️ Tu Título Aquí</h1>
<p class="subtitle">Tu subtítulo aquí</p>
```

### Cambiar colores

Edita `styles.css`, variables al inicio:
```css
:root {
    --primary-color: #tu-color;
    --secondary-color: #tu-color;
}
```

### Agregar tu logo

En `index.html`, reemplaza el emoji en el h1:
```html
<h1><img src="tu-logo.png" alt="Logo"> Tu Título</h1>
```

---

## 🆘 Solución de Problemas

### Problema: "No se encontraron productos"

**Causa**: Búsqueda muy específica o filtro restrictivo
**Solución**: 
- Limpia la búsqueda
- Selecciona "Todos" en los filtros

### Problema: "El modal no se cierra"

**Solución**: 
- Presiona ESC
- Haz clic fuera del modal
- Recarga la página (F5)

### Problema: "Error cargando archivo"

**Causa**: No estás usando un servidor HTTP
**Solución**: Sigue las instrucciones de "Paso 1: Opción B"

### Problema: "El código copiado no tiene formato"

**Causa**: El portapapeles no preserva formato
**Solución**: 
- Normal, ChatGPT lo procesará correctamente
- O copia desde la pestaña "Código HTML"

---

## 📞 Soporte

Si tienes problemas:
1. Revisa esta guía completa
2. Verifica que uses un servidor HTTP
3. Actualiza tu navegador
4. Contacta al equipo del proyecto

---

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] ¿Estás usando un servidor HTTP local?
- [ ] ¿Tu navegador está actualizado?
- [ ] ¿Todos los archivos están en la misma carpeta?
- [ ] ¿Has limpiado la caché del navegador?
- [ ] ¿Los archivos .txt existen?

---

**Fecha de última actualización**: Diciembre 2025  
**Versión**: 1.0.0
