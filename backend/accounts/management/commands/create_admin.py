from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Creates an admin superuser for managing organizations'

    def handle(self, *args, **kwargs):
        # Check if admin user already exists
        if User.objects.filter(username='admin').exists():
            self.stdout.write(self.style.WARNING('Admin user already exists!'))
            admin = User.objects.get(username='admin')
            self.stdout.write(self.style.SUCCESS(f'Email: {admin.email}'))
            return

        # Create admin user
        admin = User.objects.create_superuser(
            username='admin',
            email='admin@ukcrm.com',
            password='admin123',
            first_name='Administrator'
        )

        self.stdout.write(self.style.SUCCESS('Successfully created admin user!'))
        self.stdout.write(self.style.SUCCESS('Username: admin'))
        self.stdout.write(self.style.SUCCESS('Email: admin@ukcrm.com'))
        self.stdout.write(self.style.SUCCESS('Password: admin123'))
        self.stdout.write(self.style.WARNING('\nIMPORTANT: Change the password in production!'))
