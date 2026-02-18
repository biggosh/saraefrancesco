# Project Status

## Two Implementations Available

This project now contains **two complete implementations** of the wedding website:

### 1. Django Version (ACTIVE - Recommended)

**Location**: Root directory
**Status**: ✅ Production-ready
**Start**: `python3 manage.py runserver`

**Features**:
- Server-side rendered Django templates
- PostgreSQL database via Supabase
- Django admin interface
- jQuery for dynamic features
- Tailwind CSS styling
- All 5 pages functional

**Files**:
- `wedding/` - Django app
- `wedding_site/` - Django project
- `manage.py` - Django CLI
- `wedding/templates/` - HTML templates
- `wedding/static/` - Static assets

### 2. React Version (LEGACY - Reference)

**Location**: `src/` directory
**Status**: ✅ Builds successfully
**Start**: `npm run dev`

**Features**:
- React 18 with TypeScript
- Vite bundler
- Client-side rendering
- Supabase JS client
- React Router
- Tailwind CSS

**Files**:
- `src/` - React components
- `package.json` - Node dependencies
- `vite.config.ts` - Vite config

## Build Status

### Django
```bash
python3 manage.py check
# System check identified no issues (0 silenced).
```
✅ All checks pass

### React
```bash
npm run build
# ✓ built in 12.00s
```
✅ Builds successfully

## Which Version to Use?

### Use Django Version If:
- You want easier content management (Django admin)
- You prefer Python over JavaScript
- You need server-side rendering for SEO
- You want simpler deployment
- You're comfortable with Django

### Use React Version If:
- You prefer modern SPA architecture
- You want client-side routing
- You need the React ecosystem
- You're more comfortable with TypeScript/JavaScript

## Database

Both versions use the **same PostgreSQL database** via Supabase:
- Tables: `rsvps`, `gift_registry`, `wishes`, `rsvp_guests`
- Connection: Via Supabase
- Data: Shared between both implementations

## Deployment Options

### Django Deployment
1. Install Python dependencies: `pip install -r requirements.txt`
2. Set environment variables (SECRET_KEY, DB credentials)
3. Run migrations: `python3 manage.py migrate`
4. Collect static files: `python3 manage.py collectstatic`
5. Deploy with Gunicorn + Nginx

### React Deployment
1. Build: `npm run build`
2. Deploy `dist/` folder to:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Any static hosting

## Recommendation

**For this wedding website, the Django version is recommended** because:

1. ✅ Django admin makes content management easier
2. ✅ Better for guests (faster page loads, works without JavaScript)
3. ✅ Simpler deployment (single server)
4. ✅ Better SEO with server-side rendering
5. ✅ Built-in security features

The React version remains available as a reference or alternative implementation.

## Switching Between Versions

### To Use Django:
```bash
python3 manage.py runserver
# Visit http://localhost:8000/
```

### To Use React:
```bash
npm run dev
# Visit http://localhost:5173/
```

Both work with the same database, so data is synchronized.

## Documentation

### Django Docs:
- `DJANGO_README.md` - Full Django documentation
- `QUICK_START.md` - Quick reference
- `DATABASE_SETUP.md` - Database configuration
- `MIGRATION_SUMMARY.md` - Migration details

### React Docs:
- `README.md` - Original project README
- `package.json` - Dependencies and scripts

## Maintenance

Going forward, you can:
1. Maintain only the Django version (recommended)
2. Maintain only the React version
3. Keep both in sync (requires double work)

Most users will want to **choose one** and archive the other.
