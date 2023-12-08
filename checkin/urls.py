from django.contrib import admin
from django.urls import path, include

from . import views

app_name = 'checkin'

urlpatterns = [
    path('events/<str:name>', views.event_page, name='event'),
    path('events/api/<str:lien>', views.event_api, name='event_api'),
    path('events/api/presence/<str:lien>', views.presence, name='event_presence'),
]
