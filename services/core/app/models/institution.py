"""
Institution database model.
Represents any educational or professional body registered in South Africa.
"""
import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Boolean, Enum, Integer
from sqlalchemy.dialects.postgresql import UUID
from ..database.base import Base
import enum


class RegistrationStatus(str, enum.Enum):
    ACTIVE = "Active"
    DEREGISTERED = "Deregistered"
    SUSPENDED = "Suspended"
    PENDING = "Pending"
    UNVERIFIED = "Unverified"


class RiskLevel(str, enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"


class Institution(Base):
    __tablename__ = "institutions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False, index=True)
    registration_number = Column(String(100), unique=True, index=True)
    emis_number = Column(String(100), nullable=True)
    saqa_id = Column(String(50), nullable=True)
    nqf_level = Column(String(50), nullable=True)

    # Classification
    category = Column(String(50))           # Education, Healthcare, Legal
    institution_type = Column(String(100))   # Public University, Private HEI, TVET

    # Registration Details
    authority = Column(String(200))          # DHET, CHE, QCTO, Umalusi
    status = Column(Enum(RegistrationStatus), default=RegistrationStatus.UNVERIFIED)
    risk = Column(Enum(RiskLevel), default=RiskLevel.MEDIUM)

    # Location
    physical_address = Column(String(500), nullable=True)
    province = Column(String(50), nullable=True)
    website = Column(String(300), nullable=True)

    # Flags & Meta
    is_flagged = Column(Boolean, default=False)
    warning = Column(String(1000), nullable=True)
    valid_until = Column(String(50), nullable=True)

    # QR Code
    qr_code_url = Column(String(500), nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), onupdate=lambda: datetime.now(timezone.utc))
    verified_at = Column(DateTime(timezone=True), nullable=True)

    def __repr__(self):
        return f"<Institution {self.name} [{self.status}]>"
