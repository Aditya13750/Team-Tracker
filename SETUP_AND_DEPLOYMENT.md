# TeamTrack - Full Stack MERN Application
# Complete Setup and Deployment Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Project Structure](#project-structure)
7. [Deployment Guide](#deployment-guide)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**TeamTrack** is a full-stack Team Task Manager application built with the MERN stack:
- **M**ongoDB - NoSQL Database
- **E**xpress.js - Backend Framework
- **R**eact.js - Frontend Library
- **N**ode.js - Runtime Environment

### Key Features:
- User authentication with JWT
- Role-based access control (Admin/Member)
- Project management
- Task management with kanban board
- Dashboard with statistics
- Responsive design with Tailwind CSS

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **npm** or **yarn** - Comes with Node.js
3. **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)
4. **Git** - [Download](https://git-scm.com/)
5. **Code Editor** - VSCode recommended

### Check Installation:
```bash
node --version    # Should show v16.x.x or higher
npm --version     # Should show 8.x.x or higher
mongo --version   # Optional, if using local MongoDB
```

---

## 🚀 Local Development Setup

### Step 1: Clone or Extract the Project

```bash
# Navigate to your projects folder
cd path/to/TeamTrack
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# On Windows (PowerShell):
copy .env.example .env

# On macOS/Linux (Terminal):
cp .env.example .env

# Edit .env file with your MongoDB connection string
# Use a text editor to open .env and update:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/teamtrack?retryWrites=true&w=majority
# JWT_SECRET=your_secret_key_here
# PORT=5000
# NODE_ENV=development
```

### Step 3: MongoDB Setup

#### Option A: Using MongoDB Atlas (Recommended for Deployment)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Set up database access credentials
5. Get your connection string
6. Replace the connection string in `.env`

#### Option B: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   - Windows: `mongod`
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
3. Use local connection: `MONGODB_URI=mongodb://localhost:27017/teamtrack`

### Step 4: Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file (optional for development)
# VITE_API_URL=http://localhost:5000
```

---

## 🏃 Running the Application

### Terminal 1: Backend Server

```bash
cd backend
npm run dev    # Using nodemon for auto-reload
# or
npm start      # Single run
```

Expected output:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Terminal 2: Frontend Development Server

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

### Access the Application

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`
- Health Check: `http://localhost:5000/api/health`

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | No | Register a new user |
| POST | `/login` | No | Login user |
| GET | `/me` | Yes | Get current user info |

**Example Requests:**

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Projects Routes (`/api/projects`)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/` | Yes | Any | Get all projects |
| GET | `/:id` | Yes | Any | Get project by ID |
| POST | `/` | Yes | Admin | Create project |
| PATCH | `/:id` | Yes | Admin | Update project |
| DELETE | `/:id` | Yes | Admin | Delete project |
| POST | `/:id/add-member` | Yes | Admin | Add member to project |

**Example Request:**

```bash
# Create project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Q1 Planning",
    "description": "First quarter planning"
  }'
```

### Tasks Routes (`/api/tasks`)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/` | Yes | Any | Get all tasks (with filters) |
| GET | `/:id` | Yes | Any | Get task by ID |
| POST | `/` | Yes | Admin | Create task |
| PATCH | `/:id` | Yes | Any | Update task status |
| DELETE | `/:id` | Yes | Admin | Delete task |

**Query Parameters for GET /tasks:**
- `status`: todo, in-progress, done
- `projectId`: Filter by project
- `assignedTo`: Filter by user

**Example Request:**

```bash
# Get tasks with filters
curl -X GET "http://localhost:5000/api/tasks?status=todo&projectId=PROJECT_ID" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update task status
curl -X PATCH http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "in-progress"
  }'
```

---

## 📁 Project Structure

