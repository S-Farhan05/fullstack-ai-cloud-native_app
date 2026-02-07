# Research & Architectural Decisions

**Feature**: Frontend Application & Full-Stack Integration
**Date**: 2026-02-07
**Status**: Complete

## Overview

This document captures the architectural research and decisions made for integrating the Next.js frontend with the secured FastAPI backend. All decisions prioritize simplicity, security, and alignment with the existing backend implementation.

---

## Decision 1: Route Protection Strategy

### Context
The application has public routes (landing, signup, signin) and protected routes (dashboard). We need a strategy to prevent unauthorized access to protected routes.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Next.js Middleware** | Server-side protection, runs before page render, centralized logic | Requires middleware.ts configuration |
| **React Context + HOC** | Flexible, component-level control | Client-side only, page may flash before redirect |
| **Component-level checks** | Simple to implement | Duplicated logic, inconsistent protection |

### Decision

**Use Next.js middleware for route protection with client-side auth state checks**

### Rationale

- **Server-side protection**: Middleware runs before page render, preventing unauthorized access at the earliest point
- **Centralized logic**: Single place to define protected routes and redirect rules
- **Better UX**: No flash of protected content before redirect
- **Defense in depth**: Combine with client-side checks for immediate feedback

### Implementation Details

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token') ||
                localStorage.getItem('access_token');

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');
  const isAuthRoute = ['/login', '/register'].includes(request.nextUrl.pathname);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register']
};
```

### Alternatives Rejected

- **React Context only**: Rejected because it provides no server-side protection and may cause content flash
- **Component-level checks**: Rejected due to code duplication and inconsistent protection

---

## Decision 2: Authentication State Management

### Context
The application needs to manage authentication state across components, persist sessions, and provide auth status to the UI.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **localStorage + React hooks** | Simple, persists across sessions, no external dependencies | Manual state management |
| **Better Auth hooks** | Built-in state management, automatic token handling | Additional dependency complexity |
| **React Context API** | Centralized state, easy to access | Requires provider setup, more boilerplate |

### Decision

**Use localStorage for token persistence with custom React hooks for state management**

### Rationale

- **Simplicity**: Straightforward implementation without additional complexity
- **Persistence**: Tokens survive browser refreshes and tab closures
- **Existing implementation**: Frontend already uses this pattern successfully
- **No additional dependencies**: Works with standard React patterns

### Implementation Details

```typescript
// Custom hook for auth state
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('access_token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, login, logout };
}
```

### Alternatives Rejected

- **Better Auth hooks**: Rejected to keep implementation simple and avoid additional abstraction layers
- **React Context**: Rejected as unnecessary overhead for this use case

---

## Decision 3: Centralized API Client Architecture

### Context
The frontend needs to make authenticated API calls to the backend. We need a consistent way to attach JWT tokens and handle responses.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **API Client Class** | Centralized logic, automatic token injection, easy to maintain | Requires class instantiation |
| **Axios with interceptors** | Automatic request/response handling, popular library | Additional dependency |
| **Fetch with wrapper functions** | No dependencies, native browser API | Manual token injection per request |

### Decision

**Use API Client class with native fetch and automatic JWT injection**

### Rationale

- **Already implemented**: Frontend has working ApiClient class
- **No dependencies**: Uses native fetch API
- **Automatic token management**: Tokens injected automatically in all requests
- **Centralized error handling**: Consistent error responses across the app
- **Type safety**: TypeScript interfaces for all methods

### Implementation Details

```typescript
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async register(email: string, password: string, name?: string) {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, email_verified: false }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    return data;
  }

  // Similar methods for login, getTasks, createTask, etc.
}

