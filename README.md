# CardioRec — Grabador de Consultas Médicas

PWA para grabación y transcripción de consultas cardiológicas con formateo HCOP automático via Claude.

## Características

- Tres modos: consulta completa / dictado post-consulta / importar estudio (PDF, imagen o texto)
- Transcripción via Web Speech API nativa (gratis, por defecto) o Whisper de OpenAI (opcional, de pago, mejor precisión)
- Wake Lock: impide que la pantalla/pestaña se suspenda durante la grabación
- Segmentación automática cada 90 segundos (sin pérdida de datos)
- Formateo HCOP e interpretación de estudios (PDF/imagen/texto) via Claude — sin paso de upload de archivos, todo va en el mismo mensaje
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
   - API Key de Anthropic (obligatoria — se usa para el HCOP y para Importar Estudio)
   - Método de transcripción: Web Speech (gratuito, por defecto) o Whisper (OpenAI, de pago, mejor precisión)
   - API Key de OpenAI solo si elegís Whisper
4. Guardar — las claves quedan en localStorage del dispositivo

Conseguí tu API Key de Anthropic en [console.anthropic.com](https://console.anthropic.com/settings/keys).

## Instalación como app en el celular

### iPhone (Safari):
1. Abrir la URL en Safari
2. Botón compartir → "Agregar a pantalla de inicio"

### Android (Chrome):
1. Abrir la URL en Chrome
2. Menú → "Instalar app" o banner automático

## Costo estimado por consulta

- Web Speech (transcripción): gratis
- Whisper (opcional, si lo activás en vez de Web Speech): ~$0.006/minuto → consulta de 20 min ≈ $0.12 USD
- Claude (HCOP e Importar Estudio): unos pocos centavos de USD por consulta, según extensión del texto/estudio
- Con Web Speech + Claude, el costo por consulta es solo el de Claude — no hace falta cuenta de OpenAI

## Privacidad

- Las API keys se almacenan solo en el dispositivo (localStorage)
- Con Web Speech (default), el audio se procesa localmente en el navegador — no sale del dispositivo
- Con Whisper (opcional), el audio se envía a OpenAI solo para transcripción
- La transcripción, y los PDFs/imágenes de estudios importados, se envían a Anthropic (Claude) para el formateo
- Ningún dato se almacena en servidores propios
