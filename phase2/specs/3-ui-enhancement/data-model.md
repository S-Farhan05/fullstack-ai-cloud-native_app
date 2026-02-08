# Data Model: Frontend UI Enhancement

**Feature**: Frontend UI Enhancement & Experience
**Branch**: `003-ui-enhancement`
**Date**: 2026-02-07
**Status**: Phase 1 - Design Artifacts

## Overview

This document defines the component state structures, data flow patterns, and type definitions for the UI enhancement feature. Since this is a frontend-only enhancement with no backend changes, the focus is on component-level state management and UI data structures.

---

## Component State Structures

### Landing Page Components

#### Hero Component State
```typescript
// No internal state - purely presentational
interface HeroProps {
  headline: string;
  subheadline: string;
  primaryCTA: {
    text: string;
    href: string;
  };
}
```

#### Feature Card Component State
```typescript
interface FeatureCardProps {
  icon: string;           // Icon identifier or emoji
  title: string;          // Feature title
  description: string;    // Feature description
}

// No internal state - purely presentational
```

#### CTA Section Component State
```typescript
interface CTASectionProps {
  message: string;        // Secondary message text
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
}

// No internal state - purely presentational
```

### Dashboard Components

#### Task Card Component State
```typescript
interface TaskCardProps {
  task: Task;                                    // Task data
  onToggle: (taskId: string) => void;           // Toggle completion handler
  onDelete: (taskId: string) => void;           // Delete handler
}

// Internal state (if needed for optimistic updates)
interface TaskCardState {
  isDeleting: boolean;    // Loading state for delete operation
  isToggling: boolean;    // Loading state for toggle operation
}
```

#### Task Form Component State
```typescript
interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
}

interface TaskFormState {
  title: string;          // Task title input
  description: string;    // Task description input
  isSubmitting: boolean;  // Loading state
  error: string;          // Error message
}
```

### Auth Form Components (Enhanced)

#### Register Form State (Existing, Enhanced)
```typescript
// Existing state structure - NO CHANGES to logic
interface RegisterFormState {
  email: string;
  password: string;
  name: string;
  error: string;
  loading: boolean;
}

// Only CSS/styling changes applied
```

#### Login Form State (Existing, Enhanced)
```typescript
// Existing state structure - NO CHANGES to logic
interface LoginFormState {
  email: string;
  password: string;
  error: string;
  loading: boolean;
}

// Only CSS/styling changes applied
```

---

## Type Definitions

### Core Types (Existing - No Changes)

```typescript
// From existing api-client.ts - PRESERVE AS-IS
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}
```

### New UI-Specific Types

```typescript
// Landing page feature data
interface Feature {
  icon: string;
  title: string;
  description: string;
}

// CTA button configuration
interface CTAButton {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

// Component loading states
interface LoadingState {
  isLoading: boolean;
  error?: string;
}
```

---

## Data Flow Patterns

### Landing Page Flow

```
Landing Page (page.tsx)
  ↓
  ├─→ Hero Component (static props)
  ├─→ Feature Cards (map over features array)
  └─→ CTA Section (static props)

No API calls, no state management - purely presentational
```

### Authentication Flow (Existing - Preserved)

```
User Input → Form Component → API Client → Backend
                ↓                              ↓
         Local State Update              JWT Token
                ↓                              ↓
         Loading/Error States        localStorage.setItem()
                ↓                              ↓
         Success → router.push('/dashboard')
```

### Dashboard Task Management Flow (Enhanced UI)

```
Dashboard Page
  ↓
  ├─→ useEffect: Load tasks from API
  │     ↓
  │   setTasks(fetchedTasks)
  │
  ├─→ Task Form Component
  │     ↓
  │   User creates task → onSubmit
  │     ↓
  │   API call → apiClient.createTask()
  │     ↓
  │   Update local state: setTasks([...tasks, newTask])
  │     ↓
  │   Render new Task Card
  │
  └─→ Task Card Components (map over tasks)
        ↓
        ├─→ Toggle: onToggle → apiClient.toggleTask()
        │     ↓
        │   Update local state: setTasks(tasks.map(...))
        │
        └─→ Delete: onDelete → apiClient.deleteTask()
              ↓
            Update local state: setTasks(tasks.filter(...))

All API interactions preserved - only UI rendering enhanced
```

