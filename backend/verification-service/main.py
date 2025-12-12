from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title='Sumbandila - Verification Service')

class VerifyRequest(BaseModel):
    provider_type: str
    provider_identifier: str
    country: Optional[str] = 'ZA'

# sample in-memory dataset - replace with real connectors
providers = {
    ('education','COLL-1234'): {'registered': True, 'accreditation': 'Dept of Education', 'valid': True, 'name':'Sunrise College'},
    ('medical','DOC-4321'): {'registered': True, 'accreditation': 'Health Council', 'valid': True, 'name':'Dr. A. Medic'}
}

@app.post('/verify')
def verify(req: VerifyRequest):
    key = (req.provider_type.lower(), req.provider_identifier.upper())
    result = providers.get(key)
    if result:
        return {'status':'found','result':result}
    return {'status':'not_found','result':{'registered':False}}
