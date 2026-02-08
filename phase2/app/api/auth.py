from fastapi import APIRouter, Depends, HTTPException, status, Form
from sqlmodel import Session
from database.session import get_session
from models.user import User, UserCreate
from services.auth_service import authenticate_user, create_user, get_user_by_email
from utils.jwt import create_access_token
from schemas.auth import Token, UserRegisterRequest
from datetime import timedelta
from config.settings import settings


router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=Token)
def register(user_create: UserRegisterRequest, session: Session = Depends(get_session)):
    """
    Register a new user with email and password.

    Args:
        user_create (UserRegisterRequest): User registration data
        session (Session): Database session

    Returns:
        Token: JWT access token
    """
    # Check if user already exists
    existing_user = get_user_by_email(session, user_create.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists"
        )

    # Create the user
    user = create_user(session, user_create)

    # Create access token
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
def login(email: str = Form(...), password: str = Form(...), session: Session = Depends(get_session)):
    """
    Authenticate user and return access token.

    Args:
        email (str): User's email address
        password (str): User's password
        session (Session): Database session

    Returns:
        Token: JWT access token
    """
    user = authenticate_user(session, email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token = create_access_token(data={"sub": str(user.id), "email": user.email})

    return {"access_token": access_token, "token_type": "bearer"}