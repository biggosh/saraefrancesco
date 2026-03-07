from django.db import migrations


def migrate_claims_to_contributions(apps, schema_editor):
    GiftRegistryItem = apps.get_model('wedding', 'GiftRegistryItem')
    GiftContribution = apps.get_model('wedding', 'GiftContribution')

    for gift in GiftRegistryItem.objects.filter(is_claimed=True):
        if gift.claimed_by:
            GiftContribution.objects.create(
                gift=gift,
                contributor_name=gift.claimed_by,
                contributor_message=gift.sender_message or 'Auguri agli sposi!',
                contributed_at=gift.claimed_at or gift.created_at
            )


def reverse_migration(apps, schema_editor):
    # We can't reliably reverse this migration since we're moving to a multi-contributor model
    # Just clear the contributions table
    GiftContribution = apps.get_model('wedding', 'GiftContribution')
    GiftContribution.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('wedding', '0004_create_gift_contributions'),
    ]

    operations = [
        migrations.RunPython(migrate_claims_to_contributions, reverse_migration),
    ]
