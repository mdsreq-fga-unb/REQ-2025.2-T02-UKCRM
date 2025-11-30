from rest_framework import serializers
from .models import Organization

class OrganizationSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner_name')

    class Meta:
        model = Organization
        fields = ['id', 'name', 'owner', 'owner_name', 'owner_email', 'owner_phone', 'active', 'created_at', 'updated_at']
        extra_kwargs = {
            'owner_name': {'write_only': True, 'required': False},
            'owner_email': {'required': False},
            'owner_phone': {'required': False},
        }