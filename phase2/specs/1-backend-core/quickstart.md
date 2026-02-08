# Quickstart Guide: Backend Core & Database Foundation

## Prerequisites
- Python 3.8+
- pip package manager
- Access to Neon PostgreSQL database instance

## Environment Setup
1. Install dependencies:
   ```bash
   pip install fastapi sqlmodel uvicorn python-dotenv
   ```

2. Create environment file (.env):
   ```
   DATABASE_URL=postgresql://username:password@ep-xxxxxx.us-east-1.aws.neon.tech/dbname
   ```

## Running the Application
1. Start the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

2. The API will be available at http://localhost:8000

## Key Endpoints
- `GET /users/{user_id}/tasks` - List user's tasks
- `POST /users/{user_id}/tasks` - Create new task
- `GET /users/{user_id}/tasks/{task_id}` - Get specific task
- `PUT /users/{user_id}/tasks/{task_id}` - Update task
- `DELETE /users/{user_id}/tasks/{task_id}` - Delete task
- `PATCH /users/{user_id}/tasks/{task_id}/toggle` - Toggle completion

## Database Initialization
On first run, the application will automatically create required tables if they don't exist.