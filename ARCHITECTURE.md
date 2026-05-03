# 📦 Complete Project Structure

## Full Directory Tree

```
TeamTrack/
│
├── backend/                                 # Node.js/Express Backend
│   ├── config/
│   │   └── db.js                          # MongoDB connection configuration
│   │
│   ├── models/                            # Mongoose Schemas
│   │   ├── User.js                        # User model (authentication)
│   │   ├── Project.js                     # Project model
│   │   └── Task.js                        # Task model
│   │
│   ├── controllers/                       # Business Logic
│   │   ├── authController.js              # Auth logic (signup, login)
│   │   ├── projectController.js           # Project management logic
│   │   └── taskController.js              # Task management logic
│   │
│   ├── routes/                            # API Routes
│   │   ├── authRoutes.js                  # Auth endpoints
│   │   ├── projectRoutes.js               # Project endpoints
│   │   └── taskRoutes.js                  # Task endpoints
│   │
│   ├── middleware/                        # Custom Middleware
│   │   ├── authMiddleware.js              # JWT verification
│   │   └── roleMiddleware.js              # Role-based access control
│   │
│   ├── utils/                             # Utility Functions (optional)
│   │
│   ├── server.js                          # Main server entry point
│   ├── package.json                       # Dependencies & scripts
│   ├── .env.example                       # Example environment variables
│   ├── .env                               # Environment variables (NOT in git)
│   ├── .gitignore                         # Git ignore rules
│   └── node_modules/                      # Dependencies (NOT in git)
│
│
├── frontend/                               # React + Vite Frontend
│   ├── src/
│   │   ├── components/                    # Reusable Components
│   │   │   ├── Navbar.jsx                 # Navigation bar
│   │   │   ├── ProtectedRoute.jsx         # Route protection wrapper
│   │   │   ├── FormComponents.jsx         # Card, Button, Input, Select, TextArea
│   │   │   └── StatusMessages.jsx         # LoadingSpinner, Error, Success messages
│   │   │
│   │   ├── pages/                         # Page Components
│   │   │   ├── Home.jsx                   # Landing page
│   │   │   ├── Login.jsx                  # Login page
│   │   │   ├── Signup.jsx                 # Registration page
│   │   │   ├── Dashboard.jsx              # Dashboard with statistics
│   │   │   ├── Projects.jsx               # Projects management page
│   │   │   └── Tasks.jsx                  # Task board with kanban columns
│   │   │
│   │   ├── services/                      # API & Services
│   │   │   └── api.js                     # Axios instance with interceptors
│   │   │
│   │   ├── context/                       # React Context
│   │   │   └── AuthContext.jsx            # Authentication state management
│   │   │
│   │   ├── App.jsx                        # Main app component with routing
│   │   ├── main.jsx                       # React entry point
│   │   └── index.css                      # Global styles & Tailwind directives
│   │
│   ├── index.html                         # HTML entry point
│   ├── vite.config.js                     # Vite configuration
│   ├── tailwind.config.js                 # Tailwind CSS configuration
│   ├── postcss.config.js                  # PostCSS configuration
│   ├── package.json                       # Dependencies & scripts
│   ├── .gitignore                         # Git ignore rules
│   └── node_modules/                      # Dependencies (NOT in git)
│
│
├── README.md                              # Quick start guide
├── SETUP_AND_DEPLOYMENT.md                # Detailed setup & deployment instructions
├── API_DOCUMENTATION.md                   # Complete API reference
├── ARCHITECTURE.md                        # Project architecture overview (this file)
└── .gitignore                             # Root level git ignore
```

---

## 📊 Architecture Overview

### Backend Architecture (Clean Code Principles)

```
Request → Routes → Controllers → Models → Database
                ↓
            Middleware (Auth, Validation)
                ↓
            Error Handling
                ↓
Response
```

#### 1. **Routes Layer** (`routes/`)
- Defines API endpoints
- Maps HTTP methods to controller functions
- Applies middleware (auth, role-based)
- Example: `POST /api/projects` → `projectController.createProject`

#### 2. **Controllers Layer** (`controllers/`)
- Contains business logic
- Validates input
- Interacts with models
- Returns responses
- Handles errors

#### 3. **Models Layer** (`models/`)
- Defines data structure with Mongoose schemas
- Data validation at database level
- Methods for data operations

#### 4. **Middleware Layer** (`middleware/`)
- `authMiddleware.js` - Verifies JWT tokens
- `roleMiddleware.js` - Checks user permissions

#### 5. **Config Layer** (`config/`)
- Database connection
- Environment setup

---

### Frontend Architecture

```
App.jsx (Main Router)
    ↓
AuthProvider (Global Auth State)
    ↓
Protected Routes
    ↓
Pages (Dashboard, Projects, Tasks)
    ↓
Components + Services
```

#### 1. **Context Management** (`context/AuthContext.jsx`)
- Manages authentication state globally
- Handles login, logout, signup
- Provides auth context to entire app

#### 2. **Services** (`services/api.js`)
- Axios configuration
- API calls for auth, projects, tasks
- Automatic token injection in headers

#### 3. **Pages** (`pages/`)
- Complete page components
- Handle page-level state
- Consume services & context

