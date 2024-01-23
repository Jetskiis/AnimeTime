from django.db import models
from django.urls import reverse
from django.contrib.auth.models import AbstractBaseUser

class User(AbstractBaseUser):
    email = models.EmailField(unique = True)
    username = models.CharField(unique = True)
    password = models.CharField(max_length=128)
    
    def get_absolute_url(self):
        return reverse('model-detail-view', args=[str(self.id)])

    def __str__(self):
        return self.username
    