---

## State Management Strategy

### Page-Level State (Dashboard)

```typescript
// Dashboard page state (existing pattern - preserved)
const [tasks, setTasks] = useState<Task[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

// Task form state (extracted to component)
const [newTaskTitle, setNewTaskTitle] = useState('');
const [newTaskDescription, setNewTaskDescription] = useState('');
```

### Component-Level State

**Principle**: Keep state as local as possible
- Form inputs: Component-level state
- Loading indicators: Component-level state
- Error messages: Component-level state
- Task data: Page-level state (shared across components)

### No Global State Management

**Decision**: No Redux, Context API, or other global state solutions needed
**Rationale**:
- Simple application with limited state
- State is already well-managed at page level
- Adding global state would be over-engineering
- Existing pattern works well

---

## Data Validation

### Client-Side Validation (Existing - Preserved)

```typescript
// HTML5 validation attributes
<input
  type="email"
  required
  // Validates email format
/>

<input
  type="password"
  required
  minLength={8}
  // Validates minimum length
/>

<input
  type="text"
  required
  // Validates non-empty
/>
```

### Form Submission Validation

```typescript
// Existing pattern in forms - preserved
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Clear previous errors
  setError('');

  // Validate inputs (if needed beyond HTML5)
  if (!title.trim()) {
    setError('Title is required');
    return;
  }

  // Set loading state
  setLoading(true);

  try {
    // API call
    await apiClient.createTask(title, description);
    // Success handling
  } catch (err) {
    // Error handling
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

---

## Component Props Interfaces

### Landing Page Components

```typescript
// Hero.tsx
export interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
}

// FeatureCard.tsx
export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

// CTASection.tsx
export interface CTASectionProps {
  message: string;
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
}
```

### Dashboard Components

```typescript
// TaskCard.tsx
export interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

// TaskForm.tsx
export interface TaskFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
}
```

---

## Error Handling Patterns

### API Error Handling (Existing - Preserved)

```typescript
try {
  const result = await apiClient.someMethod();
  // Success path
} catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('An unexpected error occurred');
  }

  // Special handling for 401 (unauthorized)
  if (err.message.includes('401')) {
    localStorage.removeItem('access_token');
    router.push('/login');
  }
}
```

### UI Error Display

```typescript
// Error message component pattern
{error && (
  <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
    {error}
  </div>
)}
```

---

## Loading States

### Page-Level Loading

```typescript
// Dashboard loading state
if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl text-gray-600">Loading...</div>
    </div>
  );
}
```

### Component-Level Loading

```typescript
// Button loading state
<button
  type="submit"
  disabled={loading}
  className="... disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? 'Creating...' : 'Create Task'}
</button>
```

---

## Data Persistence

### Local Storage (Existing - Preserved)

```typescript
// JWT token storage
localStorage.setItem('access_token', token);
localStorage.getItem('access_token');
localStorage.removeItem('access_token');

// No other local storage usage
// All task data fetched from API on page load
```

### No Client-Side Caching

**Decision**: No client-side caching beyond component state
**Rationale**:
- Tasks are fetched fresh on dashboard load
- Simple application doesn't need complex caching
- Backend is source of truth
- Reduces complexity and potential sync issues

---

## Responsive Data Considerations

### No Data Structure Changes for Responsive Design

All data structures remain the same across screen sizes. Only UI rendering changes:
- Mobile: Single column layouts
- Tablet: Two column layouts where appropriate
- Desktop: Multi-column layouts where appropriate

Data fetching, state management, and API interactions are identical across all screen sizes.

---

## Summary

### Key Principles

1. **Preserve Existing Patterns**: All existing state management patterns are maintained
2. **Component-Level State**: Keep state as local as possible
3. **No Global State**: Simple application doesn't need Redux/Context
4. **Type Safety**: Use TypeScript interfaces for all props and state
5. **Error Handling**: Consistent error handling across all components
6. **Loading States**: Clear loading indicators for all async operations

### No Backend Changes

All data structures, API contracts, and authentication flows remain unchanged. This is purely a frontend UI enhancement with no impact on backend data models or API responses.

### Ready for Implementation

All component state structures and data flow patterns are documented. Ready to proceed with contract definitions and implementation tasks.
