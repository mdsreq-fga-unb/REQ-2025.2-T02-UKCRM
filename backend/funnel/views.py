from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.db.models import Count, Sum, Q

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

    def update(self, request, *args, **kwargs):
        """Update a funnel (PATCH or PUT)"""
        print(f"Updating funnel with data: {request.data}", flush=True)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='statistics')
    def statistics(self, request, pk=None):
        """Get statistics for a funnel"""
        funnel = self.get_object()

        # Get all leads in this funnel
        leads = Lead.objects.filter(stage__funnel=funnel)

        # Count total leads
        total_leads = leads.count()

        # Count stages
        total_stages = funnel.stages.count()

        # Calculate total gains (sum of gain_loss_value where status is Gained)
        total_gains = leads.filter(status='Gained').aggregate(
            total=Sum('gain_loss_value')
        )['total'] or 0

        # Calculate total losses (sum of gain_loss_value where status is Lost)
        total_losses = leads.filter(status='Lost').aggregate(
            total=Sum('gain_loss_value')
        )['total'] or 0

        # Net gain/loss
        net_gain_loss = total_gains - total_losses

        # Count leads by status
        active_leads = leads.filter(status='Active').count()
        gained_leads = leads.filter(status='Gained').count()
        lost_leads = leads.filter(status='Lost').count()

        # Calculate conversion rate
        conversion_rate = (gained_leads / total_leads * 100) if total_leads > 0 else 0

        # Get team count
        team_count = funnel.teams.count()

        return Response({
            'id': funnel.id,
            'name': funnel.name,
            'total_leads': total_leads,
            'active_leads': active_leads,
            'gained_leads': gained_leads,
            'lost_leads': lost_leads,
            'total_stages': total_stages,
            'total_gains': float(total_gains),
            'total_losses': float(total_losses),
            'net_gain_loss': float(net_gain_loss),
            'conversion_rate': round(conversion_rate, 2),
            'team_count': team_count,
            'teams': [{'id': team.id, 'name': team.name} for team in funnel.teams.all()],
        })


