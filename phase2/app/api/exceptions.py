from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse


class TaskNotFoundException(HTTPException):
    def __init__(self, task_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )


class UserNotFoundException(HTTPException):
    def __init__(self, user_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )


class DatabaseConnectionException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Unable to connect to the database"
        )


async def task_not_found_exception_handler(request: Request, exc: TaskNotFoundException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


async def user_not_found_exception_handler(request: Request, exc: UserNotFoundException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


async def database_connection_exception_handler(request: Request, exc: DatabaseConnectionException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )