from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import EmployeeSerializer
from funnel.models import SalesTeam


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

    # Try to authenticate with email as username first
    user = authenticate(username=email, password=password)

    # If that fails, try to find user by email and authenticate with their username
    if user is None:
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            pass

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

    # Check if user is admin (staff/superuser)
    if user.is_staff:
        return Response({
            'token': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'email': user.email,
                'nome': user.first_name or user.username,
                'role': 'Admin',
                'organization_id': None,
            }
        }, status=status.HTTP_200_OK)

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
    # Check if user is admin (staff/superuser)
    if request.user.is_staff:
        return Response({
            'id': request.user.id,
            'email': request.user.email,
            'nome': request.user.first_name or request.user.username,
            'role': 'Admin',
            'organization_id': None,
        }, status=status.HTTP_200_OK)

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    """
    Get detailed profile information including organization and teams
    """
    # Check if user is admin (staff/superuser)
    if request.user.is_staff:
        return Response({
            'id': request.user.id,
            'email': request.user.email,
            'nome': request.user.first_name or request.user.username,
            'role': 'Admin',
            'organization': None,
            'teams': [],
            'joined_at': request.user.date_joined.isoformat(),
            'photo': None,
        }, status=status.HTTP_200_OK)

    try:
        employee = request.user.employee_profile

        # Get teams the employee is part of
        teams = SalesTeam.objects.filter(members=employee)
        teams_data = [{'id': team.id, 'name': team.name} for team in teams]

        return Response({
            'id': employee.id,
            'email': request.user.email,
            'nome': request.user.first_name,
            'role': employee.role,
            'photo': request.build_absolute_uri(employee.photo.url) if employee.photo else None,
            'organization': {
                'id': employee.organization.id,
                'name': employee.organization.name,
                'logo': request.build_absolute_uri(employee.organization.logo.url) if employee.organization.logo else None,
            },
            'teams': teams_data,
            'joined_at': request.user.date_joined.isoformat(),
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': 'User is not an employee'},
            status=status.HTTP_403_FORBIDDEN
        )


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    """
    Update user profile information
    """
    user = request.user

    # Update name if provided
    if 'nome' in request.data:
        user.first_name = request.data['nome']
        user.save()

    # Update password if provided
    if 'password' in request.data:
        password = request.data['password']
        if len(password) >= 8:
            user.set_password(password)
            user.save()
        else:
            return Response(
                {'error': 'Password must be at least 8 characters long'},
                status=status.HTTP_400_BAD_REQUEST
            )

    # Update photo if provided (for employees)
    if 'photo' in request.FILES and hasattr(user, 'employee_profile'):
        employee = user.employee_profile
        employee.photo = request.FILES['photo']
        employee.save()

    # Return updated profile - build response directly instead of calling profile_view
    if user.is_staff:
        return Response({
            'id': user.id,
            'email': user.email,
            'nome': user.first_name or user.username,
            'role': 'Admin',
            'organization': None,
            'teams': [],
            'joined_at': user.date_joined.isoformat(),
            'photo': None,
        }, status=status.HTTP_200_OK)

    try:
        employee = user.employee_profile

        # Get teams the employee is part of
        teams = SalesTeam.objects.filter(members=employee)
        teams_data = [{'id': team.id, 'name': team.name} for team in teams]

        return Response({
            'id': employee.id,
            'email': user.email,
            'nome': user.first_name,
            'role': employee.role,
            'photo': request.build_absolute_uri(employee.photo.url) if employee.photo else None,
            'organization': {
                'id': employee.organization.id,
                'name': employee.organization.name,
                'logo': request.build_absolute_uri(employee.organization.logo.url) if employee.organization.logo else None,
            },
            'teams': teams_data,
            'joined_at': user.date_joined.isoformat(),
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': 'User is not an employee'},
            status=status.HTTP_403_FORBIDDEN
        )
