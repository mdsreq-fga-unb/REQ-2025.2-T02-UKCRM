from ordered_model.serializers import OrderedModelSerializer
from rest_framework import serializers

from .models import Funnel, Lead, SalesTeam, Stage
from accounts.models import Employee


class CustomEmployeePrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    """Custom field to provide better error messages for employee validation"""

    def __init__(self, *args, **kwargs):
        self.user_organization = kwargs.pop('user_organization', None)
        super().__init__(*args, **kwargs)

    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except serializers.ValidationError as e:
            # Check if the employee exists in another organization
            if self.user_organization and 'does_not_exist' in str(e.detail):
                try:
                    employee = Employee.objects.get(pk=data)
                    if employee.organization != self.user_organization:
                        self.fail('incorrect_organization', pk_value=data)
                except Employee.DoesNotExist:
                    pass
            raise

    default_error_messages = {
        'required': 'Este campo é obrigatório.',
        'does_not_exist': 'Funcionário com ID {pk_value} não encontrado.',
        'incorrect_type': 'Tipo incorreto. Esperado pk, recebido {data_type}.',
        'incorrect_organization': 'O funcionário com ID {pk_value} pertence a outra organização. Você só pode adicionar membros da sua própria organização ao time.',
    }


class SalesTeamSerializer(serializers.ModelSerializer):
    member_count = serializers.SerializerMethodField()
    organization_name = serializers.CharField(source='organization.name', read_only=True)
    member_ids = CustomEmployeePrimaryKeyRelatedField(
        queryset=Employee.objects.none(),  # Will be overridden in __init__
        many=True,
        write_only=True,
        source='members',
        required=False
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Filter member_ids queryset to only include employees from the user's organization
        request = self.context.get('request')
        if request:
            if hasattr(request.user, 'employee_profile'):
                # Regular employee - filter to their organization
                organization = request.user.employee_profile.organization
                queryset = Employee.objects.filter(organization=organization)

                # When many=True, DRF wraps the field in ManyRelatedField
                # We need to update both the parent and child_relation
                self.fields['member_ids'].queryset = queryset
                if hasattr(self.fields['member_ids'], 'child_relation'):
                    self.fields['member_ids'].child_relation.queryset = queryset
                    self.fields['member_ids'].child_relation.user_organization = organization
            elif request.user.is_staff:
                # Admin user - allow all employees
                queryset = Employee.objects.all()
                self.fields['member_ids'].queryset = queryset
                if hasattr(self.fields['member_ids'], 'child_relation'):
                    self.fields['member_ids'].child_relation.queryset = queryset
            else:
                # No employee profile and not admin - keep empty queryset
                self.fields['member_ids'].queryset = Employee.objects.none()
                if hasattr(self.fields['member_ids'], 'child_relation'):
                    self.fields['member_ids'].child_relation.queryset = Employee.objects.none()

    class Meta:
        model = SalesTeam
        fields = ['id', 'name', 'organization', 'organization_name', 'members', 'member_ids', 'member_count', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'members', 'organization_name']
        extra_kwargs = {
            'organization': {'required': False}  # Make organization optional since it's auto-populated
        }

    def get_member_count(self, obj):
        return obj.members.count()

    def validate(self, data):
        """Validate that all team members belong to the same organization as the team"""
        organization = data.get('organization')
        members = data.get('members', [])

        if organization and members:
            # Check if any member belongs to a different organization
            invalid_members = [
                member for member in members
                if member.organization.id != organization.id
            ]

            if invalid_members:
                invalid_emails = [m.user.email for m in invalid_members]
                raise serializers.ValidationError({
                    'member_ids': f'The following members do not belong to the selected organization: {", ".join(invalid_emails)}'
                })

        return data

    def update(self, instance, validated_data):
        """Ensure cross-organization validation during updates"""
        members = validated_data.get('members')

        if members is not None and instance.organization:
            # Check if any member belongs to a different organization
            invalid_members = [
                member for member in members
                if member.organization.id != instance.organization.id
            ]

            if invalid_members:
                invalid_emails = [m.user.email for m in invalid_members]
                raise serializers.ValidationError({
                    'member_ids': f'The following members do not belong to this team\'s organization: {", ".join(invalid_emails)}'
                })

        return super().update(instance, validated_data)


class LeadSerializer(OrderedModelSerializer, serializers.ModelSerializer):
    contactOrigin = serializers.ChoiceField(
        choices=Lead.ContactOriginChoices.choices,
        source="contact_origin",
        required=False,
    )
    account_name = serializers.CharField(source='account.user.first_name', read_only=True)
    account_email = serializers.CharField(source='account.user.email', read_only=True)

    class Meta:
        model = Lead
        fields = "__all__"


class StageSerializer(OrderedModelSerializer, serializers.ModelSerializer):
    leads = LeadSerializer(many=True, read_only=True)

    class Meta:
        model = Stage
        fields = "__all__"
        read_only_fields = ['order']


class FunnelSerializer(serializers.ModelSerializer):
    stages = StageSerializer(many=True, read_only=True)
    teams = SalesTeamSerializer(many=True, read_only=True)

    team_ids = serializers.PrimaryKeyRelatedField(
        queryset=SalesTeam.objects.none(),  # Will be overridden in __init__
        many=True,
        write_only=True,
        source="teams",
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Filter team_ids queryset to only include teams from the user's organization
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            if hasattr(request.user, 'employee_profile'):
                # Regular employee - filter to their organization
                organization = request.user.employee_profile.organization
                queryset = SalesTeam.objects.filter(organization=organization)
                self.fields['team_ids'].queryset = queryset
                # Update child_relation for ManyRelatedField
                if hasattr(self.fields['team_ids'], 'child_relation'):
                    self.fields['team_ids'].child_relation.queryset = queryset
            elif request.user.is_staff:
                # Admin user - allow all teams
                queryset = SalesTeam.objects.all()
                self.fields['team_ids'].queryset = queryset
                if hasattr(self.fields['team_ids'], 'child_relation'):
                    self.fields['team_ids'].child_relation.queryset = queryset
            else:
                # No employee profile and not admin - keep empty queryset
                queryset = SalesTeam.objects.none()
                self.fields['team_ids'].queryset = queryset
                if hasattr(self.fields['team_ids'], 'child_relation'):
                    self.fields['team_ids'].child_relation.queryset = queryset

    def to_representation(self, instance):
        """Filter stages based on user role and visibility permissions"""
        representation = super().to_representation(instance)
        request = self.context.get('request')

        if request and hasattr(request.user, 'employee_profile'):
            employee = request.user.employee_profile

            # Filter stages based on role
            if employee.role == 'sdr':
                # SDRs only see stages visible to them
                representation['stages'] = [
                    stage for stage in representation['stages']
                    if stage.get('visible_to_sdr', True)
                ]
            elif employee.role == 'closer':
                # Closers only see stages visible to them
                representation['stages'] = [
                    stage for stage in representation['stages']
                    if stage.get('visible_to_closer', True)
                ]
            # Owners, managers, and coordinators see all stages (no filtering needed)

        return representation

    class Meta:
        model = Funnel
        fields = "__all__"
