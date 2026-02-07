# API Client Contract Specification

**Feature**: Frontend Application & Full-Stack Integration
**Date**: 2026-02-07
**Status**: Complete

## Overview

This document specifies the API client interface used by the Next.js frontend to communicate with the FastAPI backend. The API client handles JWT token management, request formatting, and error handling for all backend interactions.

---

## Base Configuration

**Base URL**: `http://127.0.0.1:8001` (development) or `process.env.NEXT_PUBLIC_API_URL`
**Authentication**: JWT Bearer token in Authorization header
**Content Type**: `application/json` (except login endpoint)

---

## API Client Class

### Constructor

```typescript
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }
}
```

### Private Methods

#### getAuthHeaders()

Returns headers with JWT token if available.

```typescript
private getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}
```

---

## Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request**:
```typescript
async register(
  email: string,
  password: string,
  name?: string
): Promise<AuthResponse>
```

**HTTP Request**:
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "email_verified": false
}
```

**Success Response** (201 Created):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Error Responses**:
- 400 Bad Request: Invalid input (weak password, invalid email)
- 409 Conflict: Email already exists

**Side Effects**:
- Stores `access_token` in localStorage
- User is automatically authenticated

**Usage**:
```typescript
try {
  const response = await apiClient.register(
    'user@example.com',
    'password123',
    'John Doe'
  );
  // Token stored, redirect to dashboard
} catch (error) {
  // Display error message
}
```

---

### POST /auth/login

Authenticate an existing user.

**Request**:
```typescript
async login(
  email: string,
  password: string
): Promise<AuthResponse>
```

**HTTP Request**:
```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded

email=user@example.com&password=password123
```

**Success Response** (200 OK):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Error Responses**:
- 401 Unauthorized: Invalid credentials

**Side Effects**:
- Stores `access_token` in localStorage
- User is authenticated

**Usage**:
```typescript
try {
  const response = await apiClient.login(
    'user@example.com',
    'password123'
  );
  // Token stored, redirect to dashboard
} catch (error) {
  // Display "Invalid email or password"
}
```

---

### logout()

Clear authentication token and log out user.

**Request**:
```typescript
logout(): void
```

**Implementation**:
```typescript
logout() {
  localStorage.removeItem('access_token');
}
```

**Side Effects**:
- Removes `access_token` from localStorage
- User is no longer authenticated

**Usage**:
```typescript
apiClient.logout();
router.push('/login');
```

---

## Task Management Endpoints

### GET /users/tasks

Fetch all tasks for the authenticated user.

**Request**:
```typescript
async getTasks(): Promise<Task[]>
```

**HTTP Request**:
```http
GET /users/tasks
Authorization: Bearer <token>
```

**Success Response** (200 OK):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project",
    "description": "Finish the todo app",
    "completed": false,
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "created_at": "2026-02-07T10:00:00Z",
    "updated_at": "2026-02-07T10:00:00Z"
  }
]
```

**Error Responses**:
- 401 Unauthorized: Missing or invalid token

**Side Effects**:
- On 401: Removes token, redirects to login

**Usage**:
```typescript
try {
  const tasks = await apiClient.getTasks();
  setTasks(tasks);
} catch (error) {
  // Display error or redirect to login
}
```

---

### POST /users/tasks

Create a new task for the authenticated user.

**Request**:
```typescript
async createTask(
  title: string,
  description?: string
): Promise<Task>
```

**HTTP Request**:
```http
POST /users/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New task",
  "description": "Task description",
  "completed": false
}
```

**Success Response** (201 Created):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "New task",
  "description": "Task description",
  "completed": false,
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "created_at": "2026-02-07T10:00:00Z",
  "updated_at": "2026-02-07T10:00:00Z"
}
```

**Error Responses**:
- 400 Bad Request: Missing title or validation error
- 401 Unauthorized: Missing or invalid token

**Usage**:
```typescript
try {
  const newTask = await apiClient.createTask(
    'Complete documentation',
    'Write API specs'
  );
  setTasks([...tasks, newTask]);
} catch (error) {
  // Display error message
}
```

---

### PUT /users/tasks/{taskId}

Update an existing task.

**Request**:
```typescript
async updateTask(
  taskId: string,
  updates: Partial<Task>
): Promise<Task>
```

**HTTP Request**:
```http
PUT /users/tasks/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description"
}
```

**Success Response** (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated title",
  "description": "Updated description",
  "completed": false,
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "created_at": "2026-02-07T10:00:00Z",
  "updated_at": "2026-02-07T11:00:00Z"
}
```

