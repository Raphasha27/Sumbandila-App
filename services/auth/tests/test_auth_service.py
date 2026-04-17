"""
Unit tests for Sumbandila Identity Service (auth-service)
"""
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

# Import the app - auth service main.py must be importable
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Patch OTEL setup before importing app to avoid telemetry side effects in tests
with patch("shared_otel.tracing.setup_otel"):
    from main import app

client = TestClient(app)


# ──────────────────────────────────────────────
# Health Check
# ──────────────────────────────────────────────

class TestHealthEndpoint:
    def test_health_returns_200(self):
        response = client.get("/health")
        assert response.status_code == 200

    def test_health_response_structure(self):
        response = client.get("/health")
        data = response.json()
        assert "status" in data
        assert "service" in data
        assert data["status"] == "healthy"
        assert data["service"] == "auth-service"

    def test_health_oidc_ready_flag(self):
        response = client.get("/health")
        assert response.json()["federation"] == "OIDC_READY"


# ──────────────────────────────────────────────
# OIDC Discovery
# ──────────────────────────────────────────────

class TestOIDCDiscovery:
    def test_oidc_config_returns_200(self):
        response = client.get("/.well-known/openid-configuration")
        assert response.status_code == 200

    def test_oidc_config_has_required_fields(self):
        response = client.get("/.well-known/openid-configuration")
        data = response.json()
        required_fields = [
            "issuer",
            "authorization_endpoint",
            "token_endpoint",
            "userinfo_endpoint",
            "jwks_uri",
            "response_types_supported",
            "id_token_signing_alg_values_supported",
        ]
        for field in required_fields:
            assert field in data, f"Missing OIDC field: {field}"

    def test_oidc_issuer_domain(self):
        response = client.get("/.well-known/openid-configuration")
        issuer = response.json()["issuer"]
        assert "sumbandila" in issuer

    def test_oidc_supports_rs256(self):
        response = client.get("/.well-known/openid-configuration")
        algs = response.json()["id_token_signing_alg_values_supported"]
        assert "RS256" in algs


# ──────────────────────────────────────────────
# Login Endpoint
# ──────────────────────────────────────────────

class TestLoginEndpoint:
    def test_login_returns_401_on_bad_credentials(self):
        response = client.post("/auth/login", json={
            "email": "attacker@evil.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401

    def test_login_401_error_detail(self):
        response = client.post("/auth/login", json={
            "email": "unknown@user.com",
            "password": "badpass"
        })
        assert response.json()["detail"] == "Invalid credentials"

    def test_login_requires_email_field(self):
        response = client.post("/auth/login", json={"password": "test"})
        assert response.status_code == 422  # Unprocessable Entity

    def test_login_requires_password_field(self):
        response = client.post("/auth/login", json={"email": "test@test.com"})
        assert response.status_code == 422

    def test_login_empty_body_rejected(self):
        response = client.post("/auth/login", json={})
        assert response.status_code == 422
