from django.db import models
from django.contrib.auth.models import User
from organization.models import Organization 

class Employee(models.Model):
    ROLE_CHOICES = (
        ('owner', 'Proprietário'),
        ('manager', 'Gerente'),
        ('coordinator', 'Coordenador'),
        ('sdr', 'SDR'),
        ('closer', 'Closer'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee_profile')
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='employees')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, verbose_name="Nível de Hierarquia")
    
    def __str__(self):
        return f"{self.user.first_name} - {self.get_role_display()}"