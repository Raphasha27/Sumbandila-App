from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone
import uuid

from shared_events.event_bus import EventBus
from shared_otel.tracing import setup_otel

app = FastAPI(title="Sumbandila Core Registry Service (Multi-Tenant)")
setup_otel(app, "core-service")
event_bus = EventBus()

# --- Domain Models ---
class CertificateBase(BaseModel):
    institution_id: str
    owner_name: str
    category: str # Education, Healthcare, Legal

class Certificate(CertificateBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    tenant_id: str # 🏢 Multi-tenant ID
    status: str = "Active" # Active, Revoked, Expired
    issued_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    revoked_at: Optional[datetime] = None
    is_deleted: bool = False # 🧠 Soft delete for "Wisdom"

# --- Mock Database ---
registry_db = []

# --- Multi-Tenant Context Simulation ---
async def get_tenant_id():
    # In production, this extracts from JWT: 'x-tenant-id' or token payload
    return "TENANT_RSA_GOV_001"

# --- API Endpoints ---
@app.post("/certificates/", response_model=Certificate)
async def issue_certificate(cert_data: CertificateBase, tenant_id: str = Depends(get_tenant_id)):
    """Issues a new verifiable certificate within a tenant context."""
    new_cert = Certificate(**cert_data.model_dump(), tenant_id=tenant_id)
    registry_db.append(new_cert)
    
    # Publish Event to Redis Stream
    await event_bus.publish("CERT_ISSUED", new_cert.model_dump(), tenant_id)
    
    return new_cert

@app.delete("/certificates/{cert_id}")
async def revoke_certificate(cert_id: str, tenant_id: str = Depends(get_tenant_id)):
    """Revokes a certificate and broadcasts to the network."""
    for cert in registry_db:
        if cert.id == cert_id and cert.tenant_id == tenant_id:
            cert.status = "Revoked"
            cert.revoked_at = datetime.now()
            
            # Publish Event
            await event_bus.publish("CERT_REVOKED", {"id": cert_id, "reason": "Administrative Audit"}, tenant_id)
            
            return {"status": "success", "message": "Certificate revoked and broadcasted."}
    
    raise HTTPException(status_code=404, detail="Certificate not found in tenant registry.")
