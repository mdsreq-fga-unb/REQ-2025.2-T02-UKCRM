from ordered_model.serializers import OrderedModelSerializer
from rest_framework import serializers

from .models import Funnel, Lead, SalesTeam, Stage


class SalesTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesTeam
        fields = "__all__"


class LeadSerializer(OrderedModelSerializer, serializers.ModelSerializer):
    contactOrigin = serializers.ChoiceField(
        choices=Lead.ContactOriginChoices.choices,
        source="contact_origin",
        required=False,
    )

    class Meta:
        model = Lead
        fields = "__all__"


class StageSerializer(OrderedModelSerializer, serializers.ModelSerializer):
    leads = LeadSerializer(many=True, read_only=True)

    class Meta:
        model = Stage
        fields = "__all__"


class FunnelSerializer(serializers.ModelSerializer):
    stages = StageSerializer(many=True, read_only=True)
    teams = SalesTeamSerializer(many=True, read_only=True)

    team_ids = serializers.PrimaryKeyRelatedField(
        queryset=SalesTeam.objects.all(),
        many=True,
        write_only=True,
        source="teams",
    )

    class Meta:
        model = Funnel
        fields = "__all__"
