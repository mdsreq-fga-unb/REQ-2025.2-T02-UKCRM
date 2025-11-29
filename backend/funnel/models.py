from django.db import models
from ordered_model.models import OrderedModel


class SalesTeam(models.Model):
    name = models.CharField(max_length=100, unique=True)
    objects = models.Manager()

    def __str__(self):
        return str(self.name)


class Funnel(models.Model):
    name = models.CharField(max_length=100)
    teams = models.ManyToManyField(SalesTeam, related_name="funnels", blank=True)
    objects = models.Manager()

    def __str__(self):
        return str(self.name)


class Stage(OrderedModel):
    name = models.CharField(max_length=100)
    funnel = models.ForeignKey(Funnel, related_name="stages", on_delete=models.CASCADE)

    order_with_respect_to = "funnel"

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return str(self.name)


class Lead(OrderedModel):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True, default="")
    earning = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    stage = models.ForeignKey(Stage, related_name="leads", on_delete=models.CASCADE)

    class TemperatureChoices(models.TextChoices):
        QUENTE = "Quente", "Quente"
        MORNO = "Morno", "Morno"
        FRIO = "Frio", "Frio"
        NEUTRO = "Neutro", "Neutro"

    temperature = models.CharField(
        max_length=10,
        choices=TemperatureChoices.choices,
        default=TemperatureChoices.NEUTRO,
    )

    order_with_respect_to = "stage"

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return str(self.name)
