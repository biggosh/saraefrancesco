# Sara & Francesco Wedding Website - Django Version

This is the Django-based wedding website for Sara and Francesco, migrated from React to a traditional server-side rendered application.

## Technology Stack

- **Backend**: Django 6.0.2
- **Database**: PostgreSQL (via Supabase)
- **Frontend**: Static HTML templates with Tailwind CSS
- **JavaScript**: jQuery 3.7.1 for dynamic interactions
- **Maps**: Leaflet.js with OpenStreetMap

## Project Structure

```
wedding_site/           # Django project settings
wedding/                # Main wedding app
  ├── models.py        # Database models (RSVP, GiftRegistryItem, Wish, RSVPGuest)
  ├── views.py         # View functions
  ├── admin.py         # Django admin configuration
  ├── urls.py          # URL routing
  ├── templates/       # HTML templates
  │   ├── base.html
  │   ├── home.html
  │   ├── schedule.html
  │   ├── gifts.html
  │   ├── rsvp.html
  │   └── wishes.html
  └── static/          # Static files
      ├── css/
      └── js/
```

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Database

The database settings are in `wedding_site/settings.py`. Update the `SUPABASE_DB_URL` with your PostgreSQL connection string:

```python
SUPABASE_DB_URL = "postgresql://user:password@host:port/database"
```

### 3. Run Migrations

```bash
python manage.py migrate
```

### 4. Create Admin User

```bash
python manage.py createsuperuser
```

### 5. Run Development Server

```bash
python manage.py runserver
```

The site will be available at `http://localhost:8000/`

## Features

### Public Pages

1. **Home** (`/`) - Wedding introduction with couple's story
2. **Schedule** (`/schedule/`) - Wedding timeline and locations with interactive maps
3. **Gifts** (`/gifts/`) - Gift registry with claim functionality
4. **RSVP** (`/rsvp/`) - Guest confirmation form with multiple guests support
5. **Wishes** (`/wishes/`) - Guest wishes and messages

### Admin Interface

Access the Django admin at `/admin/` to manage:

- RSVPs and guest lists
- Gift registry items
- Wedding wishes
- Additional guest names

### Dynamic Features (jQuery)

- **Gift Claiming**: AJAX-based gift claim/unclaim without page reload
- **Map Modal**: Interactive Leaflet maps for venue locations
- **RSVP Form**: Dynamic addition of guest name fields based on party size
- **Form Validation**: Client-side validation for all forms

## Database Models

### RSVP
- Guest name, email, attendance status
- Number of guests and dietary restrictions
- Personal message
- Linked to additional guests via RSVPGuest

### RSVPGuest
- Additional guest names for parties larger than 1
- Foreign key to RSVP with cascade delete

### GiftRegistryItem
- Gift name, description, photo URL
- Website link for purchase
- Priority for display ordering
- Claim status and claimer name

### Wish
- Sender name and message
- Timestamp for chronological display

## Deployment

### Environment Variables

For production, set these environment variables:

- `SECRET_KEY`: Django secret key
- `DEBUG`: Set to `False`
- `ALLOWED_HOSTS`: Your domain names
- `DATABASE_URL`: PostgreSQL connection string

### Static Files

Collect static files for production:

```bash
python manage.py collectstatic
```

### WSGI Configuration

The WSGI application is defined in `wedding_site/wsgi.py` for deployment with Gunicorn, uWSGI, or similar.

## Security Features

- CSRF protection on all forms
- SQL injection prevention via Django ORM
- XSS protection in templates
- Secure password hashing for admin users
- PostgreSQL constraints and validations

## Customization

### Styling

The site uses Tailwind CSS via CDN. To customize colors, update the classes in templates:

- Primary color: `emerald-600` (green)
- Borders: `emerald-200`
- Backgrounds: Various shades

### Content

Update content directly in templates:

- Wedding date and venue: `templates/home.html`, `templates/schedule.html`
- Couple's story: `templates/home.html`
- Schedule items: `templates/schedule.html`

### Background Images

All background images are sourced from Pexels. URLs are in the template files and can be replaced with custom images.

## Maintenance

### Adding Gifts

Use the Django admin interface at `/admin/` to:

1. Log in with superuser credentials
2. Navigate to "Gift Registry Items"
3. Add new gifts with name, description, photo URL, and priority

### Viewing RSVPs

All RSVPs are accessible in the admin interface with:

- Filter by attendance status
- Search by name or email
- View additional guest names inline
- Export functionality via Django admin actions

## API Endpoints

### Gift Claim API

**POST** `/gifts/claim/`

Request body:
```json
{
  "gift_id": "uuid",
  "is_claimed": true,
  "claimed_by": "Guest Name"
}
```

Response:
```json
{
  "success": true
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Leaflet maps work on all devices

## License

Private wedding website - All rights reserved
