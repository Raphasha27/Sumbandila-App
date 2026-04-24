import pytest # type: ignore
from fastapi.testclient import TestClient # type: ignore
from services.core.main import app

client = TestClient(app)

def test_health_check():
    """Verify service health."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "up"

def test_verify_entity_success():
    """Verify a known legitimate entity."""
    response = client.get("/api/v1/verify/?q=Dr Jane Smith")
    assert response.status_code == 200
    assert response.json()["trust_score"] > 90

def test_verify_entity_not_found():
    """Verify error handling for unknown entities."""
    response = client.get("/api/v1/verify/?q=Unknown Scammer")
    assert response.status_code == 404
