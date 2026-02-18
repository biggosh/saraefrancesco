# Database Setup Guide

## Current Configuration

The Django application is configured to connect to the existing Supabase PostgreSQL database. The connection details are in `wedding_site/settings.py`.

## Connection String Format

```python
SUPABASE_DB_URL = "postgresql://username:password@host:port/database"
```

Current configuration:
```python
SUPABASE_DB_URL = "postgresql://postgres.sbszqcgomlxyujcchlzv:Sara2026Wedding!@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

## Database Tables

The Django models map to these existing PostgreSQL tables:

### rsvps
- Stores guest RSVP responses
- Created by migration: `20260126220548_create_wedding_tables.sql`

### rsvp_guests
- Stores additional guest names for parties > 1
- Created by migration: `20260212192916_create_rsvp_guests_table.sql`

### gift_registry
- Stores wedding gift items
- Created by migration: `20260126220548_create_wedding_tables.sql`

### wishes
- Stores guest wishes/messages
- Created by migration: `20260212183552_create_wishes_table.sql`

## Running Migrations

Django will detect that tables already exist and won't recreate them:

```bash
python3 manage.py migrate
```

This command:
1. Creates Django's internal tables (auth, sessions, admin, etc.)
2. Recognizes existing wedding tables
3. Sets up migration tracking

## Verifying Connection

Test the database connection:

```bash
python3 manage.py dbshell
```

This opens a PostgreSQL shell connected to your database.

Or check with Django:

```bash
python3 manage.py check --database default
```

## Alternative: Local PostgreSQL

To use a local PostgreSQL database instead:

1. Install PostgreSQL locally
2. Create a database:
   ```sql
   CREATE DATABASE wedding_db;
   ```

3. Update `wedding_site/settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'wedding_db',
           'USER': 'your_username',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

4. Run migrations to create all tables:
   ```bash
   python3 manage.py migrate
   ```

5. Load sample data from Supabase if needed

## Environment Variables (Production)

For production, use environment variables:

```python
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}
```

Set environment variables:
```bash
export DB_NAME=wedding_db
export DB_USER=your_user
export DB_PASSWORD=your_password
export DB_HOST=localhost
export DB_PORT=5432
```

## Troubleshooting

### Connection Refused
- Check host and port are correct
- Verify PostgreSQL is running
- Check firewall settings

### Authentication Failed
- Verify username and password
- Check user has database permissions

### Database Does Not Exist
- Create the database in PostgreSQL first
- Or use Django to create tables with `migrate`

### SSL Required Error
Add to DATABASES config:
```python
'OPTIONS': {
    'sslmode': 'require',
}
```

## Data Management

### Backup Database
```bash
python3 manage.py dumpdata wedding > backup.json
```

### Restore Data
```bash
python3 manage.py loaddata backup.json
```

### Export Specific Model
```bash
python3 manage.py dumpdata wedding.GiftRegistryItem > gifts.json
```

## Admin Interface

Once connected, use Django admin to manage data:

1. Create superuser:
   ```bash
   python3 manage.py createsuperuser
   ```

2. Access admin:
   http://localhost:8000/admin/

3. Manage all database records through the web interface

## Sample Data

The original migration included sample gift items. To add more via Django shell:

```bash
python3 manage.py shell
```

```python
from wedding.models import GiftRegistryItem

GiftRegistryItem.objects.create(
    name='Espresso Machine',
    description='High-quality espresso machine',
    photo_url='https://example.com/image.jpg',
    priority=3
)
```

## Connection Pooling

For production with high traffic, consider connection pooling:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        # ... other settings ...
        'OPTIONS': {
            'pool': True,
            'pool_size': 10,
        }
    }
}
```

Requires: `pip install psycopg2-pool`
