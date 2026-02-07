# Quickstart Guide: Authentication Implementation

## Overview
This guide provides the essential steps to implement the authentication system using Better Auth for frontend and JWT verification in FastAPI backend.

## Prerequisites
- Node.js and npm for frontend development
- Python 3.8+ for backend development
- Next.js 16+ with App Router
- FastAPI
- SQLModel for ORM
- Neon Serverless PostgreSQL

## Frontend Setup (Next.js + Better Auth)

### 1. Install Better Auth
```bash
npm install better-auth @better-auth/react
```

### 2. Initialize Better Auth with JWT
```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { jwt } from "@better-auth/jwt";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: {
    provider: "postgresql",
    url: process.env.DATABASE_URL!,
  },
  plugins: [
    jwt({
      secret: process.env.JWT_SECRET!,
    }),
  ],
});
```

### 3. Configure Better Auth Provider
```typescript
// app/providers/auth-provider.tsx
"use client";

import { AuthProvider } from "@better-auth/react";

export function AuthProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider
      config={{
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        // JWT configuration will be handled here
      }}
    >
      {children}
    </AuthProvider>
  );
}
```

### 4. Create Authentication Components
```typescript
// components/auth/login-form.tsx
"use client";

import { useSignIn } from "@better-auth/react";

export function LoginForm() {
  const { signIn } = useSignIn();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/dashboard",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

## Backend Setup (FastAPI + JWT Verification)

### 1. Install Required Packages
```bash
pip install python-jose[cryptography] python-multipart python-sqlmodel
```

### 2. Create JWT Verification Dependency
```python
# backend/auth/jwt.py
from datetime import datetime, timedelta
from typing import Optional
import os
from fastapi import HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from pydantic import BaseModel

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()

class TokenData(BaseModel):
    user_id: str
    email: str

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> TokenData:
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        email: str = payload.get("email")
        if user_id is None or email is None:
            raise credentials_exception
        token_data = TokenData(user_id=user_id, email=email)
    except JWTError:
        raise credentials_exception
    return token_data
```

### 3. Create Authentication Routes
```python
# backend/api/auth.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from ..models.user import User
from ..database import get_session
from sqlmodel import Session
from ..auth.jwt import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["authentication"])

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, session: Session = Depends(get_session)):
    # Verify user credentials against Better Auth
    # In practice, you'd call Better Auth's API to verify credentials
    # For this example, assuming user exists and password is valid
    user = session.get(User, request.email)  # Simplified lookup

    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id, "email": user.email},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}
```

### 4. Protect Task Routes with Authentication
```python
# backend/api/tasks.py
from fastapi import APIRouter, Depends
from ..auth.jwt import verify_token, TokenData
from ..models.task import Task
from ..database import get_session
from sqlmodel import Session, select
from typing import List

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/", response_model=List[Task])
async def get_tasks(
    current_user: TokenData = Depends(verify_token),
    session: Session = Depends(get_session)
):
    # Only return tasks that belong to the current user
    statement = select(Task).where(Task.user_id == current_user.user_id)
    tasks = session.exec(statement).all()
    return tasks

@router.post("/", response_model=Task)
async def create_task(
    task: Task,
    current_user: TokenData = Depends(verify_token),
    session: Session = Depends(get_session)
):
    # Ensure task is assigned to the current user
    task.user_id = current_user.user_id
    session.add(task)
    session.commit()
    session.refresh(task)
    return task
```

## Integration Steps

### 1. Frontend API Calls with JWT
```typescript
// lib/api-client.ts
import { useAuth } from "@better-auth/react";

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("better-auth-session-token"); // Or however Better Auth stores it

  return fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

// Example usage in a component
export function TaskList() {
  const { session } = useAuth();

  useEffect(() => {
    if (session?.accessToken) {
      fetch('/api/tasks', {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`
        }
      })
      .then(response => response.json())
      .then(setTasks);
    }
  }, [session]);
}
```

### 2. Environment Variables
Create `.env.local` for frontend:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:4000
BETTER_AUTH_SECRET=your-secret-key-here
JWT_SECRET=your-jwt-secret-here
```

Create `.env` for backend:
```
DATABASE_URL=your-neon-database-url
JWT_SECRET_KEY=your-jwt-secret-here
```

## Testing the Implementation

### 1. Unit Tests for JWT Verification
```python
# tests/test_auth.py
import pytest
from backend.auth.jwt import create_access_token, verify_token
from fastapi.security import HTTPAuthorizationCredentials

def test_create_and_verify_token():
    token_data = {"sub": "test-user-id", "email": "test@example.com"}
    token = create_access_token(token_data)

    # Mock credentials object
    credentials = HTTPAuthorizationCredentials(scheme="Bearer", credentials=token)

    result = verify_token(credentials)
    assert result.user_id == "test-user-id"
    assert result.email == "test@example.com"
```

### 2. Integration Test for Protected Routes
```python
# tests/test_protected_routes.py
def test_get_tasks_with_valid_token(client, test_user_token):
    response = client.get("/api/tasks/",
                         headers={"Authorization": f"Bearer {test_user_token}"})
    assert response.status_code == 200

def test_get_tasks_without_token(client):
    response = client.get("/api/tasks/")
    assert response.status_code == 401
```

## Deployment Considerations

1. **Secret Management**: Store JWT secrets securely in your deployment environment
2. **HTTPS**: Always use HTTPS in production to protect JWT tokens in transit
3. **Token Expiration**: Adjust token expiration times based on security requirements
4. **Rate Limiting**: Implement rate limiting on authentication endpoints
5. **Logging**: Log authentication events for security monitoring