from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from .models import Funnel, Lead, SalesTeam, Stage
from .serializers import (
    FunnelSerializer,
    LeadSerializer,
    SalesTeamSerializer,
    StageSerializer,
)


class SalesTeamViewSet(viewsets.ModelViewSet):
    queryset = SalesTeam.objects.all()
    serializer_class = SalesTeamSerializer

    def get_queryset(self):
        """Filter sales teams based on user role"""
        user = self.request.user
        if hasattr(user, 'employee_profile'):
            employee = user.employee_profile
            # Owners and managers can see all teams from their organization
            if employee.role in ['owner', 'manager']:
                return SalesTeam.objects.filter(organization=employee.organization)
            # Other roles can only see teams they're members of
            else:
                return SalesTeam.objects.filter(members=employee)
        return SalesTeam.objects.none()

    def create(self, request, *args, **kwargs):
        print(f"Creating team with data: {request.data}", flush=True)

        # Auto-populate organization from user's profile
        data = request.data.copy()
        if 'organization' not in data:
            if hasattr(request.user, 'employee_profile'):
                data['organization'] = request.user.employee_profile.organization.id
            elif request.user.is_staff:
                # Admin users must specify organization explicitly
                pass  # Let validation handle the missing field

        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(f"Validation error: {e}", flush=True)
            print(f"Serializer errors: {serializer.errors}", flush=True)
            raise

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        print(f"Updating team with data: {request.data}", flush=True)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class FunnelViewSet(viewsets.ModelViewSet):
    queryset = Funnel.objects.prefetch_related("teams", "stages__leads").all()
    serializer_class = FunnelSerializer

    def get_queryset(self):
        """Filter funnels based on user role"""
        user = self.request.user
        if hasattr(user, 'employee_profile'):
            employee = user.employee_profile
            # Owners and managers can see all funnels from their organization
            if employee.role in ['owner', 'manager']:
                return Funnel.objects.filter(
                    teams__organization=employee.organization
                ).prefetch_related("teams", "stages__leads").distinct()
            # Other roles can only see funnels where they're a team member
            else:
                return Funnel.objects.filter(
                    teams__members=employee
                ).prefetch_related("teams", "stages__leads").distinct()
        return Funnel.objects.none()

    def create(self, request, *args, **kwargs):
        print(f"Creating funnel with data: {request.data}", flush=True)

        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(f"Validation error: {e}", flush=True)
            print(f"Serializer errors: {serializer.errors}", flush=True)
            raise

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class StageViewSet(viewsets.ModelViewSet):
    queryset = Stage.objects.all()
    serializer_class = StageSerializer

    def get_queryset(self):
        """Filter stages based on user role"""
        user = self.request.user
        if hasattr(user, 'employee_profile'):
            employee = user.employee_profile
            # Owners and managers can see all stages from their organization
            if employee.role in ['owner', 'manager']:
                return Stage.objects.filter(
                    funnel__teams__organization=employee.organization
                ).distinct()
            # Other roles can only see stages where they're a team member
            else:
                return Stage.objects.filter(
                    funnel__teams__members=employee
                ).distinct()
        return Stage.objects.none()


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def get_queryset(self):
        """Filter leads based on user role"""
        user = self.request.user
        if hasattr(user, 'employee_profile'):
            employee = user.employee_profile
            # Owners and managers can see all leads from their organization
            if employee.role in ['owner', 'manager']:
                return Lead.objects.filter(
                    stage__funnel__teams__organization=employee.organization
                ).distinct()
            # Other roles can only see leads where they're a team member
            else:
                return Lead.objects.filter(
                    stage__funnel__teams__members=employee
                ).distinct()
        return Lead.objects.none()

    def create(self, request, *args, **kwargs):
        # Automatically set the account to the current user's employee profile
        data = request.data.copy()
        if hasattr(request.user, 'employee_profile') and 'account' not in data:
            data['account'] = request.user.employee_profile.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['post'], url_path='mark_gain_loss')
    def mark_gain_loss(self, request, pk=None):
        """Mark a lead as gained or lost"""
        lead = self.get_object()

        # Validate required fields
        lead_status = request.data.get('status')
        gain_loss_value = request.data.get('gain_loss_value')
        gain_loss_reason = request.data.get('gain_loss_reason', '')

        if not lead_status:
            return Response(
                {'error': 'Status is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if lead_status not in ['Gained', 'Lost']:
            return Response(
                {'error': 'Status must be either "Gained" or "Lost"'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if gain_loss_value is None:
            return Response(
                {'error': 'gain_loss_value is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update the lead
        lead.status = lead_status
        lead.gain_loss_value = gain_loss_value
        lead.gain_loss_reason = gain_loss_reason
        lead.save()

        serializer = self.get_serializer(lead)
        return Response(serializer.data)
