from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.database.session import get_session
from app.models.task import Task, TaskCreate, TaskUpdate
from app.models.user import User
from app.middleware.auth_middleware import get_current_active_user
from app.schemas.task import TaskResponse, TaskUpdateRequest, TaskCreateRequest
from app.database.crud import (
    create_task, get_task_by_id, get_tasks_by_user,
    update_task, delete_task, toggle_task_completion, create_task_from_obj
)
from typing import List

router = APIRouter(tags=["tasks"])


@router.get("/tasks", response_model=List[TaskResponse])
def list_tasks(
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Get all tasks for the authenticated user"""
    tasks = get_tasks_by_user(session, current_user.id)
    return tasks


@router.post("/tasks", response_model=TaskResponse)
def create_task_endpoint(
    task: TaskCreateRequest,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Create a new task for the authenticated user"""
    # Create a new task object with the authenticated user's ID
    db_task = Task(
        title=task.title,
        description=task.description,
        completed=task.completed,
        user_id=current_user.id  # Use the authenticated user's ID
    )

    created_task = create_task_from_obj(session, db_task)
    return created_task


@router.get("/tasks/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: str,  # Changed to str to accommodate UUID
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Get a specific task by ID for the authenticated user"""
    db_task = get_task_by_id(session, task_id, current_user.id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task_endpoint(
    task_id: str,  # Changed to str to accommodate UUID
    task_update: TaskUpdateRequest,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Update a specific task for the authenticated user"""
    db_task = update_task(session, task_id, current_user.id, task_update)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@router.delete("/tasks/{task_id}")
def delete_task_endpoint(
    task_id: str,  # Changed to str to accommodate UUID
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Delete a specific task for the authenticated user"""
    success = delete_task(session, task_id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}


@router.patch("/tasks/{task_id}/toggle", response_model=TaskResponse)
def toggle_task_completion_endpoint(
    task_id: str,  # Changed to str to accommodate UUID
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session)
):
    """Toggle the completion status of a specific task for the authenticated user"""
    db_task = toggle_task_completion(session, task_id, current_user.id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task