from django.contrib import admin
from django.urls import path, include

from . import views

app_name = 'checkin'

urlpatterns = [
    path('', views.home, name='home'),
    
    path('login/', views.login_page, name='login'),
    path('logout/', views.logout_page, name='logout'),
    
    path('events/', views.events_page, name='events'),
    
    path('events/add', views.add_event, name='add'),
    
    path('events/<str:lien>/', views.event_page, name='event'),
    path('events/api/<str:lien>/', views.event_api, name='event_api'),
    path('events/api/presence/<str:lien>/', views.presence, name='event_presence'),
]
