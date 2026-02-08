from pydantic import BaseModel
from models.user import UserBase


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: str
    email: str


class UserRegisterRequest(UserBase):
    password: str