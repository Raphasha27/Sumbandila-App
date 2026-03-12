"""
Professionals CRUD API — protected by JWT (admin only).
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database.session import get_db
from ..models.professional import Professional
from ..schemas.professional import ProfessionalCreate, ProfessionalResponse
from ..core.security import get_current_admin

router = APIRouter(prefix="/professionals", tags=["Professionals"])


@router.get("/", response_model=List[ProfessionalResponse])
async def list_professionals(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    return db.query(Professional).offset(skip).limit(limit).all()


@router.get("/{professional_id}", response_model=ProfessionalResponse)
async def get_professional(professional_id: str, db: Session = Depends(get_db)):
    prof = db.query(Professional).filter(Professional.id == professional_id).first()
    if not prof:
        raise HTTPException(status_code=404, detail="Professional not found")
    return prof


@router.post("/", response_model=ProfessionalResponse, status_code=status.HTTP_201_CREATED)
async def create_professional(
    payload: ProfessionalCreate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    prof = Professional(**payload.model_dump())
    db.add(prof)
    db.commit()
    db.refresh(prof)
    return prof


@router.delete("/{professional_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_professional(
    professional_id: str,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    prof = db.query(Professional).filter(Professional.id == professional_id).first()
    if not prof:
        raise HTTPException(status_code=404, detail="Professional not found")
    db.delete(prof)
    db.commit()
