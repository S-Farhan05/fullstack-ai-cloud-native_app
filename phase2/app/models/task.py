from sqlmodel import SQLModel, Field, Column, DateTime, Relationship
from typing import Optional
from datetime import datetime
from sqlalchemy import text
import uuid


class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)


class TaskCreate(TaskBase):
    # user_id will be provided in the path, not in the request body
    pass  # We'll add user_id separately when creating the task


class TaskUpdate(SQLModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: Optional[bool] = Field(default=None)


class Task(TaskBase, table=True):
    __table_args__ = {"extend_existing": True}

    id: Optional[uuid.UUID] = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        sa_column_kwargs={"server_default": text("gen_random_uuid()"), "nullable": False}
    )
    user_id: uuid.UUID = Field(foreign_key="user.id", index=True)
    created_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), default=datetime.now)
    )
    updated_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), default=datetime.now, onupdate=datetime.now)
    )

    # Relationship to User
    user: Optional["User"] = Relationship(back_populates="tasks")