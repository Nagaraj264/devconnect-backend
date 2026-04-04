# 🚦 DevConnect Frontend — Progress Tracker

> **Last Updated**: 2026-04-03
> **Current Phase**: Phase 4 — Feed & Data Integration
> **Current Step**: Ready to start Step 4.1 — Signup Page & User Personalization

---

## ✅ Completed Steps

### Project Setup
- [x] Restructured project: `backend/` + `frontend/` folders
- [x] Initialized Vite + React project (`bun create vite`)
- [x] Installed Tailwind CSS v4 + `@tailwindcss/vite` plugin
- [x] Configured `vite.config.js` with React + Tailwind plugins
- [x] Set up `index.css` with `@theme` design tokens (colors, fonts, radii)
- [x] Added `glass-effect` custom utility

### Design Assets
- [x] Generated Stitch UI screens for all 10 pages
- [x] Stitch HTML references saved in `frontend/stitch/` folder
- [x] Created comprehensive learning roadmap (`ROADMAP.md`)

### Phase 1: React Fundamentals ✅
- [x] Step 1.1: Understood `main.jsx`, `App.jsx`, `index.html` flow (createRoot, JSX, exports)
- [x] Step 1.2: Built `TagBadge.jsx` — learned Props and component creation
- [x] Step 1.3: Built `PostCard.jsx` — learned composition, `.map()`, `key` prop
- [x] Step 1.4: Added interactive Like button — learned `useState`, event handlers, ternary operator

### Phase 2: Layout & Navigation ✅
- [x] Step 2.1: Installed React Router (`react-router-dom`)
- [x] Step 2.2: Built the Sidebar Component (Lucide + Framer Motion)
- [x] Step 2.3: Built the DashboardLayout (Layout nesting + Outlet)
- [x] Step 2.4: Set up routing in App.jsx (Feed, Explore, Chat, etc.)
- [x] Step 2.5: Initialized shadcn/ui (Vite + Tailwind v4 + Import Alias)
- [x] Step 2.6: Built the Right Sidebar (Explore panel with Trending Nodes)

### Phase 3: Authentication (Days 5-7) ✅
- [x] Step 3.1: Build the AuthLayout & Login Page (Form UI)
- [x] Step 3.2: Connect to Backend Login API (Fetch/Axios)
- [x] Step 3.3: Handle JWT Storage & User State (Auth Context)
- [x] Step 3.4: Implement Protected Routes (Guard)

### Phase 4: Feed & Data Integration 🔄
- [ ] Step 4.1: Build the Signup Page (New Node Registration)
- [ ] Step 4.2: Personalize Sidebar (Show current user info)
- [ ] Step 4.3: Fetch Real Posts from Backend API
- [ ] Step 4.4: Implement Create Post functionality

---

## 🔄 Currently Working On

> Starting Phase 4 — Building the Signup Page & Personalizing the UI

---

## 📋 What's Next (Immediate)

1. **Phase 4, Step 4.1**: Build the Signup Page using our AuthLayout
2. **Phase 4, Step 4.2**: Update the Sidebar to show the logged-in user's name
3. **Phase 4, Step 4.3**: Connect the Feed to the backend `POSTS` API
4. **Phase 4, Step 4.4**: Build the "Create Post" modal with a real API call

---

## 🗂️ Key Files Reference

| File | Purpose |
|------|---------|
| `frontend/ROADMAP.md` | Full 8-phase learning plan |
| `frontend/PROGRESS.md` | This file — current status tracker |
| `frontend/stitch/` | Stitch HTML designs (our visual reference) |
| `frontend/src/index.css` | Tailwind v4 design tokens |
| `backend/src/prisma/schema.prisma` | Database schema |
| `backend/README.md` | Full API documentation with endpoints |

---

## 🧠 Key Decisions Made

- **Framework**: React + Vite (not Next.js — simpler for learning)
- **CSS**: Tailwind CSS v4 (using `@theme` directive, not config file)
- **Package Manager**: Bun (faster than npm)
- **Learning Style**: Build from scratch, understand every line (no copy-paste)
- **Validation**: Zod deferred to later phase
- **Backend**: Express + Prisma + Socket.io (fully complete)

---

## 📡 Backend API Quick Reference

| Endpoint | Method | What it does |
|----------|--------|-------------|
| `/api/auth/register` | POST | Create account |
| `/api/auth/login` | POST | Get JWT token |
| `/api/posts` | GET | Fetch feed (with filters) |
| `/api/posts` | POST | Create a post |
| `/api/posts/:postId/comments` | GET/POST | Comments |
| `/api/likes/:id` | POST | Toggle like |
| `/api/users` | GET | Search developers |
| `/api/users/:username` | GET | Profile details |
| `/api/users/me` | PUT | Update profile |
| `/api/chat` | GET | List conversations |
| `/api/chat/group` | POST | Create group chat |
| `/api/chat/:convId/messages` | GET/POST | Messages |
| `/api/notifications` | GET | List notifications |
| `/api/notifications/:id/read` | PUT | Mark as read |

---

## 🔌 WebSocket Events

| Event | Direction | Purpose |
|-------|-----------|---------|
| `join_conversation` | Client → Server | Join a chat room |
| `send_message` | Client → Server | Send a message |
| `new_message` | Server → Client | Receive a message |
| `new_notification` | Server → Client | Receive a notification |
