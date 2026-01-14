# Detectar y convertir a UTF-8 correcto

$productDir = "C:\Users\Usuario\Desktop\descripciones\productos-txt"
$files = Get-ChildItem $productDir -Filter "*.txt"

foreach ($file in $files) {
    try {
        # Leer como bytes
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        
        # Detectar encoding (intenta Windows-1252 primero)
        $encoding = [System.Text.Encoding]::GetEncoding("Windows-1252")
        
        # Decodificar a string
        $text = $encoding.GetString($bytes)
        
        # Guardar como UTF-8
        [System.IO.File]::WriteAllText($file.FullName, $text, [System.Text.Encoding]::UTF8)
        
        Write-Host " Convertido a UTF-8: $($file.Name)"
    } catch {
        Write-Host " Error en $($file.Name): $_"
    }
}

Write-Host "`nProceso de conversión completado"
