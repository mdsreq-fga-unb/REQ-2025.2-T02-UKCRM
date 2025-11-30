from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

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
        """Filter sales teams to only show those from the user's organization"""
        user = self.request.user
        if hasattr(user, 'employee_profile'):
            return SalesTeam.objects.filter(organization=user.employee_profile.organization)
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
        """Filter funnels to only show those where the user is a team member"""
        user = self.request.user
        if hasattr(user, 'employee_profile'):
            employee = user.employee_profile
            # Filter funnels that have teams where this employee is a member
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
        """Filter stages to only show those from funnels where the user is a team member"""
        user = self.request.user
        if hasattr(user, 'employee_profile'):
            employee = user.employee_profile
            # Filter stages that belong to funnels where this employee is a team member
            return Stage.objects.filter(
                funnel__teams__members=employee
            ).distinct()
        return Stage.objects.none()


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def get_queryset(self):
        """Filter leads to only show those from funnels where the user is a team member"""
        user = self.request.user
        if hasattr(user, 'employee_profile'):
            employee = user.employee_profile
            # Filter leads that belong to stages of funnels where this employee is a team member
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
