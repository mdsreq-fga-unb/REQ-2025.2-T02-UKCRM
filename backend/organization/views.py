from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Organization
from .serializers import OrganizationSerializer
from .permissions import IsAdminOrReadOnly

class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all().order_by('-created_at')
    serializer_class = OrganizationSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    def get_queryset(self):
        """Filter organizations based on user role"""
        user = self.request.user

        # Admin users can see all organizations
        if user.is_staff:
            return Organization.objects.all().order_by('-created_at')

        # Regular users can only see their own organization
        if hasattr(user, 'employee_profile'):
            return Organization.objects.filter(id=user.employee_profile.organization.id)

        return Organization.objects.none()