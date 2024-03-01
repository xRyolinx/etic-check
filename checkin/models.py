from django.db import models

# temoignages
class Temoignage(models.Model):
    nom = models.CharField(max_length=64)
    message = models.TextField()
    order = models.IntegerField(unique=True)
    

# categories
class Categorie(models.Model):
    nom = models.CharField(max_length=64)
    image = models.CharField(max_length=64)
    background_image = models.CharField(max_length=64)
    description = models.TextField()
    
    order_on_home = models.IntegerField(unique=True)
    
    def __str__(self):
        return f"{self.nom}"
    
    
# services
class Service(models.Model):
    categorie = models.ForeignKey(Categorie, on_delete = models.CASCADE, related_name="services")
    nom = models.CharField(max_length=64)
    prix = models.CharField(max_length=64)
    description = models.CharField(max_length=128, blank=True)
    
    def __str__(self):
        return f"{self.nom} - {self.prix}"
    
    
# contact
class Contact(models.Model):
    nom = models.CharField(max_length=64)
    email = models.CharField(max_length=64)
    
    sujet = models.CharField(max_length=64)
    message = models.TextField()
    
    date_heure_envoi = models.CharField(max_length=64)
    
    
# rendez-vous
class Rendez_vous(models.Model):
    nom = models.CharField(max_length=64)
    prenom = models.CharField(max_length=64)
    
    email = models.CharField(max_length=64, blank=True)
    numero = models.CharField(max_length=64)
    
    service = models.CharField(max_length=64)
    date_rdv = models.CharField(max_length=64)
    
    message = models.TextField(blank=True)
    date_heure_envoi = models.CharField(max_length=64)
    
    def __str__(self):
        return f"{self.prenom} : {self.service}"
    
    

# about
class About(models.Model):
    nom = models.CharField(max_length=64)
    
    numero = models.CharField(max_length=64)
    email = models.CharField(max_length=64)
    
    nom_insta = models.CharField(max_length=64)
    lien_insta = models.CharField(max_length=64)
    
    nom_facebook = models.CharField(max_length=64)
    lien_facebook = models.CharField(max_length=64)
    
    nom_tiktok = models.CharField(max_length=64)
    lien_tiktok = models.CharField(max_length=64)

    image = models.CharField(max_length=64)
    
    pourquoi_moi_image = models.CharField(max_length=64)
    
    quote = models.TextField()
    
    order = models.IntegerField(unique=True)
    
class About_Paragraphes(models.Model):
    paragraphe = models.TextField()
    order = models.IntegerField(unique=True)
    about = models.ForeignKey(About, on_delete = models.CASCADE, related_name="paragraphes")
    
class Pourquoi_moi_Paragraphes(models.Model):
    paragraphe = models.TextField()
    order = models.IntegerField(unique=True)
    about = models.ForeignKey(About, on_delete = models.CASCADE, related_name="pourquoi_paragraphes")
    
    
class HomeCarousel(models.Model):
    text = models.CharField(max_length=64)
    image = models.CharField(max_length=64)
    order = models.IntegerField(unique=True)