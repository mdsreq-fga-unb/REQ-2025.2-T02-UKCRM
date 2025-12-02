import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient

from accounts.models import Employee
from organization.models import Organization
from .models import Funnel, Lead, SalesTeam, Stage


@pytest.mark.django_db
def test_create_sales_team_via_api():
    client = APIClient()
    data = {'name': 'Time Vendas A'}
    response = client.post('/api/teams/', data, format='json')

    assert response.status_code == 201
    assert response.json()['name'] == 'Time Vendas A'
    assert SalesTeam.objects.count() == 1


@pytest.mark.django_db
def test_create_funnel_via_api():
    client = APIClient()
    team1 = SalesTeam.objects.create(name='Time A')
    team2 = SalesTeam.objects.create(name='Time B')

    data = {
        'name': 'Funil Principal',
        'team_ids': [team1.id, team2.id],
    }
    response = client.post('/api/funnels/', data, format='json')

    assert response.status_code == 201
    assert response.json()['name'] == 'Funil Principal'

    assert Funnel.objects.count() == 1
    funnel = Funnel.objects.get()
    assert funnel.teams.count() == 2


@pytest.mark.django_db
def test_create_stage_via_api():
    client = APIClient()
    funnel = Funnel.objects.create(name='Funil de Vendas')

    data = {
        'name': 'Nova Etapa',
        'order': 1,
        'funnel': funnel.id,
    }
    response = client.post('/api/stages/', data, format='json')

    assert response.status_code == 201
    assert response.json()['name'] == 'Nova Etapa'
    assert response.json()['funnel'] == funnel.id

    assert Stage.objects.count() == 1
    stage = Stage.objects.get()
    assert stage.name == 'Nova Etapa'
    assert stage.funnel == funnel


@pytest.mark.django_db
def test_create_lead_via_api():
    client = APIClient()

    funnel = Funnel.objects.create(name='Funil de Vendas')
    stage = Stage.objects.create(name='Novos', order=1, funnel=funnel)

    data = {
        'name': 'Empresa Teste',
        'email': 'contato@empresa.com',
        'phone': '11999998888',
        'stage': stage.id,
        'order': 1,
    }
    response = client.post('/api/leads/', data, format='json')

    assert response.status_code == 201

    response_data = response.json()
    assert response_data['name'] == 'Empresa Teste'
    assert response_data['email'] == 'contato@empresa.com'
    assert response_data['stage'] == stage.id

    assert Lead.objects.count() == 1

    created_lead = Lead.objects.get()
    assert created_lead.name == 'Empresa Teste'
    assert created_lead.stage == stage


# ==================== STAGE MANAGEMENT & VISIBILITY TESTS ====================

@pytest.fixture
def setup_org_and_users():
    """Create organization, users with different roles, and team"""
    org = Organization.objects.create(name='Test Org')

    # Create users
    owner_user = User.objects.create_user(username='owner', password='pass123', email='owner@test.com')
    manager_user = User.objects.create_user(username='manager', password='pass123', email='manager@test.com')
    coordinator_user = User.objects.create_user(username='coordinator', password='pass123', email='coord@test.com')
    sdr_user = User.objects.create_user(username='sdr', password='pass123', email='sdr@test.com')
    closer_user = User.objects.create_user(username='closer', password='pass123', email='closer@test.com')

    # Create employee profiles
    owner = Employee.objects.create(user=owner_user, organization=org, role='owner')
    manager = Employee.objects.create(user=manager_user, organization=org, role='manager')
    coordinator = Employee.objects.create(user=coordinator_user, organization=org, role='coordinator')
    sdr = Employee.objects.create(user=sdr_user, organization=org, role='sdr')
    closer = Employee.objects.create(user=closer_user, organization=org, role='closer')

    # Create sales team
    team = SalesTeam.objects.create(name='Test Team', organization=org)
    team.members.set([owner, manager, coordinator, sdr, closer])

    # Create funnel
    funnel = Funnel.objects.create(name='Test Funnel')
    funnel.teams.add(team)

    return {
        'org': org,
        'owner': owner,
        'manager': manager,
        'coordinator': coordinator,
        'sdr': sdr,
        'closer': closer,
        'team': team,
        'funnel': funnel,
    }


