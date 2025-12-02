from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction
from .models import Organization
from accounts.models import Employee


class OrganizationSerializer(serializers.ModelSerializer):
    # Read fields for GET requests
    owner_name = serializers.SerializerMethodField()
    owner_email = serializers.SerializerMethodField()

    # Write fields for POST/PATCH requests
    owner = serializers.CharField(write_only=True, required=False, help_text="Owner's full name (for create)")
    owner_name_input = serializers.CharField(write_only=True, required=False, help_text="Owner's full name (for update)")
    owner_email_input = serializers.EmailField(write_only=True, required=False, source='owner_email_temp')
    owner_password = serializers.CharField(write_only=True, required=False, min_length=8)

    class Meta:
        model = Organization
        fields = ['id', 'name', 'logo', 'owner', 'owner_name_input', 'owner_email_input', 'owner_password', 'owner_name', 'owner_email', 'active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'active', 'created_at', 'updated_at']

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

    def validate(self, attrs):
        """Ensure required fields are present for create operations"""
        if not self.instance:  # Creating new organization
            if not attrs.get('owner'):
                raise serializers.ValidationError({"owner": "This field is required for creating an organization."})
            if not attrs.get('owner_email_temp'):
                raise serializers.ValidationError({"owner_email_input": "This field is required for creating an organization."})
            if not attrs.get('owner_password'):
                raise serializers.ValidationError({"owner_password": "This field is required for creating an organization."})
        return attrs

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

    @transaction.atomic
    def update(self, instance, validated_data):
        """Update organization and optionally update owner details"""
        # Extract owner update fields if present
        owner_name = validated_data.pop('owner_name_input', None)
        owner_password = validated_data.pop('owner_password', None)
        # Remove unused fields
        validated_data.pop('owner', None)
        validated_data.pop('owner_email_temp', None)

        # Update organization fields
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        # Update owner if fields provided
        owner = instance.owner
        if owner and owner.user:
            if owner_name:
                owner.user.first_name = owner_name
            if owner_password:
                owner.user.set_password(owner_password)
            if owner_name or owner_password:
                owner.user.save()

        return instance
