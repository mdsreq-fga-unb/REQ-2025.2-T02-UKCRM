from django.db import models


class Stage(models.Model):
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return str(self.name)


class Lead(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    stage = models.ForeignKey(Stage, related_name='leads', on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return str(self.name)
