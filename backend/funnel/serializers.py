from rest_framework import serializers

from .models import Funnel, Lead, SalesTeam, Stage


class SalesTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesTeam
        fields = ['id', 'name']


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['id', 'name', 'email', 'phone', 'stage', 'order', 'created_at']


class StageSerializer(serializers.ModelSerializer):
    leads = LeadSerializer(many=True, read_only=True)

    class Meta:
        model = Stage
        fields = ['id', 'name', 'order', 'funnel', 'leads']


class FunnelSerializer(serializers.ModelSerializer):
    stages = StageSerializer(many=True, read_only=True)
    teams = SalesTeamSerializer(many=True, read_only=True)

    team_ids = serializers.PrimaryKeyRelatedField(
        queryset=SalesTeam.objects.all(),
        many=True,
        write_only=True,
        source='teams',
    )

    class Meta:
        model = Funnel
        fields = ['id', 'name', 'teams', 'team_ids', 'stages']
