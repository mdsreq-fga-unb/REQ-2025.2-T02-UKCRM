from django.contrib import admin
from .models import Employee

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'organization')
    list_filter = ('organization', 'role')
    search_fields = ('user__email', 'user__first_name')