# Implementation Plan: Frontend Application & Full-Stack Integration

**Branch**: `2-frontend-integration` | **Date**: 2026-02-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/2-frontend-integration/spec.md`

## Summary

Build a Next.js frontend application that integrates with the secured FastAPI backend to provide user registration, authentication, and task management capabilities. The frontend will implement public routes (landing, signup, signin) and protected routes (dashboard) with JWT-based authentication, ensuring users can only access their own data through a centralized API client.

## Technical Context

**Language/Version**: TypeScript with Next.js 16+ (App Router)
**Primary Dependencies**: Next.js 16+, React 18+, Better Auth (for JWT handling), TailwindCSS (for styling)
**Storage**: Browser localStorage for JWT token persistence
**Testing**: Manual testing of user flows and API integration (automated tests out of scope)
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Web application (frontend only, integrates with existing backend)
**Performance Goals**: Page load < 3 seconds, API operations < 2 seconds, responsive UI updates
**Constraints**: Must integrate with existing FastAPI backend without backend modifications, JWT tokens in Authorization headers
**Scale/Scope**: Single-user sessions, up to 100 tasks per user, 4 main pages (landing, signup, signin, dashboard)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Frontend-Backend Separation
- Frontend consumes RESTful APIs from existing FastAPI backend
- Services communicate via HTTP with JWT authentication
- No direct database access from frontend

### ✅ Secure Stateless Authentication (NON-NEGOTIABLE)
- Better Auth integration for JWT token management
- All protected API requests include JWT in Authorization header
- Backend verifies tokens and identifies users

### ✅ User Data Isolation
- API client filters requests by authenticated user
- Frontend only displays data returned by backend (backend enforces isolation)
- No client-side user ID manipulation

### ✅ Technology Stack Compliance
- Next.js 16+ with App Router ✓
- Integrates with FastAPI backend ✓
- Uses Better Auth for authentication ✓

### ✅ Minimal Feature Scope
- Implements only Basic Level features: signup, signin, task CRUD
- No advanced features (search, filtering, categories, etc.)

**Constitution Status**: ✅ ALL GATES PASSED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/2-frontend-integration/
├── plan.md              # This file
├── research.md          # Phase 0: Technology decisions and patterns
├── data-model.md        # Phase 1: Frontend state management and data flow
├── quickstart.md        # Phase 1: Setup and development guide
├── contracts/           # Phase 1: API contract documentation
│   └── api-client.md    # API client interface specification
└── tasks.md             # Phase 2: Created by /sp.tasks command
```

### Source Code (repository root)

```text
frontend/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Public landing page (existing - update)
│   ├── register/
│   │   └── page.tsx         # Signup page (existing - verify)
│   ├── login/
│   │   └── page.tsx         # Signin page (existing - verify)
│   └── dashboard/
│       └── page.tsx         # Protected task dashboard (existing - verify)
├── src/
│   ├── components/
│   │   └── auth/
│   │       ├── register-form.tsx  # Registration form (existing - verify)
│   │       └── login-form.tsx     # Login form (existing - verify)
│   ├── lib/
│   │   └── api-client.ts    # Centralized API client with JWT (existing - verify)
│   └── middleware.ts        # Route protection middleware (may need creation)
├── public/                  # Static assets
├── .env.local              # Environment configuration (existing)
└── package.json            # Dependencies

backend/                     # Existing - no modifications
├── app/
│   ├── api/
│   │   ├── auth.py         # Authentication endpoints
│   │   └── tasks.py        # Task CRUD endpoints
│   └── middleware/
│       └── auth_middleware.py  # JWT verification
```

**Structure Decision**: Web application structure with existing frontend and backend. Frontend already implemented during authentication phase - this plan documents the implementation and identifies any gaps or improvements needed for full integration.

## Complexity Tracking

> No constitution violations - this section is not needed.

## Phase 0: Research & Decisions

### Research Topics

1. **Route Protection Strategy**
   - Decision needed: Client-side vs middleware-based route protection
   - Options: Next.js middleware, React context, or component-level checks

2. **Authentication State Management**
   - Decision needed: How to manage auth state across components
   - Options: React Context, localStorage checks, or Better Auth hooks

3. **API Error Handling**
   - Decision needed: Centralized error handling strategy
   - Options: Interceptors, try-catch patterns, or error boundaries

4. **Token Refresh Strategy**
   - Decision needed: How to handle token expiration
   - Options: Automatic refresh, redirect to login, or token renewal

### Research Output

See [research.md](./research.md) for detailed findings and decisions.

## Phase 1: Design Artifacts

### Data Model

Frontend state management and data flow patterns documented in [data-model.md](./data-model.md).

Key entities:
- User session state (authenticated, token, user info)
- Task list state (tasks array, loading, errors)
- Form state (registration, login, task creation)

### API Contracts

API client interface and endpoint specifications in [contracts/api-client.md](./contracts/api-client.md).

Endpoints:
- POST /auth/register - User registration
- POST /auth/login - User authentication
- GET /users/tasks - Fetch user's tasks
- POST /users/tasks - Create new task
- PUT /users/tasks/{id} - Update task
- PATCH /users/tasks/{id}/toggle - Toggle completion
- DELETE /users/tasks/{id} - Delete task

### Quickstart Guide

Development setup and testing procedures in [quickstart.md](./quickstart.md).

## Implementation Phases

### Phase 1: Verification & Documentation (Current)
**Goal**: Document existing implementation and identify gaps

**Tasks**:
1. Verify all pages exist and function correctly
2. Document API client implementation
3. Verify JWT token handling
4. Test authentication flows
5. Document any missing features or bugs

**Deliverables**:
- research.md with decisions
- data-model.md with state management
- contracts/api-client.md with API specs
- quickstart.md with setup guide

