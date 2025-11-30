from rest_framework import serializers
from django.contrib.auth.models import User
from organization.models import Organization
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.first_name', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    hierarchy = serializers.CharField(source='role', read_only=True)
    joined_at = serializers.DateTimeField(source='user.date_joined', read_only=True)
    updated_at = serializers.DateTimeField(source='user.date_joined', read_only=True)
    organization_name = serializers.CharField(source='organization.name', read_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'name', 'email', 'hierarchy', 'role', 'organization', 'organization_name', 'joined_at', 'updated_at']

class InviteUserSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    role = serializers.ChoiceField(choices=Employee.ROLE_CHOICES)
    organization_id = serializers.IntegerField()

    def validate_email(self, value):
        """Check if user with this email already exists"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Um usuário com este email já existe.")
        return value

    def validate_organization_id(self, value):
        """Check if organization exists and user has permission to invite to it"""
        if not Organization.objects.filter(id=value).exists():
            raise serializers.ValidationError("Organização não encontrada.")

        # Ensure user can only invite to their own organization
        request = self.context.get('request')
        if request and hasattr(request.user, 'employee_profile'):
            if request.user.employee_profile.organization.id != value:
                raise serializers.ValidationError("Você só pode convidar membros para sua própria organização.")

        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['name'],
            password='Mudar123@'
        )

        org = Organization.objects.get(id=validated_data['organization_id'])

        employee = Employee.objects.create(
            user=user,
            organization=org,
            role=validated_data['role']
        )
        return employee

class UpdateEmployeeSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=False)
    password = serializers.CharField(write_only=True, required=False, min_length=8)
    organization_id = serializers.IntegerField(required=False)

    def validate_organization_id(self, value):
        """Check if organization exists"""
        if not Organization.objects.filter(id=value).exists():
            raise serializers.ValidationError("Organização não encontrada.")
        return value

    def update(self, instance, validated_data):
        """Update employee name, password, and/or organization"""
        user = instance.user

        # Update name if provided
        if 'name' in validated_data:
            user.first_name = validated_data['name']

        # Update password if provided
        if 'password' in validated_data:
            user.set_password(validated_data['password'])

        user.save()

        # Update organization if provided
        if 'organization_id' in validated_data:
            org = Organization.objects.get(id=validated_data['organization_id'])
            instance.organization = org
            instance.save()

        return instance