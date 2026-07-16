"""
Core configuration for the Sumbandila Verification Platform.
All secrets MUST be set via environment variables in production.
"""
import os
from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Sumbandila Verification API"
    VERSION: str = "3.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = ENVIRONMENT == "development"

    # Database
    DATABASE_URL: str = Field(default="postgresql://user:pass@localhost:5432/sumbandila_db", env="DATABASE_URL")

    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")

    # Security
    SECRET_KEY: str = Field(default="CHANGE-ME-IN-PRODUCTION-USE-ENV-VAR", env="SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Rate limiting
    RATE_LIMIT_PER_MINUTE: int = 60

    # Multilingual
    SUPPORTED_LANGUAGES: list = ["en", "zu", "nso", "ts", "af"]
    DEFAULT_LANGUAGE: str = "en"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
