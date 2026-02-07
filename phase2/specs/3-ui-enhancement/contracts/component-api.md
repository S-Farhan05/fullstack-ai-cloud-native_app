# Component API Contracts: Frontend UI Enhancement

**Feature**: Frontend UI Enhancement & Experience
**Branch**: `003-ui-enhancement`
**Date**: 2026-02-07
**Status**: Phase 1 - Component Contracts

## Overview

This document defines the public interfaces (props, events, and behaviors) for all components created or modified in the UI enhancement feature. These contracts serve as the specification for component implementation and integration.

---

## Landing Page Components

### Hero Component

**File**: `frontend/src/components/landing/hero.tsx`

**Purpose**: Display the main hero section on the landing page with headline, subheadline, and primary call-to-action.

**Props Interface**:
```typescript
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
}
```

**Props Details**:
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| headline | string | Yes | - | Main headline text (e.g., "Organize Your Tasks") |
| subheadline | string | Yes | - | Supporting text below headline |
| ctaText | string | Yes | - | Text for primary CTA button |
| ctaHref | string | Yes | - | Navigation target for CTA button |

**Usage Example**:
```tsx
<Hero
  headline="Organize Your Tasks, Amplify Your Productivity"
  subheadline="Simple, secure, and powerful todo management"
  ctaText="Get Started"
  ctaHref="/register"
/>
```

**Styling Contract**:
- Full-width section with centered content
- Hero section minimum height: 400px (mobile), 500px (desktop)
- Headline: text-3xl (mobile), text-4xl (desktop), font-bold
- Subheadline: text-lg (mobile), text-xl (desktop), text-gray-600
- CTA button: Primary button style (blue-500 background)

**Accessibility**:
- Headline uses `<h1>` semantic tag
- CTA button has proper focus states
- Sufficient color contrast (WCAG AA minimum)

---

### FeatureCard Component

**File**: `frontend/src/components/landing/feature-card.tsx`

**Purpose**: Display a single feature highlight with icon, title, and description.

**Props Interface**:
```typescript
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}
```

**Props Details**:
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| icon | string | Yes | - | Icon emoji or identifier (e.g., "✓", "🔒") |
| title | string | Yes | - | Feature title (e.g., "Easy Task Management") |
| description | string | Yes | - | Feature description (1-2 sentences) |

**Usage Example**:
```tsx
<FeatureCard
  icon="✓"
  title="Easy Task Management"
  description="Create, organize, and complete tasks with a simple, intuitive interface"
/>
```

**Styling Contract**:
- Card background: white (bg-white)
- Border radius: rounded-lg
- Shadow: shadow-md, hover:shadow-lg
- Padding: p-6
- Icon size: text-4xl
- Title: text-xl, font-semibold
- Description: text-base, text-gray-600

**Responsive Behavior**:
- Mobile: Full width, stacked vertically
- Tablet: 2 columns
- Desktop: 4 columns in grid

---

### CTASection Component

**File**: `frontend/src/components/landing/cta-section.tsx`

**Purpose**: Display secondary call-to-action section for returning users.

**Props Interface**:
```typescript
interface CTASectionProps {
  message: string;
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
}
```

**Props Details**:
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| message | string | Yes | - | Message text (e.g., "Already have an account?") |
| primaryText | string | Yes | - | Primary CTA button text |
| primaryHref | string | Yes | - | Primary CTA navigation target |
| secondaryText | string | Yes | - | Secondary CTA button text |
| secondaryHref | string | Yes | - | Secondary CTA navigation target |

**Usage Example**:
```tsx
<CTASection
  message="Already have an account?"
  primaryText="Get Started"
  primaryHref="/register"
  secondaryText="Sign In"
  secondaryHref="/login"
/>
```

**Styling Contract**:
- Background: gray-50
- Padding: py-12 (vertical), px-4 (horizontal)
- Message: text-lg, text-gray-700, centered
- Buttons: Horizontal layout on desktop, stacked on mobile
- Primary button: Blue background
- Secondary button: White background with border

---

