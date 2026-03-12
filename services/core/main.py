"""
Sumbandila Verification API — V2 Production Entry Point
"""
from fastapi import FastAPI  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from fastapi.middleware.trustedhost import TrustedHostMiddleware  # type: ignore
from contextlib import asynccontextmanager

from app.core.config import settings  # type: ignore
from app.database.base import Base  # type: ignore
from app.database.session import engine  # type: ignore
from app.api.routes.verify import router as verify_router  # type: ignore
from app.api.routes.institutions import router as institutions_router  # type: ignore
from app.api.routes.professionals import router as professionals_router  # type: ignore
from app.api.routes.reports import router as reports_router  # type: ignore


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup
    Base.metadata.create_all(bind=engine)
    print("✅ Sumbandila DB tables initialised")
    yield
    print("🛑 Sumbandila API shutting down")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="""
## 🛡️ Sumbandila Verification API

**Trust through verification — in the palm of your hand.**

Instantly verify:
- 🎓 Colleges, schools, and universities (DHET / SAQA / CHE)
- 🏥 Doctors and healthcare professionals (HPCSA / Psytech)
- ⚖️ Lawyers and advocates (LPC / FFC status)

---
**Security:** JWT authentication | Rate limiting | Audit logging | IP hashing
    """,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
)

# --- Security Middleware ---
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"] if settings.DEBUG else ["localhost"],
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)

# --- Routes ---
app.include_router(verify_router, prefix="/api/v1")
app.include_router(institutions_router, prefix="/api/v1")
app.include_router(professionals_router, prefix="/api/v1")
app.include_router(reports_router, prefix="/api/v1")


@app.get("/", tags=["Health"])
async def root():
    return {
        "service": "Sumbandila Verification API",
        "version": settings.VERSION,
        "status": "operational",
        "docs": "/api/docs",
    }


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy", "environment": settings.ENVIRONMENT}
