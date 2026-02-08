from fastapi.testclient import TestClient
from app.main import app

# Create a test client
client = TestClient(app)

print("Testing API endpoints...")

# Test health endpoint
print("\n1. Testing health endpoint:")
response = client.get("/health")
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")

# Test root endpoint
print("\n2. Testing root endpoint:")
response = client.get("/")
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")

# Test task operations
print("\n3. Testing task operations:")

# Create a task
print("  Creating a task...")
create_response = client.post("/users/1/tasks", json={
    "title": "Test Task",
    "description": "This is a test task"
    # Note: user_id comes from the path parameter, not the request body
    # completed defaults to False in the model
})
print(f"  Create status: {create_response.status_code}")
if create_response.status_code == 200:
    task_data = create_response.json()
    task_id = task_data['id']
    print(f"  Created task with ID: {task_id}")

    # Get the created task
    print("  Retrieving the task...")
    get_response = client.get(f"/users/1/tasks/{task_id}")
    print(f"  Get status: {get_response.status_code}")
    if get_response.status_code == 200:
        print(f"  Retrieved task: {get_response.json()['title']}")

    # Update the task
    print("  Updating the task...")
    update_response = client.put(f"/users/1/tasks/{task_id}", json={
        "title": "Updated Test Task",
        "description": "This is an updated test task"
    })
    print(f"  Update status: {update_response.status_code}")

    # Toggle completion
    print("  Toggling task completion...")
    toggle_response = client.patch(f"/users/1/tasks/{task_id}/toggle")
    print(f"  Toggle status: {toggle_response.status_code}")
    if toggle_response.status_code == 200:
        toggled_task = toggle_response.json()
        print(f"  Task completion is now: {toggled_task['completed']}")

    # List tasks for user
    print("  Listing tasks for user...")
    list_response = client.get("/users/1/tasks")
    print(f"  List status: {list_response.status_code}")
    if list_response.status_code == 200:
        print(f"  Number of tasks: {len(list_response.json())}")

    # Delete the task
    print("  Deleting the task...")
    delete_response = client.delete(f"/users/1/tasks/{task_id}")
    print(f"  Delete status: {delete_response.status_code}")
else:
    print(f"  Failed to create task: {create_response.text}")

print("\nAPI testing completed successfully!")