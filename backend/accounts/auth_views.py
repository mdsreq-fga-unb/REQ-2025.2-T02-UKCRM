from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import EmployeeSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Login endpoint that returns JWT tokens and user data
    """
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {'error': 'Email and password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Django's authenticate expects username, but we're using email
    user = authenticate(username=email, password=password)

    if user is None:
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not user.is_active:
        return Response(
            {'error': 'User account is disabled'},
            status=status.HTTP_403_FORBIDDEN
        )

    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)

    # Get employee data
    try:
        employee = user.employee_profile
        employee_data = EmployeeSerializer(employee).data
    except:
        return Response(
            {'error': 'User is not an employee'},
            status=status.HTTP_403_FORBIDDEN
        )

    return Response({
        'token': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': employee.id,
            'email': user.email,
            'nome': user.first_name,
            'role': employee.role,
            'organization_id': employee.organization.id,
        }
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Logout endpoint - invalidates the refresh token
    """
    try:
        refresh_token = request.data.get('refresh')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        return Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)
    except Exception:
        return Response({'message': 'Logged out'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    """
    Get current authenticated user data
    """
    try:
        employee = request.user.employee_profile
        return Response({
            'id': employee.id,
            'email': request.user.email,
            'nome': request.user.first_name,
            'role': employee.role,
            'organization_id': employee.organization.id,
        }, status=status.HTTP_200_OK)
    except:
        return Response(
            {'error': 'User is not an employee'},
            status=status.HTTP_403_FORBIDDEN
        )
