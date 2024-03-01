from django.shortcuts import render
from .models import *

from django.http import JsonResponse

from datetime import datetime
from zoneinfo import ZoneInfo




# Create your views here.
def home(request):
    # ---------------get the person----------
    about = About.objects.all().order_by('order')
    about = about[0]
    
    # ------------Carousel--------------
    carousel = HomeCarousel.objects.all().order_by('order')[:3]
    for element in carousel:
        element.image = 'img/' + element.image
    
    # ---------categories--------------
    categories_all = Categorie.objects.all().order_by('order_on_home')
    for categorie in categories_all:
        categorie.service = categorie.services.all()
        categorie.image = 'img/' + categorie.image
        categorie.background_image = 'img/' + categorie.background_image
        
    # divide into 2
    length = len(categories_all)
    len1 = round(length / 2)
    
    class categorie_class():
        def __init__(self):
            self.categories = []
            self.length = 0
            
        def __str__(self):
            return (f'categories : {self.categories}, \nlength : {self.length}')
    
    # left
    left = categorie_class()
    
    for i in range(len1):
        left.categories.append(categories_all[i])
        left.categories[i].order = i + 1
        
    left.length = len(left.categories)
    
    
    # right
    right = categorie_class()
    
    for i in range(len1, length):
        j = i - len1
        right.categories.append(categories_all[i])
        right.categories[j].order = j + 1
        
    right.length = len(right.categories)
    
    
    
    # ------------testimonials-----------
    testimonials = Temoignage.objects.all().order_by('order')[:3]
    
    # -----------end------------
    return render(request, 'landing/home.html', {
        'carousel' : carousel,
        'left': left,
        'right': right,
        'testimonials' : testimonials,
        'about' : about,
        'home' : True
    })


def categories(request, id):
    # get the person
    about = About.objects.all().order_by('order')
    about = about[0]
    
    # categories
    categorie = Categorie.objects.get(id=id)
    categorie.image = 'img/' + categorie.image
    categorie.service = categorie.services.all()
    
    return render(request, 'landing/categories.html', {
        'about' : about,
        "categorie" : categorie
    })


def services(request):
    # get the person
    about = About.objects.all().order_by('order')
    about = about[0]
    
    # maquillage
    categories_maquillage = Categorie.objects.exclude(nom="Atelier auto-maquillage").all()
    for categorie in categories_maquillage:
        categorie.service = categorie.services.all()
    
    # atelier
    categories_atelier = Categorie.objects.get(nom="Atelier auto-maquillage")
    categories_atelier.service = categories_atelier.services.all()
    
    return render(request, 'landing/services.html', {
        "categories_maquillage" : categories_maquillage,
        "categories_atelier" : categories_atelier,
        'about' : about
    })


def about(request):
    # get the person
    about = About.objects.all().order_by('order')
    about = about[0]
    
    about.para = about.paragraphes.all().order_by('order')
    about.pourquoi_para = about.pourquoi_paragraphes.all().order_by('order')
    
    about.image = 'img/' + about.image
    about.pourquoi_moi_image = 'img/' + about.pourquoi_moi_image
    
    
    return render(request, 'landing/about.html', {
        "about" : about
    })


def contact(request):
    # get to page
    if request.method == 'GET':
        # get the person
        about = About.objects.all().order_by('order')
        about = about[0]
        
        return render(request, "landing/contact.html", {
            'about' : about
        })
    
    # submit form
    if request.method == 'POST':
        # get data
        nom = request.POST.get('nom')
        email = request.POST.get('email')
        
        sujet = request.POST.get('sujet')
        message = request.POST.get('message')
        
        date_heure_envoi = datetime.now(tz=ZoneInfo("Europe/Paris")).strftime("%d/%m/%Y - %H:%M:%S")
        
        # add to db
        added = Contact(nom=nom, email=email, sujet=sujet, message=message, date_heure_envoi=date_heure_envoi)
        added.save()
        
        # end
        return JsonResponse({
            "status" : "OK"
        })


def rdv(request, id=None):
    # get to page
    if request.method == 'GET':
        # get the person
        about = About.objects.all().order_by('order')
        about = about[0]
        
        # get categories
        categories = Categorie.objects.all()
        for categorie in categories:
            categorie.service = categorie.services.all()
            
        # select with id
        selected = None
        if id:
            selected = Service.objects.get(id=id)
        
        return render(request, "landing/rdv.html", {
            "categories" : categories,
            "selected" : selected,
            'about' : about
        })
    
    # submit form
    if request.method == 'POST':
        # get data
        nom = request.POST.get('nom')
        prenom = request.POST.get('prenom')
        
        email = request.POST.get('email')
        numero = request.POST.get('numero')
        
        date_rdv = request.POST.get('date_rdv')
        service = request.POST.get('service')
        
        message = request.POST.get('message')
        if not message:
            message = ''
            
        date_heure_envoi = datetime.now(tz=ZoneInfo("Europe/Paris")).strftime("%d/%m/%Y - %H:%M:%S")
        
        # add to db
        added = Rendez_vous(nom=nom, prenom=prenom, email=email, numero=numero, date_rdv=date_rdv, service=service,
                            message=message, date_heure_envoi=date_heure_envoi)
        added.save()
        
        # end
        return JsonResponse({
            "status" : "OK"
        })