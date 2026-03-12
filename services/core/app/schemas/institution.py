"""
Pydantic schemas for Institution — request/response validation.
"""
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum
import uuid


class RiskLevel(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"


class RegistrationStatus(str, Enum):
    ACTIVE = "Active"
    DEREGISTERED = "Deregistered"
    SUSPENDED = "Suspended"
    PENDING = "Pending"
    UNVERIFIED = "Unverified"


class InstitutionBase(BaseModel):
    name: str
    registration_number: Optional[str] = None
    emis_number: Optional[str] = None
    saqa_id: Optional[str] = None
    nqf_level: Optional[str] = None
    category: Optional[str] = None
    institution_type: Optional[str] = None
    authority: Optional[str] = None
    status: RegistrationStatus = RegistrationStatus.UNVERIFIED
    risk: RiskLevel = RiskLevel.MEDIUM
    physical_address: Optional[str] = None
    province: Optional[str] = None
    website: Optional[str] = None
    warning: Optional[str] = None
    valid_until: Optional[str] = None


class InstitutionCreate(InstitutionBase):
    pass


class InstitutionResponse(InstitutionBase):
    id: uuid.UUID
    qr_code_url: Optional[str] = None
    is_flagged: bool = False

    class Config:
        from_attributes = True