export const apiClient = new ApiClient();
```

### Alternatives Rejected

- **Axios interceptors**: Rejected to avoid additional dependency when native fetch is sufficient
- **Wrapper functions**: Rejected due to code duplication and manual token management

---

## Decision 4: Error Handling Strategy

### Context
API calls can fail due to network issues, authentication errors, or validation errors. We need a consistent way to handle and display errors to users.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Component-level error state** | Localized handling, clear ownership | Potential duplication |
| **Global error boundary** | Catches all errors, centralized | May be too broad, harder to customize |
| **Toast notifications** | Non-intrusive, consistent UI | Requires additional library |

### Decision

**Use component-level error state with user-friendly messages**

### Rationale

- **Localized control**: Each component handles its own errors appropriately
- **Clear feedback**: Errors displayed near the relevant UI element
- **No technical details**: User-friendly messages without exposing backend errors
- **Existing pattern**: Already implemented successfully in current components

### Implementation Details

```typescript
function LoginForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient.login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      {/* form fields */}
    </form>
  );
}
```

### Alternatives Rejected

- **Global error boundary**: Rejected as too broad for API-specific errors
- **Toast notifications**: Rejected to avoid additional dependencies and keep UI simple

---

## Decision 5: Token Expiration Handling

### Context
JWT tokens expire after 30 minutes. We need to handle expired tokens gracefully without disrupting the user experience.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Automatic token refresh** | Seamless UX, no interruption | Complex implementation, requires refresh tokens |
| **Redirect to login on 401** | Simple, clear to user | Interrupts workflow, may lose unsaved data |
| **Show expiration warning** | Gives user time to save work | Requires tracking token expiration time |

### Decision

**Redirect to login page on 401 Unauthorized responses**

### Rationale

- **Simplicity**: Straightforward implementation without refresh token complexity
- **Security**: Forces re-authentication after token expiration
- **Clear feedback**: User understands they need to log in again
- **Existing backend**: Backend doesn't implement refresh tokens

### Implementation Details

```typescript
async getTasks(): Promise<Task[]> {
  const response = await fetch(`${this.baseUrl}/users/tasks`, {
    headers: this.getAuthHeaders(),
  });

  if (response.status === 401) {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
}
```

### Alternatives Rejected

- **Automatic refresh**: Rejected because backend doesn't support refresh tokens
- **Expiration warning**: Rejected as unnecessary complexity for 30-minute sessions

---

## Decision 6: Form Validation Strategy

### Context
User input needs validation before submission to provide immediate feedback and reduce unnecessary API calls.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **HTML5 validation** | Native, no dependencies, immediate feedback | Limited customization |
| **React Hook Form** | Powerful, flexible, good DX | Additional dependency |
| **Custom validation logic** | Full control, no dependencies | More code to maintain |

### Decision

**Use HTML5 validation with custom validation logic for complex rules**

### Rationale

- **Native support**: Works in all modern browsers without dependencies
- **Immediate feedback**: Validation happens before form submission
- **Simple implementation**: Minimal code required
- **Sufficient for requirements**: Covers email format and password length validation

### Implementation Details

```typescript
<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  className="form-input"
/>

<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  minLength={8}
  className="form-input"
/>
```

### Alternatives Rejected

- **React Hook Form**: Rejected to avoid additional dependency for simple validation needs
- **Custom validation only**: Rejected because HTML5 provides sufficient functionality

---

## Decision 7: UI State Management for Tasks

### Context
The dashboard needs to manage task list state, handle CRUD operations, and update the UI optimistically.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Local component state** | Simple, no dependencies | May cause prop drilling |
| **Redux/Zustand** | Centralized state, predictable updates | Overkill for simple app |
| **React Query** | Automatic caching, refetching | Additional dependency |

### Decision

**Use local component state with React hooks**

### Rationale

- **Simplicity**: Sufficient for single-page task management
- **No prop drilling**: Dashboard is a single component
- **Immediate updates**: State updates reflect in UI instantly
- **Existing pattern**: Already implemented successfully

### Implementation Details

```typescript
function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCreateTask = async (title: string, description?: string) => {
    const newTask = await apiClient.createTask(title, description);
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = async (taskId: string) => {
    const updatedTask = await apiClient.toggleTask(taskId);
    setTasks(tasks.map(task =>
      task.id === taskId ? updatedTask : task
    ));
  };

  // Similar handlers for update and delete
}
```

### Alternatives Rejected

- **Redux/Zustand**: Rejected as unnecessary complexity for simple state management
- **React Query**: Rejected to avoid additional dependencies

---

## Summary of Key Decisions

| Decision Area | Choice | Primary Rationale |
|--------------|--------|-------------------|
| Route Protection | Next.js Middleware | Server-side protection, centralized logic |
| Auth State | localStorage + hooks | Simple, persistent, no dependencies |
| API Client | Class with fetch | Centralized, automatic token injection |
| Error Handling | Component-level state | Localized control, clear feedback |
| Token Expiration | Redirect on 401 | Simple, secure, clear to user |
| Form Validation | HTML5 + custom | Native support, sufficient for needs |
| Task State | Local component state | Simple, no prop drilling needed |

## Implementation Notes

1. **Existing Implementation**: Most of these patterns are already implemented in the current frontend codebase
2. **Verification Needed**: Phase 2 will verify all implementations match these decisions
3. **Gap Analysis**: Any missing features will be identified and implemented
4. **Testing**: All decisions will be validated through manual testing checklist

## Next Steps

1. Create data-model.md documenting frontend state structure
2. Create contracts/api-client.md documenting API interfaces
3. Create quickstart.md with setup and testing procedures
4. Proceed to /sp.tasks for detailed task breakdown
