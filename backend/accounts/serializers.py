from rest_framework import serializers
from django.contrib.auth.models import User
from organization.models import Organization
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.first_name', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    organization_name = serializers.CharField(source='organization.name', read_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'name', 'email', 'role', 'organization', 'organization_name']

class InviteUserSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    role = serializers.ChoiceField(choices=Employee.ROLE_CHOICES)
    organization_id = serializers.IntegerField()

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