# CardioRec — Grabador de Consultas Médicas

PWA para grabación y transcripción de consultas cardiológicas con formateo HCOP automático via Claude.

## Características

- Dos modos: consulta completa / dictado post-consulta
- Transcripción via Whisper (OpenAI) o Web Speech API nativa
- Wake Lock: impide que la pantalla/pestaña se suspenda durante la grabación
- Segmentación automática cada 90 segundos (sin pérdida de datos)
- Formateo HCOP automático con Claude Sonnet
- Instalable como app en celular y desktop (PWA)
- Todo se procesa localmente — las API keys se guardan solo en el dispositivo

## Deploy en GitHub Pages (más fácil)

1. Crear repositorio en GitHub (puede ser privado)
2. Subir los 3 archivos: `index.html`, `manifest.json`, `sw.js`
3. Ir a Settings → Pages → Source: main branch / root
4. La URL será: `https://tuusuario.github.io/nombre-repo`
5. Agregar íconos (ver abajo) o la app funciona igual sin ellos

### Íconos opcionales (para instalación completa)

Crear `icon-192.png` (192x192px) e `icon-512.png` (512x512px) con el logo que quieras.
Sin íconos la PWA funciona igual pero muestra un ícono genérico.

## Deploy en DigitalOcean Droplet (alternativa)

```bash
# En el droplet, crear carpeta y subir archivos
mkdir -p /var/www/cardiorec
# Copiar los 3 archivos

# Configurar nginx
server {
    listen 443 ssl;
    server_name cardiorec.tudominio.com;
    root /var/www/cardiorec;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}
```

**Importante:** La app requiere HTTPS para funcionar (micrófono y Wake Lock solo se activan en contextos seguros).
GitHub Pages provee HTTPS automáticamente.

## Configuración inicial

1. Abrir la app en el browser
2. Tocar el ícono ⚙ (esquina superior derecha)
3. Ingresar:
   - API Key de Anthropic (obligatoria)
   - Método de transcripción: Whisper (recomendado) o Web Speech (gratuito)
   - API Key de OpenAI si usás Whisper
4. Guardar — las claves quedan en localStorage del dispositivo

## Instalación como app en el celular

### iPhone (Safari):
1. Abrir la URL en Safari
2. Botón compartir → "Agregar a pantalla de inicio"

### Android (Chrome):
1. Abrir la URL en Chrome
2. Menú → "Instalar app" o banner automático

## Costo estimado por consulta

- Whisper: ~$0.006/minuto → consulta de 20 min ≈ $0.12 USD
- Claude Sonnet (HCOP): ~$0.01-0.03 por consulta
- Total: menos de $0.20 USD por consulta completa

## Privacidad

- Las API keys se almacenan solo en el dispositivo (localStorage)
- El audio se envía a OpenAI (Whisper) solo para transcripción
- La transcripción se envía a Anthropic (Claude) para el formateo
- Ningún dato se almacena en servidores propios
