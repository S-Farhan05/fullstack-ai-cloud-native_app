from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.task import TaskCreate, TaskUpdate
import uuid


class TaskCreateRequest(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False


class TaskResponse(TaskCreate):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class TaskUpdateRequest(TaskUpdate):
    pass