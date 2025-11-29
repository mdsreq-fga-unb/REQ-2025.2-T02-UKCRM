# backend/crm/models.py
from django.db import models

class Organization(models.Model):
    
    name = models.CharField(max_length=255, verbose_name="Nome da Organização")
    
    owner_name = models.CharField(max_length=255, verbose_name="Nome do Proprietário")
    owner_email = models.EmailField(verbose_name="E-mail do Proprietário")
    owner_phone = models.CharField(max_length=20, verbose_name="Telefone do Proprietário")

    active = models.BooleanField(default=True, verbose_name="Ativo")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name