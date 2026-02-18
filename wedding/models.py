from django.db import models
from django.utils import timezone
import uuid


class RSVP(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    guest_name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    attending = models.BooleanField(default=True)
    number_of_guests = models.IntegerField(default=1)
    food_intolerances = models.TextField(blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'rsvps'
        ordering = ['-created_at']
        verbose_name = 'RSVP'
        verbose_name_plural = 'RSVPs'

    def __str__(self):
        return f"{self.guest_name} - {'Attending' if self.attending else 'Not Attending'}"


class RSVPGuest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rsvp = models.ForeignKey(RSVP, on_delete=models.CASCADE, related_name='additional_guests')
    guest_name = models.CharField(max_length=255)
    guest_order = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'rsvp_guests'
        ordering = ['guest_order']
        verbose_name = 'Additional Guest'
        verbose_name_plural = 'Additional Guests'

    def __str__(self):
        return f"{self.guest_name} (Guest {self.guest_order})"


class GiftRegistryItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    photo_url = models.CharField(max_length=500)
    website_link = models.URLField(blank=True, null=True)
    priority = models.IntegerField(default=0)
    is_claimed = models.BooleanField(default=False)
    claimed_by = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'gift_registry'
        ordering = ['-priority', 'created_at']
        verbose_name = 'Gift Registry Item'
        verbose_name_plural = 'Gift Registry Items'

    def __str__(self):
        return self.name


class Wish(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender_name = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'wishes'
        ordering = ['-created_at']
        verbose_name = 'Wish'
        verbose_name_plural = 'Wishes'

    def __str__(self):
        return f"Wish from {self.sender_name}"
