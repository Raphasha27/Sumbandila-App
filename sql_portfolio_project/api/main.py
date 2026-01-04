from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import databases
import sqlalchemy
from datetime import date

# DATABASE CONFIG
DATABASE_URL = "postgresql://user:password@localhost/sumbandila_cert_db"
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

# INIT APP
app = FastAPI(
    title="Education Verification API",
    description="A senior-level API for verifying academic credentials securely.",
    version="1.0.0"
)

# MODELS
class CertificateVerifyRequest(BaseModel):
    certificate_number: str

class VerificationResponse(BaseModel):
    certificate_number: str
    status: str
    student_name: str
    course: str
    institution: str
    issue_date: date

# ROUTES
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/")
def read_root():
    return {"status": "Global Education Verification Registry is Online"}

@app.get("/verify/{cert_number}", response_model=VerificationResponse)
async def verify_certificate(cert_number: str):
    """
    Verifies a certificate against the immutable registry.
    """
    query = """
        SELECT 
            certificate_number,
            first_name || ' ' || last_name as student_name,
            course_name as course,
            institution_name as institution,
            issue_date,
            status
        FROM certificate_verification_view
        WHERE certificate_number = :cert_num
    """
    result = await database.fetch_one(query=query, values={"cert_num": cert_number})
    
    if not result:
        raise HTTPException(status_code=404, detail="Certificate ID not found in Global Registry.")
    
    if result['status'] == 'REVOKED':
        raise HTTPException(status_code=410, detail="WARNING: This certificate has been REVOKED by the issuer.")

    return result

@app.post("/verify/bulk")
async def verify_bulk( cert_numbers: List[str] ):
    """
    Bulk verification for Employers (Check 50 candidates at once).
    """
    # Logic implementation placeholder
    return {"message": f"Received {len(cert_numbers)} documents for automated verification."}
