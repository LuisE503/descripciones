# Script para verificar instrucciones sin comentar (inicio y final)
$archivos = Get-ChildItem -Path "productos-txt\*.txt" -File | Sort-Object Name

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "VERIFICACION EXHAUSTIVA DE PRODUCTOS" -ForegroundColor Yellow
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

$archivosConError = @()

foreach ($archivo in $archivos) {
    $contenido = Get-Content $archivo.FullName -Raw
    $errores = @()
    
    # Verificar inicio - texto antes del primer <!-- o <
    if ($contenido -match "^[A-Za-z][^<]" -and $contenido -notmatch "^<!--") {
        $errores += "Inicio"
    }
    
    # Verificar final - texto significativo despues del ultimo </style>
    # Solo detecta si hay texto que no sea espacios o comentarios
    if ($contenido -match "</style>\s*\r?\n\s*[A-Za-z][A-Za-z0-9\s]+[^\-]$") {
        $errores += "Final"
    }
    
    if ($errores.Count -gt 0) {
        Write-Host "ERROR: $($archivo.Name) - Problemas en: $($errores -join ', ')" -ForegroundColor Red
        $archivosConError += $archivo.Name
    } else {
        Write-Host "OK: $($archivo.Name)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "RESUMEN" -ForegroundColor Yellow
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "Total de archivos: $($archivos.Count)" -ForegroundColor White
Write-Host "Archivos con error: $($archivosConError.Count)" -ForegroundColor Red

if ($archivosConError.Count -gt 0) {
    Write-Host ""
    Write-Host "Archivos que necesitan revision:" -ForegroundColor Yellow
    foreach ($arch in $archivosConError) {
        Write-Host "  - $arch" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
