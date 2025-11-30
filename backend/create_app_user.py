import os
import sys

# Ensure the backend directory is in the python path
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BACKEND_DIR)

# Change directory to backend so that decouple can find the .env file
os.chdir(BACKEND_DIR)

import django

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ukcrm.settings")
django.setup()

from django.contrib.auth.models import User

from accounts.models import Employee
from organization.models import Organization


def create_user():
    print("--- Create New User Script ---")
    print(
        "This script will create an Organization, a User, and link them via an Employee profile."
    )
    print("Press Enter to use default values shown in brackets []\n")

    # Organization details
    org_name = input("Organization Name [Default Org]: ").strip() or "Default Org"
    owner_name = input("Owner Name (Full Name) [Admin User]: ").strip() or "Admin User"
    owner_email = (
        input("Owner Email [admin@example.com]: ").strip() or "admin@example.com"
    )
    owner_phone = input("Owner Phone [123456789]: ").strip() or "123456789"

    # User details
    username = input(f"Username [{owner_email}]: ").strip() or owner_email
    email = input(f"User Email [{owner_email}]: ").strip() or owner_email
    password = input("Password [password123]: ").strip() or "password123"

    # Employee role
    print("\nAvailable roles: owner, manager, coordinator, sdr, closer")
    role = input("Role [owner]: ").strip().lower() or "owner"

    valid_roles = ["owner", "manager", "coordinator", "sdr", "closer"]
    if role not in valid_roles:
        print(f"Invalid role '{role}'. Defaulting to 'owner'.")
        role = "owner"

    try:
        # Create Organization
        organization, org_created = Organization.objects.get_or_create(
            name=org_name,
            defaults={
                "owner_name": owner_name,
                "owner_email": owner_email,
                "owner_phone": owner_phone,
                "active": True,
            },
        )
        if org_created:
            print(f"Organization '{org_name}' created.")
        else:
            print(
                f"Organization '{org_name}' already exists. Using existing organization."
            )

        # Create User
        if User.objects.filter(username=username).exists():
            print(f"User '{username}' already exists. Using existing user.")
            user = User.objects.get(username=username)
        else:
            user = User.objects.create_user(
                username=username, email=email, password=password
            )
            name_parts = owner_name.split()
            user.first_name = name_parts[0]
            if len(name_parts) > 1:
                user.last_name = " ".join(name_parts[1:])
            user.save()
            print(f"User '{username}' created.")

        # Create Employee
        if hasattr(user, "employee_profile"):
            print(f"Employee profile for user '{username}' already exists.")
            # Update role if needed? Let's just notify for now.
            print(
                f"Current Role: {user.employee_profile.role}, Organization: {user.employee_profile.organization.name}"
            )
        else:
            Employee.objects.create(user=user, organization=organization, role=role)
            print(
                f"Employee profile created with role '{role}' linked to '{org_name}'."
            )

        print("\n---------------------------------------------------")
        print(f"Setup Complete!")
        print(f"Username: {username}")
        print(f"Password: {password}")
        print("---------------------------------------------------")

    except Exception as e:
        print(f"\nError: {e}")
        import traceback

        traceback.print_exc()


if __name__ == "__main__":
    create_user()
