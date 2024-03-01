from django.urls import path

from . import views

app_name = 'landing'
urlpatterns = [
    path('', views.home, name='home'),
    path('services', views.services, name='services'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),
    path('rdv', views.rdv, name='rdv'),
    path('rdv/<int:id>', views.rdv, name='rdv_selected'),
    path('categories/<int:id>', views.categories, name='categories'),
]