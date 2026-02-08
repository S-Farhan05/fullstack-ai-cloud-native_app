# Data Model: Authentication & API Security

## Entity: User

**Description**: Represents an authenticated individual with email, authentication status, and personal data access rights

**Fields**:
- `id` (string/UUID): Unique identifier for the user, corresponds to JWT subject claim
- `email` (string): User's email address used for authentication
- `name` (string, optional): User's display name
- `created_at` (datetime): Timestamp when the user account was created
- `updated_at` (datetime): Timestamp when the user account was last updated
- `email_verified` (boolean): Whether the user's email has been verified

**Relationships**:
- One-to-Many with Task: One user can own many tasks

**Validation Rules**:
- Email must be in valid format
- Email must be unique across all users
- Email is required and cannot be empty
- Name, if provided, must be 1-100 characters

## Entity: JWT Token

**Description**: Contains user identity claims, expiration time, and is cryptographically signed for verification

**Fields**:
- `sub` (string): Subject identifier (maps to User.id)
- `jti` (string): JWT ID for unique identification (optional)
- `iss` (string): Issuer of the token (application identifier)
- `aud` (string/array): Audience(s) for the token (application clients)
- `exp` (number): Expiration timestamp (Unix epoch seconds)
- `iat` (number): Issued at timestamp (Unix epoch seconds)
- `nbf` (number, optional): Not before timestamp (Unix epoch seconds)
- `user_email` (string, optional): User's email in the token
- `user_name` (string, optional): User's name in the token

**Validation Rules**:
- `sub` must correspond to a valid User.id
- `exp` must be in the future when validating
- `iat` must be in the past when validating
- `nbf` must be in the past or present when validating (if present)

## Entity: Task

**Description**: Personal user data entity that is associated with a specific user ID and accessible only by that user

**Fields**:
- `id` (string/UUID): Unique identifier for the task
- `title` (string): Title or description of the task
- `description` (string, optional): Detailed description of the task
- `completed` (boolean): Whether the task has been completed
- `user_id` (string/UUID): Foreign key linking to the owning User
- `created_at` (datetime): Timestamp when the task was created
- `updated_at` (datetime): Timestamp when the task was last updated

**Relationships**:
- Many-to-One with User: Many tasks belong to one user

**Validation Rules**:
- `user_id` must correspond to a valid User.id
- `title` must be 1-200 characters
- `completed` defaults to false if not specified
- `user_id` is required and cannot be null

## Entity: Authentication Session

**Description**: Temporary state that maintains user's logged-in status between frontend and backend

**Fields**:
- `session_token` (string): Unique session identifier
- `user_id` (string/UUID): Reference to the authenticated User
- `expires_at` (datetime): When the session expires
- `created_at` (datetime): When the session was created
- `last_accessed` (datetime): When the session was last used

**Validation Rules**:
- `session_token` must be unique
- `user_id` must correspond to a valid User.id
- `expires_at` must be in the future
- `created_at` cannot be after `expires_at`

## Data Relationships

### User - Task Relationship
```
User (1) <---> (0..*) Task
User.id ←→ Task.user_id
```

**Constraints**:
- Cascade deletion: When a User is deleted, their Tasks are also deleted
- Referential integrity: Task.user_id must reference a valid User.id
- Data isolation: Only the user with matching id can access their tasks

### JWT Token - User Relationship
```
User (1) <---> (0..*) JWT Token
User.id ←→ JWT.sub
```

**Constraints**:
- JWT tokens are stateless but verify against User.id
- Token validation checks User.id exists and is valid
- No direct database storage of JWTs (stateless authentication)

## Access Control Rules

1. **User Authentication**: Only authenticated users with valid JWT tokens can access protected endpoints
2. **Data Ownership**: Users can only access tasks where `task.user_id` equals their `user.id`
3. **Data Modification**: Users can only modify tasks they own
4. **Data Deletion**: Users can only delete tasks they own
5. **User Information**: Only the authenticated user can access their own user information

## State Transitions

### Task Completion State
```
Pending (completed: false) → Completed (completed: true)
Completed (completed: true) → Pending (completed: false)
```

### User Account States
```
Registered → Verified (email_verified: true)
New Account → Active (after initial setup)
Active → Disabled (administrative action)
```

## Indexes for Performance

1. **User.email**: Unique index for fast authentication lookups
2. **Task.user_id**: Index for efficient ownership queries
3. **Task.created_at**: Index for sorting tasks by creation date
4. **AuthenticationSession.session_token**: Unique index for fast session validation
5. **JWT.sub + JWT.exp**: Combined index if storing session state (not planned for stateless)

## Validation Checks

### Business Logic Validation
1. Users cannot access other users' tasks
2. Users cannot modify or delete tasks that don't belong to them
3. JWT tokens must be valid and not expired
4. User email must be unique
5. Task titles must not be empty

### Data Integrity Validation
1. Foreign key constraints enforced by database
2. Required fields are present and valid
3. Field length limits enforced
4. Data types maintained consistently
5. Referential integrity preserved