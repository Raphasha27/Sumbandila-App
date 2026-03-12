"""
Scam Reports public API — citizens can report bogus entities.
"""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from ..database.session import get_db
from ..models.verification import ScamReport

router = APIRouter(prefix="/reports", tags=["Scam Reports"])


class ScamReportRequest(BaseModel):
    entity_name: str
    entity_type: str       # College, Doctor, Lawyer
    description: str
    reporter_contact: Optional[str] = None   # Optional — anonymised


@router.post("/", status_code=status.HTTP_201_CREATED, summary="Submit a fraud report")
async def submit_report(payload: ScamReportRequest, db: Session = Depends(get_db)):
    """
    Allows citizens to anonymously report bogus institutions or impersonators.
    Reports are reviewed by Sumbandila officials and escalated to SAPS/DHET/LPC.
    """
    report = ScamReport(
        entity_name=payload.entity_name,
        entity_type=payload.entity_type,
        description=payload.description,
        reporter_contact=payload.reporter_contact,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return {
        "message": "Your report has been received and will be reviewed by Sumbandila officials.",
        "reference_id": str(report.id),
        "status": report.status,
    }


@router.get("/", summary="List all scam reports (admin)")
async def list_reports(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return db.query(ScamReport).order_by(ScamReport.created_at.desc()).offset(skip).limit(limit).all()
