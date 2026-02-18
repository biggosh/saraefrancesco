from django.contrib import admin
from .models import RSVP, RSVPGuest, GiftRegistryItem, Wish


class RSVPGuestInline(admin.TabularInline):
    model = RSVPGuest
    extra = 0
    fields = ['guest_name', 'guest_order']


@admin.register(RSVP)
class RSVPAdmin(admin.ModelAdmin):
    list_display = ['guest_name', 'email', 'attending', 'number_of_guests', 'created_at']
    list_filter = ['attending', 'created_at']
    search_fields = ['guest_name', 'email']
    readonly_fields = ['id', 'created_at', 'updated_at']
    inlines = [RSVPGuestInline]
    fieldsets = [
        ('Guest Information', {
            'fields': ['guest_name', 'email', 'attending', 'number_of_guests']
        }),
        ('Details', {
            'fields': ['food_intolerances', 'message']
        }),
        ('Metadata', {
            'fields': ['id', 'created_at', 'updated_at'],
            'classes': ['collapse']
        })
    ]


@admin.register(GiftRegistryItem)
class GiftRegistryItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'priority', 'is_claimed', 'claimed_by', 'created_at']
    list_filter = ['is_claimed', 'priority']
    search_fields = ['name', 'description', 'claimed_by']
    readonly_fields = ['id', 'created_at']
    fieldsets = [
        ('Gift Information', {
            'fields': ['name', 'description', 'photo_url', 'website_link', 'priority']
        }),
        ('Claim Status', {
            'fields': ['is_claimed', 'claimed_by']
        }),
        ('Metadata', {
            'fields': ['id', 'created_at'],
            'classes': ['collapse']
        })
    ]


@admin.register(Wish)
class WishAdmin(admin.ModelAdmin):
    list_display = ['sender_name', 'created_at', 'message_preview']
    list_filter = ['created_at']
    search_fields = ['sender_name', 'message']
    readonly_fields = ['id', 'created_at']

    def message_preview(self, obj):
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
    message_preview.short_description = 'Message Preview'
