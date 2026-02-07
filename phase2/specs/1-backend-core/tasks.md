# Tasks: Backend Core & Database Foundation

**Feature**: Backend Core & Database Foundation
**Branch**: 1-backend-core
**Created**: 2026-02-06
**Status**: Planned

## Phase 1: Setup

Goal: Initialize project structure and install required dependencies

Independent test: Can run the application skeleton without errors

- [X] T001 Create project directory structure (app/, app/api/, app/models/, app/database/, app/schemas/, app/config/)
- [X] T002 Create requirements.txt with FastAPI, SQLModel, psycopg2-binary, python-dotenv, uvicorn
- [X] T003 Create .env file with placeholder DATABASE_URL
- [X] T004 Create main application file at app/main.py with basic FastAPI app

## Phase 2: Foundational Components

Goal: Set up database connection and configuration management

Independent test: Database connection can be established successfully

- [X] T005 [P] Create database configuration in app/config/database.py using SQLModel and environment variables
- [X] T006 [P] Implement database session dependency in app/database/session.py using FastAPI dependency injection
- [X] T007 [P] Create Settings class in app/config/settings.py using Pydantic BaseSettings
- [X] T008 [P] Create database engine initialization in app/database/engine.py

## Phase 3: User Story 1 - FastAPI Backend Setup (Priority: P1)

Goal: Create a working FastAPI server with database connectivity

Independent test: Server starts successfully, connects to database, and responds to health checks

[US2] indicates tasks related to User Story 2 - FastAPI Backend Setup

- [X] T009 [P] [US2] Create health check endpoint at app/api/health.py with GET /health
- [X] T010 [P] [US2] Create startup event handler in app/main.py to initialize database connection
- [X] T011 [US2] Create basic server configuration with uvicorn in app/main.py
- [X] T012 [US2] Test server startup and database connection

## Phase 4: User Story 2 - Core Task Management API (Priority: P1)

Goal: Implement CRUD operations for tasks with user ownership

Independent test: Can perform create, read, update, and delete operations on tasks and data persists

[US1] indicates tasks related to User Story 1 - Core Task Management API

- [X] T013 [P] [US1] Create Task model in app/models/task.py using SQLModel with proper attributes and validation
- [X] T014 [P] [US1] Create request/response schemas in app/schemas/task.py for all operations
- [X] T015 [US1] Create tasks router in app/api/tasks.py with GET /users/{user_id}/tasks
- [X] T016 [US1] Implement create task endpoint POST /users/{user_id}/tasks in app/api/tasks.py
- [X] T017 [US1] Implement get single task endpoint GET /users/{user_id}/tasks/{task_id} in app/api/tasks.py
- [X] T018 [US1] Implement update task endpoint PUT /users/{user_id}/tasks/{task_id} in app/api/tasks.py
- [X] T019 [US1] Implement delete task endpoint DELETE /users/{user_id}/tasks/{task_id} in app/api/tasks.py
- [X] T020 [US1] Create database service layer in app/database/crud.py with CRUD operations for Task
- [X] T021 [US1] Test full CRUD cycle with data persistence

## Phase 5: User Story 3 - Task Completion Toggle (Priority: P2)

Goal: Implement functionality to toggle task completion status

Independent test: Can create a task and toggle its completion status through API

[US3] indicates tasks related to User Story 3 - Task Completion Toggle

- [X] T022 [P] [US3] Add toggle completion endpoint PATCH /users/{user_id}/tasks/{task_id}/toggle in app/api/tasks.py
- [X] T023 [US3] Implement toggle completion logic in app/database/crud.py
- [X] T024 [US3] Test toggle functionality and verify state changes are persisted

## Phase 6: Polish & Cross-Cutting Concerns

Goal: Add error handling, validation, and complete functionality

Independent test: All API endpoints return appropriate HTTP status codes and handle errors gracefully

- [X] T025 Add custom exception handlers in app/api/exceptions.py for domain-specific errors
- [X] T026 Implement request validation and error responses following API contracts
- [X] T027 Add database initialization to create tables if they don't exist
- [X] T028 Add logging configuration in app/config/logging.py
- [X] T029 Create proper documentation with API examples
- [X] T030 Test complete functionality including server restart persistence

## Dependencies

User Story 2 (Backend Setup) must complete before User Story 1 (Core API) and User Story 3 (Toggle functionality)

## Parallel Execution Examples

- T005-T008: Database components can be developed in parallel
- T013-T014: Model and schema can be created in parallel
- T015-T019: Different API endpoints can be developed in parallel after model/schema are ready

## Implementation Strategy

MVP scope: Complete Phase 1, 2, and 3 to have a working server with basic CRUD operations. Then add Phase 4 for toggle functionality. This delivers core value early while maintaining independence of each user story.