from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admin users to create organizations.
    """

    def has_permission(self, request, view):
        # Read permissions are allowed for authenticated users
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated

        # Write permissions are only allowed for admin users
        return request.user and request.user.is_staff
