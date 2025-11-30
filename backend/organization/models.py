# backend/crm/models.py
from django.db import models

class Organization(models.Model):

    name = models.CharField(max_length=255, verbose_name="Nome da Organização")

    active = models.BooleanField(default=True, verbose_name="Ativo")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def owner(self):
        """Returns the owner employee of this organization"""
        return self.employees.filter(role='owner').first()