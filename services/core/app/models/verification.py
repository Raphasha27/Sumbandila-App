"""
Verification Log model — tracks every search and its result for audit trails.
"""
import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from ..database.base import Base


class VerificationLog(Base):
    __tablename__ = "verification_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    query = Column(String(500), nullable=False)
    result_type = Column(String(50))        # institution, professional, not_found
    result_name = Column(String(300), nullable=True)
    result_status = Column(String(50), nullable=True)
    risk_level = Column(String(20), nullable=True)

    # Requester info (anonymised)
    ip_hash = Column(String(64), nullable=True)
    language = Column(String(10), default="en")

    # Timestamps
    searched_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class ScamReport(Base):
    __tablename__ = "scam_reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    entity_name = Column(String(300), nullable=False)
    entity_type = Column(String(50))        # College, Doctor, Lawyer
    description = Column(Text, nullable=False)
    reporter_contact = Column(String(200), nullable=True)  # Optional
    status = Column(String(50), default="Pending Investigation")

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    resolved_at = Column(DateTime(timezone=True), nullable=True)
