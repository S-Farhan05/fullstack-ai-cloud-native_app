from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import Session
from utils.jwt import verify_token, get_current_user
from database.session import get_session
from models.user import User


security = HTTPBearer()


def get_current_active_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: Session = Depends(get_session)
) -> User:
    """
    Dependency to get the current active user from the JWT token.

    Args:
        credentials: HTTP authorization credentials containing the JWT token
        session: Database session

    Returns:
        User: The authenticated user object

    Raises:
        HTTPException: If token is invalid, expired, or user doesn't exist
    """
    token = credentials.credentials

    # Verify the token
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Extract user_id from token
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Get user from database
    user = session.get(User, user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user