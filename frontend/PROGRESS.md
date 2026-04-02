# 🚦 DevConnect Frontend — Progress Tracker

> **Last Updated**: 2026-03-30
> **Current Phase**: Phase 2 — Layout & Navigation
> **Current Step**: Starting Step 2.2 — Building the Sidebar Component

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

### Phase 2: Layout & Navigation 🔄
- [x] Step 2.1: Installed React Router (`react-router-dom`)

---

## 🔄 Currently Working On

> Ready to start Phase 2 — Layout & Navigation

---

## 📋 What's Next (Immediate)

1. **Phase 2, Step 2.1**: Install React Router (`bun add react-router-dom`)
2. **Phase 2, Step 2.2**: Build the Sidebar component (convert Stitch HTML → JSX)
3. **Phase 2, Step 2.3**: Build the DashboardLayout (learn `children` / `Outlet`)
4. **Phase 2, Step 2.4**: Set up routing in App.jsx (`BrowserRouter`, `Routes`, `Link`)

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
