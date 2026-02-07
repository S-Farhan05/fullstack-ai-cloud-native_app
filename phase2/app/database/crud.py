from sqlmodel import Session, select
from app.models.task import Task, TaskCreate, TaskUpdate
from typing import Optional
from datetime import datetime
import uuid


def create_task(session: Session, task: TaskCreate) -> Task:
    """Create a new task in the database from TaskCreate schema"""
    # Create a Task object from TaskCreate, adding required fields
    db_task = Task(
        title=task.title,
        description=task.description,
        completed=task.completed,
        user_id=task.user_id
    )
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


def create_task_from_obj(session: Session, task: Task) -> Task:
    """Create a new task in the database from Task object"""
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


def get_task_by_id(session: Session, task_id: str | uuid.UUID, user_id: str | uuid.UUID) -> Optional[Task]:
    """Get a task by its ID for a specific user"""
    # Convert string IDs to UUIDs for comparison
    try:
        task_uuid = task_id if isinstance(task_id, uuid.UUID) else uuid.UUID(task_id)
        user_uuid = user_id if isinstance(user_id, uuid.UUID) else uuid.UUID(user_id)
    except ValueError:
        return None

    statement = select(Task).where(Task.id == task_uuid, Task.user_id == user_uuid)
    return session.exec(statement).first()


def get_tasks_by_user(session: Session, user_id: str | uuid.UUID) -> list[Task]:
    """Get all tasks for a specific user"""
    # Convert string ID to UUID for comparison
    try:
        user_uuid = user_id if isinstance(user_id, uuid.UUID) else uuid.UUID(user_id)
    except ValueError:
        return []

    statement = select(Task).where(Task.user_id == user_uuid)
    return session.exec(statement).all()


def update_task(session: Session, task_id: str | uuid.UUID, user_id: str | uuid.UUID, task_update: TaskUpdate) -> Optional[Task]:
    """Update a task for a specific user"""
    db_task = get_task_by_id(session, task_id, user_id)
    if db_task:
        update_data = task_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_task, key, value)
        db_task.updated_at = datetime.now()
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
    return db_task


def delete_task(session: Session, task_id: str | uuid.UUID, user_id: str | uuid.UUID) -> bool:
    """Delete a task for a specific user"""
    db_task = get_task_by_id(session, task_id, user_id)
    if db_task:
        session.delete(db_task)
        session.commit()
        return True
    return False


def toggle_task_completion(session: Session, task_id: str | uuid.UUID, user_id: str | uuid.UUID) -> Optional[Task]:
    """Toggle the completion status of a task for a specific user"""
    db_task = get_task_by_id(session, task_id, user_id)
    if db_task:
        db_task.completed = not db_task.completed
        db_task.updated_at = datetime.now()
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
    return db_task