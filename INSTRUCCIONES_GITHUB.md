# 📤 Instrucciones para Subir a GitHub

## ✅ Commit Inicial Ya Realizado

Se ha creado el commit inicial con 28 archivos (6335 líneas).

## 🚀 Pasos para Subir a GitHub

### Opción 1: Crear Repositorio Nuevo en GitHub

1. **Ve a GitHub** → https://github.com/new

2. **Configurar repositorio:**
   - Nombre: `descripciones-shopify` (o el que prefieras)
   - Descripción: `Generador de descripciones para productos Shopify - 14 categorías`
   - Público o Privado (tu elección)
   - ❌ NO marcar "Add README" (ya tienes uno)
   - ❌ NO agregar .gitignore (ya tienes uno)

3. **Copiar la URL** que te da GitHub (ejemplo):
   ```
   https://github.com/tu-usuario/descripciones-shopify.git
   ```

4. **Ejecutar estos comandos** (reemplaza la URL con la tuya):
   ```powershell
   # Agregar el repositorio remoto
   git remote add origin https://github.com/tu-usuario/descripciones-shopify.git
   
   # Cambiar a rama main
   git branch -M main
   
   # Subir archivos
   git push -u origin main
   ```

### Opción 2: Si Ya Tienes el Repositorio Creado

```powershell
# Agregar el repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/tu-repositorio.git

# Subir archivos
git push -u origin main
```

## 🔑 Si Te Pide Autenticación

### Usar Token de Acceso Personal (Recomendado)

1. Ve a: https://github.com/settings/tokens
2. Click en "Generate new token" → "Generate new token (classic)"
3. Nombre: `Descripciones Shopify`
4. Marcar: `repo` (acceso completo)
5. Click "Generate token"
6. **COPIA EL TOKEN** (solo se muestra una vez)

7. Al hacer push, usa:
   - Usuario: tu nombre de usuario de GitHub
   - Contraseña: el token que copiaste

## 📝 Comandos Útiles

```powershell
# Ver estado
git status

# Ver historial
git log --oneline

# Ver repositorio remoto configurado
git remote -v

# Eliminar repositorio remoto (si te equivocas)
git remote remove origin

# Agregar cambios nuevos
git add .
git commit -m "Descripción de cambios"
git push
```

## 🌐 Configurar GitHub Pages (Opcional)

Después de subir, para publicar la web:

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: `Deploy from a branch`
4. Branch: `main` → carpeta `/ (root)`
5. Save

Tu sitio estará en: `https://tu-usuario.github.io/nombre-repositorio/`

## ⚠️ Si Git Log se Abrió en Vim

Si ejecutaste `git log` y se quedó abierto:
- Presiona: `q` para salir
- Si estás en modo edición: `ESC` luego `q`

## ✅ Verificación Final

Después de hacer push:
```powershell
git remote -v
git log --oneline
```

Deberías ver tu commit y el repositorio remoto configurado.

---

## 🎯 Resumen de Comandos Rápidos

```powershell
# 1. Agregar repositorio remoto
git remote add origin https://github.com/tu-usuario/descripciones-shopify.git

# 2. Verificar
git remote -v

# 3. Subir
git push -u origin main

# 4. Verificar en GitHub que todo esté subido
```

## 📞 Problemas Comunes

### Error: "remote origin already exists"
```powershell
git remote remove origin
# Luego vuelve a agregar con la URL correcta
```

### Error: "failed to push some refs"
```powershell
git pull origin main --rebase
git push -u origin main
```

### Error: "Authentication failed"
- Usa un token de acceso personal (ver arriba)
- O configura SSH keys

---

**¡Listo!** Una vez subido, comparte el enlace del repositorio con tu equipo.
