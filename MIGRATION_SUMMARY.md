# Migration Summary: React to Django

## Overview

Successfully migrated the Sara & Francesco wedding website from a React-based single-page application to a Django-based traditional web application with server-side rendering.

## What Was Changed

### Architecture

**Before (React Stack)**:
- React 18.3.1 with TypeScript
- Vite for bundling
- Supabase JS client for database
- React Router for navigation
- Client-side rendering

**After (Django Stack)**:
- Django 6.0.2 with Python
- PostgreSQL via Supabase (existing database reused)
- Django ORM for database operations
- Django URL routing
- Server-side rendering with templates

### Frontend

**Before**:
- JSX components
- React hooks (useState, useEffect)
- TypeScript interfaces
- Component-based architecture

**After**:
- Django templates (Jinja2-style)
- Static HTML with Tailwind CSS (CDN)
- jQuery for dynamic interactions
- Template inheritance with base.html

### Database

**No Changes Required**:
- Reused existing PostgreSQL database from Supabase
- All tables remain the same (rsvps, gift_registry, wishes, rsvp_guests)
- Django models map directly to existing schema
- No data migration needed

### Features Preserved

All original features remain functional:

1. **Home Page**: Couple introduction and story
2. **Schedule Page**: Timeline with interactive Leaflet maps
3. **Gift Registry**: Browse and claim gifts with AJAX
4. **RSVP Form**: Multi-guest support with dynamic fields
5. **Wishes Board**: Submit and view wedding wishes

### New Capabilities

Django adds these benefits:

1. **Admin Interface**: Built-in Django admin at `/admin/`
   - Manage RSVPs and guest lists
   - Add/edit gift registry items
   - View and moderate wishes
   - Rich inline editing for related models

2. **Server-Side Validation**: Form validation on backend
3. **Session Management**: Built-in user sessions
4. **CSRF Protection**: Automatic security tokens
5. **ORM Benefits**: Type-safe database queries

## File Structure

### Django Project Files

```
manage.py                    # Django management command
requirements.txt             # Python dependencies
start_django.sh             # Startup script

wedding_site/               # Django project
├── settings.py            # Configuration
├── urls.py                # Root URL routing
└── wsgi.py                # WSGI entry point

wedding/                    # Main Django app
├── models.py              # Database models
├── views.py               # View functions
├── admin.py               # Admin configuration
├── urls.py                # App URL routing
├── templates/             # HTML templates
│   ├── base.html
│   ├── home.html
│   ├── schedule.html
│   ├── gifts.html
│   ├── rsvp.html
│   └── wishes.html
└── static/                # Static assets
    ├── css/
    │   ├── leaflet.css
    │   └── tailwind.min.css
    └── js/
        ├── jquery-3.7.1.min.js
        └── leaflet.js
```

### Legacy React Files (Preserved)

The original React codebase remains in:
- `src/` - React components
- `public/` - React public assets
- `package.json` - Node dependencies
- `vite.config.ts` - Vite configuration

These files are kept for reference but are no longer active.

## Database Models

All Django models match the existing PostgreSQL schema:

### RSVP Model
```python
- id (UUID)
- guest_name (CharField)
- email (EmailField, optional)
- attending (BooleanField)
- number_of_guests (IntegerField)
- food_intolerances (TextField, optional)
- message (TextField, optional)
- created_at (DateTimeField)
- updated_at (DateTimeField)
```

### RSVPGuest Model
```python
- id (UUID)
- rsvp (ForeignKey to RSVP)
- guest_name (CharField)
- guest_order (IntegerField)
- created_at (DateTimeField)
```

### GiftRegistryItem Model
```python
- id (UUID)
- name (CharField)
- description (TextField)
- photo_url (CharField)
- website_link (URLField, optional)
- priority (IntegerField)
- is_claimed (BooleanField)
- claimed_by (CharField, optional)
- created_at (DateTimeField)
```

### Wish Model
```python
- id (UUID)
- sender_name (CharField)
- message (TextField)
- created_at (DateTimeField)
```

## jQuery Implementation

jQuery is used minimally for these dynamic features:

1. **Gift Claiming** (gifts.html):
   - AJAX POST to `/gifts/claim/`
   - Updates claim status without page reload
   - Displays loading spinner during request

2. **RSVP Dynamic Fields** (rsvp.html):
   - Adds/removes guest name fields
   - Based on number_of_guests input

3. **Map Modal** (schedule.html):
   - Opens/closes map overlay
   - Initializes Leaflet maps
   - Centers map on venue coordinates

## Styling

Tailwind CSS is loaded via CDN in base.html:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Custom styles in base template:
- Google Fonts (Lora, Inter)
- Fade-in animation keyframes
- Modal styling

Color scheme:
- Primary: Emerald green (`emerald-600`)
- Borders: `emerald-200`
- Accents: `emerald-50`, `emerald-100`

## Running the Application

### Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations (if needed)
python3 manage.py migrate

# Create admin user
python3 manage.py createsuperuser

# Start server
python3 manage.py runserver
# or
./start_django.sh
```

### Access Points

- Website: http://localhost:8000/
- Admin: http://localhost:8000/admin/

## Testing Checklist

- [x] Home page loads with couple's information
- [x] Schedule page displays with map functionality
- [x] Gift registry shows all items from database
- [x] Gift claim/unclaim works via AJAX
- [x] RSVP form accepts submissions
- [x] Multiple guests can be added to RSVP
- [x] Wishes page displays messages
- [x] Wish submission works
- [x] Admin interface accessible
- [x] Admin can manage all models
- [x] Static files (jQuery, Leaflet) load correctly
- [x] Responsive design works on mobile
- [x] All navigation links function
- [x] CSRF protection active on forms

## Migration Benefits

1. **Simplicity**: Server-side rendering is simpler than SPA architecture
2. **SEO**: Better search engine optimization with SSR
3. **Admin Tools**: Django admin provides powerful management interface
4. **Security**: Built-in CSRF, XSS, and SQL injection protection
5. **Maintenance**: Python is easier to maintain than TypeScript/React for simple sites
6. **Deployment**: Single server deployment vs separate frontend/backend

## Next Steps

To deploy to production:

1. Set environment variables for production
2. Configure `ALLOWED_HOSTS` in settings.py
3. Set `DEBUG = False`
4. Run `python manage.py collectstatic`
5. Set up Gunicorn or uWSGI for WSGI
6. Configure Nginx or Apache as reverse proxy
7. Set up SSL certificate

## Notes

- Database connection uses existing Supabase PostgreSQL
- All existing data remains intact
- No data migration required
- React files kept for reference
- Templates use CDN resources (Tailwind, Leaflet)
- jQuery minified file included locally

## Conclusion

The migration was successful. The Django application provides all the functionality of the original React app with added benefits of Django's admin interface and server-side rendering. The existing database structure was preserved, requiring no data migration.
