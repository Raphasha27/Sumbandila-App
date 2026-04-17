"""
Unit tests for Sumbandila Core Verification API
"""
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock


# ──────────────────────────────────────────────
# Fixtures
# ──────────────────────────────────────────────

@pytest.fixture(scope="module")
def client():
    """
    Creates a test client with DB engine mocked to prevent
    real database connections during unit testing.
    """
    with patch("app.database.session.engine") as mock_engine, \
         patch("app.database.base.Base.metadata.create_all"):
        from main import app
        with TestClient(app) as c:
            yield c


# ──────────────────────────────────────────────
# Root & Health
# ──────────────────────────────────────────────

class TestRootEndpoints:
    def test_root_returns_200(self, client):
        response = client.get("/")
        assert response.status_code == 200

    def test_root_response_has_service_name(self, client):
        data = client.get("/").json()
        assert "service" in data
        assert "Sumbandila" in data["service"]

    def test_root_response_has_version(self, client):
        data = client.get("/").json()
        assert "version" in data

    def test_root_response_has_docs_link(self, client):
        data = client.get("/").json()
        assert "docs" in data
        assert data["docs"] == "/api/docs"

    def test_health_returns_200(self, client):
        response = client.get("/health")
        assert response.status_code == 200

    def test_health_status_field(self, client):
        data = client.get("/health").json()
        assert data["status"] == "healthy"

    def test_health_has_environment(self, client):
        data = client.get("/health").json()
        assert "environment" in data


# ──────────────────────────────────────────────
# OpenAPI / Docs Availability
# ──────────────────────────────────────────────

class TestAPIDocumentation:
    def test_openapi_schema_accessible(self, client):
        response = client.get("/api/openapi.json")
        assert response.status_code == 200

    def test_openapi_schema_has_info(self, client):
        data = client.get("/api/openapi.json").json()
        assert "info" in data
        assert "title" in data["info"]
