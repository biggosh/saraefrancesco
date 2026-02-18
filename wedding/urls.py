from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('schedule/', views.schedule, name='schedule'),
    path('gifts/', views.gifts, name='gifts'),
    path('gifts/claim/', views.gift_claim, name='gift_claim'),
    path('rsvp/', views.rsvp, name='rsvp'),
    path('wishes/', views.wishes, name='wishes'),
]
