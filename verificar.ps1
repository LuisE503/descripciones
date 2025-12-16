# Script de Verificación Rápida
# Ejecuta esto para verificar que todos los archivos estén presentes

Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host "  VERIFICACIÓN DEL PROYECTO SHOPIFY" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

$allOk = $true

# 1. Verificar archivos principales
Write-Host "`n[1] Verificando archivos principales..." -ForegroundColor Yellow
$mainFiles = @("index.html", "script.js", "styles.css", "products-data.js")
foreach ($file in $mainFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        Write-Host "  ✓ $file ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file NO ENCONTRADO" -ForegroundColor Red
        $allOk = $false
    }
}

# 2. Verificar archivos .txt (14 productos)
Write-Host "`n[2] Verificando plantillas de productos (.txt)..." -ForegroundColor Yellow
$txtFiles = @(
    "case.txt", 
    "cooler.txt", 
    "fuente_de_poder.txt", 
    "Laptop.txt", 
    "memoria_ram.txt", 
    "monitores.txt", 
    "motherboard.txt", 
    "procesadores.txt", 
    "regletas.txt", 
    "regulador_de_voltaje.txt", 
    "software.txt", 
    "supresor_de_voltaje.txt", 
    "tarjetas_graficas.txt", 
    "ups_y_ups_online.txt"
)

$txtCount = 0
foreach ($file in $txtFiles) {
    if (Test-Path $file) {
        $txtCount++
        $size = (Get-Item $file).Length
        Write-Host "  ✓ $file ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file NO ENCONTRADO" -ForegroundColor Red
        $allOk = $false
    }
}
Write-Host "  Total: $txtCount/14 archivos .txt encontrados" -ForegroundColor $(if ($txtCount -eq 14) { "Green" } else { "Red" })

# 3. Verificar contenido crítico en script.js
Write-Host "`n[3] Verificando contenido de script.js..." -ForegroundColor Yellow
$scriptContent = Get-Content "script.js" -Raw
$checks = @{
    "loadAllProductData" = $scriptContent -match "function loadAllProductData"
    "laptop: {" = $scriptContent -match "laptop: \{"
    "monitores: {" = $scriptContent -match "monitores: \{"
    "REGLAS ESPECÍFICAS PARA LAPTOP" = $scriptContent -match "REGLAS ESPECÍFICAS PARA LAPTOP"
    "Debug logging" = $scriptContent -match "Debug - Producto"
}

foreach ($check in $checks.GetEnumerator()) {
    if ($check.Value) {
        Write-Host "  ✓ $($check.Key)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $($check.Key) NO ENCONTRADO" -ForegroundColor Red
        $allOk = $false
    }
}

# 4. Verificar contenido crítico en products-data.js
Write-Host "`n[4] Verificando contenido de products-data.js..." -ForegroundColor Yellow
$productsContent = Get-Content "products-data.js" -Raw
$checksProducts = @{
    "generateFullPrompt" = $productsContent -match "function generateFullPrompt"
    "isLaptop check" = $productsContent -match "const isLaptop = product.category === 'laptop'"
    "OMITE esa fila" = $productsContent -match "OMITE completamente esa fila"
}

foreach ($check in $checksProducts.GetEnumerator()) {
    if ($check.Value) {
        Write-Host "  ✓ $($check.Key)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $($check.Key) NO ENCONTRADO" -ForegroundColor Red
        $allOk = $false
    }
}

# 5. Verificar documentación
Write-Host "`n[5] Verificando archivos de documentación..." -ForegroundColor Yellow
$docFiles = @("README.md", "TESTING.md", "CAMBIOS_COMPLETADOS.md")
foreach ($file in $docFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ $file (opcional)" -ForegroundColor Yellow
    }
}

# Resumen final
Write-Host "`n=====================================" -ForegroundColor Cyan
if ($allOk) {
    Write-Host "  ✅ VERIFICACIÓN EXITOSA" -ForegroundColor Green
    Write-Host "  Todos los archivos críticos están presentes" -ForegroundColor Green
    Write-Host "`n  Siguiente paso:" -ForegroundColor Yellow
    Write-Host "  python -m http.server 8000" -ForegroundColor White
    Write-Host "  Luego abre: http://localhost:8000" -ForegroundColor White
} else {
    Write-Host "  ❌ VERIFICACIÓN FALLIDA" -ForegroundColor Red
    Write-Host "  Algunos archivos faltan o tienen problemas" -ForegroundColor Red
}
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
