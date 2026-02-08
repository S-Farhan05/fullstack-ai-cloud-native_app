---
name: auth-skill
description: Implement secure authentication systems including signup, signin, JWT tokens, password hashing, and Better Auth integration.
---

# Authentication Skill

## Instructions

1. **User Authentication Flow**
   - User signup with validation
   - User signin with credentials
   - Secure logout handling
   - Session or token-based auth

2. **Password Security**
   - Hash passwords before storing
   - Use strong hashing algorithms (bcrypt / argon2)
   - Never store plain-text passwords
   - Salt passwords automatically

3. **JWT Token Handling**
   - Generate JWT on successful login
   - Include user ID and role in payload
   - Set token expiration
   - Verify JWT on protected routes

4. **Authorization**
   - Protect private routes
   - Role-based access control (optional)
   - Middleware-based verification

5. **Better Auth Integration**
   - Configure Better Auth provider
   - Handle OAuth / credentials flow
   - Secure callbacks and redirects
   - Sync users with database

## Best Practices
- Validate input on both client and server
- Use HTTPS only
- Keep JWT secret secure (env variables)
- Short-lived access tokens
- Hash passwords with proper cost factor
- Never expose auth errors in detail

## Example Structure
```ts
// Signup
POST /auth/signup
- Validate input
- Hash password
- Store user
- Return success response

// Signin
POST /auth/signin
- Verify credentials
- Generate JWT
- Return token

// Protected Route
GET /user/profile
- Verify JWT
- Allow access
