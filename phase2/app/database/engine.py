from sqlmodel import create_engine
from config.settings import settings


engine = create_engine(settings.database_url, echo=True)


def get_engine():
    return engine


def create_tables():
    """Create all tables in the database"""
    # Import here to avoid circular imports and conflicts
    from sqlmodel import SQLModel
    # Import the models to register them with SQLModel
    import models.task
    import models.user
    SQLModel.metadata.create_all(engine)