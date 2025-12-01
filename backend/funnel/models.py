from django.db import models
from django.utils import timezone
from ordered_model.models import OrderedModel


class SalesTeam(models.Model):
    name = models.CharField(max_length=100, unique=True)
    organization = models.ForeignKey(
        'organization.Organization',
        on_delete=models.CASCADE,
        related_name='sales_teams',
        null=True,
        blank=True
    )
    members = models.ManyToManyField('accounts.Employee', related_name='sales_teams', blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
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
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True, default="")
    earning = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    stage = models.ForeignKey(Stage, related_name="leads", on_delete=models.CASCADE)
    account = models.ForeignKey(
        'accounts.Employee',
        on_delete=models.SET_NULL,
        related_name='leads',
        null=True,
        blank=True,
        verbose_name="Responsável"
    )

    # New fields
    cpf = models.CharField(max_length=14, null=True, blank=True)
    career = models.CharField(max_length=100, null=True, blank=True)
    income = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    interests = models.JSONField(default=list, blank=True)

    class CampaignChoices(models.TextChoices):
        SUMMER_SALE_2025 = "Summer Sale 2025", "Summer Sale 2025"
        BLACK_FRIDAY_2024 = "Black Friday 2024", "Black Friday 2024"
        PRODUCT_LAUNCH = "Product Launch", "Product Launch"
        RETARGETING = "Retargeting", "Retargeting"
        LINKEDIN_ADS = "LinkedIn Ads", "LinkedIn Ads"
        GOOGLE_ADS = "Google Ads", "Google Ads"
        ORGANIC = "Organic", "Organic"
        NONE = "None", "None"

    campaign = models.CharField(
        max_length=50,
        choices=CampaignChoices.choices,
        default=CampaignChoices.NONE,
    )

    class ContactOriginChoices(models.TextChoices):
        WEBSITE = "Website", "Website"
        SOCIAL_MEDIA = "Social Media", "Social Media"
        REFERRAL = "Referral", "Referral"
        COLD_CALL = "Cold Call", "Cold Call"
        EMAIL_CAMPAIGN = "Email Campaign", "Email Campaign"
        EVENT = "Event", "Event"
        OTHER = "Other", "Other"

    contact_origin = models.CharField(
        max_length=50,
        choices=ContactOriginChoices.choices,
        default=ContactOriginChoices.OTHER,
    )

    content = models.TextField(blank=True, default="")

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

    class StatusChoices(models.TextChoices):
        ACTIVE = "Active", "Active"
        GAINED = "Gained", "Gained"
        LOST = "Lost", "Lost"

    status = models.CharField(
        max_length=10,
        choices=StatusChoices.choices,
        default=StatusChoices.ACTIVE,
    )

    gain_loss_value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )

    gain_loss_reason = models.TextField(
        blank=True,
        default="",
    )

    order_with_respect_to = "stage"

    class Meta(OrderedModel.Meta):
        pass

    def __str__(self):
        return str(self.name)
