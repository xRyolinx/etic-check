from django.contrib import admin
from .models import *


# temoignagnes
class Temoignage_Admin(admin.ModelAdmin):
    list_display = ["nom", "order"]
    ordering = ['order']
    
    
# categories
class ServiceInlineAdmin(admin.TabularInline):
    model = Service
    
class CategorieAdmin(admin.ModelAdmin):
    list_display = ['nom', 'order_on_home']
    ordering = ['order_on_home']
    inlines = [ServiceInlineAdmin]
    
    
# About
class About_Paragraphes_InlineAdmin(admin.TabularInline):
    model = About_Paragraphes
    
class Pourquoi_Paragraphes_InlineAdmin(admin.TabularInline):
    model = Pourquoi_moi_Paragraphes
    
class AboutAdmin(admin.ModelAdmin):
    list_display = ['nom', 'order']
    ordering = ['order']
    inlines = [About_Paragraphes_InlineAdmin, Pourquoi_Paragraphes_InlineAdmin]
    
    
# home
class Home_Admin(admin.ModelAdmin):
    list_display = ["text", "image", "order"]
    ordering = ['order']

    
# contact
class Contact_Admin(admin.ModelAdmin):
    list_display = ["nom", "sujet", "message"]
    
    
# rendez-vous 
class Rendez_vous_Admin(admin.ModelAdmin):
    list_display = ["nom", "service", "date_rdv"]
    
    
    
admin.site.register(Temoignage, Temoignage_Admin)

admin.site.register(Categorie, CategorieAdmin)  
admin.site.register(About, AboutAdmin)  
  
admin.site.register(Contact, Contact_Admin)    
admin.site.register(Rendez_vous, Rendez_vous_Admin)    

admin.site.register(HomeCarousel, Home_Admin)    