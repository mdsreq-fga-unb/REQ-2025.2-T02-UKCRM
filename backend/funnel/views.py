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

    def create(self, request, *args, **kwargs):
        print(f"Creating team with data: {request.data}", flush=True)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
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


class StageViewSet(viewsets.ModelViewSet):
    queryset = Stage.objects.all()
    serializer_class = StageSerializer


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

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
