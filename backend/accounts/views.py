from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Employee
from .serializers import EmployeeSerializer, InviteUserSerializer, UpdateEmployeeSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return InviteUserSerializer
        elif self.action in ['update', 'partial_update']:
            return UpdateEmployeeSerializer
        return EmployeeSerializer

    def create(self, request, *args, **kwargs):
        print(f"Received data: {request.data}", flush=True)
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
        transfer_to_id = request.query_params.get('transfer_to')

        # Transfer leads to another employee if specified
        if transfer_to_id:
            try:
                transfer_to_employee = Employee.objects.get(id=transfer_to_id)
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