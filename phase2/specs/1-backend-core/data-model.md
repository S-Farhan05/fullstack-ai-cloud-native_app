# Data Model: Backend Core & Database Foundation

**Feature**: Backend Core & Database Foundation
**Created**: 2026-02-06
**Status**: Complete

## Task Entity

### Attributes
- **id**: Integer, Primary Key, Auto-generated
- **title**: String (255), Required, Validates non-empty
- **description**: String (Text), Optional
- **completed**: Boolean, Default False
- **user_id**: Integer, Required, Foreign Key Reference to User
- **created_at**: DateTime, Auto-generated on creation
- **updated_at**: DateTime, Auto-generated on update

### Relationships
- **Owner (User)**: Many Tasks belong to One User (user_id foreign key)

### Validation Rules
- Title must be 1-255 characters
- User_id must reference an existing user
- Completed status can be toggled via dedicated endpoint

### State Transitions
- New Task: completed=False by default
- Toggle Operation: Switches completed status between True and False

## User Entity (Referenced)

### Attributes
- **id**: Integer, Primary Key, Auto-generated
- **email**: String (255), Required, Unique
- **created_at**: DateTime, Auto-generated on creation
- **updated_at**: DateTime, Auto-generated on update

*Note: User entity implementation deferred to authentication phase*

## Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Indexes
- Index on user_id for efficient user-based queries
- Index on (user_id, completed) for filtered queries