@pytest.mark.django_db
def test_stage_visibility_fields_default(setup_org_and_users):
    """Test that stages have default visibility set to True"""
    funnel = setup_org_and_users['funnel']
    stage = Stage.objects.create(name='Test Stage', funnel=funnel, order=1)

    assert stage.visible_to_sdr is True
    assert stage.visible_to_closer is True


@pytest.mark.django_db
def test_manager_can_delete_stage(setup_org_and_users):
    """Test that managers can delete stages"""
    client = APIClient()
    manager = setup_org_and_users['manager']
    funnel = setup_org_and_users['funnel']

    stage = Stage.objects.create(name='Stage to Delete', funnel=funnel, order=1)

    client.force_authenticate(user=manager.user)
    response = client.delete(f'/api/stages/{stage.id}/')

    assert response.status_code == 204
    assert Stage.objects.filter(id=stage.id).count() == 0


@pytest.mark.django_db
def test_owner_can_delete_stage(setup_org_and_users):
    """Test that owners can delete stages"""
    client = APIClient()
    owner = setup_org_and_users['owner']
    funnel = setup_org_and_users['funnel']

    stage = Stage.objects.create(name='Stage to Delete', funnel=funnel, order=1)

    client.force_authenticate(user=owner.user)
    response = client.delete(f'/api/stages/{stage.id}/')

    assert response.status_code == 204
    assert Stage.objects.filter(id=stage.id).count() == 0


@pytest.mark.django_db
def test_sdr_cannot_delete_stage(setup_org_and_users):
    """Test that SDRs cannot delete stages"""
    client = APIClient()
    sdr = setup_org_and_users['sdr']
    funnel = setup_org_and_users['funnel']

    stage = Stage.objects.create(name='Stage to Delete', funnel=funnel, order=1)

    client.force_authenticate(user=sdr.user)
    response = client.delete(f'/api/stages/{stage.id}/')

    assert response.status_code == 403
    assert Stage.objects.filter(id=stage.id).count() == 1


@pytest.mark.django_db
def test_closer_cannot_delete_stage(setup_org_and_users):
    """Test that closers cannot delete stages"""
    client = APIClient()
    closer = setup_org_and_users['closer']
    funnel = setup_org_and_users['funnel']

    stage = Stage.objects.create(name='Stage to Delete', funnel=funnel, order=1)

    client.force_authenticate(user=closer.user)
    response = client.delete(f'/api/stages/{stage.id}/')

    assert response.status_code == 403
    assert Stage.objects.filter(id=stage.id).count() == 1


@pytest.mark.django_db
def test_coordinator_cannot_delete_stage(setup_org_and_users):
    """Test that coordinators cannot delete stages"""
    client = APIClient()
    coordinator = setup_org_and_users['coordinator']
    funnel = setup_org_and_users['funnel']

    stage = Stage.objects.create(name='Stage to Delete', funnel=funnel, order=1)

    client.force_authenticate(user=coordinator.user)
    response = client.delete(f'/api/stages/{stage.id}/')

    assert response.status_code == 403
    assert Stage.objects.filter(id=stage.id).count() == 1


@pytest.mark.django_db
def test_manager_can_update_stage_visibility(setup_org_and_users):
    """Test that managers can update stage visibility"""
    client = APIClient()
    manager = setup_org_and_users['manager']
    funnel = setup_org_and_users['funnel']

    stage = Stage.objects.create(name='Test Stage', funnel=funnel, order=1)

    client.force_authenticate(user=manager.user)
    response = client.patch(
        f'/api/stages/{stage.id}/visibility/',
        {'visible_to_sdr': False, 'visible_to_closer': True},
        format='json'
    )

    assert response.status_code == 200
    stage.refresh_from_db()
    assert stage.visible_to_sdr is False
    assert stage.visible_to_closer is True


