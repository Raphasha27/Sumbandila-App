from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import uvicorn
from shared_otel.tracing import setup_otel

app = FastAPI(title="Sumbandila Identity Service")
setup_otel(app, "auth-service")

class LoginRequest(BaseModel):
    email: str
    password: str

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "auth-service"}

@app.post("/auth/login")
async def login(credentials: LoginRequest):
    # Simulated auth logic with RBAC
    if credentials.email == "admin@sumbandila.com" and credentials.password == "admin123":
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
