from rest_framework import viewsets

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


class FunnelViewSet(viewsets.ModelViewSet):
    queryset = Funnel.objects.prefetch_related(
        'teams',
        'stages__leads',
    ).all()
    serializer_class = FunnelSerializer


class StageViewSet(viewsets.ModelViewSet):
    queryset = Stage.objects.all()
    serializer_class = StageSerializer


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
