# Frontend Data Model & State Management

**Feature**: Frontend Application & Full-Stack Integration
**Date**: 2026-02-07
**Status**: Complete

## Overview

This document defines the frontend data structures, state management patterns, and data flow for the Next.js application. All state is managed locally within components using React hooks, with data persistence handled by the backend API.

---

## Core Data Entities

### 1. User

Represents an authenticated user in the application.

```typescript
interface User {
  id: string;              // UUID from backend
  email: string;           // User's email address
  name?: string;           // Optional display name
  email_verified: boolean; // Email verification status
  created_at: string;      // ISO 8601 timestamp
}
```

**Source**: Backend API (returned on registration/login)
**Storage**: Not stored in frontend (only token is stored)
**Usage**: Display user information, identify authenticated user

---

### 2. Task

Represents a user's task item.

```typescript
interface Task {
  id: string;              // UUID from backend
  title: string;           // Task title (required, max 255 chars)
  description?: string;    // Optional description (max 1000 chars)
  completed: boolean;      // Completion status
  user_id: string;         // Owner's UUID (not displayed, for reference)
  created_at: string;      // ISO 8601 timestamp
  updated_at: string;      // ISO 8601 timestamp
}
```

**Source**: Backend API
**Storage**: Component state (not persisted in frontend)
**Usage**: Display task list, manage task operations

---

### 3. AuthResponse

Response from authentication endpoints (register/login).

```typescript
interface AuthResponse {
  access_token: string;    // JWT token
  token_type: string;      // Always "bearer"
}
```

**Source**: Backend API (/auth/register, /auth/login)
**Storage**: localStorage (access_token only)
**Usage**: Authenticate API requests

---

## Component State Structures

### Landing Page (app/page.tsx)

**State**: None (static page)

**Purpose**: Public landing page with navigation to signup/signin

```typescript
// No state management needed
export default function HomePage() {
  return (
    <div>
      <Link href="/register">Get Started</Link>
      <Link href="/login">Sign In</Link>
    </div>
  );
}
```

---

### Registration Form (src/components/auth/register-form.tsx)

**State**:
```typescript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
```

**State Flow**:
1. User enters credentials → Update form state
2. User submits → Set loading=true
3. API call succeeds → Store token, redirect to dashboard
4. API call fails → Set error message, loading=false

**Validation**:
- Email: HTML5 email validation
- Password: Minimum 8 characters (HTML5 minLength)
- Name: Optional, no validation

---

### Login Form (src/components/auth/login-form.tsx)

**State**:
```typescript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
```

**State Flow**:
1. User enters credentials → Update form state
2. User submits → Set loading=true
3. API call succeeds → Store token, redirect to dashboard
4. API call fails → Set error message, loading=false

**Validation**:
- Email: HTML5 email validation
- Password: Required (HTML5 required)

---

### Dashboard (app/dashboard/page.tsx)

**State**:
```typescript
const [tasks, setTasks] = useState<Task[]>([]);
const [newTaskTitle, setNewTaskTitle] = useState('');
const [newTaskDescription, setNewTaskDescription] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
```

**State Flow**:

**Initial Load**:
1. Component mounts → Set loading=true
2. Fetch tasks from API → Update tasks state
3. Set loading=false

**Create Task**:
1. User enters title/description → Update form state
2. User submits → Call API
3. API succeeds → Add new task to tasks array, clear form
4. API fails → Set error message

**Toggle Task**:
1. User clicks checkbox → Call API
2. API succeeds → Update task in tasks array
3. API fails → Set error message

**Delete Task**:
1. User clicks delete → Call API
2. API succeeds → Remove task from tasks array
3. API fails → Set error message

**Logout**:
1. User clicks logout → Remove token from localStorage
2. Redirect to login page

---

## Data Flow Patterns

### Authentication Flow

```
User Input → Form State → API Client → Backend
                                          ↓
                                    JWT Token
                                          ↓
                                   localStorage
                                          ↓
                                  Redirect to Dashboard
```

### Task Operations Flow

```
User Action → Component State → API Client (with JWT) → Backend
                                                            ↓
                                                      Updated Data
                                                            ↓
                                                    Component State
                                                            ↓
                                                        UI Update
```

### Error Handling Flow

```
API Error → Catch Block → Component Error State → Error Message Display
```

---

## State Management Patterns

### 1. Optimistic UI Updates

**Not Implemented**: All operations wait for API confirmation before updating UI

