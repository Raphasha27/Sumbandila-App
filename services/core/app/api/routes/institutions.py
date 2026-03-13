"""
Institutions CRUD API — protected by JWT (admin only).
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.institution import Institution
from app.schemas.institution import InstitutionCreate, InstitutionResponse
from app.core.security import get_current_admin

router = APIRouter(prefix="/institutions", tags=["Institutions"])


@router.get("/", response_model=List[InstitutionResponse], summary="List all institutions")
async def list_institutions(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    return db.query(Institution).offset(skip).limit(limit).all()


@router.get("/{institution_id}", response_model=InstitutionResponse)
async def get_institution(institution_id: str, db: Session = Depends(get_db)):
    inst = db.query(Institution).filter(Institution.id == institution_id).first()
    if not inst:
        raise HTTPException(status_code=404, detail="Institution not found")
    return inst


@router.post("/", response_model=InstitutionResponse, status_code=status.HTTP_201_CREATED)
async def create_institution(
    payload: InstitutionCreate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    inst = Institution(**payload.model_dump())
    db.add(inst)
    db.commit()
    db.refresh(inst)
    return inst


@router.delete("/{institution_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_institution(
    institution_id: str,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    inst = db.query(Institution).filter(Institution.id == institution_id).first()
    if not inst:
        raise HTTPException(status_code=404, detail="Institution not found")
    db.delete(inst)
    db.commit()
