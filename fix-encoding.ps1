# Script para corregir caracteres corruptos en todos los archivos de productos

$productDir = "C:\Users\Usuario\Desktop\descripciones\productos-txt"
$files = Get-ChildItem $productDir -Filter "*.txt"

$replacements = @(
    @{old = "ñ"; new = "ó"},
    @{old = "ñ"; new = "é"},
    @{old = "ñ¡"; new = "á"},
    @{old = "ñ"; new = "í"},
    @{old = "ñº"; new = "ú"},
    @{old = "ñ"; new = "ñ"},
    @{old = "Â°"; new = "°"},
    @{old = "Â"; new = ""},
    @{old = "âœ"; new = '"'},
    @{old = "â"; new = '"'},
    @{old = "â"; new = "'"},
    @{old = "TñCNICAS"; new = "TÉCNICAS"},
    @{old = "TñCNICAS"; new = "TÉCNICAS"}
)

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        $originalContent = $content
        
        foreach ($replacement in $replacements) {
            $content = $content -replace [regex]::Escape($replacement.old), $replacement.new
        }
        
        if ($content -ne $originalContent) {
            $content | Set-Content $file.FullName -Encoding UTF8 -NoNewline
            Write-Host " Corregido: $($file.Name)"
        } else {
            Write-Host "- Sin cambios: $($file.Name)"
        }
    } catch {
        Write-Host " Error en $($file.Name): $_"
    }
}

Write-Host "`nProceso completado"