#### 4. **Components** (`components/`)
- Reusable UI components
- Form components with validation
- Status messages (loading, error, success)

#### 5. **Styling**
- Tailwind CSS for utility classes
- Custom CSS classes in `index.css`
- Responsive design (mobile, tablet, desktop)

---

## 🔄 Data Flow

### Authentication Flow

```
1. User enters credentials on Signup/Login page
2. Frontend validates input
3. API call to backend (authAPI.signup/login)
4. Backend validates & creates/finds user
5. Backend generates JWT token
6. Frontend stores token in localStorage
7. Token added to all future requests in axios interceptor
8. User redirected to dashboard
```

### Task Management Flow

```
1. User navigates to Tasks page
2. Frontend fetches tasks via taskAPI.getAll()
3. Axios interceptor adds Authorization header with token
4. Backend authMiddleware verifies token
5. Backend gets user from token
6. Task controller filters tasks user has access to
7. Frontend renders tasks in kanban board
8. User drags task to different status column
9. Frontend calls taskAPI.update(taskId, {status: 'in-progress'})
10. Backend updates task in database
11. Frontend updates local state
12. UI re-renders with updated status
```

---

## 🔐 Security Features

### 1. Authentication
- JWT tokens with 30-day expiration
- Bcrypt password hashing (salt rounds: 10)
- Token stored securely in localStorage

### 2. Authorization
- Role-based access control (Admin/Member)
- Middleware checks role before allowing actions
- Admin: Can create projects, tasks, manage team
- Member: Can view assigned tasks, update status

### 3. Validation
- Backend validates all inputs
- Frontend validates for UX
- Mongoose schema validation
- Express validation middleware ready to extend

### 4. API Security
- CORS enabled for specific origins
- No sensitive data in responses (passwords excluded)
- Error messages don't reveal database structure

---

## 📈 Scalability Considerations

### Current Implementation
✅ Separation of concerns (routes, controllers, models)
✅ Modular code structure
✅ Reusable components
✅ Context API for state management
✅ API layer abstraction

### Future Improvements
- Add Redux for complex state management
- Implement caching (Redis)
- Add request rate limiting
- Implement request/response compression
- Add API versioning (/api/v1/)
- Add logging service
- Add monitoring & analytics
- Implement pagination for large datasets
- Add WebSocket for real-time updates
- Database indexing optimization

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  role: String (admin | member),
  avatar: String (optional),
  timestamps: { createdAt, updatedAt }
}
```

### Projects Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  admin: ObjectId (ref: User),
  members: [ObjectId] (ref: User),
  status: String (active | completed | on-hold),
  timestamps: { createdAt, updatedAt }
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  project: ObjectId (ref: Project),
  assignedTo: ObjectId (ref: User),
  createdBy: ObjectId (ref: User),
  status: String (todo | in-progress | done),
  priority: String (low | medium | high),
  dueDate: Date (optional),
  timestamps: { createdAt, updatedAt }
}
```

### Relationships
- **User ↔ Project**: One user (admin) has many projects
- **User ↔ Task**: One user has many assigned tasks
- **Project ↔ Task**: One project has many tasks
- **Project ↔ Members**: Many-to-many relationship

---

## 🚀 Deployment Architecture

### Development
```
Frontend: localhost:3000 (Vite dev server)
Backend: localhost:5000 (Express server)
Database: Local MongoDB or MongoDB Atlas
```

### Production
```
Frontend: Vercel/Netlify CDN
Backend: Railway (Node.js container)
Database: MongoDB Atlas (Cloud)
```

---

## 📦 Dependencies Overview

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT tokens
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **express-validator** - Input validation (optional)

### Frontend
- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **tailwindcss** - CSS framework
- **lucide-react** - Icon library
- **vite** - Build tool

---

## 🔄 Environment-Specific Configuration

### Development
- CORS: localhost:3000
- MongoDB: Local or Atlas (dev database)
- JWT expiration: 30 days
- Console logging: Enabled
- Error details: Verbose

### Production
- CORS: vercel/netlify domain
- MongoDB: Atlas production database
- JWT expiration: 30 days (adjustable)
- Console logging: Limited
- Error details: Generic messages

---

## 📋 Best Practices Implemented

✅ **Backend**
- Clean folder structure
- Separation of concerns
- Error handling with try-catch
- Input validation
- Secure password hashing
- JWT token management
- Environment variables for sensitive data

✅ **Frontend**
- Component reusability
- Context API for state management
- Protected routes
- Loading states
- Error handling
- Form validation
- Responsive design
- Tailwind CSS utilities

✅ **General**
- Git ignore for sensitive files
- Clear documentation
- Modular code
- Consistent naming conventions
- Comments in complex logic

---

## 🧪 Testing Recommendations

### Unit Tests
- Controller functions with mock databases
- Utility functions
- Validation logic

### Integration Tests
- API endpoint testing
- Database operations
- Authentication flow

### E2E Tests
- Complete user workflows
- UI interactions
- Form submissions

### Tools to Consider
- Jest (testing framework)
- Supertest (HTTP assertions)
- React Testing Library
- Cypress (E2E testing)

---

**Version:** 1.0.0  
**Last Updated:** May 3, 2026
