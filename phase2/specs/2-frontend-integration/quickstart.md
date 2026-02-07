# Quickstart Guide: Frontend Application & Full-Stack Integration

**Feature**: Frontend Application & Full-Stack Integration
**Date**: 2026-02-07
**Status**: Complete

## Overview

This guide provides instructions for setting up, running, and testing the Next.js frontend application integrated with the FastAPI backend. Follow these steps to verify the complete authentication and task management flow.

---

## Prerequisites

### Required Software

- **Node.js**: Version 18+ (for Next.js)
- **npm**: Version 9+ (comes with Node.js)
- **Python**: Version 3.11+ (for backend)
- **Git**: For version control

### Required Services

- **Backend API**: FastAPI backend must be running on port 8001
- **Database**: Neon PostgreSQL database must be configured and accessible
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

---

## Initial Setup

### 1. Clone Repository

```bash
cd E:\Farhan-work\Hackathon\todo_app\phase2
git checkout 2-frontend-integration
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

**Expected Dependencies**:
- next@16.1.6
- react@18+
- react-dom@18+
- typescript@5+
- tailwindcss@3+

### 3. Configure Environment

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8001
```

**Note**: This file already exists from the authentication implementation phase.

### 4. Verify Backend is Running

```bash
# In a separate terminal, from phase2 directory
uvicorn app.main:app --reload --port 8001
```

**Expected Output**:
```
INFO:     Uvicorn running on http://127.0.0.1:8001
INFO:     Application startup complete.
```

**Verify Backend Health**:
```bash
curl http://127.0.0.1:8001/health
```

**Expected Response**:
```json
{"status":"healthy","service":"task-management-api"}
```

---

## Running the Application

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

**Expected Output**:
```
▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://172.31.48.1:3000

✓ Ready in 2.1s
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## Testing the Application

### Manual Testing Workflow

#### 1. Landing Page

**URL**: `http://localhost:3000`

**Verify**:
- [ ] Page loads without errors
- [ ] "Get Started" button is visible
- [ ] "Sign In" button is visible
- [ ] Page displays app title and description
- [ ] No authentication required

**Actions**:
- Click "Get Started" → Should navigate to `/register`
- Click "Sign In" → Should navigate to `/login`

---

#### 2. User Registration

**URL**: `http://localhost:3000/register`

**Test Case 1: Successful Registration**

**Steps**:
1. Enter email: `testuser1@example.com`
2. Enter password: `password123` (8+ characters)
3. Enter name: `Test User` (optional)
4. Click "Register"

**Expected Results**:
- [ ] Form submits without errors
- [ ] User is redirected to `/dashboard`
- [ ] Dashboard shows empty task list
- [ ] No error messages displayed

**Test Case 2: Duplicate Email**

**Steps**:
1. Enter email: `testuser1@example.com` (same as above)
2. Enter password: `password123`
3. Click "Register"

**Expected Results**:
- [ ] Error message: "Email already in use" or similar
- [ ] User remains on registration page
- [ ] Form is still editable

**Test Case 3: Weak Password**

**Steps**:
1. Enter email: `testuser2@example.com`
2. Enter password: `pass` (less than 8 characters)
3. Click "Register"

**Expected Results**:
- [ ] HTML5 validation prevents submission
- [ ] Error message about password length
- [ ] Form is still editable

**Test Case 4: Invalid Email**

**Steps**:
1. Enter email: `notanemail`
2. Enter password: `password123`
3. Click "Register"

**Expected Results**:
- [ ] HTML5 validation prevents submission
- [ ] Error message about email format
- [ ] Form is still editable

---

#### 3. User Login

**URL**: `http://localhost:3000/login`

**Test Case 1: Successful Login**

**Steps**:
1. Enter email: `testuser1@example.com`
2. Enter password: `password123`
3. Click "Sign In"

**Expected Results**:
- [ ] Form submits without errors
- [ ] User is redirected to `/dashboard`
- [ ] Dashboard shows user's tasks (if any)
- [ ] No error messages displayed

**Test Case 2: Invalid Credentials**

**Steps**:
1. Enter email: `testuser1@example.com`
2. Enter password: `wrongpassword`
3. Click "Sign In"

**Expected Results**:
- [ ] Error message: "Invalid email or password" or similar
- [ ] User remains on login page
- [ ] Form is still editable