## Dashboard Components

### TaskCard Component

**File**: `frontend/src/components/dashboard/task-card.tsx`

**Purpose**: Display a single task with completion checkbox, title, description, and delete button.

**Props Interface**:
```typescript
interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}
```

**Props Details**:
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| task | Task | Yes | - | Task object with all properties |
| onToggle | (taskId: string) => Promise<void> | Yes | - | Handler for toggling completion status |
| onDelete | (taskId: string) => Promise<void> | Yes | - | Handler for deleting task |

**Usage Example**:
```tsx
<TaskCard
  task={task}
  onToggle={handleToggleTask}
  onDelete={handleDeleteTask}
/>
```

**Behavior Contract**:
- Checkbox click triggers `onToggle(task.id)`
- Delete button click triggers `onDelete(task.id)`
- Completed tasks show strikethrough on title
- Hover state shows elevated shadow
- Loading states during async operations (optional enhancement)

**Styling Contract**:
- Card background: white (bg-white)
- Border radius: rounded-lg
- Shadow: shadow-md, hover:shadow-lg
- Padding: p-6
- Layout: Flexbox with checkbox (left), content (center), delete button (right)
- Title: text-lg, font-semibold, strikethrough if completed
- Description: text-sm, text-gray-600
- Delete button: text-red-600, hover:text-red-800

**Accessibility**:
- Checkbox has proper label association
- Delete button has descriptive aria-label
- Keyboard navigation support

---

### TaskForm Component

**File**: `frontend/src/components/dashboard/task-form.tsx`

**Purpose**: Form for creating new tasks with title and optional description.

**Props Interface**:
```typescript
interface TaskFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
}
```

**Props Details**:
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| onSubmit | (title: string, description: string) => Promise<void> | Yes | - | Handler for form submission |

**Usage Example**:
```tsx
<TaskForm onSubmit={handleCreateTask} />
```

**Behavior Contract**:
- Form submission calls `onSubmit(title, description)`
- Form clears after successful submission
- Shows loading state during submission
- Shows error message if submission fails
- Title field is required (HTML5 validation)
- Description field is optional

**Internal State**:
```typescript
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState('');
```

**Styling Contract**:
- Card background: white (bg-white)
- Border radius: rounded-lg
- Shadow: shadow
- Padding: p-6
- Title input: Full width, border, rounded
- Description textarea: Full width, border, rounded, 3 rows
- Submit button: Primary blue style, disabled state when submitting

**Validation**:
- Title: Required, non-empty after trim
- Description: Optional, no validation

---

## Enhanced Auth Components

### RegisterForm Component (Enhanced)

**File**: `frontend/src/components/auth/register-form.tsx`

**Purpose**: User registration form with email, password, and name fields.

**Props Interface**:
```typescript
// No props - self-contained component
```

**Behavior Contract** (Existing - Preserved):
- Form submission calls `apiClient.register(email, password, name)`
- Successful registration redirects to `/dashboard`
- Failed registration shows error message
- Loading state during API call

**Styling Enhancements** (New):
- Improved spacing: mb-4 between fields, mb-6 before button
- Enhanced input styling: focus:ring-2, focus:ring-blue-500
- Better error display: bg-red-100, text-red-700, rounded
- Loading button state: disabled:opacity-50, disabled:cursor-not-allowed

**No Logic Changes**: All existing event handlers, state management, and API calls preserved.

---

### LoginForm Component (Enhanced)

**File**: `frontend/src/components/auth/login-form.tsx`

**Purpose**: User login form with email and password fields.

**Props Interface**:
```typescript
// No props - self-contained component
```

**Behavior Contract** (Existing - Preserved):
- Form submission calls `apiClient.login(email, password)`
- Successful login redirects to `/dashboard`
- Failed login shows error message
- Loading state during API call

**Styling Enhancements** (New):
- Improved spacing: mb-4 between fields, mb-6 before button
- Enhanced input styling: focus:ring-2, focus:ring-blue-500
- Better error display: bg-red-100, text-red-700, rounded
- Loading button state: disabled:opacity-50, disabled:cursor-not-allowed

