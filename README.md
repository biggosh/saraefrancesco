# Sara & Francesco Wedding Website

A beautiful wedding website for Sara and Francesco's special day on June 15, 2026.

## 🎉 Technology

This project has been **migrated from React to Django** with the following stack:

- **Backend Framework**: Django 6.0.2
- **Database**: PostgreSQL (Supabase)
- **Frontend**: Static HTML with Tailwind CSS
- **JavaScript**: jQuery for dynamic interactions
- **Maps**: Leaflet.js with OpenStreetMap

## 📋 Features

- **Home Page**: Couple introduction and wedding story
- **Schedule**: Wedding timeline with interactive maps for venues
- **Gift Registry**: Browsable gift list with claim functionality
- **RSVP System**: Guest confirmation with support for multiple attendees
- **Wishes Board**: Guests can leave messages for the couple
- **Admin Dashboard**: Django admin for managing all wedding data

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL database (provided via Supabase)

### Installation

1. **Install dependencies**:
```bash
pip install -r requirements.txt
```

2. **Run migrations**:
```bash
python manage.py migrate
```

3. **Create admin user**:
```bash
python manage.py createsuperuser
```

4. **Start development server**:
```bash
python manage.py runserver
```

5. **Access the site**:
- Website: http://localhost:8000/
- Admin: http://localhost:8000/admin/

## 📱 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Wedding introduction and couple's story |
| Schedule | `/schedule/` | Event timeline and venue locations |
| Gifts | `/gifts/` | Gift registry with claim functionality |
| RSVP | `/rsvp/` | Guest confirmation form |
| Wishes | `/wishes/` | Message board for wedding wishes |

## 🎨 Design

The website features:

- Emerald green color scheme
- Italian wedding theme
- Responsive design for all devices
- Professional typography with Lora and Inter fonts
- Stock photos from Pexels
- Smooth animations and transitions

## 🗄️ Database Models

- **RSVP**: Guest confirmations with dietary preferences
- **RSVPGuest**: Additional guests for parties
- **GiftRegistryItem**: Wedding gift registry
- **Wish**: Guest messages and wishes

## 🔧 Administration

Access the Django admin panel at `/admin/` to:

- View and manage RSVPs
- Add/edit/remove gift registry items
- Moderate wedding wishes
- View guest lists and statistics

## 📝 Documentation

For detailed setup and deployment instructions, see:

- `DJANGO_README.md` - Comprehensive Django documentation
- `wedding_site/settings.py` - Django settings configuration
- `wedding/models.py` - Database schema definitions

## 🎭 Legacy Code

The original React/TypeScript/Vite implementation is still present in the `src/` directory for reference but is no longer used. The active Django application is in the root directory.

## 📄 License

Private wedding website - All rights reserved

---

**Made with ❤️ for Sara & Francesco**
