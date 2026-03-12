"""
Pydantic schemas for Professional — request/response validation.
"""
from pydantic import BaseModel
from typing import Optional
import uuid


class ProfessionalBase(BaseModel):
    full_name: str
    profession: str
    registration_number: Optional[str] = None
    hpcsa_number: Optional[str] = None
    lpc_number: Optional[str] = None
    psytech_number: Optional[str] = None
    authority: Optional[str] = None
    status: Optional[str] = None
    standing: Optional[str] = None
    fidelity_fund_status: Optional[str] = None
    fidelity_fund_year: Optional[str] = None
    practice_address: Optional[str] = None
    province: Optional[str] = None
    hospital_affiliation: Optional[str] = None
    specialisation: Optional[str] = None
    risk: str = "Low"
    rating: Optional[str] = None
    warning: Optional[str] = None


class ProfessionalCreate(ProfessionalBase):
    pass


class ProfessionalResponse(ProfessionalBase):
    id: uuid.UUID
    is_flagged: bool = False
    qr_code_url: Optional[str] = None

    class Config:
        from_attributes = True
