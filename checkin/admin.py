from django.contrib import admin
from .models import *
# Register your models here.

class ParticipanInlineAdmin(admin.TabularInline):
    model = Participant
    
    
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['nom',]
    inlines = [ParticipanInlineAdmin,]
    
    
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username',]