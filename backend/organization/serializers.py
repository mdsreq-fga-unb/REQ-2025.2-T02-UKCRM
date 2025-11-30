from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction
from .models import Organization
from accounts.models import Employee


class OrganizationSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField(read_only=True)
    owner_email = serializers.SerializerMethodField(read_only=True)

    # Owner creation fields (write-only)
    owner = serializers.CharField(write_only=True, required=True, help_text="Owner's full name")
    owner_email_input = serializers.EmailField(write_only=True, required=True, source='owner_email_temp')
    owner_password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = Organization
        fields = ['id', 'name', 'owner', 'owner_email_input', 'owner_password', 'owner_name', 'owner_email', 'active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'active', 'created_at', 'updated_at', 'owner_name', 'owner_email']

    def get_owner_name(self, obj):
        owner = obj.owner
        if owner:
            return owner.user.first_name
        return None

    def get_owner_email(self, obj):
        owner = obj.owner
        if owner:
            return owner.user.email
        return None

    def validate_owner_email_temp(self, value):
        """Validate that the owner email doesn't already exist"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    @transaction.atomic
    def create(self, validated_data):
        # Extract owner data
        owner_name = validated_data.pop('owner')
        owner_email = validated_data.pop('owner_email_temp')
        owner_password = validated_data.pop('owner_password')

        # Create organization
        organization = Organization.objects.create(**validated_data)

        # Create owner user
        owner_user = User.objects.create_user(
            username=owner_email,
            email=owner_email,
            first_name=owner_name,
            password=owner_password
        )

        # Create owner employee profile
        Employee.objects.create(
            user=owner_user,
            organization=organization,
            role='owner'
        )

        return organization
