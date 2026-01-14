# Script para encontrar archivos con instrucciones en comentarios HTML
$archivos = Get-ChildItem -Path "productos-txt\*.txt" -File | Sort-Object Name

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "BUSCANDO INSTRUCCIONES EN COMENTARIOS HTML" -ForegroundColor Yellow
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

$archivosConInstrucciones = @()

foreach ($archivo in $archivos) {
    $contenido = Get-Content $archivo.FullName -Raw
    
    # Buscar comentarios que contengan "INSTRUCCIONES PARA PROMPTS"
    if ($contenido -match "INSTRUCCIONES PARA PROMPTS") {
        Write-Host "ENCONTRADO: $($archivo.Name)" -ForegroundColor Green
        $archivosConInstrucciones += $archivo.Name
    }
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "RESUMEN" -ForegroundColor Yellow
Write-Host "Total encontrados: $($archivosConInstrucciones.Count)" -ForegroundColor White
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

if ($archivosConInstrucciones.Count -gt 0) {
    foreach ($arch in $archivosConInstrucciones) {
        Write-Host "  - $arch"
    }
}