**Rationale**: Simpler implementation, ensures UI always reflects backend state

**Example**:
```typescript
const handleCreateTask = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const newTask = await apiClient.createTask(title, description);
    setTasks([...tasks, newTask]); // Update only after API success
  } catch (err) {
    setError('Failed to create task');
  }
};
```

### 2. Loading States

**Pattern**: Boolean loading flag during async operations

**Usage**:
- Show loading indicator during API calls
- Disable form submission during loading
- Prevent duplicate submissions

**Example**:
```typescript
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await apiClient.someOperation();
  } finally {
    setLoading(false);
  }
};
```

### 3. Error States

**Pattern**: String error message in component state

**Usage**:
- Display user-friendly error messages
- Clear errors on new attempts
- No technical details exposed

**Example**:
```typescript
const [error, setError] = useState('');

try {
  await apiClient.someOperation();
  setError(''); // Clear previous errors
} catch (err) {
  setError(err instanceof Error ? err.message : 'Operation failed');
}
```

---

## Data Persistence

### localStorage

**Stored Data**:
- `access_token`: JWT token string

**Not Stored**:
- User information (fetched from token claims if needed)
- Task data (always fetched from API)
- Form state (ephemeral)

**Rationale**:
- Minimize client-side data storage
- Backend is source of truth
- Reduce sync issues

### Session Persistence

**Behavior**:
- Token persists across browser sessions (localStorage)
- Token persists across page refreshes
- Token removed on explicit logout
- Token removed on 401 responses

---

## State Synchronization

### No Multi-Tab Sync

**Current Implementation**: Each tab maintains independent state

**Implications**:
- User opens dashboard in two tabs → Each tab has separate task list
- User creates task in Tab A → Tab B doesn't see it until refresh
- User logs out in Tab A → Tab B still has token until next API call

**Rationale**: Simplicity over complexity for MVP

**Future Enhancement**: Could implement localStorage events for cross-tab sync

---

## Data Validation

### Client-Side Validation

**Registration**:
- Email: Valid email format (HTML5)
- Password: Minimum 8 characters (HTML5)
- Name: Optional, no validation

**Login**:
- Email: Valid email format (HTML5)
- Password: Required (HTML5)

**Task Creation**:
- Title: Required, non-empty (HTML5)
- Description: Optional, no validation

**Task Update**:
- Same as creation

### Server-Side Validation

All validation is ultimately enforced by backend API. Client-side validation provides immediate feedback but doesn't replace server validation.

---

## Error States

### Authentication Errors

| Error | User Message | Action |
|-------|-------------|--------|
| Invalid credentials | "Invalid email or password" | Stay on login page |
| Email already exists | "Email already in use" | Stay on register page |
| Network error | "Connection failed. Please try again." | Stay on current page |
| Token expired | "Session expired. Please login again." | Redirect to login |

### Task Operation Errors

| Error | User Message | Action |
|-------|-------------|--------|
| Unauthorized (401) | "Session expired. Please login again." | Redirect to login |
| Network error | "Failed to [operation]. Please try again." | Stay on dashboard |
| Validation error | Backend error message | Stay on dashboard |

---

## Component Lifecycle

### Dashboard Component

```
Mount
  ↓
useEffect → loadTasks()
  ↓
API Call (with JWT)
  ↓
Success → setTasks(data), setLoading(false)
  ↓
Render task list
  ↓
User interactions → State updates → Re-render
  ↓
Unmount (cleanup if needed)
```

### Form Components

```
Mount
  ↓
Render form with empty state
  ↓
User input → Update state → Re-render
  ↓
Submit → API call → Success/Error
  ↓
Success → Redirect
Error → Display error, stay on form
```

---

## Type Definitions

All TypeScript interfaces are defined in `src/lib/api-client.ts`:

```typescript
// Authentication
export interface AuthResponse {
  access_token: string;
  token_type: string;
}

// User
export interface User {
  id: string;
  email: string;
  name?: string;
  email_verified: boolean;
  created_at: string;
}

// Task
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}
```

---

## Summary

**State Management**: Local component state with React hooks
**Data Persistence**: Backend API (source of truth) + localStorage (JWT only)
**Data Flow**: Unidirectional (User → Component → API → Backend → Component → UI)
**Validation**: Client-side (immediate feedback) + Server-side (enforcement)
**Error Handling**: Component-level error state with user-friendly messages
**Loading States**: Boolean flags during async operations
**Type Safety**: TypeScript interfaces for all data structures
