#!/usr/bin/env python
"""
Script to automatically create a Django superuser with admin role.
This script creates a superuser (is_staff=True, is_superuser=True) without
requiring an Employee profile, as admins are handled separately in the system.

Usage:
    python create_superuser.py

You can customize the superuser credentials by setting environment variables:
    DJANGO_SUPERUSER_USERNAME - Default: 'admin'
    DJANGO_SUPERUSER_EMAIL - Default: 'admin@ukcrm.com'
    DJANGO_SUPERUSER_PASSWORD - Default: 'admin123'
    DJANGO_SUPERUSER_FIRSTNAME - Default: 'Admin'
"""

import os
import sys
import django

# Setup Django environment
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ukcrm.settings')
django.setup()

from django.contrib.auth.models import User


def create_superuser():
    """Create a superuser if it doesn't already exist."""

    # Get credentials from environment variables or use defaults
    username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
    email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@ukcrm.com')
    password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')
    first_name = os.environ.get('DJANGO_SUPERUSER_FIRSTNAME', 'Admin')

    # Check if user already exists
    if User.objects.filter(username=username).exists():
        print(f"⚠️  Superuser '{username}' already exists.")
        user = User.objects.get(username=username)
        print(f"   Email: {user.email}")
        print(f"   Is superuser: {user.is_superuser}")
        print(f"   Is staff: {user.is_staff}")
        return user

    # Create the superuser
    try:
        user = User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
            first_name=first_name
        )

        print("✅ Superuser created successfully!")
        print(f"   Username: {username}")
        print(f"   Email: {email}")
        print(f"   Password: {password}")
        print(f"   First Name: {first_name}")
        print(f"   Role: Admin (is_staff=True, is_superuser=True)")
        print("\n⚠️  Please change the password after first login for security!")

        return user

    except Exception as e:
        print(f"❌ Error creating superuser: {str(e)}")
        sys.exit(1)


if __name__ == '__main__':
    print("Creating superuser...")
    print("-" * 50)
    create_superuser()
    print("-" * 50)
