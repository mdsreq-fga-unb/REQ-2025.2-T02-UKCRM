import pytest
from rest_framework.test import APIClient

from .models import Lead, Stage


@pytest.mark.django_db
def test_create_stage_via_api():
    client = APIClient()

    data = {'name': 'Nova Etapa', 'order': 1}
    response = client.post('/api/stages/', data, format='json')

    assert response.status_code == 201
    assert response.json()['name'] == 'Nova Etapa'

    assert Stage.objects.count() == 1
    assert Stage.objects.get().name == 'Nova Etapa'


@pytest.mark.django_db
def test_create_lead_via_api() -> None:
    client = APIClient()

    stage = Stage.objects.create(name='Novos', order=1)

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
