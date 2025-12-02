from django.contrib.auth.models import User
from rest_framework import serializers

from organization.models import Organization

from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.first_name", read_only=True)
    email = serializers.CharField(source="user.email", read_only=True)
    hierarchy = serializers.CharField(source="role", read_only=True)
    joined_at = serializers.DateTimeField(source="user.date_joined", read_only=True)
    updated_at = serializers.DateTimeField(source="user.date_joined", read_only=True)
    organization_name = serializers.SerializerMethodField()

    def get_organization_name(self, obj):
        return obj.organization.name if obj.organization else None

    class Meta:
        model = Employee
        fields = [
            "id",
            "name",
            "email",
            "hierarchy",
            "role",
            "photo",
            "organization",
            "organization_name",
            "joined_at",
            "updated_at",
        ]


class InviteUserSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    role = serializers.ChoiceField(choices=Employee.ROLE_CHOICES)
    organization_id = serializers.IntegerField()
    password = serializers.CharField(min_length=8, write_only=True)

    def validate_email(self, value):
        """Check if user with this email already exists"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Um usuário com este email já existe.")
        return value

    def validate_organization_id(self, value):
        """Check if organization exists"""
        if not Organization.objects.filter(id=value).exists():
            raise serializers.ValidationError("Organização não encontrada.")

        # Ensure user can only invite to their own organization
        request = self.context.get("request")
        if request and hasattr(request.user, "employee_profile"):
            if request.user.employee_profile.organization.id != value:
                raise serializers.ValidationError(
                    "Você só pode convidar membros para sua própria organização."
                )

        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            first_name=validated_data["name"],
            password=validated_data["password"],
        )

        org = Organization.objects.get(id=validated_data["organization_id"])

        employee = Employee.objects.create(
            user=user, organization=org, role=validated_data["role"]
        )
        return employee


class UpdateEmployeeSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255, required=False)
    password = serializers.CharField(write_only=True, required=False, min_length=8)
    photo = serializers.ImageField(required=False)

    def update(self, instance, validated_data):
        """Update employee name, password and/or photo"""
        user = instance.user

        # Update name if provided
        if "name" in validated_data:
            user.first_name = validated_data["name"]

        # Update password if provided
        if "password" in validated_data:
            user.set_password(validated_data["password"])

        user.save()

        # Update photo if provided
        if "photo" in validated_data:
            instance.photo = validated_data["photo"]
            instance.save()

        # Update organization if provided
        if "organization_id" in validated_data:
            org = Organization.objects.get(id=validated_data["organization_id"])
            instance.organization = org
            instance.save()

        return instance
