# 🎯 TeamTrack - Team Task Manager

A full-stack MERN application for managing team tasks and projects with role-based access control.

## ✨ Features

- 🔐 JWT Authentication with role-based access control
- 📊 Interactive dashboard with task statistics
- 📁 Project management with team collaboration
- 📋 Kanban-style task board (Todo, In Progress, Done)
- 👥 Team member management
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast development with Vite

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

**1. Install Backend Dependencies**
```bash
cd backend
npm install
```

**2. Install Frontend Dependencies**
```bash
cd frontend
npm install
```

**3. Configure Environment**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### Running Locally

**Terminal 1 - Backend (Port 5000):**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend (Port 3000):**
```bash
cd frontend
npm run dev
```

Open http://localhost:3000 in your browser.

## 📖 Documentation

- **[Setup & Deployment Guide](./SETUP_AND_DEPLOYMENT.md)** - Complete setup, deployment to Railway/Vercel
- **[API Documentation](./API_DOCUMENTATION.md)** - Full API reference with examples
- **[Architecture Guide](./ARCHITECTURE.md)** - Project structure and design patterns

## 🏗️ Project Structure

```
TeamTrack/
├── backend/                 # Express.js + MongoDB + JWT
│   ├── config/             # Database configuration
│   ├── models/             # Mongoose schemas (User, Project, Task)
│   ├── controllers/        # Business logic
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication & authorization
│   └── server.js           # Entry point
│
├── frontend/               # React + Tailwind CSS
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API integration
│   │   ├── context/        # Auth state management
│   │   └── App.jsx         # Main app component
│   └── index.html
│
└── Documentation
    ├── SETUP_AND_DEPLOYMENT.md
    ├── API_DOCUMENTATION.md
    └── ARCHITECTURE.md
```

## 🔗 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | ❌ | Register user |
| POST | `/api/auth/login` | ❌ | Login user |
| GET | `/api/projects` | ✅ | Get projects |
| POST | `/api/projects` | ✅ | Create project (Admin) |
| GET | `/api/tasks` | ✅ | Get tasks |
| POST | `/api/tasks` | ✅ | Create task (Admin) |
| PATCH | `/api/tasks/:id` | ✅ | Update task status |

See [API Documentation](./API_DOCUMENTATION.md) for full reference.

## 🔐 Authentication

- **JWT Token**: Obtained on signup/login, stored in localStorage
- **Authorization Header**: `Bearer YOUR_TOKEN`
- **Role-Based Access**: Admin vs Member permissions
- **Password**: Bcrypt hashed, never stored in plain text

## 👥 User Roles

- **Admin**: Create projects/tasks, manage team members
- **Member**: View/update assigned tasks, view projects

## 🚢 Deployment

### Backend - Railway
1. Push code to GitHub
2. Connect Railway to GitHub
3. Set environment variables (MONGODB_URI, JWT_SECRET)
4. Deploy

### Frontend - Vercel/Netlify
1. Push code to GitHub
2. Connect Vercel/Netlify to GitHub
3. Set VITE_API_URL to backend URL
4. Deploy

See [Deployment Guide](./SETUP_AND_DEPLOYMENT.md) for detailed instructions.

## 🛠️ Tech Stack

### Backend
- Express.js - Web framework
- MongoDB - NoSQL database
- Mongoose - MongoDB ODM
- JWT - Authentication
- Bcrypt - Password hashing

### Frontend
- React 18 - UI library
- React Router - Navigation
- Axios - HTTP client
- Tailwind CSS - Styling
- Vite - Build tool

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/teamtrack
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (optional)
```
VITE_API_URL=http://localhost:5000
```

## 🧪 Testing

Create a test account to explore:
1. Sign up on the signup page
2. Create a project (if admin role)
3. Create tasks and assign to team members
4. Drag tasks across the kanban board

## 📚 Resources

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Express Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📞 Support

For issues and help:
1. Check the [troubleshooting section](./SETUP_AND_DEPLOYMENT.md#-troubleshooting)
2. Review [API documentation](./API_DOCUMENTATION.md)
3. Check browser console and backend logs

## 📄 License

MIT License - feel free to use this project for personal or commercial use.

---

**Version:** 1.0.0  
**Last Updated:** May 3, 2026  
**Build Status:** ✅ Production Ready
