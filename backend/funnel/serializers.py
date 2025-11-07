from rest_framework import serializers

from .models import Lead, Stage


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['id', 'name', 'email', 'phone', 'stage', 'order']


class StageSerializer(serializers.ModelSerializer):
    leads = LeadSerializer(many=True, read_only=True)

    class Meta:
        model = Stage
        fields = ['id', 'name', 'order', 'leads']
