from django.contrib import admin
from .models import Organization

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_owner_name', 'active', 'created_at')
    search_fields = ('name', 'employees__user__email')

    def get_owner_name(self, obj):
        owner = obj.owner
        if owner:
            return owner.user.get_full_name() or owner.user.username
        return '-'
    get_owner_name.short_description = 'Proprietário'