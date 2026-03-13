"""
/verify endpoint — the primary public-facing search API.
"""
from fastapi import APIRouter, Depends, Request, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.verification_service import verify_entity

router = APIRouter(prefix="/verify", tags=["Verification"])


@router.get("/", summary="Search for an institution or professional")
async def verify(
    request: Request,
    q: str = Query(..., min_length=2, description="Institution or professional name / registration number"),
    lang: str = Query("en", description="Response language: en, zu, af, nso, ts"),
    db: Session = Depends(get_db),
):
    """
    The core Sumbandila search endpoint.
    Checks the national registry for colleges, doctors, and lawyers.
    Returns verification status, authority, risk level, and multilingual label.
    """
    ip = request.client.host if request.client else "unknown"
    return verify_entity(query=q, db=db, lang=lang, requester_ip=ip)
