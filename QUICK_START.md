# Quick Start Guide

## For Developers

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set Up Database
The database is already configured to use PostgreSQL via Supabase. The connection string is in `wedding_site/settings.py`.

### 3. Run Migrations
```bash
python3 manage.py migrate
```

### 4. Create Admin Account
```bash
python3 manage.py createsuperuser
```
Follow the prompts to create your admin username and password.

### 5. Start the Server
```bash
python3 manage.py runserver
```
Or use the convenient startup script:
```bash
./start_django.sh
```

### 6. Access the Site
- **Public Website**: http://localhost:8000/
- **Admin Panel**: http://localhost:8000/admin/

## Common Tasks

### Add Gift Registry Items
1. Go to http://localhost:8000/admin/
2. Log in with your superuser credentials
3. Click "Gift Registry Items"
4. Click "Add Gift Registry Item"
5. Fill in the details and save

### View RSVPs
1. Go to http://localhost:8000/admin/
2. Click "RSVPs"
3. View all guest confirmations

### Manage Wishes
1. Go to http://localhost:8000/admin/
2. Click "Wishes"
3. View all guest wishes

## File Locations

| What | Where |
|------|-------|
| Settings | `wedding_site/settings.py` |
| Database Models | `wedding/models.py` |
| Views (Logic) | `wedding/views.py` |
| URL Routes | `wedding/urls.py` |
| Templates | `wedding/templates/` |
| Static Files | `wedding/static/` |
| Admin Config | `wedding/admin.py` |

## Customization

### Change Wedding Date/Location
Edit `wedding/templates/home.html` and `wedding/templates/schedule.html`

### Update Couple's Story
Edit `wedding/templates/home.html`

### Modify Colors
Search and replace color classes in templates:
- `emerald-600` → your primary color
- `emerald-200` → your border color
- `emerald-50` → your background color

### Add New Pages
1. Create template in `wedding/templates/`
2. Add view function in `wedding/views.py`
3. Add URL pattern in `wedding/urls.py`

## Troubleshooting

### Database Connection Error
Check the `SUPABASE_DB_URL` in `wedding_site/settings.py`

### Static Files Not Loading
Run:
```bash
python3 manage.py collectstatic
```

### Admin CSS Not Showing
Make sure `DEBUG = True` in `wedding_site/settings.py` for development

### Port Already in Use
Run on a different port:
```bash
python3 manage.py runserver 8080
```

## Production Deployment

### Before Deploying

1. Set `DEBUG = False` in settings
2. Configure `ALLOWED_HOSTS`
3. Set environment variables for secrets
4. Run `python3 manage.py collectstatic`
5. Set up proper WSGI server (Gunicorn, uWSGI)
6. Configure reverse proxy (Nginx, Apache)
7. Enable HTTPS/SSL

### Security Checklist

- [ ] `DEBUG = False`
- [ ] `SECRET_KEY` from environment variable
- [ ] `ALLOWED_HOSTS` configured
- [ ] HTTPS enabled
- [ ] Static files served properly
- [ ] Database backups configured
- [ ] Admin account with strong password

## Support

For detailed documentation, see:
- `DJANGO_README.md` - Full Django documentation
- `MIGRATION_SUMMARY.md` - Migration details
- `README.md` - Project overview

## URLs Reference

| Page | URL | Template |
|------|-----|----------|
| Home | `/` | `home.html` |
| Schedule | `/schedule/` | `schedule.html` |
| Gifts | `/gifts/` | `gifts.html` |
| RSVP | `/rsvp/` | `rsvp.html` |
| Wishes | `/wishes/` | `wishes.html` |
| Admin | `/admin/` | Django Admin |
| Gift Claim API | `/gifts/claim/` | JSON API |
