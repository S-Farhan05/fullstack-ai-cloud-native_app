---
name: database-skill
description: Design and manage databases. Generate tables, migrations, and scalable schema designs.
---

# Database Design & Migration Skill

## Instructions

1. **Schema design**
   - Identify entities and relationships
   - Normalize data (avoid redundancy)
   - Define primary and foreign keys

2. **Table generation**
   - Create clear, consistent table names
   - Choose appropriate data types
   - Add constraints (NOT NULL, UNIQUE, DEFAULT)

3. **Migrations**
   - Write reversible migrations
   - Handle schema changes safely
   - Version control database changes

## Best Practices
- Follow naming conventions consistently
- Use indexes for frequently queried columns
- Avoid over-normalization
- Plan for scalability and future changes

## Example Structure
```sql
-- users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  title VARCHAR(200),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