**Test Case 3: Non-existent User**

**Steps**:
1. Enter email: `nonexistent@example.com`
2. Enter password: `password123`
3. Click "Sign In"

**Expected Results**:
- [ ] Error message: "Invalid email or password" or similar
- [ ] User remains on login page
- [ ] No indication whether email exists (security)

---

#### 4. Task Management (Dashboard)

**URL**: `http://localhost:3000/dashboard` (requires authentication)

**Test Case 1: View Empty Task List**

**Prerequisites**: Newly registered user with no tasks

**Expected Results**:
- [ ] Dashboard loads successfully
- [ ] Message: "No tasks yet. Create your first task above!"
- [ ] Task creation form is visible
- [ ] Logout button is visible

**Test Case 2: Create Task**

**Steps**:
1. Enter title: `Complete documentation`
2. Enter description: `Write all the docs` (optional)
3. Click "Add Task"

**Expected Results**:
- [ ] Task appears in list immediately
- [ ] Task shows title and description
- [ ] Task is unchecked (not completed)
- [ ] Form is cleared after submission
- [ ] No page refresh required

**Test Case 3: Create Task Without Title**

**Steps**:
1. Leave title empty
2. Enter description: `Some description`
3. Click "Add Task"

**Expected Results**:
- [ ] HTML5 validation prevents submission
- [ ] Error message about required title
- [ ] Form is still editable

**Test Case 4: Toggle Task Completion**

**Prerequisites**: At least one task exists

**Steps**:
1. Click checkbox next to a task

**Expected Results**:
- [ ] Task is marked as complete
- [ ] Task title shows strikethrough
- [ ] Task styling changes (grayed out)
- [ ] No page refresh required

**Steps** (continued):
2. Click checkbox again

**Expected Results**:
- [ ] Task is marked as incomplete
- [ ] Strikethrough is removed
- [ ] Task styling returns to normal
- [ ] No page refresh required

**Test Case 5: Delete Task**

**Prerequisites**: At least one task exists

**Steps**:
1. Click "Delete" button next to a task

**Expected Results**:
- [ ] Task is removed from list immediately
- [ ] No page refresh required
- [ ] No confirmation dialog (immediate deletion)

**Test Case 6: Multiple Tasks**

**Steps**:
1. Create 5 different tasks with various titles and descriptions
2. Toggle completion on some tasks
3. Delete one task
4. Refresh the page

**Expected Results**:
- [ ] All tasks are displayed in list
- [ ] Completed tasks show strikethrough
- [ ] Deleted task is not visible
- [ ] All tasks persist after refresh
- [ ] Task order is consistent

---

#### 5. Session Persistence

**Test Case 1: Page Refresh**

**Steps**:
1. Login to dashboard
2. Create some tasks
3. Refresh the page (F5 or Ctrl+R)

**Expected Results**:
- [ ] User remains authenticated
- [ ] Dashboard loads without redirect to login
- [ ] All tasks are still visible
- [ ] No data loss

**Test Case 2: Direct URL Access**

**Steps**:
1. Login to dashboard
2. Copy dashboard URL
3. Open new browser tab
4. Paste URL and navigate

**Expected Results**:
- [ ] User is still authenticated
- [ ] Dashboard loads successfully
- [ ] All tasks are visible

**Test Case 3: Browser Close and Reopen**

**Steps**:
1. Login to dashboard
2. Close browser completely
3. Reopen browser
4. Navigate to `http://localhost:3000/dashboard`

**Expected Results**:
- [ ] User is still authenticated (token persists)
- [ ] Dashboard loads successfully
- [ ] All tasks are visible

---

#### 6. Logout

**Test Case 1: Successful Logout**

**Steps**:
1. Login to dashboard
2. Click "Logout" button

**Expected Results**:
- [ ] User is redirected to landing page (`/`)
- [ ] Token is removed from localStorage
- [ ] User cannot access dashboard without re-login

**Test Case 2: Access After Logout**

**Steps**:
1. Logout from dashboard
2. Try to navigate to `/dashboard` directly

**Expected Results**:
- [ ] User is redirected to `/login`
- [ ] Dashboard is not accessible
- [ ] No tasks are visible

---

#### 7. Data Isolation

**Test Case 1: Multiple Users**

