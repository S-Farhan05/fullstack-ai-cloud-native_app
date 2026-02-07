from sqlmodel import create_engine
from app.config.settings import settings

# Use the Neon PostgreSQL database URL from settings
engine = create_engine(settings.database_url, echo=True)