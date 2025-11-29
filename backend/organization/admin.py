from django.contrib import admin
from .models import Organization

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner_name', 'active', 'created_at')
    search_fields = ('name', 'owner_email')