### Backend Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── models/
│   ├── User.js               # User schema
│   ├── Project.js            # Project schema
│   └── Task.js               # Task schema
├── controllers/
│   ├── authController.js     # Auth logic
│   ├── projectController.js  # Project logic
│   └── taskController.js     # Task logic
├── routes/
│   ├── authRoutes.js         # Auth routes
│   ├── projectRoutes.js      # Project routes
│   └── taskRoutes.js         # Task routes
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   └── roleMiddleware.js     # Role-based access
├── utils/                    # Utility functions (optional)
├── server.js                 # Server entry point
├── package.json              # Dependencies
├── .env.example              # Example environment variables
└── .gitignore               # Git ignore file
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── ProtectedRoute.jsx   # Route protection
│   │   ├── FormComponents.jsx   # Reusable form components
│   │   └── StatusMessages.jsx   # Alert components
│   ├── pages/
│   │   ├── Home.jsx             # Home page
│   │   ├── Login.jsx            # Login page
│   │   ├── Signup.jsx           # Signup page
│   │   ├── Dashboard.jsx        # Dashboard
│   │   ├── Projects.jsx         # Projects page
│   │   └── Tasks.jsx            # Tasks board
│   ├── services/
│   │   └── api.js               # API calls
│   ├── context/
│   │   └── AuthContext.jsx      # Auth state management
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── index.html                   # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── package.json                # Dependencies
└── .gitignore                  # Git ignore file
```

---

## 🌐 Deployment Guide

### Backend Deployment (Railway)

#### Step 1: Prepare Backend for Deployment

```bash
cd backend

# Create .env.production file or set environment variables in Railway
```

#### Step 2: Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Create new project
4. Select "Deploy from GitHub"
5. Connect your GitHub repository
6. Select the repository
7. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `PORT`: 5000
   - `NODE_ENV`: production

#### Step 3: Deploy

1. Railway will automatically detect Node.js
2. Set start command: `node server.js`
3. Deploy

#### Step 4: Get Backend URL

- Railway will provide a public URL (e.g., `https://your-app.railway.app`)
- Update frontend `.env` with this URL

---

### Frontend Deployment (Vercel)

#### Step 1: Prepare Frontend

```bash
cd frontend

# Build the application
npm run build
```

#### Step 2: Deploy to Vercel

**Option A: Using Git (Recommended)**

1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import your GitHub project
4. Configure:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables:
   - `VITE_API_URL`: Your Railway backend URL
6. Deploy

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts and configure settings
```

#### Step 3: Configure Backend URL

1. In Vercel dashboard, go to project settings
2. Add environment variable:
   - `VITE_API_URL`: `https://your-backend-url.railway.app`
3. Redeploy

---

### Alternative: Netlify Deployment

```bash
cd frontend

# Build
npm run build

# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Follow prompts
```

---

## 🔒 Environment Variables

### Backend (.env)

```
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/teamtrack?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Server
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```
# API Base URL
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Testing the Application

### Test Users

After deployment, create test users:

1. **Admin User**
   - Email: admin@example.com
   - Password: admin123
   - Role: admin

2. **Regular User**
   - Email: user@example.com
   - Password: user123
   - Role: member

### Test Scenarios

1. **Authentication**
   - Sign up a new account
   - Login with credentials
   - Verify JWT token in localStorage
   - Logout and verify redirect to login

2. **Projects**
   - (Admin) Create a new project
   - (Admin) Add a team member
   - (Member) View assigned projects
   - (Admin) Delete project

3. **Tasks**
   - (Admin) Create a task
   - (Member) View assigned tasks
   - (Member) Update task status
   - (Admin) Delete task

---

## 🐛 Troubleshooting

### Backend Issues

#### MongoDB Connection Failed
- Verify MongoDB is running: `mongod`
- Check MongoDB URI in `.env`
- Ensure MongoDB Atlas firewall allows your IP
- For MongoDB Atlas: Add your IP to whitelist

```bash
# Check MongoDB connection
# Run this in MongoDB shell or Compass
db.runCommand({ ping: 1 })
```

#### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

#### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration (default: 30 days)
- Clear localStorage and re-login

### Frontend Issues

#### Blank Page / Won't Load
- Check browser console for errors (F12)
- Ensure backend is running on port 5000
- Clear browser cache
- Try incognito mode

#### API Calls Failing
- Check CORS is enabled in backend
- Verify API URL in frontend `.env`
- Check network tab in browser DevTools
- Ensure auth token is being sent in headers

#### Styles Not Loading
```bash
# Rebuild Tailwind
npm run build

# Clear cache
rm -rf node_modules/.vite
```

### Deployment Issues

#### Railway Backend Not Starting
- Check logs in Railway dashboard
- Verify environment variables are set
- Ensure `MONGODB_URI` is correct
- Check `package.json` start script

#### Vercel Frontend Not Building
- Check build logs
- Ensure `npm run build` works locally
- Verify environment variables
- Check `vite.config.js` configuration

#### CORS Errors
Add to backend `server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

---

## 📚 Useful Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [JWT Introduction](https://jwt.io/introduction)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push
5. Create a pull request

---

## 📝 License

This project is licensed under the MIT License.

---

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check browser console and backend logs

---

**Last Updated:** May 3, 2026
**Version:** 1.0.0
