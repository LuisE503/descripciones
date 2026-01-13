# Script para corregir instrucciones sin comentar
$archivosParaCorregir = @(
    "combo_teclado_y_mouse_cableados_e_inalambrico.txt",
    "infraestructura_de_red.txt",
    "internet_de_las_cosas.txt",
    "pasta_termica.txt",
    "portabilidad.txt",
    "repetidores_de_red.txt",
    "router.txt",
    "smart_home.txt",
    "smartphone.txt",
    "tableta_grafica.txt"
)

foreach ($archivo in $archivosParaCorregir) {
    $ruta = "productos-txt\$archivo"
    
    if (Test-Path $ruta) {
        Write-Host "Corrigiendo: $archivo" -ForegroundColor Yellow
        
        # Leer contenido
        $contenido = Get-Content $ruta -Raw
        
        # Buscar la primera línea que empiece con <!-- (primer comentario HTML)
        if ($contenido -match '(?s)^(.*?)(<!--)') {
            $textoSinComentar = $Matches[1].Trim()
            $restoDelArchivo = $contenido.Substring($Matches[1].Length)
            
            if ($textoSinComentar -ne "") {
                # Envolver el texto sin comentar en comentarios HTML
                $nuevoContenido = "<!--`n" + $textoSinComentar + "`n-->`n`n" + $restoDelArchivo
                
                # Guardar
                $nuevoContenido | Set-Content -Path $ruta -NoNewline -Encoding UTF8
                Write-Host "  Corregido exitosamente!" -ForegroundColor Green
            } else {
                Write-Host "  Ya esta corregido." -ForegroundColor Cyan
            }
        } else {
            Write-Host "  No se encontro patron de comentario HTML." -ForegroundColor Red
        }
    } else {
        Write-Host "No se encontro: $archivo" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "Proceso completado." -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Cyan
