"""
Professional database model.
Covers doctors (HPCSA), lawyers (LPC), and other regulated professions.
"""
import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Boolean, Enum, Text
from sqlalchemy.dialects.postgresql import UUID
from ..database.base import Base
import enum


class ProfessionType(str, enum.Enum):
    DOCTOR = "Doctor"
    SPECIALIST = "Specialist"
    PSYCHOLOGIST = "Psychologist"
    NURSE = "Nurse"
    ATTORNEY = "Attorney"
    ADVOCATE = "Advocate"
    CONVEYANCER = "Conveyancer"
    OTHER = "Other"


class FidelityFundStatus(str, enum.Enum):
    VALID = "Valid"
    EXPIRED = "Expired"
    NOT_APPLICABLE = "N/A"
    REVOKED = "Revoked"


class Professional(Base):
    __tablename__ = "professionals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String(255), nullable=False, index=True)
    profession = Column(Enum(ProfessionType), nullable=False)

    # Registration
    registration_number = Column(String(100), unique=True, index=True)
    hpcsa_number = Column(String(100), nullable=True)
    lpc_number = Column(String(100), nullable=True)
    psytech_number = Column(String(100), nullable=True)

    # Authority
    authority = Column(String(200))         # HPCSA, LPC, GCB, SAICA
    status = Column(String(50))             # Practising, Suspended, Struck off
    standing = Column(String(200), nullable=True)

    # For lawyers only
    fidelity_fund_status = Column(Enum(FidelityFundStatus), default=FidelityFundStatus.NOT_APPLICABLE)
    fidelity_fund_year = Column(String(10), nullable=True)

    # Location
    practice_address = Column(String(500), nullable=True)
    province = Column(String(50), nullable=True)
    hospital_affiliation = Column(String(300), nullable=True)

    # Specialisation
    specialisation = Column(String(300), nullable=True)
    medical_aid_networks = Column(Text, nullable=True)  # JSON list

    # Meta
    is_flagged = Column(Boolean, default=False)
    warning = Column(String(1000), nullable=True)
    risk = Column(String(20), default="Low")
    rating = Column(String(5), nullable=True)
    qr_code_url = Column(String(500), nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), onupdate=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<Professional {self.full_name} [{self.profession}]>"
