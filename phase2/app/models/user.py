from sqlmodel import SQLModel, Field, Column, DateTime, Relationship
from typing import Optional
from datetime import datetime
from sqlalchemy import text
import uuid


class UserBase(SQLModel):
    email: str = Field(unique=True, nullable=False, max_length=255)
    name: Optional[str] = Field(default=None, max_length=100)
    email_verified: bool = Field(default=False)


class UserCreate(UserBase):
    password: str  # This will be hashed before storing


class UserUpdate(SQLModel):
    name: Optional[str] = Field(default=None, max_length=100)
    email_verified: Optional[bool] = Field(default=None)


class User(UserBase, table=True):
    __table_args__ = {"extend_existing": True}

    id: Optional[uuid.UUID] = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        sa_column_kwargs={"server_default": text("gen_random_uuid()"), "nullable": False}
    )
    hashed_password: str = Field(nullable=False)
    created_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), default=datetime.now)
    )
    updated_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), default=datetime.now, onupdate=datetime.now)
    )

    # Relationship to tasks
    tasks: list["Task"] = Relationship(back_populates="user")