### Phase 2: Gap Analysis & Improvements
**Goal**: Identify and implement any missing functionality

**Tasks**:
1. Add route protection middleware if missing
2. Improve error handling if needed
3. Add loading states if missing
4. Enhance user feedback messages
5. Add form validation improvements

**Deliverables**:
- Updated components with improvements
- Enhanced error handling
- Better user experience

### Phase 3: Testing & Validation
**Goal**: Comprehensive testing of all user flows

**Tasks**:
1. Test registration flow end-to-end
2. Test login flow with valid/invalid credentials
3. Test task CRUD operations
4. Test data isolation between users
5. Test unauthorized access handling
6. Test token expiration scenarios

**Deliverables**:
- Test results documentation
- Bug fixes for any issues found
- Validated user flows

## Key Architectural Decisions

### 1. Route Protection Strategy

**Decision**: Use Next.js middleware for route protection combined with client-side auth checks

**Rationale**:
- Middleware provides server-side protection before page render
- Client-side checks provide immediate feedback
- Prevents unauthorized access at multiple levels

**Implementation**:
- Create middleware.ts to check for auth token
- Redirect unauthenticated users to /login
- Allow public routes: /, /register, /login

### 2. Authentication State Management

**Decision**: Use localStorage for token persistence with React hooks for state

**Rationale**:
- Simple and effective for JWT tokens
- Persists across browser sessions
- Easy to implement and maintain

**Implementation**:
- Store JWT token in localStorage on login/register
- Remove token on logout
- Check token presence for auth state

### 3. API Client Architecture

**Decision**: Centralized API client class with automatic JWT injection

**Rationale**:
- Single source of truth for API calls
- Automatic token management
- Consistent error handling
- Easy to maintain and test

**Implementation**:
- ApiClient class with methods for each endpoint
- Automatic Authorization header injection
- Centralized error handling

### 4. Error Handling Strategy

**Decision**: Component-level error state with user-friendly messages

**Rationale**:
- Localized error handling for better UX
- Clear feedback for users
- No technical details exposed

**Implementation**:
- Error state in each component
- Try-catch blocks around API calls
- User-friendly error messages

### 5. Form Validation

**Decision**: Client-side validation before API submission

**Rationale**:
- Immediate feedback for users
- Reduces unnecessary API calls
- Better user experience

**Implementation**:
- HTML5 validation attributes
- Custom validation logic for complex rules
- Error messages displayed inline

## Testing Strategy

### Manual Testing Checklist

**Authentication Flows**:
- [ ] User can access landing page without authentication
- [ ] User can navigate to signup page
- [ ] User can register with valid credentials
- [ ] User sees error for duplicate email
- [ ] User sees error for weak password
- [ ] User is redirected to dashboard after successful registration
- [ ] User can navigate to login page
- [ ] User can login with valid credentials
- [ ] User sees error for invalid credentials
- [ ] User is redirected to dashboard after successful login
- [ ] User session persists across page refreshes
- [ ] User can logout successfully
- [ ] User is redirected to landing page after logout

**Task Management**:
- [ ] Authenticated user can view empty task list
- [ ] User can create task with title only
- [ ] User can create task with title and description
- [ ] User sees error when creating task without title
- [ ] New task appears in list immediately
- [ ] User can view all their tasks
- [ ] User can toggle task completion status
- [ ] Completed tasks show visual indication
- [ ] User can update task title and description
- [ ] User can delete task
- [ ] Deleted task is removed from list immediately
- [ ] Tasks persist after page refresh

**Security & Data Isolation**:
- [ ] Unauthenticated user cannot access /dashboard
- [ ] Unauthenticated user is redirected to /login
- [ ] User A cannot see User B's tasks
- [ ] API requests include JWT token
- [ ] Expired token redirects to login
- [ ] Invalid token redirects to login

**Error Handling**:
- [ ] Network errors show user-friendly messages
- [ ] API errors show appropriate messages
- [ ] Loading states display during operations
- [ ] Form validation errors are clear

## Dependencies

### External Dependencies
- Existing FastAPI backend with authentication and task endpoints
- Neon PostgreSQL database (via backend)
- Modern web browser with JavaScript enabled

### Internal Dependencies
- Backend authentication system (Spec 1: 1-auth-jwt-security)
- Backend task management API (Spec 1: 1-auth-jwt-security)

### Technical Dependencies
- Next.js 16+ framework
- React 18+ library
- Better Auth for JWT handling
- TailwindCSS for styling
- Browser localStorage API

## Risk Assessment

### High Risk
- **Token expiration handling**: If not implemented, users may experience unexpected logouts
  - Mitigation: Implement token refresh or clear error messages

### Medium Risk
- **Network failures during operations**: Users may lose data or see inconsistent state
  - Mitigation: Implement retry logic and clear error messages

- **Concurrent sessions**: User opens app in multiple tabs/devices
  - Mitigation: Document expected behavior, consider token synchronization

### Low Risk
- **Browser compatibility**: Older browsers may not support features
  - Mitigation: Target modern browsers only, document requirements

## Success Metrics

- All 6 user stories from spec are implemented and tested
- All 22 functional requirements are met
- All 10 success criteria are achieved
- Zero security vulnerabilities in authentication flow
- 100% of API requests include valid JWT tokens
- Users can complete all task operations without page refreshes

## Next Steps

1. **Complete Phase 0**: Generate research.md with all architectural decisions
2. **Complete Phase 1**: Generate data-model.md, contracts/, and quickstart.md
3. **Run /sp.tasks**: Generate detailed task breakdown for implementation
4. **Execute Implementation**: Follow tasks.md to implement/verify all features
5. **Testing**: Execute manual testing checklist
6. **Documentation**: Update any gaps found during implementation
