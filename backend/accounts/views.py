from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Employee
from .serializers import EmployeeSerializer, InviteUserSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return InviteUserSerializer
        return EmployeeSerializer

    def create(self, request, *args, **kwargs):
        print(f"Received data: {request.data}", flush=True)
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(f"Validation errors: {serializer.errors}", flush=True)
        serializer.is_valid(raise_exception=True)
        employee = serializer.save()
        return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)

    # Excluir com transferência de leads
    def destroy(self, request, *args, **kwargs):
        employee_to_delete = self.get_object()
        transfer_to_id = request.query_params.get('transfer_to')

        if transfer_to_id:
            print(f"Transferindo leads de {employee_to_delete.id} para {transfer_to_id}", flush = True)

        user = employee_to_delete.user
        user.is_active = False
        user.save()
        
        employee_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)