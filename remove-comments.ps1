# Script para eliminar comentarios HTML problematicos

$productDir = "C:\Users\Usuario\Desktop\descripciones\productos-txt"
$files = Get-ChildItem $productDir -Filter "*.txt"

foreach ($file in $files) {
    try {
        # Leer archivo
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Si empieza con <!-- remover hasta el primer cierre válido
        if ($content -match "^<!--") {
            # Encontrar el cierre de comentario
            $endCommentIndex = $content.IndexOf("-->")
            if ($endCommentIndex -ge 0) {
                # Remover el comentario y la línea siguiente si está vacía
                $content = $content.Substring($endCommentIndex + 3)
                $content = $content -replace "^(\r\n|\n|\r)", ""
                
                # Guardar
                $content | Set-Content $file.FullName -Encoding UTF8 -NoNewline
                Write-Host " Comentario removido: $($file.Name)"
            }
        } else {
            Write-Host "- Sin comentario al inicio: $($file.Name)"
        }
    } catch {
        Write-Host " Error en $($file.Name): $_"
    }
}

Write-Host "`nProceso completado"
