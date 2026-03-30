# 🚀 DevConnect Backend API Documentation

Welcome to the **DevConnect** API. This backend handles social networking, real-time chats, and developer exploration.

---

## 🛠️ Tech Stack & Architecture
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (Access & Refresh Tokens)
- **File Storage**: Cloudinary (via Multer)
- **Real-time**: Socket.io

---

## 🔐 1. Authentication Endpoints
All protected routes require a Bearer token in the `Authorization` header: `Authorization: Bearer <TOKEN>`

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Sign up a new user | No |
| POST | `/api/auth/login` | Log in and get tokens | No |
| POST | `/api/auth/refresh` | Get a new access token | No |

### **Register User**
`POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "email": "dev@example.com",
    "username": "coder123",
    "password": "Password123!",
    "name": "Jane Coder"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "message": "User registered successfully",
    "user": { "id": "cuid...", "username": "coder123", "email": "dev@example.com" },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
  ```

---

## 👥 2. User & Profile Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| GET | `/api/users` | Search developers by skills | Yes |
| GET | `/api/users/:username` | View a developer's profile & posts | Yes |
| PUT | `/api/users/me` | Update your own profile (with Avatar) | Yes |

### **Search Users by Skills**
`GET /api/users?skill=React&term=jane`
- **Success Response (200):**
  ```json
  [
    {
      "id": "cuid...",
      "username": "jane_dev",
      "name": "Jane Smith",
      "avatarUrl": "https://...",
      "skills": ["React", "Node.js"],
      "bio": "Fullstack developer"
    }
  ]
  ```

### **Get Full Profile**
`GET /api/users/:username`
- **Success Response (200):**
  ```json
  {
    "id": "cuid...",
    "username": "jane_dev",
    "name": "Jane Smith",
    "avatarUrl": "https://...",
    "githubUrl": "https://github.com/...",
    "skills": ["React"],
    "posts": [{ "id": "p1", "title": "Hello World", "tags": [] }],
    "_count": { "posts": 10, "comments": 4, "likes": 50 }
  }
  ```

---

## 📝 3. Posts & Content Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| GET | `/api/posts` | List posts with pagination/filtering | Yes |
| POST | `/api/posts` | Create a post (with Image & Tags) | Yes |
| PUT | `/api/posts/:id` | Edit your own post | Yes |
| DELETE | `/api/posts/:id` | Delete your own post | Yes |

### **Create a Post**
`POST /api/posts` (form-data)
- **Request Body (keys):** `title`, `content`, `type` (QUESTION | RESOURCE | DISCUSSION), `tags[]`, `image` (binary)
- **Success Response (201):**
  ```json
  {
    "id": "cuid...",
    "title": "Learning Prisma",
    "content": "Prisma is amazing for Node.js!",
    "type": "RESOURCE",
    "imageUrl": "https://cloudinary.com/...",
    "tags": [{ "id": "t1", "name": "prisma" }],
    "author": { "username": "jane_dev", "avatarUrl": "..." }
  }
  ```

### **Get Paginated Posts**
`GET /api/posts?page=1&limit=5&tag=javascript&type=QUESTION&author=coder123`
- **Success Response (200):**
  ```json
  {
    "posts": [ { ...post_object... } ],
    "pagination": { "total": 100, "page": 1, "limit": 5, "totalPages": 20 }
  }
  ```

---

## 💬 4. Real-time Chat & Group Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| GET | `/api/chat` | List your recent conversations | Yes |
| POST | `/api/chat` | Start a 1-on-1 private chat | Yes |
| POST | `/api/chat/group` | Create a new group chat | Yes |
| GET | `/api/chat/:convId/messages` | Get paginated chat history | Yes |
| POST | `/api/chat/:convId/messages` | Send a new message | Yes |

### **Create Group Chat**
`POST /api/chat/group`
- **Request Body:**
  ```json
  {
    "name": "Node Developers",
    "participantIds": ["user_id_1", "user_id_2"]
  }
  ```
- **Success Response (201):**
  ```json
  {
    "id": "conv_abc",
    "isGroup": true,
    "name": "Node Developers",
    "participants": [ { "user": { "username": "jane" } } ]
  }
  ```

### **Send Message**
`POST /api/chat/:convId/messages`
- **Request Body:** `{ "content": "Hello team!" }`
- **Success Response (201):**
  ```json
  {
    "id": "msg_xyz",
    "content": "Hello team!",
    "sender": { "username": "jane_dev", "avatarUrl": "..." },
    "createdAt": "2023-10-27T..."
  }
  ```

---

## ❤️ 5. Likes & Comments

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/api/likes/:id` | Toggle like for a post or comment | Yes |
| GET | `/api/posts/:postId/comments` | List comments for a post | Yes |
| POST | `/api/posts/:postId/comments` | Add a comment | Yes |

### **Toggle Like**
`POST /api/likes/:id?type=post` (or `?type=comment`)
- **Success Response (200/201):**
  ```json
  { "message": "Liked successfully" } 
  // or "Unliked successfully" if already liked
  ```

### **Add Comment**
`POST /api/posts/:postId/comments`
- **Request Body:** `{ "content": "Great insight!" }`
- **Success Response (201):**
  ```json
  {
    "id": "comm_123",
    "content": "Great insight!",
    "author": { "username": "jane", "avatarUrl": "..." }
  }
  ```

---

## 🔔 6. Notifications

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| GET | `/api/notifications` | View your notifications (Likes, Comments, Messages) | Yes |
| PUT | `/api/notifications/:id/read` | Mark a notification as read | Yes |

### **Get History**
`GET /api/notifications`
- **Success Response (200):**
  ```json
  [
    {
      "id": "notif_1",
      "type": "POST_LIKE",
      "isRead": false,
      "issuer": { "username": "bob", "avatarUrl": "..." },
      "postId": "p_abc",
      "createdAt": "..."
    }
  ]
  ```

---

## 🛰️ 7. WebSocket Events (Real-time)

**Connection:** `io.connect('http://localhost:5000')`

| Event | Direction | Payload |
| :--- | :--- | :--- |
| `join_user_room` | Client -> Server | `userId` (To receive personal notifications) |
| `join_conversation` | Client -> Server | `conversationId` (To receive chat messages) |
| `new_message` | Server -> Client | Message Object |
| `new_notification`| Server -> Client | Notification Object |

---

### 🔥 Development Mode
1. **Installation**: `npm install`
2. **Environment**: Create a `.env` file (copy from `.env.example`).
3. **Database**: `npm run prisma:push`
4. **Run Server**: `npm run dev`