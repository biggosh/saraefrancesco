# Django Templates Offline Setup

This document describes the offline capability setup for the Django wedding website templates.

## What Was Done

### 1. Local Font Files
Downloaded and stored Google Fonts locally:
- **Inter font family**: weights 300, 400, 500, 600, 700
- **Lora font family**: weights 400, 500, 600, 700
- Location: `wedding/static/fonts/inter/` and `wedding/static/fonts/lora/`

### 2. Font CSS File
Created `wedding/static/css/fonts.css` with @font-face declarations for all font weights.
Uses relative paths to load fonts from the local static directory.

### 3. Production Tailwind CSS
Generated a production build of Tailwind CSS specifically for Django templates:
- Configuration: `tailwind.django.config.js`
- Output: `wedding/static/css/tailwind-django.css` (17KB minified)
- Scans all Django templates in `wedding/templates/**/*.html`

### 4. Updated Templates
Modified two template files to use local resources:

#### `wedding/templates/base.html`
- Removed: `<script src="https://cdn.tailwindcss.com"></script>`
- Removed: Google Fonts @import from inline styles
- Added: `<link rel="stylesheet" href="{% static 'css/fonts.css' %}">`
- Added: `<link rel="stylesheet" href="{% static 'css/tailwind-django.css' %}">`
- Kept: Leaflet CDN links (accessible via intranet)

#### `wedding/templates/frame_static.html`
- Removed: `<script src="https://cdn.tailwindcss.com"></script>`
- Removed: Google Fonts preconnect and stylesheet links
- Added: `<link rel="stylesheet" href="{% static 'css/fonts.css' %}">`
- Added: `<link rel="stylesheet" href="{% static 'css/tailwind-django.css' %}">`

## What Remains External

### Map Resources (Accessible via Intranet)
The following resources remain on CDN as they're accessible through the intranet:
- Leaflet CSS: `https://unpkg.com/leaflet@1.9.4/dist/leaflet.css`
- Leaflet JS: `https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`
- Leaflet Routing Machine CSS: `https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css`
- Leaflet Routing Machine JS: `https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js`
- OpenStreetMap tiles: Accessible through intranet connection

### Local Backups Available
Local backup files exist as fallbacks (kept unchanged):
- `wedding/static/js/leaflet.js`
- `wedding/static/css/leaflet.css`

## Testing Offline Capability

To verify offline functionality:

1. Start the Django development server
2. Open browser developer tools
3. Block these domains in Network tab:
   - `cdn.tailwindcss.com`
   - `fonts.googleapis.com`
   - `fonts.gstatic.com`
4. Navigate to all pages:
   - Home (/)
   - RSVP (/rsvp)
   - Gifts (/gifts)
   - Schedule (/schedule)
   - Wishes (/wishes)
5. Verify:
   - Fonts render correctly (Lora and Inter)
   - All Tailwind styles work (gradients, animations, responsive design)
   - Forms and interactions function properly
   - Maps display (if intranet connection available)

## Maintenance

### Regenerating Tailwind CSS
If you modify Django templates and need new Tailwind classes:

```bash
npx tailwindcss -c tailwind.django.config.js -o wedding/static/css/tailwind-django.css --minify
```

### Updating Fonts
If you need different font weights or styles:

1. Download new font files from Google Fonts
2. Place them in `wedding/static/fonts/inter/` or `wedding/static/fonts/lora/`
3. Update `wedding/static/css/fonts.css` with new @font-face declarations
4. Run `python manage.py collectstatic` in production

### React Application
The React application (built with Vite) already bundles all its own assets and doesn't require any changes for offline use.

## File Sizes

- Inter fonts: ~1.6MB total (5 weights)
- Lora fonts: ~528KB total (4 weights)
- Tailwind CSS: ~17KB (minified)
- Font CSS: ~1.5KB
- **Total added**: ~2.1MB

## Security Notes

- All local resources use Django's static file system
- No external dependencies for core styling and typography
- Map functionality requires intranet connectivity (as specified)
- Local backups exist for Leaflet libraries if CDN becomes unavailable
