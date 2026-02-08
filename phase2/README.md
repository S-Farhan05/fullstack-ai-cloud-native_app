# AI-Powered Full-Stack Todo Application

A modern, full-stack task management application built with Next.js, FastAPI, and PostgreSQL. Features a sleek dark-themed UI with JWT authentication and real-time task management.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Completion**: Mark tasks as complete/incomplete with visual feedback
- **Modern UI**: Dark-themed, responsive design with smooth animations
- **Real-time Updates**: Instant task updates without page refresh
- **Secure API**: Protected endpoints with JWT verification
- **User Isolation**: Each user can only access their own tasks
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5.9.3** - Type safety
- **Tailwind CSS 4.1.18** - Utility-first CSS framework

### Backend
- **FastAPI** - Modern Python web framework
- **SQLModel** - SQL database ORM
- **Python-Jose** - JWT token handling
- **Uvicorn** - ASGI server

### Database
- **Neon PostgreSQL** - Serverless PostgreSQL database

## 📁 Project Structure

```
phase2/
├── app/                          # Backend (FastAPI)
│   ├── api/                      # API endpoints
│   │   ├── auth.py              # Authentication routes
│   │   ├── health.py            # Health check
│   │   └── tasks.py             # Task CRUD operations
│   ├── config/                   # Configuration
│   │   └── settings.py          # Environment settings
│   ├── database/                 # Database setup
│   │   ├── crud.py              # Database operations
│   │   ├── engine.py            # Database engine
│   │   └── session.py           # Database sessions
│   ├── middleware/               # Middleware
│   │   └── auth_middleware.py   # JWT verification
│   ├── models/                   # Database models
│   │   ├── task.py              # Task model
│   │   └── user.py              # User model
│   ├── schemas/                  # Pydantic schemas
│   │   ├── auth.py              # Auth schemas
│   │   └── task.py              # Task schemas
│   ├── services/                 # Business logic
│   │   └── auth_service.py      # Auth services
│   ├── utils/                    # Utilities
│   │   └── jwt.py               # JWT utilities
│   └── main.py                   # FastAPI app entry point
│
├── frontend/                     # Frontend (Next.js)
│   ├── app/                      # Next.js App Router
│   │   ├── dashboard/           # Dashboard page
│   │   ├── login/               # Login page
│   │   ├── register/            # Register page
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Landing page
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── auth/           # Auth components
│   │   │   ├── dashboard/      # Dashboard components
│   │   │   └── landing/        # Landing page components
│   │   └── lib/                 # Utilities
│   │       └── api-client.ts   # API client
│   └── package.json             # Frontend dependencies
│
├── .env                          # Backend environment variables (not committed)
├── .env.example                  # Backend env template
├── .gitignore                    # Git ignore rules
├── requirements.txt              # Python dependencies
└── README.md                     # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 20+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **Neon PostgreSQL Account** - [Sign up](https://neon.tech/)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd todo_app/phase2
```

### 2. Backend Setup

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
DATABASE_URL='postgresql://username:password@host/database?sslmode=require'
JWT_SECRET_KEY=your_secure_random_string_min_32_characters
```

**Getting Your Database URL:**
1. Sign up at [Neon.tech](https://neon.tech/)
2. Create a new project
3. Copy the connection string from the dashboard
4. Paste it into `DATABASE_URL`

**Generating JWT Secret:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

**Copy .env to app folder:** `cp .env app/.env`

### 3. Frontend Setup

#### Navigate to Frontend Directory

```bash
cd frontend
```

#### Install Node Dependencies

```bash
npm install
```

#### Configure Environment Variables

Create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

**Note:** If you run the backend on a different port (e.g., 8001), update this URL accordingly.

## 🚀 Running the Application

### Start Backend Server

Navigate to the app directory and start the server:

```bash
cd app
python -m uvicorn main:app --reload --port 8000
```

**Using a Different Port:**
```bash
cd app
python -m uvicorn main:app --reload --port 8001
```

The backend will be available at:
- **API**: http://127.0.0.1:8000
- **API Docs**: http://127.0.0.1:8000/docs
- **Health Check**: http://127.0.0.1:8000/health

### Start Frontend Server

From the `frontend/` directory:

```bash
npm run dev
```

The frontend will be available at:
- **Application**: http://localhost:3000

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |

### Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/tasks` | Get all user tasks | Yes |
| POST | `/users/tasks` | Create new task | Yes |
| GET | `/users/tasks/{task_id}` | Get specific task | Yes |
| PUT | `/users/tasks/{task_id}` | Update task | Yes |
| DELETE | `/users/tasks/{task_id}` | Delete task | Yes |
| PATCH | `/users/tasks/{task_id}/toggle` | Toggle task completion | Yes |

### Health Check

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Check API health | No |

## 🎨 Features Walkthrough

### 1. Landing Page
- Modern hero section with gradient effects
- Feature showcase with hover animations
- How it works section
- Benefits and statistics
- Call-to-action sections

### 2. Authentication
- **Sign Up**: Create account with email and password
- **Sign In**: Login with credentials
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: Automatic redirect if not authenticated

### 3. Dashboard
- **Task List**: Compact table view with all tasks
- **Add Task**: Create tasks with title and description
- **Mark Complete**: Click checkbox to toggle completion
- **Delete Task**: Hover over row to reveal delete button
- **Logout**: Sign out and clear session

## 🗄️ Database Schema

### Users Table
```sql
- id: UUID (Primary Key)
- email: String (Unique)
- password: String (Hashed)
- name: String (Optional)
- email_verified: Boolean
- created_at: Timestamp
```

### Tasks Table
```sql
- id: UUID (Primary Key)
- title: String
- description: String (Optional)
- completed: Boolean
- user_id: UUID (Foreign Key -> Users)
- created_at: Timestamp
- updated_at: Timestamp
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Tokens**: Signed tokens with expiration (30 minutes)
- **Protected Routes**: Middleware verifies tokens on all protected endpoints
- **User Isolation**: Users can only access their own data
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Pydantic schemas validate all inputs

## 🐛 Troubleshooting

### Backend Issues

**Port Already in Use:**
```bash
# Use a different port
python -m uvicorn app.main:app --reload --port 8001
# Update frontend .env.local to match
```

**Database Connection Error:**
- Verify `DATABASE_URL` in `.env` is correct
- Check Neon dashboard for connection string
- Ensure database is active (not paused)

**Module Not Found:**
```bash
# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend Issues

**Port 3000 Already in Use:**
```bash
# Next.js will automatically use port 3001
# Or kill the process using port 3000
```

**API Connection Failed:**
- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure ports match between frontend and backend

**Module Not Found:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📝 Environment Variables Reference

### Backend (`.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `JWT_SECRET_KEY` | Secret key for JWT signing (32+ chars) | `your_random_secret_key` |

### Frontend (`frontend/.env.local`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://127.0.0.1:8000` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ using Claude Code

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- FastAPI for the modern Python web framework
- Neon for serverless PostgreSQL
- Tailwind CSS for the utility-first CSS framework

---

**Need Help?** Open an issue or contact the maintainers.

**Happy Coding! 🚀**