@pytest.mark.django_db
def test_owner_can_update_stage_visibility(setup_org_and_users):
    """Test that owners can update stage visibility"""
    client = APIClient()
    owner = setup_org_and_users['owner']
    funnel = setup_org_and_users['funnel']

    stage = Stage.objects.create(name='Test Stage', funnel=funnel, order=1)

    client.force_authenticate(user=owner.user)
    response = client.patch(
        f'/api/stages/{stage.id}/visibility/',
        {'visible_to_sdr': False},
        format='json'
    )

    assert response.status_code == 200
    stage.refresh_from_db()
    assert stage.visible_to_sdr is False


@pytest.mark.django_db
def test_sdr_cannot_update_stage_visibility(setup_org_and_users):
    """Test that SDRs cannot update stage visibility"""
    client = APIClient()
    sdr = setup_org_and_users['sdr']
    funnel = setup_org_and_users['funnel']

    stage = Stage.objects.create(name='Test Stage', funnel=funnel, order=1)

    client.force_authenticate(user=sdr.user)
    response = client.patch(
        f'/api/stages/{stage.id}/visibility/',
        {'visible_to_sdr': False},
        format='json'
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_closer_cannot_update_stage_visibility(setup_org_and_users):
    """Test that closers cannot update stage visibility"""
    client = APIClient()
    closer = setup_org_and_users['closer']
    funnel = setup_org_and_users['funnel']

    stage = Stage.objects.create(name='Test Stage', funnel=funnel, order=1)

    client.force_authenticate(user=closer.user)
    response = client.patch(
        f'/api/stages/{stage.id}/visibility/',
        {'visible_to_closer': False},
        format='json'
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_sdr_sees_only_visible_stages(setup_org_and_users):
    """Test that SDRs see only stages marked visible to them"""
    client = APIClient()
    sdr = setup_org_and_users['sdr']
    funnel = setup_org_and_users['funnel']

    stage1 = Stage.objects.create(name='Visible Stage', funnel=funnel, order=1, visible_to_sdr=True)
    stage2 = Stage.objects.create(name='Hidden Stage', funnel=funnel, order=2, visible_to_sdr=False)

    client.force_authenticate(user=sdr.user)
    response = client.get('/api/stages/')

    assert response.status_code == 200
    stage_ids = [s['id'] for s in response.json()]
    assert stage1.id in stage_ids
    assert stage2.id not in stage_ids


@pytest.mark.django_db
def test_closer_sees_only_visible_stages(setup_org_and_users):
    """Test that closers see only stages marked visible to them"""
    client = APIClient()
    closer = setup_org_and_users['closer']
    funnel = setup_org_and_users['funnel']

    stage1 = Stage.objects.create(name='Visible Stage', funnel=funnel, order=1, visible_to_closer=True)
    stage2 = Stage.objects.create(name='Hidden Stage', funnel=funnel, order=2, visible_to_closer=False)

    client.force_authenticate(user=closer.user)
    response = client.get('/api/stages/')

    assert response.status_code == 200
    stage_ids = [s['id'] for s in response.json()]
    assert stage1.id in stage_ids
    assert stage2.id not in stage_ids


@pytest.mark.django_db
def test_coordinator_sees_all_stages(setup_org_and_users):
    """Test that coordinators see all stages regardless of visibility"""
    client = APIClient()
    coordinator = setup_org_and_users['coordinator']
    funnel = setup_org_and_users['funnel']

    stage1 = Stage.objects.create(name='Stage 1', funnel=funnel, order=1, visible_to_sdr=True, visible_to_closer=True)
    stage2 = Stage.objects.create(name='Stage 2', funnel=funnel, order=2, visible_to_sdr=False, visible_to_closer=False)

    client.force_authenticate(user=coordinator.user)
    response = client.get('/api/stages/')

    assert response.status_code == 200
    stage_ids = [s['id'] for s in response.json()]
    assert stage1.id in stage_ids
    assert stage2.id in stage_ids


@pytest.mark.django_db
def test_manager_sees_all_stages(setup_org_and_users):
    """Test that managers see all stages regardless of visibility"""
    client = APIClient()
    manager = setup_org_and_users['manager']
    funnel = setup_org_and_users['funnel']

    stage1 = Stage.objects.create(name='Stage 1', funnel=funnel, order=1, visible_to_sdr=True)
    stage2 = Stage.objects.create(name='Stage 2', funnel=funnel, order=2, visible_to_sdr=False)

    client.force_authenticate(user=manager.user)
    response = client.get('/api/stages/')

    assert response.status_code == 200
    stage_ids = [s['id'] for s in response.json()]
    assert stage1.id in stage_ids
    assert stage2.id in stage_ids


@pytest.mark.django_db
def test_owner_sees_all_stages(setup_org_and_users):
    """Test that owners see all stages regardless of visibility"""
    client = APIClient()
    owner = setup_org_and_users['owner']
    funnel = setup_org_and_users['funnel']

    stage1 = Stage.objects.create(name='Stage 1', funnel=funnel, order=1, visible_to_closer=True)
    stage2 = Stage.objects.create(name='Stage 2', funnel=funnel, order=2, visible_to_closer=False)

    client.force_authenticate(user=owner.user)
    response = client.get('/api/stages/')

    assert response.status_code == 200
    stage_ids = [s['id'] for s in response.json()]
    assert stage1.id in stage_ids
    assert stage2.id in stage_ids


@pytest.mark.django_db
def test_sdr_cannot_create_stage(setup_org_and_users):
    """Test that SDRs cannot create stages"""
    client = APIClient()
    sdr = setup_org_and_users['sdr']
    funnel = setup_org_and_users['funnel']

    client.force_authenticate(user=sdr.user)
    response = client.post(
        '/api/stages/',
        {'name': 'New Stage', 'funnel': funnel.id, 'order': 1},
        format='json'
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_closer_cannot_create_stage(setup_org_and_users):
    """Test that closers cannot create stages"""
    client = APIClient()
    closer = setup_org_and_users['closer']
    funnel = setup_org_and_users['funnel']

    client.force_authenticate(user=closer.user)
    response = client.post(
        '/api/stages/',
        {'name': 'New Stage', 'funnel': funnel.id, 'order': 1},
        format='json'
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_sdr_cannot_edit_stage(setup_org_and_users):
    """Test that SDRs cannot edit stages"""
    client = APIClient()
    sdr = setup_org_and_users['sdr']
    funnel = setup_org_and_users['funnel']

    stage = Stage.objects.create(name='Test Stage', funnel=funnel, order=1)

    client.force_authenticate(user=sdr.user)
    response = client.patch(
        f'/api/stages/{stage.id}/',
        {'name': 'Updated Name'},
        format='json'
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_closer_cannot_edit_stage(setup_org_and_users):
    """Test that closers cannot edit stages"""
    client = APIClient()
    closer = setup_org_and_users['closer']
    funnel = setup_org_and_users['funnel']

    stage = Stage.objects.create(name='Test Stage', funnel=funnel, order=1)

    client.force_authenticate(user=closer.user)
    response = client.patch(
        f'/api/stages/{stage.id}/',
        {'name': 'Updated Name'},
        format='json'
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_manager_can_create_stage(setup_org_and_users):
    """Test that managers can create stages"""
    client = APIClient()
    manager = setup_org_and_users['manager']
    funnel = setup_org_and_users['funnel']

    client.force_authenticate(user=manager.user)
    response = client.post(
        '/api/stages/',
        {'name': 'New Stage', 'funnel': funnel.id, 'order': 1, 'visible_to_sdr': True, 'visible_to_closer': False},
        format='json'
    )

    assert response.status_code == 201
    assert response.json()['name'] == 'New Stage'
    assert response.json()['visible_to_sdr'] is True
    assert response.json()['visible_to_closer'] is False


@pytest.mark.django_db
def test_owner_can_create_stage(setup_org_and_users):
    """Test that owners can create stages"""
    client = APIClient()
    owner = setup_org_and_users['owner']
    funnel = setup_org_and_users['funnel']

    client.force_authenticate(user=owner.user)
    response = client.post(
        '/api/stages/',
        {'name': 'New Stage', 'funnel': funnel.id, 'order': 1},
        format='json'
    )

    assert response.status_code == 201
    assert response.json()['name'] == 'New Stage'
