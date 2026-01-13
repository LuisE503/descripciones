# Script para verificar instrucciones sin comentar en archivos .txt
$archivos = Get-ChildItem -Path "productos-txt\*.txt" -File | Sort-Object Name

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "VERIFICANDO ARCHIVOS DE PRODUCTOS" -ForegroundColor Yellow
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

$archivosConError = @()

foreach ($archivo in $archivos) {
    $contenido = Get-Content $archivo.FullName -Raw
    
    # Verificar si el archivo empieza con comentario HTML o con texto plano
    if ($contenido -match "^[A-Z][^<]" -and $contenido -notmatch "^<!--") {
        Write-Host "ERROR: $($archivo.Name)" -ForegroundColor Red
        Write-Host "   Primeras lineas sin comentar" -ForegroundColor Yellow
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
    Write-Host "Archivos que necesitan correccion:" -ForegroundColor Yellow
    foreach ($arch in $archivosConError) {
        Write-Host "  - $arch" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
