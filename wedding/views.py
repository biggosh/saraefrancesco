from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.utils import timezone
import json
from .models import GiftRegistryItem, GiftContribution, RSVP, RSVPGuest, Wish


def home(request):
    return render(request, 'home.html')


def schedule(request):
    return render(request, 'schedule.html')


def gifts(request):
    gifts = GiftRegistryItem.objects.all().order_by('-priority', 'created_at')
    return render(request, 'gifts.html', {'gifts': gifts})


@require_POST
def gift_claim(request):
    try:
        data = json.loads(request.body)
        gift_id = data.get('gift_id')
        contributor_name = data.get('sender_name', '').strip()
        contributor_message = data.get('sender_message', '').strip()

        if not contributor_name:
            return JsonResponse({
                'success': False,
                'error': 'Il nome è obbligatorio'
            }, status=400)

        if not contributor_message:
            return JsonResponse({
                'success': False,
                'error': 'Il messaggio è obbligatorio'
            }, status=400)

        if len(contributor_message) > 500:
            return JsonResponse({
                'success': False,
                'error': 'Il messaggio non può superare i 500 caratteri'
            }, status=400)

        gift = GiftRegistryItem.objects.get(id=gift_id)

        GiftContribution.objects.create(
            gift=gift,
            contributor_name=contributor_name,
            contributor_message=contributor_message,
            contributed_at=timezone.now()
        )

        return JsonResponse({'success': True})
    except GiftRegistryItem.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Regalo non trovato'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


def rsvp(request):
    if request.method == 'POST':
        guest_name = request.POST.get('guest_name')
        email = request.POST.get('email')
        attending = request.POST.get('attending') == 'true'
        number_of_guests = int(request.POST.get('number_of_guests', 1))
        food_intolerances = request.POST.get('food_intolerances')
        message = request.POST.get('message')

        rsvp_obj = RSVP.objects.create(
            guest_name=guest_name,
            email=email or None,
            attending=attending,
            number_of_guests=number_of_guests,
            food_intolerances=food_intolerances or None,
            message=message or None
        )

        for i in range(2, number_of_guests + 1):
            guest_name_key = f'guest_{i}_name'
            additional_guest_name = request.POST.get(guest_name_key)
            if additional_guest_name:
                RSVPGuest.objects.create(
                    rsvp=rsvp_obj,
                    guest_name=additional_guest_name,
                    guest_order=i
                )

        messages.success(request, 'Grazie per la tua conferma! Non vediamo l\'ora di festeggiare con te.')
        return redirect('home')

    return render(request, 'rsvp.html')


def wishes(request):
    if request.method == 'POST':
        sender_name = request.POST.get('sender_name')
        message = request.POST.get('message')

        Wish.objects.create(
            sender_name=sender_name,
            message=message
        )

        messages.success(request, 'Grazie per i tuoi meravigliosi auguri!')
        return redirect('wishes')

    wishes_list = Wish.objects.all().order_by('-created_at')
    return render(request, 'wishes.html', {'wishes': wishes_list})
