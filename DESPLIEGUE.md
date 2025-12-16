# 🚀 GUÍA DE DESPLIEGUE EN GITHUB PAGES

## 📋 Requisitos Previos

- Cuenta en GitHub (gratis)
- Git instalado en tu computadora
- Los archivos del proyecto en tu computadora

---

## 🎯 Método 1: Usando la Interfaz de GitHub (MÁS FÁCIL)

### Paso 1: Crear Repositorio en GitHub

1. Ve a [GitHub.com](https://github.com)
2. Inicia sesión en tu cuenta
3. Haz clic en el botón verde **"New"** (o el ícono +)
4. Completa:
   - **Repository name**: `descripciones-shopify` (o el nombre que prefieras)
   - **Description**: "Generador de descripciones HTML para Shopify"
   - **Public** (debe ser público para GitHub Pages gratuito)
   - ✅ **Add a README file** (NO marques esto, ya tenemos uno)
   - ✅ **Add .gitignore** (NO marques esto, ya tenemos uno)
5. Haz clic en **"Create repository"**

### Paso 2: Subir Archivos

#### Opción A: Interfaz Web (Más Simple)

1. En la página del repositorio recién creado
2. Haz clic en **"uploading an existing file"**
3. Arrastra TODOS los archivos de tu carpeta al navegador:
   ```
   - index.html
   - styles.css
   - script.js
   - products-data.js
   - README.md
   - .gitignore
   - _config.yml
   - GUIA_DE_USUARIO.md
   - Todos los archivos .txt (14 archivos)
   ```
4. Escribe un mensaje de commit: "Initial commit - Setup completo"
5. Haz clic en **"Commit changes"**

#### Opción B: Git Command Line (Más Profesional)

1. Abre PowerShell/Terminal en la carpeta del proyecto
2. Ejecuta estos comandos:

```powershell
# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Crear primer commit
git commit -m "Initial commit - Setup completo"

# Renombrar rama a main
git branch -M main

# Conectar con GitHub (REEMPLAZA tu-usuario)
git remote add origin https://github.com/tu-usuario/descripciones-shopify.git

# Subir archivos
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. En tu repositorio, ve a **Settings** (⚙️)
2. En el menú lateral, busca **"Pages"**
3. En **"Source"**, selecciona:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Haz clic en **"Save"**
5. Espera 1-2 minutos
6. Refresca la página
7. Verás un mensaje verde: "Your site is published at https://tu-usuario.github.io/descripciones-shopify/"

### Paso 4: Verificar que Funciona

1. Haz clic en el enlace de tu sitio
2. Debería abrir tu aplicación funcionando
3. Prueba:
   - Buscar productos
   - Filtrar por categoría
   - Abrir un modal
   - Copiar código
   - Copiar prompt

---

## 🎯 Método 2: GitHub Desktop (INTERMEDIO)

### Paso 1: Instalar GitHub Desktop

1. Descarga desde [desktop.github.com](https://desktop.github.com)
2. Instala y abre la aplicación
3. Inicia sesión con tu cuenta de GitHub

### Paso 2: Crear Repositorio

1. En GitHub Desktop: **File** → **New Repository**
2. Completa:
   - **Name**: `descripciones-shopify`
   - **Local Path**: Selecciona la carpeta del proyecto
   - **Initialize with README**: NO (ya lo tienes)
3. Clic en **"Create Repository"**

### Paso 3: Publicar

1. Clic en **"Publish repository"**
2. Asegúrate que esté marcado **"Public"**
3. Clic en **"Publish Repository"**

### Paso 4: Activar GitHub Pages

(Sigue el "Paso 3" del Método 1)

---

## 🎯 Método 3: Visual Studio Code (AVANZADO)

### Paso 1: Instalar Git en VS Code

1. Instala la extensión "GitHub Pull Requests and Issues"
2. Abre la carpeta del proyecto en VS Code

### Paso 2: Inicializar Git

1. Presiona `Ctrl+Shift+G` (o Cmd+Shift+G en Mac)
2. Clic en **"Initialize Repository"**
3. Clic en el icono "+" para agregar todos los archivos
4. Escribe mensaje: "Initial commit"
5. Clic en el ✓ para commit

### Paso 3: Publicar a GitHub

1. Presiona `Ctrl+Shift+P` (o Cmd+Shift+P)
2. Escribe: "Publish to GitHub"
3. Selecciona "Publish to GitHub public repository"
4. Elige un nombre: `descripciones-shopify`

### Paso 4: Activar GitHub Pages

(Sigue el "Paso 3" del Método 1)

---

## ✅ Verificación Post-Despliegue

### Checklist:

- [ ] El sitio se carga en `https://tu-usuario.github.io/descripciones-shopify/`
- [ ] Se muestran las 14 categorías de productos
- [ ] La búsqueda funciona
- [ ] Los filtros funcionan
- [ ] Los modales se abren correctamente
- [ ] Se puede ver la vista previa
- [ ] Se puede ver el código
- [ ] El botón "Copiar Código" funciona
- [ ] El botón "Copiar Prompt Completo" funciona
- [ ] El diseño es responsive (prueba en móvil)

---

## 🔄 Actualizar el Sitio (Después del Despliegue)

### Cuando hagas cambios en los archivos:

#### Método Git Command Line:

```powershell
# 1. Agregar cambios
git add .

# 2. Crear commit con descripción
git commit -m "Descripción de los cambios"

# 3. Subir cambios
git push
```

#### Método GitHub Desktop:

1. Abre GitHub Desktop
2. Verás los archivos modificados
3. Escribe un mensaje describiendo los cambios
4. Clic en **"Commit to main"**
5. Clic en **"Push origin"**

#### Método Web GitHub:

1. Ve a tu repositorio
2. Navega al archivo que quieres cambiar
3. Clic en el icono del lápiz (Edit)
4. Haz tus cambios
5. Scroll abajo, escribe mensaje
6. Clic en **"Commit changes"**

**⏰ Tiempo de actualización**: 1-5 minutos después del push

---

## 🐛 Solución de Problemas Comunes

### Problema: "404 - Page not found"

**Causas posibles:**
- GitHub Pages aún no se activó (espera 2-3 minutos)
- El repositorio es privado (debe ser público)
- La rama no es la correcta

**Solución:**
1. Ve a Settings → Pages
2. Verifica que Source sea `main` y `/ (root)`
3. Espera unos minutos y recarga

### Problema: "Los archivos .txt no cargan"

**Causa**: Configuración incorrecta de rutas
**Solución:**
- Los archivos .txt deben estar en la carpeta raíz
- Verifica que los nombres coincidan exactamente
- Los nombres son case-sensitive: `Laptop.txt` ≠ `laptop.txt`

### Problema: "CSS no se aplica"

**Causa**: Ruta incorrecta en index.html
**Solución:**
Verifica en index.html que tengas:
```html
<link rel="stylesheet" href="styles.css">
```
NO uses:
```html
<link rel="stylesheet" href="./styles.css">
<link rel="stylesheet" href="/styles.css">
```

### Problema: "JavaScript no funciona"

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica las rutas de los scripts en index.html:
```html
<script src="products-data.js"></script>
<script src="script.js"></script>
```

---

## 🔒 Configuración de Seguridad

### Para Proyectos Grupales:

#### Agregar Colaboradores:

1. Ve a **Settings** → **Collaborators**
2. Clic en **"Add people"**
3. Ingresa el usuario de GitHub de tu compañero
4. Selecciona el nivel de acceso:
   - **Write**: Pueden hacer push (recomendado)
   - **Maintain**: Pueden hacer push y configurar
   - **Admin**: Control total

#### Proteger la Rama Main:

1. **Settings** → **Branches**
2. Clic en **"Add rule"**
3. Branch name pattern: `main`
4. Marca:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass
5. Clic en **"Create"**

---

## 📊 Analytics (Opcional)

### Agregar Google Analytics:

1. Obtén tu ID de Google Analytics
2. Agrega antes del `</head>` en index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID-AQUI"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU-ID-AQUI');
</script>
```

---

## 🌐 Dominio Personalizado (Opcional)

### Usar tu propio dominio:

1. Compra un dominio (GoDaddy, Namecheap, etc.)
2. En GitHub: **Settings** → **Pages**
3. En **Custom domain**, ingresa: `tudominio.com`
4. Clic en **"Save"**
5. En tu proveedor de dominio, configura DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: tu-usuario.github.io
   ```
6. Espera 24-48 horas para propagación de DNS
7. En GitHub Pages, marca ✅ **"Enforce HTTPS"**

---

## 📞 Soporte

### Recursos Útiles:

- [Documentación GitHub Pages](https://docs.github.com/pages)
- [Git Tutorial](https://git-scm.com/docs/gittutorial)
- [Markdown Guide](https://www.markdownguide.org/)

### Contacto del Equipo:

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

---

## ✨ ¡Felicidades!

Tu aplicación ya está en línea y accesible para todo tu equipo. Comparte el enlace con tus compañeros de proyecto.

**URL de tu sitio**: `https://tu-usuario.github.io/descripciones-shopify/`

---

**Última actualización**: Diciembre 2025  
**Versión**: 1.0.0
