from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from organization.models import Organization
from accounts.models import Employee


class Command(BaseCommand):
    help = 'Sets up test data: creates organizations and employee profiles for existing users'

    def handle(self, *args, **kwargs):
        # Create test organizations
        org1, created = Organization.objects.get_or_create(
            name='Test Organization 1',
            defaults={'active': True}
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created organization: {org1.name}'))
        else:
            self.stdout.write(self.style.WARNING(f'Organization already exists: {org1.name}'))

        org2, created = Organization.objects.get_or_create(
            name='Test Organization 2',
            defaults={'active': True}
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created organization: {org2.name}'))
        else:
            self.stdout.write(self.style.WARNING(f'Organization already exists: {org2.name}'))

        # Map users to roles and organizations
        user_mappings = [
            {'email': 'owner@test.com', 'role': 'owner', 'org': org1},
            {'email': 'manager@test.com', 'role': 'manager', 'org': org1},
            {'email': 'coordinator@test.com', 'role': 'coordinator', 'org': org1},
            {'email': 'sdr@test.com', 'role': 'sdr', 'org': org1},
            {'email': 'closer@test.com', 'role': 'closer', 'org': org2},
            {'email': 'sdr1@test.com', 'role': 'sdr', 'org': org2},
            {'email': 'sdr2@test.com', 'role': 'sdr', 'org': org2},
        ]

        # Create Employee profiles for existing users
        for mapping in user_mappings:
            try:
                user = User.objects.get(email=mapping['email'])

                # Activate user if inactive
                if not user.is_active:
                    user.is_active = True
                    user.save()
                    self.stdout.write(self.style.WARNING(f'Activated user: {user.email}'))

                # Create or update employee profile
                employee, created = Employee.objects.get_or_create(
                    user=user,
                    defaults={
                        'role': mapping['role'],
                        'organization': mapping['org']
                    }
                )

                if created:
                    self.stdout.write(self.style.SUCCESS(
                        f'Created employee profile: {user.email} -> {mapping["role"]} at {mapping["org"].name}'
                    ))
                else:
                    # Update existing employee
                    employee.role = mapping['role']
                    employee.organization = mapping['org']
                    employee.save()
                    self.stdout.write(self.style.WARNING(
                        f'Updated employee profile: {user.email} -> {mapping["role"]} at {mapping["org"].name}'
                    ))

            except User.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'User not found: {mapping["email"]}'))

        self.stdout.write(self.style.SUCCESS('\n=== Setup Complete ==='))
        self.stdout.write(self.style.SUCCESS(f'Organizations created: 2'))
        self.stdout.write(self.style.SUCCESS(f'Employee profiles created/updated: {len(user_mappings)}'))
        self.stdout.write(self.style.SUCCESS('\nAll test users can now log in!'))
