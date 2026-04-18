from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

try:
        from shared_otel.tracing import setup_otel
        _OTEL_AVAILABLE = True
except ImportError:
        _OTEL_AVAILABLE = False

app = FastAPI(title="Sumbandila Identity Service")

if _OTEL_AVAILABLE:
        setup_otel(app, "auth-service")

class LoginRequest(BaseModel):
        email: str
        password: str

@app.get("/health")
async def health():
        return {
                    "status": "healthy",
                    "service": "auth-service",
                    "federation": "OIDC_READY"
        }

@app.get("/.well-known/openid-configuration")
async def oidc_config():
        """OIDC Discovery Endpoint for Federated Identity."""
        return {
            "issuer": "https://auth.sumbandila.gov.za",
            "authorization_endpoint": "https://auth.sumbandila.gov.za/oauth/authorize",
            "token_endpoint": "https://auth.sumbandila.gov.za/oauth/token",
            "userinfo_endpoint": "https://auth.sumbandila.gov.za/oauth/userinfo",
            "jwks_uri": "https://auth.sumbandila.gov.za/.well-known/jwks.json",
            "response_types_supported": ["code", "token", "id_token"],
            "subject_types_supported": ["public"],
            "id_token_signing_alg_values_supported": ["RS256"]
        }

@app.post("/auth/login")
async def login(credentials: LoginRequest):
        # Simulated auth logic with RBAC
        if (
                    credentials.email == "admin@sumbandila.com"
                    and credentials.password == "admin123"
        ):
                    return {
                                    "access_token": "mock_token_level_5",
                                    "token_type": "bearer",
                                    "user": {
                                                        "name": "Admin Sentinel",
                                                        "role": "SUPER_ADMIN",
                                                        "clearance": "L5"
                                    }
                    }
                raise HTTPException(status_code=401, detail="Invalid credentials")

if __name__ == "__main__":
        uvicorn.run(app, host="0.0.0.0", port=8001)
