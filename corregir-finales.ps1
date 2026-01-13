# Script para corregir instrucciones al final de archivos
$archivosParaCorregir = @(
    "camaras_de_vigilancia_analoga_ip_wifi.txt",
    "fuente_de_poder.txt",
    "memoria_ram.txt",
    "monitores.txt",
    "motherboard.txt",
    "procesadores.txt",
    "regletas.txt",
    "regulador_de_voltaje.txt",
    "software.txt",
    "supresor_de_voltaje.txt",
    "tablets.txt",
    "tarjetas_graficas.txt",
    "ups_y_ups_online.txt"
)

foreach ($archivo in $archivosParaCorregir) {
    $ruta = "productos-txt\$archivo"
    
    if (Test-Path $ruta) {
        Write-Host "Corrigiendo: $archivo" -ForegroundColor Yellow
        
        # Leer contenido
        $contenido = Get-Content $ruta -Raw
        
        # Buscar texto despues de </style>
        if ($contenido -match '(</style>)\s*\r?\n+\s*(.+)$') {
            $textoFinal = $Matches[2].Trim()
            
            if ($textoFinal -ne "" -and $textoFinal -notmatch "^<!--") {
                # Reemplazar el texto final con version comentada
                $nuevoContenido = $contenido -replace '(</style>)\s*\r?\n+\s*(.+)$', "`$1`n`n<!--`nINSTRUCCIONES ADICIONALES:`n`$2`n-->"
                
                # Guardar
                $nuevoContenido | Set-Content -Path $ruta -NoNewline -Encoding UTF8
                Write-Host "  Corregido!" -ForegroundColor Green
            }
        }
    }
}

Write-Host ""
Write-Host "Proceso completado." -ForegroundColor Cyan
