from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wedding', '0002_giftregistryitem_photo_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='giftregistryitem',
            name='thank_you_message',
            field=models.TextField(blank=True, help_text='Custom thank you message shown to guests when claiming this gift', null=True),
        ),
        migrations.AddField(
            model_name='giftregistryitem',
            name='sender_message',
            field=models.CharField(blank=True, help_text='Message from the guest who claimed this gift', max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='giftregistryitem',
            name='claimed_at',
            field=models.DateTimeField(blank=True, help_text='When this gift was claimed', null=True),
        ),
    ]