**No Logic Changes**: All existing event handlers, state management, and API calls preserved.

---

## Page-Level Contracts

### Landing Page

**File**: `frontend/app/page.tsx`

**Purpose**: Public landing page with hero, features, and CTAs.

**Structure**:
```tsx
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero {...heroProps} />
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(feature => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
      <CTASection {...ctaProps} />
    </div>
  );
}
```

**Data**:
- Hero props: Static configuration
- Features array: 4 feature objects
- CTA props: Static configuration

**No Authentication Required**: Public page, accessible to all users.

---

### Dashboard Page (Enhanced)

**File**: `frontend/app/dashboard/page.tsx`

**Purpose**: Authenticated user dashboard with task management.

**Structure** (Enhanced):
```tsx
export default function DashboardPage() {
  // Existing state management (preserved)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Existing useEffect for loading tasks (preserved)
  useEffect(() => {
    loadTasks();
  }, []);

  // Existing handlers (preserved)
  const handleCreateTask = async (title: string, description: string) => { ... };
  const handleToggleTask = async (taskId: string) => { ... };
  const handleDeleteTask = async (taskId: string) => { ... };
  const handleLogout = () => { ... };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav>{/* Existing nav with logout */}</nav>
      <main>
        {error && <ErrorDisplay />}
        <TaskForm onSubmit={handleCreateTask} />
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
```

**Changes**:
- Extract TaskForm to separate component
- Extract TaskCard to separate component
- Enhanced card-based layout with proper spacing
- Improved visual hierarchy

**Preserved**:
- All state management logic
- All API calls and handlers
- All authentication checks
- All error handling

---

## Event Handling Contracts

### Async Event Handlers

All async event handlers follow this pattern:

```typescript
const handleAction = async (param: string) => {
  try {
    setLoading(true);
    setError('');

    const result = await apiClient.someMethod(param);

    // Update state with result
    setState(result);

  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unexpected error occurred');
    }

    // Handle 401 unauthorized
    if (err.message?.includes('401')) {
      localStorage.removeItem('access_token');
      router.push('/login');
    }
  } finally {
    setLoading(false);
  }
};
```

### Form Submit Handlers

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validation
  if (!isValid()) {
    setError('Validation error message');
    return;
  }

  // Clear previous errors
  setError('');
  setLoading(true);

  try {
    await apiClient.someMethod(formData);
    // Success handling
  } catch (err) {
    // Error handling
  } finally {
    setLoading(false);
  }
};
```

---

## Styling Contracts

### Common Patterns

**Card Pattern**:
```tsx
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
```

**Primary Button**:
```tsx
<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
```

**Secondary Button**:
```tsx
<button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
```

**Input Field**:
```tsx
<input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
```

**Error Message**:
```tsx
<div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
```

---

## Testing Contracts

### Component Testing Checklist

Each component must be manually tested for:
- [ ] Renders correctly with valid props
- [ ] Handles missing optional props gracefully
- [ ] Event handlers are called with correct parameters
- [ ] Loading states display correctly
- [ ] Error states display correctly
- [ ] Responsive behavior works across breakpoints
- [ ] Hover states work correctly
- [ ] Focus states work correctly (accessibility)
- [ ] Keyboard navigation works (accessibility)

### Integration Testing

- [ ] Landing page components integrate correctly
- [ ] Dashboard components integrate with existing page logic
- [ ] Navigation flow works end-to-end
- [ ] Authentication redirects work correctly
- [ ] API calls succeed and update UI correctly
- [ ] Error handling works across all components

---

## Summary

This document defines the complete API contracts for all components in the UI enhancement feature. All contracts prioritize:

1. **Type Safety**: TypeScript interfaces for all props
2. **Consistency**: Common patterns across similar components
3. **Preservation**: Existing logic and behavior maintained
4. **Clarity**: Clear documentation of expected behavior
5. **Testability**: Well-defined contracts enable thorough testing

Ready to proceed with quickstart.md and implementation tasks.