class StageViewSet(viewsets.ModelViewSet):
    queryset = Stage.objects.all()
    serializer_class = StageSerializer

    def get_queryset(self):
        """Filter stages based on user role and visibility permissions"""
        user = self.request.user
        if hasattr(user, 'employee_profile'):
            employee = user.employee_profile

            # Owners, managers, and coordinators can see all stages from their organization
            if employee.role in ['owner', 'manager', 'coordinator']:
                return Stage.objects.filter(
                    funnel__teams__organization=employee.organization
                ).distinct()

            # SDRs can only see stages marked as visible to SDR
            elif employee.role == 'sdr':
                return Stage.objects.filter(
                    funnel__teams__members=employee,
                    visible_to_sdr=True
                ).distinct()

            # Closers can only see stages marked as visible to Closer
            elif employee.role == 'closer':
                return Stage.objects.filter(
                    funnel__teams__members=employee,
                    visible_to_closer=True
                ).distinct()

            # Other roles can see stages where they're a team member
            else:
                return Stage.objects.filter(
                    funnel__teams__members=employee
                ).distinct()
        return Stage.objects.none()

    def destroy(self, request, *args, **kwargs):
        """Delete a stage - only allowed for Manager and Owner"""
        user = request.user
        if not hasattr(user, 'employee_profile'):
            return Response(
                {'error': 'Você precisa ter um perfil de funcionário para deletar etapas.'},
                status=status.HTTP_403_FORBIDDEN
            )

        employee = user.employee_profile
        if employee.role not in ['owner', 'manager']:
            return Response(
                {'error': 'Apenas Proprietários e Gerentes podem deletar etapas.'},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        """Update a stage - only allowed for Manager and Owner"""
        user = request.user
        if not hasattr(user, 'employee_profile'):
            return Response(
                {'error': 'Você precisa ter um perfil de funcionário para editar etapas.'},
                status=status.HTTP_403_FORBIDDEN
            )

        employee = user.employee_profile
        if employee.role not in ['owner', 'manager']:
            return Response(
                {'error': 'Apenas Proprietários e Gerentes podem editar etapas.'},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        """Partial update a stage - only allowed for Manager and Owner"""
        user = request.user
        if not hasattr(user, 'employee_profile'):
            return Response(
                {'error': 'Você precisa ter um perfil de funcionário para editar etapas.'},
                status=status.HTTP_403_FORBIDDEN
            )

        employee = user.employee_profile
        if employee.role not in ['owner', 'manager']:
            return Response(
                {'error': 'Apenas Proprietários e Gerentes podem editar etapas.'},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().partial_update(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """Create a stage - only allowed for Manager and Owner"""
        user = request.user
        if not hasattr(user, 'employee_profile'):
            return Response(
                {'error': 'Você precisa ter um perfil de funcionário para criar etapas.'},
                status=status.HTTP_403_FORBIDDEN
            )

        employee = user.employee_profile
        if employee.role not in ['owner', 'manager']:
            return Response(
                {'error': 'Apenas Proprietários e Gerentes podem criar etapas.'},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=['patch'], url_path='visibility')
    def update_visibility(self, request, pk=None):
        """Update stage visibility settings - only allowed for Manager and Owner"""
        user = request.user
        if not hasattr(user, 'employee_profile'):
            return Response(
                {'error': 'Você precisa ter um perfil de funcionário para modificar visibilidade de etapas.'},
                status=status.HTTP_403_FORBIDDEN
            )

        employee = user.employee_profile
        if employee.role not in ['owner', 'manager']:
            return Response(
                {'error': 'Apenas Proprietários e Gerentes podem modificar a visibilidade de etapas.'},
                status=status.HTTP_403_FORBIDDEN
            )

        stage = self.get_object()

        # Update visibility fields if provided
        if 'visible_to_sdr' in request.data:
            stage.visible_to_sdr = request.data['visible_to_sdr']
        if 'visible_to_closer' in request.data:
            stage.visible_to_closer = request.data['visible_to_closer']

        stage.save()
        serializer = self.get_serializer(stage)
        return Response(serializer.data)


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

    def update(self, request, *args, **kwargs):
        """Update a lead - prevent editing if marked as Gained/Lost"""
        lead = self.get_object()

        # Check if lead is locked (marked as Gained/Lost)
        if lead.status in ['Gained', 'Lost']:
            return Response(
                {'error': 'Leads marcados como Ganho/Perda não podem ser editados. Desmarque primeiro.'},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        """Partial update a lead - prevent editing if marked as Gained/Lost"""
        lead = self.get_object()

        # Check if lead is locked (marked as Gained/Lost)
        if lead.status in ['Gained', 'Lost']:
            return Response(
                {'error': 'Leads marcados como Ganho/Perda não podem ser editados. Desmarque primeiro.'},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """Delete a lead - prevent deletion if marked as Gained/Lost"""
        lead = self.get_object()

        # Check if lead is locked (marked as Gained/Lost)
        if lead.status in ['Gained', 'Lost']:
            return Response(
                {'error': 'Leads marcados como Ganho/Perda não podem ser excluídos. Desmarque primeiro.'},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=['post'], url_path='mark_gain_loss')
    def mark_gain_loss(self, request, pk=None):
        """Mark a lead as gained, lost, or unmark (set to active)"""
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

        if lead_status not in ['Gained', 'Lost', 'Active']:
            return Response(
                {'error': 'Status must be either "Gained", "Lost", or "Active"'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # If setting to Active, clear gain/loss data
        if lead_status == 'Active':
            lead.status = 'Active'
            lead.gain_loss_value = None
            lead.gain_loss_reason = ''
        else:
            # For Gained/Lost, value is required
            if gain_loss_value is None:
                return Response(
                    {'error': 'gain_loss_value is required for Gained/Lost status'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            lead.status = lead_status
            lead.gain_loss_value = gain_loss_value
            lead.gain_loss_reason = gain_loss_reason

        lead.save()

        serializer = self.get_serializer(lead)
        return Response(serializer.data)
