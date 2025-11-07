from rest_framework import viewsets

from .models import Lead, Stage
from .serializers import LeadSerializer, StageSerializer


class StageViewSet(viewsets.ModelViewSet):
    serializer_class = StageSerializer
    queryset = Stage.objects.prefetch_related('leads').order_by('order')


class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()
