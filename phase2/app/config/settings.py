from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    database_url: str = ""
    debug: bool = False
    jwt_secret_key: str = "fallback_secret_for_development_purpose_only"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    class Config:
        env_file = ".env"


# Initialize settings
settings = Settings()

# Use the database URL from environment, with validation
if not settings.database_url:
    raise ValueError("DATABASE_URL environment variable is not set in .env file")