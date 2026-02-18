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
    list_display = ['name', 'image_thumbnail', 'priority', 'is_claimed', 'claimed_by', 'created_at']
    list_filter = ['is_claimed', 'priority']
    search_fields = ['name', 'description', 'claimed_by']
    readonly_fields = ['id', 'created_at', 'image_preview']
    fieldsets = [
        ('Gift Information', {
            'fields': ['name', 'description', 'website_link', 'priority']
        }),
        ('Image Options', {
            'fields': ['photo_image', 'photo_url', 'image_preview'],
            'description': 'Upload an image file OR provide an external image URL. If both are provided, the uploaded image will be used.'
        }),
        ('Claim Status', {
            'fields': ['is_claimed', 'claimed_by']
        }),
        ('Metadata', {
            'fields': ['id', 'created_at'],
            'classes': ['collapse']
        })
    ]

    def image_thumbnail(self, obj):
        from django.utils.html import format_html
        image_url = obj.get_image_url()
        if image_url:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />', image_url)
        return '-'
    image_thumbnail.short_description = 'Image'

    def image_preview(self, obj):
        from django.utils.html import format_html
        image_url = obj.get_image_url()
        if image_url:
            return format_html('<img src="{}" width="300" style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />', image_url)
        return 'No image uploaded or URL provided'
    image_preview.short_description = 'Current Image Preview'


@admin.register(Wish)
class WishAdmin(admin.ModelAdmin):
    list_display = ['sender_name', 'created_at', 'message_preview']
    list_filter = ['created_at']
    search_fields = ['sender_name', 'message']
    readonly_fields = ['id', 'created_at']

    def message_preview(self, obj):
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
    message_preview.short_description = 'Message Preview'
