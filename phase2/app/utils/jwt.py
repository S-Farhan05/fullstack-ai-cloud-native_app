from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from models.user import User
from sqlmodel import Session
from config.settings import settings


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Create a JWT access token with the provided data.

    Args:
        data (dict): The data to encode in the token (typically user info)
        expires_delta (timedelta, optional): Token expiration time

    Returns:
        str: Encoded JWT token
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    return encoded_jwt


def verify_token(token: str) -> Optional[dict]:
    """
    Verify a JWT token and return the decoded data if valid.

    Args:
        token (str): The JWT token to verify

    Returns:
        dict: Decoded token data if valid, None otherwise
    """
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        return payload
    except JWTError:
        return None


def get_current_user(token: str, session: Session) -> Optional[User]:
    """
    Get the current user from the provided token.

    Args:
        token (str): The JWT token containing user info
        session (Session): Database session

    Returns:
        User: User object if token is valid and user exists, None otherwise
    """
    payload = verify_token(token)
    if payload is None:
        return None

    user_id = payload.get("sub")
    if user_id is None:
        return None

    user = session.get(User, user_id)
    return user