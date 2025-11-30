from django.urls import path
from .auth_views import login_view, logout_view, me_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('me/', me_view, name='me'),
]
