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
        """Check if organization exists"""
        if not Organization.objects.filter(id=value).exists():
            raise serializers.ValidationError("Organização não encontrada.")
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