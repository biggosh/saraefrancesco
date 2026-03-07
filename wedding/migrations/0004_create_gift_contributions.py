from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('wedding', '0003_add_gift_message_fields'),
    ]

    operations = [
        migrations.CreateModel(
            name='GiftContribution',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('contributor_name', models.CharField(max_length=255)),
                ('contributor_message', models.TextField(max_length=500)),
                ('contributed_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('gift', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contributions', to='wedding.giftregistryitem')),
            ],
            options={
                'verbose_name': 'Gift Contribution',
                'verbose_name_plural': 'Gift Contributions',
                'db_table': 'gift_contributions',
                'ordering': ['-contributed_at'],
            },
        ),
    ]
