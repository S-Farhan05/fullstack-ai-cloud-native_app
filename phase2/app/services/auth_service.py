from sqlmodel import Session, select
from models.user import User, UserCreate
from utils.jwt import create_access_token
import bcrypt
from typing import Optional


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plaintext password against a hashed password.

    Args:
        plain_password (str): The plaintext password to verify
        hashed_password (str): The hashed password to compare against

    Returns:
        bool: True if the passwords match, False otherwise
    """
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


def get_password_hash(password: str) -> str:
    """
    Hash a plaintext password.

    Args:
        password (str): The plaintext password to hash

    Returns:
        str: The hashed password
    """
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def authenticate_user(session: Session, email: str, password: str) -> Optional[User]:
    """
    Authenticate a user with email and password.

    Args:
        session (Session): Database session
        email (str): User's email address
        password (str): User's plaintext password

    Returns:
        User: User object if authentication is successful, None otherwise
    """
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if not user or not verify_password(password, user.hashed_password):
        return None

    return user


def create_user(session: Session, user_create: UserCreate) -> User:
    """
    Create a new user with the provided data.

    Args:
        session (Session): Database session
        user_create (UserCreate): User creation data including email and plaintext password

    Returns:
        User: The created user object
    """
    # Hash the password
    hashed_password = get_password_hash(user_create.password)

    # Create the user object with hashed password
    user = User(
        email=user_create.email,
        name=user_create.name,
        email_verified=user_create.email_verified,
        hashed_password=hashed_password
    )

    # Add to session and commit
    session.add(user)
    session.commit()
    session.refresh(user)

    return user


def get_user_by_email(session: Session, email: str) -> Optional[User]:
    """
    Get a user by their email address.

    Args:
        session (Session): Database session
        email (str): User's email address

    Returns:
        User: User object if found, None otherwise
    """
    statement = select(User).where(User.email == email)
    return session.exec(statement).first()