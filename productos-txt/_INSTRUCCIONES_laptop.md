# 📋 INSTRUCCIONES PARA GENERACIÓN DE PROMPTS - LAPTOP

## Estructura General de la Tabla:

```
General
├── Nivel de complejidad: [Essential / Standard / Premium / Gaming]
└── Tipo: [Consumer / Corporativo]

Procesamiento
├── Marca de Procesador: [Intel / AMD]
├── Tipo de Procesador: [Modelo completo ej: Core i5-10400]
└── Tarjeta gráfica: [Solo si tiene GPU dedicada]

Almacenamiento
├── Almacenamiento: [256GB / 512GB / 1TB / etc.]
└── Tipo de almacenamiento: [SSD / HDD / NVMe]

Memoria
├── Memoria RAM: [8GB RAM / 16GB RAM / etc.]
└── Tipo de Memoria RAM: [DDR4 / DDR5]

Pantalla
├── Tamaño de Pantalla: [13.3 Plg / 15.6 Plg / 17.3 Plg]
├── Tipo de Pantalla: [LED / IPS / OLED]
└── Resolución máxima: [1920 x 1080 / 2560 x 1440 / etc.]

Software
├── Sistema Operativo: [Windows 11 Home / Pro / macOS]
└── Idioma del sistema operativo: [Español / Inglés]

Características
├── Color: [Negro / Plata / Gris / etc.]
├── Tarjeta gráfica: [Integrada / Dedicada (si aplica)]
└── [Características Sí/No - ver lista abajo]
```

## 🎯 REGLAS CRÍTICAS:

### 1. NIVEL DE COMPLEJIDAD (obligatorio)
Clasifica según el procesador:

- **Essential**: Ryzen 3 o Intel i3 inferiores (uso básico)
- **Standard**: Ryzen 5 o Intel i5 (uso general, trabajo)
- **Premium**: Ryzen 7 o Intel i7 (alto rendimiento)
- **Gaming**: Ryzen 5/7 o i5/i7 + GPU dedicada (juegos/diseño)

### 2. TIPO (obligatorio)
Clasifica según el sistema operativo:

- **Consumer**: Windows Home, macOS estándar
- **Corporativo**: Windows Pro/Professional, Enterprise

### 3. TARJETA GRÁFICA DEDICADA
Si el equipo tiene GPU dedicada (NVIDIA GTX/RTX, AMD Radeon):

✅ **Agregar fila en "Procesamiento":**
```
<tr>
  <td class="tableCellMeta">Tarjeta gráfica</td>
  <td class="tableCellContent">NVIDIA GeForce GTX 1650</td>
</tr>
```

Y en "Características":
```
<tr>
  <td class="tableCellMeta">Tarjeta gráfica</td>
  <td class="tableCellContent">Dedicada</td>
</tr>
```

### 4. CARACTERÍSTICAS SÍ/NO (todas obligatorias)

⚠️ **REGLA DE ORO**: Si NO hay información que CONFIRME que existe → poner **"No"**

Lista completa de características (TODAS deben aparecer):

1. Teclado numérico
2. Teclado retroiluminado
3. Teclas de función especial
4. Pantalla antirreflejo
5. Pantalla táctil
6. Pantalla IPS
7. Pantalla rotable
8. Pantalla inclinable
9. Lector de huella digital
10. Lector de tarjetas

**✅ Pon "Sí" solo cuando:**
- La ficha técnica lo menciona explícitamente
- Las imágenes lo confirman visualmente
- El fabricante lo especifica

**❌ Pon "No" cuando:**
- No hay información
- No se menciona
- No estás seguro

**🚫 NUNCA:**
- Dejar celdas vacías
- Omitir características de la lista
- Usar "No especificado" o similar
- Inventar información

## Ejemplo Completo:

**Laptop Gamer:**
```
Nivel: Gaming
Tipo: Consumer
Procesador: Intel Core i7-12700H
GPU (en Procesamiento): NVIDIA GeForce RTX 3060
RAM: 16GB DDR5
Almacenamiento: 512GB NVMe SSD
Pantalla: 15.6 Plg, IPS, 1920x1080
SO: Windows 11 Home, Español
Color: Negro/Rojo

Características:
- Teclado numérico: Sí
- Teclado retroiluminado: Sí (RGB)
- Teclas de función especial: Sí
- Pantalla antirreflejo: No
- Pantalla táctil: No
- Pantalla IPS: Sí
- Pantalla rotable: No
- Pantalla inclinable: Sí
- Lector de huella: No
- Lector de tarjetas: Sí
- Tarjeta gráfica: Dedicada
```

**Laptop Básica:**
```
Nivel: Essential
Tipo: Consumer
Procesador: Intel Celeron N4020
RAM: 4GB DDR4
Almacenamiento: 128GB eMMC
Pantalla: 14 Plg, LED, 1366x768
SO: Windows 11 Home S, Español

Características: (la mayoría será "No" por ser básica)
- Solo "Sí" en lo confirmado
- Resto todas "No"
```

## ⚠️ Errores Comunes a Evitar:

❌ **NO hacer:**
- Asumir que tiene características porque "es normal"
- Copiar "Sí" de otros productos similares
- Dejar características sin completar
- Omitir la fila de GPU dedicada cuando existe

✅ **SÍ hacer:**
- Seguir estrictamente la información proporcionada
- Completar TODAS las características
- Agregar GPU dedicada en ambas secciones cuando aplica
- Clasificar correctamente Essential/Standard/Premium/Gaming
