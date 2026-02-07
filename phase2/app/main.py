from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.health import router as health_router
from app.api.tasks import router as tasks_router
from app.api.auth import router as auth_router
from app.database.engine import create_tables

app = FastAPI(
    title="Task Management API",
    description="Backend API for task management operations with user ownership",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # Local development
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        # Production - Add your actual domains here
        "https://your-app-name.vercel.app",           # Replace with your Vercel domain
        "https://www.your-custom-domain.com",         # Replace with your custom domain
        "https://your-custom-domain.com",             # Without www
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include health check router
app.include_router(health_router)

# Include auth router
app.include_router(auth_router)

# Include tasks router with prefix
app.include_router(tasks_router, prefix="/users")

@app.on_event("startup")
async def startup_event():
    print("Starting up and initializing database...")
    # Create database tables
    create_tables()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Task Management API"}