from django.db import models

# Create your models here.
class Event(models.Model):
    nom = models.CharField(max_length=64, unique=True)
    lien = models.CharField(max_length=64, unique=True)
    couleur_principale = models.CharField(max_length=64)
    couleur_secondaire = models.CharField(max_length=64)
    
class Participant(models.Model):
    nom = models.CharField(max_length=64)
    prenom = models.CharField(max_length=64)
    present = models.BooleanField(default=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='participants')