**Steps**:
1. Register User A: `usera@example.com`
2. Login as User A
3. Create 3 tasks for User A
4. Logout
5. Register User B: `userb@example.com`
6. Login as User B
7. Create 2 tasks for User B

**Expected Results**:
- [ ] User B sees only their 2 tasks
- [ ] User B does not see User A's 3 tasks
- [ ] Logout and login as User A
- [ ] User A sees only their 3 tasks
- [ ] User A does not see User B's 2 tasks

---

#### 8. Unauthorized Access

**Test Case 1: Access Dashboard Without Login**

**Steps**:
1. Open browser in incognito/private mode
2. Navigate to `http://localhost:3000/dashboard`

**Expected Results**:
- [ ] User is redirected to `/login`
- [ ] Dashboard is not accessible
- [ ] No error messages displayed

**Test Case 2: Invalid Token**

**Steps**:
1. Open browser developer tools
2. Go to Application > Local Storage
3. Set `access_token` to `invalid_token_string`
4. Navigate to `/dashboard`

**Expected Results**:
- [ ] API returns 401 Unauthorized
- [ ] Token is removed from localStorage
- [ ] User is redirected to `/login`
- [ ] Error message: "Session expired. Please login again."

---

## Troubleshooting

### Frontend Won't Start

**Problem**: `npm run dev` fails

**Solutions**:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Check Node.js version: `node --version` (should be 18+)
4. Check for port conflicts on 3000

### Backend Connection Failed

**Problem**: API calls return network errors

**Solutions**:
1. Verify backend is running: `curl http://127.0.0.1:8001/health`
2. Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
3. Check CORS configuration in backend
4. Verify no firewall blocking port 8001

### Authentication Not Working

**Problem**: Login/register fails with errors

**Solutions**:
1. Check backend logs for errors
2. Verify database is accessible
3. Check JWT secret is configured in backend
4. Clear localStorage and try again

### Tasks Not Persisting

**Problem**: Tasks disappear after refresh

**Solutions**:
1. Check backend database connection
2. Verify API calls are successful (check Network tab)
3. Check for JavaScript errors in console
4. Verify token is present in localStorage

### CORS Errors

**Problem**: Browser shows CORS policy errors

**Solutions**:
1. Verify backend CORS configuration allows `http://localhost:3000`
2. Check backend is running on correct port
3. Restart both frontend and backend servers

---

## Development Workflow

### Making Changes

1. **Frontend Changes**:
   - Edit files in `frontend/app/` or `frontend/src/`
   - Changes hot-reload automatically
   - Check browser console for errors

2. **Backend Changes**:
   - Edit files in `app/`
   - Backend auto-reloads with `--reload` flag
   - Check terminal for errors

### Testing Changes

1. Make change
2. Verify in browser
3. Check browser console for errors
4. Check Network tab for API calls
5. Verify backend logs if needed

---

## Stopping the Application

### Stop Frontend

Press `Ctrl+C` in the terminal running `npm run dev`

### Stop Backend

Press `Ctrl+C` in the terminal running `uvicorn`

---

## Next Steps

After verifying the application works:

1. **Run /sp.tasks**: Generate detailed task breakdown
2. **Implement any gaps**: Fix any issues found during testing
3. **Document issues**: Note any bugs or missing features
4. **Prepare for deployment**: Configure production environment

---

## Quick Reference

### URLs

- Landing: `http://localhost:3000`
- Register: `http://localhost:3000/register`
- Login: `http://localhost:3000/login`
- Dashboard: `http://localhost:3000/dashboard`
- Backend API: `http://127.0.0.1:8001`
- Backend Health: `http://127.0.0.1:8001/health`

### Commands

```bash
# Start frontend
cd frontend && npm run dev

# Start backend
uvicorn app.main:app --reload --port 8001

# Check backend health
curl http://127.0.0.1:8001/health

# Clear localStorage (in browser console)
localStorage.clear()
```

### Test Credentials

Create your own test users during testing:
- Email: `test1@example.com`, Password: `password123`
- Email: `test2@example.com`, Password: `password123`

---

## Summary

This quickstart guide covers:
- ✅ Initial setup and configuration
- ✅ Running frontend and backend servers
- ✅ Comprehensive manual testing procedures
- ✅ Troubleshooting common issues
- ✅ Development workflow
- ✅ Quick reference for URLs and commands

Follow the testing workflow to verify all features work correctly before proceeding to implementation tasks.
