# 🎯 TeamTrack - API Documentation

## Quick Reference

### Base URLs
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend.railway.app/api`

### Authentication
All protected endpoints require:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Token is obtained from login/signup response and stored in localStorage.

---

## 📝 Authentication Endpoints

### POST /auth/signup
Create a new user account.

**Request Body:**
```json
{
  "name": "Adi",
  "email": "Adi@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

---

### POST /auth/login
Authenticate user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

---

### GET /auth/me
Get current user information.

**Authentication:** Required ✅

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

---

## 📁 Projects Endpoints

### GET /projects
Get all projects for current user.

**Authentication:** Required ✅

**Query Parameters:**
None

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Q1 Planning",
      "description": "First quarter planning",
      "admin": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "members": [
        {
          "_id": "507f1f77bcf86cd799439012",
          "name": "Admin User",
          "email": "admin@example.com"
        }
      ],
      "status": "active",
      "createdAt": "2026-05-03T10:00:00.000Z",
      "updatedAt": "2026-05-03T10:00:00.000Z"
    }
  ]
}
```

---

### GET /projects/:id
Get a single project by ID.

**Authentication:** Required ✅

**Parameters:**
- `id` (string, path) - Project ID

**Response (200):**
```json
{
  "success": true,
  "project": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Q1 Planning",
    "description": "First quarter planning",
    "admin": {...},
    "members": [...],
    "status": "active",
    "createdAt": "2026-05-03T10:00:00.000Z",
    "updatedAt": "2026-05-03T10:00:00.000Z"
  }
}
```

---

### POST /projects
Create a new project (Admin only).

**Authentication:** Required ✅
**Authorization:** Admin role required

**Request Body:**
```json
{
  "name": "Q1 Planning",
  "description": "First quarter planning"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "project": {...}
}
```

---

### PATCH /projects/:id
Update project (Admin only).

**Authentication:** Required ✅
**Authorization:** Project admin required

**Parameters:**
- `id` (string, path) - Project ID

**Request Body:**
```json
{
  "name": "Updated Q1 Planning",
  "description": "Updated description",
  "status": "on-hold"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "project": {...}
}
```

---

### DELETE /projects/:id
Delete project (Admin only).

**Authentication:** Required ✅
**Authorization:** Project admin required

**Parameters:**
- `id` (string, path) - Project ID

**Response (200):**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

### POST /projects/:id/add-member
Add a member to project (Admin only).

**Authentication:** Required ✅
**Authorization:** Project admin required

**Parameters:**
- `id` (string, path) - Project ID

**Request Body:**
```json
{
  "memberId": "507f1f77bcf86cd799439013"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Member added successfully",
  "project": {...}
}
```

---

## 📋 Tasks Endpoints

### GET /tasks
Get tasks with optional filters.

**Authentication:** Required ✅

**Query Parameters:**
- `status` (string, optional) - "todo", "in-progress", or "done"
- `projectId` (string, optional) - Filter by project ID
- `assignedTo` (string, optional) - Filter by user ID

**Example:**
```
GET /tasks?status=todo&projectId=507f1f77bcf86cd799439011
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "title": "Design database schema",
      "description": "Create MongoDB schemas",
      "project": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Q1 Planning"
      },
      "assignedTo": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Team Member",
        "email": "member@example.com"
      },
      "createdBy": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Admin",
        "email": "admin@example.com"
      },
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2026-05-10T00:00:00.000Z",
      "createdAt": "2026-05-03T10:00:00.000Z",
      "updatedAt": "2026-05-03T10:00:00.000Z"
    }
  ]
}
```

---

### GET /tasks/:id
Get a single task by ID.

**Authentication:** Required ✅

**Parameters:**
- `id` (string, path) - Task ID

**Response (200):**
```json
{
  "success": true,
  "task": {...}
}
```

---

### POST /tasks
Create a new task (Admin only).

**Authentication:** Required ✅
**Authorization:** Admin role required

**Request Body:**
```json
{
  "title": "Design database schema",
  "description": "Create MongoDB schemas",
  "projectId": "507f1f77bcf86cd799439011",
  "assignedTo": "507f1f77bcf86cd799439013",
  "priority": "high",
  "dueDate": "2026-05-10"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {...}
}
```

---

### PATCH /tasks/:id
Update task status (Assigned user or Admin).

**Authentication:** Required ✅

**Parameters:**
- `id` (string, path) - Task ID

**Request Body:**
```json
{
  "status": "in-progress"
}
```

Allowed statuses: "todo", "in-progress", "done"

**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {...}
}
```

---

### DELETE /tasks/:id
Delete task (Admin only).

**Authentication:** Required ✅
**Authorization:** Project admin required

**Parameters:**
- `id` (string, path) - Task ID

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## 🔐 Error Responses

### Common Error Codes

**400 - Bad Request**
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

**401 - Unauthorized**
```json
{
  "success": false,
  "message": "Invalid token" OR "No token provided"
}
```

**403 - Forbidden**
```json
{
  "success": false,
  "message": "Only admin can perform this action"
}
```

**404 - Not Found**
```json
{
  "success": false,
  "message": "Project not found" OR "User not found"
}
```

**500 - Server Error**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 💾 Data Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  role: String (enum: "admin", "member"),
  avatar: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  admin: ObjectId (ref: User),
  members: [ObjectId] (ref: User),
  status: String (enum: "active", "completed", "on-hold"),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  project: ObjectId (ref: Project, required),
  assignedTo: ObjectId (ref: User, required),
  createdBy: ObjectId (ref: User, required),
  status: String (enum: "todo", "in-progress", "done"),
  priority: String (enum: "low", "medium", "high"),
  dueDate: Date (optional),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing with cURL

### Example: Complete Workflow

```bash
# 1. Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Admin",
    "email": "admin@test.com",
    "password": "admin123"
  }'

# Save the returned token as TOKEN_ADMIN

# 2. Create a project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN_ADMIN" \
  -d '{
    "name": "Website Redesign",
    "description": "Complete website redesign project"
  }'

# Save the returned project._id as PROJECT_ID

# 3. Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN_ADMIN" \
  -d '{
    "title": "Create homepage mockup",
    "description": "Design the new homepage",
    "projectId": "$PROJECT_ID",
    "assignedTo": "USER_ID",
    "priority": "high",
    "dueDate": "2026-05-15"
  }'

# 4. Get all tasks
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer $TOKEN_ADMIN"
```

---

**API Version:** 1.0.0  
**Last Updated:** May 3, 2026
