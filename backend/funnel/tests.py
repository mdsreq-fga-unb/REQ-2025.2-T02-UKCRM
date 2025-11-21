import pytest
from rest_framework.test import APIClient

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
