from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,         # Detect stale connections
    pool_size=10,               # Connection pool for scalability
    max_overflow=20,
    echo=settings.DEBUG,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """Dependency injection for FastAPI routes."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
