# 🛍️ Generador de Descripciones Shopify

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-success)](https://github.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

## 📋 Descripción

Aplicación web para generar códigos HTML de descripciones de productos en Shopify con prompts optimizados para ChatGPT-5. Diseñada para proyectos grupales donde múltiples personas necesitan acceso a plantillas de código estandarizadas.

## ✨ Características

- 🎯 **14 Categorías de Productos**: Case, Cooler, Fuente de Poder, Laptop, Memoria RAM, Monitores, Motherboard, Procesadores, Regletas, Regulador de Voltaje, Software, Supresor de Voltaje, Tarjetas Gráficas, UPS
- 🔍 **Búsqueda en Tiempo Real**: Encuentra rápidamente el producto que necesitas
- 🏷️ **Filtros por Categoría**: Organiza y visualiza productos por tipo
- 👁️ **Vista Previa en Vivo**: Visualiza cómo se verá el código HTML
- 📋 **Copiar Código**: Un clic para copiar el código HTML al portapapeles
- 🤖 **Prompts para ChatGPT-5**: Genera prompts completos optimizados para IA
- 📱 **Diseño Responsive**: Funciona perfectamente en móvil, tablet y desktop
- 🎨 **Interfaz Intuitiva**: Diseño limpio y fácil de usar

## 🚀 Uso

### Opción 1: GitHub Pages (Recomendado)

1. Visita: `https://tu-usuario.github.io/descripciones-shopify`
2. Busca o filtra el producto que necesitas
3. Haz clic en "Ver Código y Prompt"
4. Usa los botones para:
   - **Copiar Código**: Copia solo el HTML
   - **Copiar Prompt Completo**: Copia el prompt + código + instrucciones

### Opción 2: Uso Local

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/descripciones-shopify.git
cd descripciones-shopify
```

2. Abre `index.html` en tu navegador

> **Nota**: Para que funcione correctamente en local, necesitas servir los archivos con un servidor HTTP (no abrir directamente el archivo HTML).

**Con Python:**
```bash
python -m http.server 8000
```
Luego abre: `http://localhost:8000`

**Con Node.js (http-server):**
```bash
npx http-server
```

## 📖 Cómo Usar con ChatGPT-5

1. **Selecciona tu producto** en la aplicación web
2. **Clic en "Copiar Prompt Completo"**
3. **Pega en ChatGPT-5**
4. **Agrega la descripción oficial** del producto en la sección indicada
5. **ChatGPT generará** el código HTML con la estructura correcta y tus datos

### Ejemplo de Flujo:

```
[Copias el prompt desde la web]
↓
[Lo pegas en ChatGPT-5]
↓
[Agregas: "Laptop HP 15-dy2000, Intel Core i5-1135G7, 8GB RAM, 256GB SSD, Windows 11"]
↓
[ChatGPT genera el código HTML personalizado]
```

## 📁 Estructura del Proyecto

```
descripciones-shopify/
├── index.html              # Página principal
├── styles.css              # Estilos CSS completos
├── script.js               # JavaScript principal
├── products-data.js        # Base de datos de productos
├── README.md               # Este archivo
├── .gitignore              # Archivos ignorados por Git
│
├── case.txt                # Plantilla HTML para Cases
├── cooler.txt              # Plantilla HTML para Coolers
├── fuente_de_poder.txt     # Plantilla HTML para Fuentes
├── Laptop.txt              # Plantilla HTML para Laptops
├── memoria_ram.txt         # Plantilla HTML para RAM
├── monitores.txt           # Plantilla HTML para Monitores
├── motherboard.txt         # Plantilla HTML para Motherboards
├── procesadores.txt        # Plantilla HTML para CPUs
├── regletas.txt            # Plantilla HTML para Regletas
├── regulador_de_voltaje.txt    # Plantilla HTML para Reguladores
├── software.txt            # Plantilla HTML para Software
├── supresor_de_voltaje.txt     # Plantilla HTML para Supresores
├── tarjetas_graficas.txt   # Plantilla HTML para GPUs
└── ups_y_ups_online.txt    # Plantilla HTML para UPS
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño responsive con CSS Grid y Flexbox
- **JavaScript (Vanilla)**: Sin dependencias externas
- **GitHub Pages**: Hosting gratuito

## 📝 Agregar Nuevos Productos

Para agregar nuevos tipos de productos:

1. **Crea un archivo `.txt`** con el código HTML de ejemplo
2. **Actualiza `products-data.js`** agregando el nuevo producto
3. **Actualiza `script.js`** en la sección `loadAllProductData()`
4. **Añade el filtro** en `index.html` (sección filter-chips)

### Ejemplo de estructura de archivo .txt:

```html
<!-- BLOQUE: Nuevo Producto -->
<div class="row">
  <div class="col-sm-8 col-offset-sm-2 col-md-10 offset-md-1 mb-3">
    <div class="product-seo-intro">
      <p>Descripción introductoria del producto.</p>
    </div>
    <br>
    <h6 class="tt-title-sub">ESPECIFICACIONES DEL PRODUCTO</h6>
    <div class="div-drop">
      <table class="NEW-TABLE TableOverride-1 tab-drag" width="100%">
        <tbody>
          <!-- Tus especificaciones aquí -->
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  /* Estilos CSS consistentes */
</style>
```

## 🎨 Personalización

### Cambiar Colores:

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #036cbf;  /* Color principal */
    --primary-dark: #025a9e;   /* Color principal oscuro */
    --secondary-color: #5c6bc0; /* Color secundario */
}
```

### Cambiar Fuente:

```css
body {
    font-family: 'Tu Fuente', sans-serif;
}
```

## 🚀 Despliegue en GitHub Pages

1. **Sube tu repositorio a GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/descripciones-shopify.git
git push -u origin main
```

2. **Activa GitHub Pages**:
   - Ve a Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/root`
   - Guarda los cambios

3. **Accede a tu sitio**:
   - URL: `https://tu-usuario.github.io/descripciones-shopify`

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 🐛 Solución de Problemas

### Los archivos .txt no cargan en local

**Solución**: Usa un servidor HTTP local (ver sección "Opción 2: Uso Local")

### El modal no se muestra

**Verificar**: Que el archivo `script.js` esté correctamente cargado

### Los estilos no se aplican

**Verificar**: Que `styles.css` esté en la misma carpeta que `index.html`

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Add: Nueva característica'`)
4. Push a la branch (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## 👥 Equipo

Proyecto Grupal - Generador de Descripciones Shopify

## 📞 Contacto

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Proyecto: [https://github.com/tu-usuario/descripciones-shopify](https://github.com/tu-usuario/descripciones-shopify)

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!

**Última actualización**: Diciembre 2025
