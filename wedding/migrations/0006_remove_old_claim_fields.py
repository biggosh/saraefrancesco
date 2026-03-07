from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wedding', '0005_migrate_existing_claims'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='giftregistryitem',
            name='is_claimed',
        ),
        migrations.RemoveField(
            model_name='giftregistryitem',
            name='claimed_by',
        ),
        migrations.RemoveField(
            model_name='giftregistryitem',
            name='sender_message',
        ),
        migrations.RemoveField(
            model_name='giftregistryitem',
            name='claimed_at',
        ),
    ]
