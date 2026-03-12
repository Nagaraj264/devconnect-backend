# DevConnect API Reference

## Base URL

`http://localhost:5000/api`

## Authentication (`/auth`)

### 1. Register User

- **Endpoint**: `POST /auth/register` (or `signup` if you renamed it)
- **Status**: Completed
- **Validation**:
  - `email`: Valid email
  - `username`: Min 3 chars
  - `password`: Min 6 chars
  - `name`: Min 1 char
- **Body**: `{ email, username, password, name }`
- **Response**: `{ message, user: { id, email, username, name, createdAt } }`

### 2. Login

- **Endpoint**: `POST /auth/login`
- **Status**: Completed
- **Body**: `{ email, password }`
- **Response**: `{ accessToken, refreshToken }`

### 3. Refresh Token

- **Endpoint**: `POST /auth/refresh`
- **Status**: Completed
- **Body**: `{ token }` (The Refresh Token)
- **Response**: `{ accessToken }`

---

## Posts (`/posts`) - _IN PROGRESS_

### 1. Create Post

- **Endpoint**: `POST /posts`
- **Status**: Planned
- **Auth**: Required (`protect` middleware)
- **Body**: `{ title, content, type? }`

### 2. Get All Posts

- **Endpoint**: `GET /posts`
- **Status**: Planned
- **Auth**: Public