**Error Responses**:
- 400 Bad Request: Validation error
- 401 Unauthorized: Missing or invalid token
- 404 Not Found: Task doesn't exist or doesn't belong to user

**Usage**:
```typescript
try {
  const updated = await apiClient.updateTask(taskId, {
    title: 'New title',
    description: 'New description'
  });
  setTasks(tasks.map(t => t.id === taskId ? updated : t));
} catch (error) {
  // Display error message
}
```

---

### PATCH /users/tasks/{taskId}/toggle

Toggle task completion status.

**Request**:
```typescript
async toggleTask(taskId: string): Promise<Task>
```

**HTTP Request**:
```http
PATCH /users/tasks/550e8400-e29b-41d4-a716-446655440000/toggle
Authorization: Bearer <token>
```

**Success Response** (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete project",
  "description": "Finish the todo app",
  "completed": true,
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "created_at": "2026-02-07T10:00:00Z",
  "updated_at": "2026-02-07T11:30:00Z"
}
```

**Error Responses**:
- 401 Unauthorized: Missing or invalid token
- 404 Not Found: Task doesn't exist or doesn't belong to user

**Usage**:
```typescript
try {
  const updated = await apiClient.toggleTask(taskId);
  setTasks(tasks.map(t => t.id === taskId ? updated : t));
} catch (error) {
  // Display error message
}
```

---

### DELETE /users/tasks/{taskId}

Delete a task.

**Request**:
```typescript
async deleteTask(taskId: string): Promise<void>
```

**HTTP Request**:
```http
DELETE /users/tasks/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer <token>
```

**Success Response** (204 No Content):
```
(empty response body)
```

**Error Responses**:
- 401 Unauthorized: Missing or invalid token
- 404 Not Found: Task doesn't exist or doesn't belong to user

**Usage**:
```typescript
try {
  await apiClient.deleteTask(taskId);
  setTasks(tasks.filter(t => t.id !== taskId));
} catch (error) {
  // Display error message
}
```

---

## Error Handling

### Standard Error Response Format

```json
{
  "detail": "Error message description"
}
```

### Error Handling Pattern

```typescript
try {
  const result = await apiClient.someMethod();
  // Handle success
} catch (err) {
  const message = err instanceof Error ? err.message : 'Operation failed';
  setError(message);
}
```

### 401 Unauthorized Handling

When a 401 response is received:
1. Remove token from localStorage
2. Redirect to /login
3. Display "Session expired" message

```typescript
if (response.status === 401) {
  localStorage.removeItem('access_token');
  window.location.href = '/login';
  throw new Error('Session expired. Please login again.');
}
```

---

## Type Definitions

```typescript
// Authentication
interface AuthResponse {
  access_token: string;
  token_type: string;
}

// Task
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// User (not directly used in API client, but for reference)
interface User {
  id: string;
  email: string;
  name?: string;
  email_verified: boolean;
  created_at: string;
}
```

---

## API Client Instance

The API client is exported as a singleton instance:

```typescript
export const apiClient = new ApiClient();
```

**Usage in components**:
```typescript
import { apiClient } from '@/lib/api-client';

// In component
const tasks = await apiClient.getTasks();
```

---

## Environment Configuration

**Development**:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8001
```

**Production**:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## Security Considerations

1. **Token Storage**: JWT tokens stored in localStorage (acceptable for this application's security requirements)
2. **Token Transmission**: Always sent in Authorization header, never in URL
3. **HTTPS**: Production should use HTTPS for all API communication
4. **Token Expiration**: Tokens expire after 30 minutes, handled by 401 responses
5. **CORS**: Backend must allow frontend origin in CORS configuration

---

## Testing Checklist

- [ ] Register new user returns token
- [ ] Login with valid credentials returns token
- [ ] Login with invalid credentials returns 401
- [ ] Logout removes token from localStorage
- [ ] getTasks requires authentication
- [ ] getTasks returns only user's tasks
- [ ] createTask requires authentication
- [ ] createTask creates task for authenticated user
- [ ] updateTask requires authentication
- [ ] updateTask only updates user's own tasks
- [ ] toggleTask requires authentication
- [ ] toggleTask only toggles user's own tasks
- [ ] deleteTask requires authentication
- [ ] deleteTask only deletes user's own tasks
- [ ] 401 responses redirect to login
- [ ] Expired tokens are handled gracefully

---

## Summary

The API client provides a clean, type-safe interface for all backend communication. It handles:
- Automatic JWT token injection
- Consistent error handling
- Token lifecycle management
- Type safety with TypeScript interfaces
- Centralized API configuration

All methods are async and return Promises, following modern JavaScript patterns.
