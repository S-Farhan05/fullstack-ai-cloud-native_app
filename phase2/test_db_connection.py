from app.database.engine import engine
from app.models.task import Task
from sqlmodel import SQLModel
from app.database.session import get_session
from app.models.task import TaskCreate
from datetime import datetime

# Create tables
print("Creating tables...")
try:
    SQLModel.metadata.create_all(engine)
    print("Tables created successfully!")
except Exception as e:
    print(f"Error creating tables: {e}")

# Test database connection by creating a sample task
print("\nTesting database connection...")
try:
    # Get a session
    session_gen = get_session()
    session = next(session_gen)

    # Create a sample task
    sample_task = TaskCreate(
        title="Sample Task",
        description="This is a sample task to test database connection",
        completed=False,
        user_id=1
    )

    # Add the task to the database using the CRUD function
    db_task = Task(
        title=sample_task.title,
        description=sample_task.description,
        completed=sample_task.completed,
        user_id=sample_task.user_id,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    print(f"Sample task created successfully with ID: {db_task.id}")

    # Query the task back to verify it was stored
    retrieved_task = session.get(Task, db_task.id)
    if retrieved_task:
        print(f"Successfully retrieved task: {retrieved_task.title}")
        print(f"Task details - ID: {retrieved_task.id}, Title: {retrieved_task.title}, Completed: {retrieved_task.completed}, User ID: {retrieved_task.user_id}")
    else:
        print("Failed to retrieve the task from database")

    # Clean up: delete the sample task
    session.delete(retrieved_task)
    session.commit()
    print("Sample task cleaned up successfully")

    # Close the session
    session.close()
    print("Database connection test completed successfully!")

except Exception as e:
    print(f"Error during database test: {e}")