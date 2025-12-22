# Servidor HTTP simple en PowerShell
# Puerto en el que se ejecutará el servidor
$port = 8000
$url = "http://localhost:$port"

Write-Host "========================================" -ForegroundColor Green
Write-Host "   SERVIDOR HTTP LOCAL INICIADO" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "URL: $url" -ForegroundColor Cyan
Write-Host ""
Write-Host "Abriendo navegador..." -ForegroundColor Yellow
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Red
Write-Host ""

# Crear listener HTTP
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("$url/")
$listener.Start()

# Abrir navegador
Start-Process "$url/index.html"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Obtener la ruta del archivo solicitado
        $path = $request.Url.LocalPath
        if ($path -eq '/') {
            $path = '/index.html'
        }
        
        $filePath = Join-Path $PSScriptRoot $path.TrimStart('/')
        
        Write-Host "$(Get-Date -Format 'HH:mm:ss') - " -NoNewline
        
        if (Test-Path $filePath) {
            # Leer el archivo
            $content = [System.IO.File]::ReadAllBytes($filePath)
            
            # Determinar el tipo MIME
            $mimeType = switch ([System.IO.Path]::GetExtension($filePath)) {
                '.html' { 'text/html; charset=utf-8' }
                '.css'  { 'text/css; charset=utf-8' }
                '.js'   { 'application/javascript; charset=utf-8' }
                '.txt'  { 'text/plain; charset=utf-8' }
                '.json' { 'application/json; charset=utf-8' }
                '.png'  { 'image/png' }
                '.jpg'  { 'image/jpeg' }
                '.jpeg' { 'image/jpeg' }
                '.gif'  { 'image/gif' }
                '.svg'  { 'image/svg+xml' }
                default { 'application/octet-stream' }
            }
            
            # Configurar respuesta
            $response.ContentType = $mimeType
            $response.ContentLength64 = $content.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($content, 0, $content.Length)
            
            Write-Host "200 OK - $path" -ForegroundColor Green
        }
        else {
            # Archivo no encontrado
            $response.StatusCode = 404
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 - Archivo no encontrado: $path")
            $response.ContentLength64 = $notFound.Length
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
            
            Write-Host "404 NOT FOUND - $path" -ForegroundColor Red
        }
        
        $response.Close()
    }
}
finally {
    $listener.Stop()
    Write-Host "`nServidor detenido." -ForegroundColor Yellow
}
