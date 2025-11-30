from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import Employee
from .serializers import EmployeeSerializer, InviteUserSerializer, UpdateEmployeeSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()

    def get_queryset(self):
        """Filter employees based on user role"""
        user = self.request.user

        # Admin users can see all employees across all organizations
        if user.is_staff:
            return Employee.objects.all().order_by('organization', 'user__first_name')

        # Regular users can only see employees from their organization
        if hasattr(user, 'employee_profile'):
            return Employee.objects.filter(organization=user.employee_profile.organization)

        return Employee.objects.none()

    def _is_organization_owner(self, organization):
        """Check if the current user is the owner of the given organization"""
        user = self.request.user
        if user.is_staff:
            return True
        if hasattr(user, 'employee_profile'):
            employee = user.employee_profile
            return employee.organization == organization and employee.role == 'owner'
        return False

    def get_serializer_class(self):
        if self.action == 'create':
            return InviteUserSerializer
        elif self.action in ['update', 'partial_update']:
            return UpdateEmployeeSerializer
        return EmployeeSerializer

    def create(self, request, *args, **kwargs):
        print(f"Received data: {request.data}", flush=True)

        # Check if user is owner of the target organization
        organization_id = request.data.get('organization_id')
        if organization_id:
            from organization.models import Organization
            try:
                organization = Organization.objects.get(id=organization_id)
                if not self._is_organization_owner(organization):
                    raise PermissionDenied("Apenas o proprietário da organização pode adicionar membros.")
            except Organization.DoesNotExist:
                pass  # Will be caught by serializer validation

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(f"Validation errors: {serializer.errors}", flush=True)
        serializer.is_valid(raise_exception=True)
        employee = serializer.save()
        return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        print(f"Updating employee {instance.id} with data: {request.data}", flush=True)

        # Check if user is owner of the employee's current organization
        if not self._is_organization_owner(instance.organization):
            raise PermissionDenied("Apenas o proprietário da organização pode editar membros.")

        # If changing organization, check ownership of target organization
        new_organization_id = request.data.get('organization_id')
        if new_organization_id and int(new_organization_id) != instance.organization.id:
            from organization.models import Organization
            try:
                new_organization = Organization.objects.get(id=new_organization_id)
                if not self._is_organization_owner(new_organization):
                    raise PermissionDenied("Apenas o proprietário da organização de destino pode adicionar membros.")
            except Organization.DoesNotExist:
                pass  # Will be caught by serializer validation

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            print(f"Validation errors: {serializer.errors}", flush=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(EmployeeSerializer(instance).data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    # Excluir com transferência de leads
    def destroy(self, request, *args, **kwargs):
        from funnel.models import Lead

        employee_to_delete = self.get_object()

        # Check if user is owner of the employee's organization
        if not self._is_organization_owner(employee_to_delete.organization):
            raise PermissionDenied("Apenas o proprietário da organização pode remover membros.")

        transfer_to_id = request.query_params.get('transfer_to')

        # Transfer leads to another employee if specified
        if transfer_to_id:
            try:
                # Ensure transfer target is from the same organization
                transfer_to_employee = Employee.objects.get(
                    id=transfer_to_id,
                    organization=employee_to_delete.organization
                )
                Lead.objects.filter(account=employee_to_delete).update(account=transfer_to_employee)
                print(f"Transferindo leads de {employee_to_delete.id} para {transfer_to_id}", flush=True)
            except Employee.DoesNotExist:
                return Response(
                    {"error": "Employee to transfer leads to does not exist"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            # Set leads to null if no transfer target specified
            Lead.objects.filter(account=employee_to_delete).update(account=None)

        user = employee_to_delete.user
        user.is_active = False
        user.save()

        employee_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)