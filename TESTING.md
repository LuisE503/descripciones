# 🧪 INSTRUCCIONES DE PRUEBA

## Cambios Realizados

### 1. **Debugging Agregado**
- Console.log en `copyFullPrompt()` para verificar categorías
- Validación automática al cargar productos

### 2. **Prompts Actualizados** (Todos los 14 productos)

#### Regla General (No Laptops):
- ✅ **Omitir filas individuales** si no hay información
- ✅ **Omitir secciones completas** si ninguna característica de esa sección tiene datos
- ❌ **NO usar "No", "N/A" o valores negativos**

#### Regla Especial para Laptops:
- ✅ **Mantener TODAS** las características Sí/No (12 características)
- ✅ **Usar "No"** cuando no hay información confirmada
- ❌ **NUNCA dejar celdas vacías** en características Sí/No
- ✅ **Omitir otras secciones** si no tienen información

### 3. **Productos Actualizados**

| Producto | Archivo | Cambios |
|----------|---------|---------|
| Case | `case.txt` | Clarificado cuándo omitir características |
| Cooler | `cooler.txt` | Especificado omitir si no se menciona |
| Fuente de Poder | `fuente_de_poder.txt` | Omitir certificación 80 PLUS si no existe |
| **Laptop** | `Laptop.txt` | **Mantener TODAS características Sí/No** |
| Memoria RAM | `memoria_ram.txt` | Omitir velocidad y latencia si no se especifica |
| Monitores | `monitores.txt` | Omitir características no confirmadas |
| Motherboard | `motherboard.txt` | Omitir WiFi, Bluetooth, RGB si no se confirma |
| Procesadores | `procesadores.txt` | Omitir gráficos integrados y TDP si no existen |
| Regletas | `regletas.txt` | Omitir USB y protecciones no mencionadas |
| Regulador | `regulador_de_voltaje.txt` | Omitir protecciones no confirmadas |
| Software | `software.txt` | Omitir requisitos recomendados si no existen |
| Supresor | `supresor_de_voltaje.txt` | Omitir protecciones RJ11/RJ45/Coaxial no mencionadas |
| Tarjetas Gráficas | `tarjetas_graficas.txt` | Omitir características avanzadas no confirmadas |
| UPS | `ups_y_ups_online.txt` | Omitir características opcionales |

## 📋 Cómo Probar

### Paso 1: Abrir la Aplicación
```powershell
cd "C:\Users\Usuario\Desktop\descripciones"
python -m http.server 8000
```

Luego abrir: http://localhost:8000

### Paso 2: Abrir Consola del Navegador
- Presiona F12
- Ve a la pestaña "Console"

### Paso 3: Verificar Carga de Datos
Deberías ver:
```
🚀 Inicializando aplicación...
📁 Cargando datos de productos...
✅ Datos de productos cargados
🔍 Validando datos de productos...
  case: HTML=✓, Rules=✓
  cooler: HTML=✓, Rules=✓
  fuente_de_poder: HTML=✓, Rules=✓
  laptop: HTML=✓, Rules=✓
  ... (continúa para los 14 productos)
✅ Aplicación inicializada correctamente
```

### Paso 4: Probar Laptop (Caso Especial)
1. Clic en "Laptop"
2. Ve a la pestaña "Descripción Oficial"
3. Pega especificaciones de ejemplo
4. Clic en "Copiar Todo para ChatGPT"
5. Verifica en consola:
```
🔍 Debug - Producto: Laptop
🔍 Debug - Categoría: laptop
🔍 Debug - Tiene promptRules: true
🔍 Debug - PromptRules preview: REGLAS ESPECÍFICAS PARA LAPTOP...
```

### Paso 5: Probar Otro Producto (ej: Monitor)
1. Clic en "Monitores"
2. Ve a "Descripción Oficial"
3. Pega especificaciones
4. Clic en "Copiar Todo para ChatGPT"
5. Verifica en consola:
```
🔍 Debug - Producto: Monitores
🔍 Debug - Categoría: monitores
🔍 Debug - Tiene promptRules: true
🔍 Debug - PromptRules preview: REGLAS ESPECÍFICAS PARA MONITORES...
```

### Paso 6: Verificar Prompt Generado
1. Después de copiar, pega en un editor de texto
2. Verifica que:
   - ✅ El título dice el producto correcto
   - ✅ Las reglas específicas corresponden al producto
   - ✅ Para laptops: menciona las 12 características Sí/No
   - ✅ Para otros: menciona "OMITE esa fila completamente"

## 🐛 Problemas Conocidos y Soluciones

### Problema: "Prompt de monitores aparece en laptop"
**Causa**: Cache del navegador o archivos no guardados
**Solución**:
1. Ctrl + Shift + R (Forzar recarga)
2. Verificar que los archivos estén guardados
3. Cerrar y reabrir servidor

### Problema: "Rules=✗ en consola"
**Causa**: Archivo .txt no carga o promptRules vacío
**Solución**:
1. Verificar que el archivo existe
2. Verificar nombre exacto (mayúsculas/minúsculas)
3. Ver errores en consola

### Problema: "Características vacías en laptop"
**Causa**: Prompt no incluye regla de "No" por defecto
**Solución**: Verificado ✅ - Las nuevas reglas lo especifican claramente

## ✅ Checklist de Validación

- [ ] Servidor corriendo en puerto 8000
- [ ] Consola muestra 14 productos con HTML=✓ y Rules=✓
- [ ] Laptop muestra "REGLAS ESPECÍFICAS PARA LAPTOP" en debug
- [ ] Monitor muestra "REGLAS ESPECÍFICAS PARA MONITORES" en debug
- [ ] Prompt de laptop incluye lista de 12 características Sí/No
- [ ] Prompt de monitor incluye instrucción de omitir filas
- [ ] Textarea funciona correctamente (20 filas, altura 450px)
- [ ] Botón "Copiar Todo para ChatGPT" habilitado siempre
- [ ] Toast muestra mensajes correctos al copiar

## 📊 Resultados Esperados

### Para Laptops:
```
SECCIÓN CARACTERÍSTICAS (IMPORTANTE):
- Color: Describe el color del equipo
- Tarjeta gráfica: Integrada o modelo específico
- Teclado numérico: Sí o No
- Teclado retroiluminado: Sí o No
... (todas las 12 características)

⚠️ REGLA CRÍTICA PARA CARACTERÍSTICAS:
- Para TODAS las características de Sí/No: Si no tienes información específica... coloca "No"
```

### Para Otros Productos:
```
⚠️ REGLA CRÍTICA SOBRE CARACTERÍSTICAS Y SECCIONES FALTANTES:
- Si una característica específica NO existe... OMITE completamente esa fila
- Si una SECCIÓN COMPLETA no tiene información... OMITE toda esa sección
- NO pongas "No", "N/A", "No especificado"
```

## 🎯 Conclusión

Si todos los checks están ✅, el sistema está funcionando correctamente y:
- Los prompts son específicos para cada producto
- Las reglas están claras y diferenciadas
- Laptops mantienen todas sus características
- Otros productos omiten información faltante
