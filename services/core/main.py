from fastapi import FastAPI, Query, HTTPException, Request # type: ignore
from pydantic import BaseModel, field_validator # type: ignore
import uvicorn # type: ignore
import re

# Import slowapi for Rate Limiting
from slowapi import Limiter, _rate_limit_exceeded_handler # type: ignore
from slowapi.util import get_remote_address # type: ignore
from slowapi.errors import RateLimitExceeded # type: ignore

# Import core sovereign logic
from packages.core_logic.blockchain import SumbandilaBlockchainSentinel # type: ignore
from packages.core_logic.reputation import SumbandilaReputationEngine # type: ignore
from packages.core_logic.certificate import SumbandilaCertificateSentinel # type: ignore

# Initialize Rate Limiter
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(
    title="Sumbandila Registry Sentinel API",
    version="4.0.0",
    description="Digital Trust Infrastructure for South African institutions and professionals."
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Initialize Sentinel Engines
blockchain = SumbandilaBlockchainSentinel()
reputation = SumbandilaReputationEngine()
certs = SumbandilaCertificateSentinel()

# Mock Data for demonstration
class VerificationResult(BaseModel):
    name: str
    profession: str
    authority: str
    status: str
    status_label: str
    trust_score: int
    fraud_score: float
    blockchain_hash: str
    identity_verified: bool

@app.get("/")
def read_root():
    return {"message": "Sumbandila API v4.0.0 is online", "status": "Healthy"}

class VerificationRequest(BaseModel):
    query: str

    @field_validator('query')
    def sanitize_query(cls, v):
        # Prevent SQL injection or malicious patterns
        if re.search(r'[;\'\"--]', v):
            raise ValueError('Invalid characters in search query')
        return v.strip()

@app.get("/api/v1/verify/", response_model=VerificationResult)
@limiter.limit("5/minute")
def verify_entity(request: Request, q: str = Query(..., description="Name or registration number"), lang: str = "en"):
    # Real-time data simulation
    entity_data = {
        "name": "Dr Jane Smith",
        "reg_number": "HPCSA-12345",
        "authority": "HPCSA",
        "years_active": 8,
        "is_authorized": True,
        "complaint_count": 0,
        "ai_fraud_score": 0.04
    }
    
    if "Jane Smith" in q:
        # Generate Blockchain Hash
        b_hash = blockchain.generate_credential_hash(entity_data)
        
        # Calculate Reputation Score
        rep = reputation.calculate_score(entity_data)
        
        return {
            "name": entity_data["name"],
            "profession": "Doctor",
            "authority": entity_data["authority"],
            "status": "Practising",
            "status_label": "Verified & Registered",
            "trust_score": rep["trust_score"],
            "fraud_score": entity_data["ai_fraud_score"],
            "blockchain_hash": b_hash,
            "identity_verified": True
        }
@app.get("/api/v1/verify/certificate", response_model=dict)
@limiter.limit("2/minute")
def generate_cert(request: Request, q: str = Query(..., description="Name or registration number")):
    # Mock lookup
    if "Jane Smith" in q:
        entity_data = {
            "name": "Dr Jane Smith",
            "reg_number": "HPCSA-12345",
            "blockchain_hash": "0x7f92e3a1b8c4d2e6f0a9b3c5"
        }
        return certs.generate_certificate(entity_data)
    raise HTTPException(status_code=404, detail="Certificate generation failed: Entity not found.")

@app.post("/api/v1/reports/")
def submit_report(report: dict):
    return {"status": "success", "message": "Report submitted to the Sovereign Vault"}

@app.get("/health")
def health_check():
    return {"status": "up", "version": "4.0.0"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
