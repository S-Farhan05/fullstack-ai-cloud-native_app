---
name: backend-routes
description: Generate backend routes, handle requests/responses, and connect to databases. Useful for building APIs and server-side logic.
---

# Backend Routes & DB Skill

## Instructions

1. **Route Structure**
   - Define endpoints: `GET`, `POST`, `PUT`, `DELETE`
   - Organize routes by resource (e.g., `/users`, `/products`)
   - Apply middleware for authentication, logging, or validation

2. **Request & Response Handling**
   - Parse request body, query parameters, and headers
   - Validate and sanitize input
   - Send proper HTTP status codes and JSON responses
   - Handle errors gracefully with meaningful messages

3. **Database Connection**
   - Connect to SQL or NoSQL databases
   - Perform CRUD operations
   - Use environment variables for credentials
   - Handle connection errors and timeouts

## Best Practices
- Follow RESTful conventions for routes
- Keep handlers small, modular, and testable
- Use async/await for database operations
- Log errors and monitor performance
- Secure sensitive data and credentials

## Example Structure (Node.js + Express + MongoDB)
```javascript
// server.js
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB connection error:", err));

app.use("/users", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

// routes/users.js
import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;

// controllers/userController.js
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
