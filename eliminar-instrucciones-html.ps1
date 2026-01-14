# Script para eliminar comentarios de instrucciones iniciales de archivos .txt
$archivosACorregir = @(
    "gabinetes.txt",
    "cooler.txt",
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
    "ups_y_ups_online.txt",
    "repetidores_de_red.txt",
    "router.txt",
    "smartphone.txt",
    "tablets.txt",
    "accesorios.txt",
    "infraestructura_de_red.txt",
    "portabilidad.txt",
    "smart_home.txt",
    "drones.txt",
    "cargadores.txt",
    "audifonos_cableados_e_inalambricos.txt",
    "bocina_e_inalambrica_y_sistema_de_audio.txt",
    "cable_utp_y_bobina_de_cable.txt",
    "nvr.txt"
)

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "ELIMINANDO COMENTARIOS DE INSTRUCCIONES" -ForegroundColor Yellow
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

$corregidos = 0
foreach ($archivo in $archivosACorregir) {
    $ruta = "productos-txt\$archivo"
    
    if (Test-Path $ruta) {
        $contenido = Get-Content $ruta -Raw
        
        # Buscar el primer comentario que comience con <!-- y contenga INSTRUCCIONES
        if ($contenido -match "^<!--\s*\n[^<]*?-->\s*\n\n+") {
            # Remover el primer comentario de instrucciones y líneas en blanco que lo sigan
            $nuevoContenido = $contenido -replace "^<!--\s*\n[^<]*?-->\s*\n\n+", ""
            
            # Guardar
            $nuevoContenido | Set-Content -Path $ruta -NoNewline -Encoding UTF8
            Write-Host "Corregido: $archivo" -ForegroundColor Green
            $corregidos++
        } else {
            Write-Host "Sin cambios: $archivo" -ForegroundColor Cyan
        }
    } else {
        Write-Host "No encontrado: $archivo" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "Archivos corregidos: $corregidos" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Cyan
