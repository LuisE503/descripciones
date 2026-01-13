# 📋 INSTRUCCIONES PARA GENERACIÓN DE PROMPTS - CASE/GABINETE

## Reglas Específicas para Case/Gabinete:

### 1. CLASIFICACIÓN
Especificar según tamaño real del case:
- **MID TOWER** (más común, estándar)
- **MINI TOWER / MINI-ITX** (compacto, pequeño)
- **FULL TOWER / E-ATX** (grande, para workstations)
- **MICRO-ATX** (mediano)

### 2. COLOR
Indicar color exacto del gabinete y acabados:
- Negro, Blanco, Gris, RGB, Transparente
- Combinaciones: Negro/Rojo, Blanco/RGB, etc.

### 3. SOPORTE PARA MOTHERBOARD
Especificar formatos compatibles exactos:
- ATX / MICRO-ATX / MINI-ITX / E-ATX
- Combinar según compatibilidad: "ATX / MINI-ITX / MICRO-ATX"

### 4. PANELES
- **Acrílico**: Sí/No
- **Vidrio Templado**: Sí/No
- ⚠️ Si no se especifica → poner **"No"**

### 5. VENTILACIÓN (solo si el case incluye ventiladores)
- Agregar sección **"Ventilación"** en la tabla
- Indicar cantidad y tamaño exactos:
  - Ejemplo: "3x 120mm RGB"
  - Ejemplo: "2x 140mm frontal + 1x 120mm trasero"
- ⚠️ **OMITIR** esta sección completa si no incluye ventiladores

### 6. GESTIÓN
- **Soporte para cables**: Sí/No
- Si no se especifica → **"No"**

## ⚠️ Reglas Importantes:

✅ **SÍ hacer:**
- Usar estructura HTML exacta proporcionada
- Mantener clases CSS sin modificar
- Incluir solo datos confirmados
- Agregar sección Ventilación para cases gaming con ventiladores

❌ **NO hacer:**
- JAMÁS usar "No especificado", "N/A", o similar
- NO inventar especificaciones
- NO incluir filas/secciones sin datos
- NO agregar sección Ventilación si no tiene ventiladores

## 📝 Estructura de Tabla:

```
General
├── Clasificación: [MID TOWER / FULL TOWER / etc.]
└── Color: [color exacto]

Compatibilidad
└── Soporte para Motherboard: [ATX / MICRO-ATX / etc.]

Paneles
├── Acrílico: [Sí/No]
└── Vidrio Templado: [Sí/No]

Ventilación (OPCIONAL - solo si incluye ventiladores)
└── Ventiladores Incluidos: [cantidad x tamaño]

Gestión
└── Soporte para cables: [Sí/No]
```

## Ejemplo Completo:

**Case Gaming con Ventiladores:**
- Clasificación: MID TOWER
- Color: Negro/RGB
- Motherboard: ATX / MICRO-ATX / MINI-ITX
- Acrílico: No
- Vidrio Templado: Sí
- Ventiladores: 3x 120mm RGB (frontal)
- Soporte cables: Sí

**Case Básico sin Ventiladores:**
- Clasificación: MICRO-ATX
- Color: Negro
- Motherboard: MICRO-ATX / MINI-ITX
- Acrílico: No
- Vidrio Templado: No
- (No agregar sección Ventilación)
- Soporte cables: No
