# 🗺️ DevConnect Frontend — Step-by-Step Learning Roadmap

> **Goal**: Build the entire DevConnect frontend from scratch using React + Tailwind CSS v4, learning every concept along the way. Each phase builds on the previous one.

---

## 📐 Project Structure (What We're Building)

```
frontend/
├── index.html              ← The single HTML file (React is a "Single Page App")
├── vite.config.js           ← Vite bundler config (already done ✅)
├── src/
│   ├── index.css            ← Our Tailwind design tokens (already done ✅)
│   ├── main.jsx             ← Entry point (mounts React to the DOM)
│   ├── App.jsx              ← Root component (holds the router)
│   ├── components/          ← Reusable UI pieces
│   │   ├── Sidebar.jsx
│   │   ├── PostCard.jsx
│   │   ├── CommentCard.jsx
│   │   ├── ChatBubble.jsx
│   │   ├── NotificationItem.jsx
│   │   ├── DevCard.jsx
│   │   └── TagBadge.jsx
│   ├── pages/               ← Full screens (one per route)
│   │   ├── LoginPage.jsx
│   │   ├── FeedPage.jsx
│   │   ├── PostDetailPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── ChatPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── ExplorePage.jsx
│   │   └── CreatePostPage.jsx
│   ├── layouts/             ← Shared layout wrappers
│   │   └── DashboardLayout.jsx
│   └── stitch/              ← Your Stitch HTML references (already here ✅)
```

---

## 🧱 Phase 1: React Fundamentals (Days 1-2)

> **You will learn**: JSX, Components, Props, State, Event Handling

### Step 1.1 — Understand the Existing Files
- [ ] Open `main.jsx` — learn what `createRoot` and `render` do
- [ ] Open `App.jsx` — understand that this is just a **JavaScript function that returns HTML-like code (JSX)**
- [ ] Open `index.css` — see how `@theme` defines our design tokens

### Step 1.2 — Your First Component: `TagBadge`
**Concept**: A component is a reusable function that returns JSX.
- [ ] Create `src/components/TagBadge.jsx`
- [ ] Learn: What are **Props**? (inputs to a component)
- [ ] Make it render a styled pill badge like `#React`

### Step 1.3 — Your Second Component: `PostCard`
**Concept**: Components can use other components (composition).
- [ ] Create `src/components/PostCard.jsx`
- [ ] Use `TagBadge` inside it
- [ ] Learn: How to pass **Props** (title, author, tags, likes)
- [ ] Show 3 PostCards in `App.jsx` with different data

### Step 1.4 — Adding Interactivity: Like Button
**Concept**: `useState` — React's way of remembering things.
- [ ] Add a "Like" button to `PostCard`
- [ ] Learn: What is **State**? Why can't we use normal variables?
- [ ] Make the like count increase when clicked
- [ ] Learn: What is an **Event Handler**? (`onClick`)

---

## 🧭 Phase 2: Layout & Navigation (Days 3-4)

> **You will learn**: React Router, Layouts, Conditional Rendering

### Step 2.1 — Install React Router
- [ ] Run: `bun add react-router-dom`
- [ ] Learn: What is **client-side routing**? (changing pages without reloading)

### Step 2.2 — Build the Sidebar Component
**Reference**: `stitch/devconnect_main_feed_dashboard/code.html` (lines 99-151)
- [ ] Create `src/components/Sidebar.jsx`
- [ ] Convert the Stitch HTML sidebar into React JSX
- [ ] Learn: HTML → JSX differences (`class` → `className`, self-closing tags)
- [ ] Learn: How to use **Google Material Symbols** icons

### Step 2.3 — Build the Dashboard Layout
- [ ] Create `src/layouts/DashboardLayout.jsx`
- [ ] Uses `Sidebar` + a main content area
- [ ] Learn: What is `children` prop? (slot pattern)
- [ ] Learn: What is `<Outlet />` in React Router?

### Step 2.4 — Set Up Routes in `App.jsx`
- [ ] Define routes: `/` → FeedPage, `/explore` → ExplorePage, etc.
- [ ] Learn: `<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>`
- [ ] Make sidebar links navigate between pages

---

## 🔐 Phase 3: Authentication Pages (Days 5-6)

> **You will learn**: Forms, Controlled Inputs, API calls with `fetch`

### Step 3.1 — Build the Login Page
**Reference**: `stitch/devconnect_landing_login/code.html`
- [ ] Create `src/pages/LoginPage.jsx`
- [ ] Build the split-screen layout (hero + form)
- [ ] Learn: **Controlled vs Uncontrolled inputs** in React
- [ ] Learn: `useState` for form fields (`email`, `password`)

### Step 3.2 — Handle Form Submission
- [ ] Learn: `onSubmit`, `preventDefault()`
- [ ] Learn: `fetch()` — how to make HTTP requests to our backend
- [ ] Connect to: `POST /api/auth/login`
- [ ] Learn: `async/await` and error handling with `try/catch`

### Step 3.3 — Store the Token
- [ ] Learn: What is `localStorage`?
- [ ] Save the JWT token after login
- [ ] Learn: What is a **Protected Route**? (redirect if not logged in)

### Step 3.4 — Build the Register Tab
- [ ] Add a tab switcher (Log In | Sign Up)
- [ ] Learn: **Conditional Rendering** (`{isLogin ? <LoginForm /> : <RegisterForm />}`)
- [ ] Connect to: `POST /api/auth/register`

---

## 📰 Phase 4: The Feed (Days 7-9)

> **You will learn**: `useEffect`, data fetching, loading states, lists

### Step 4.1 — Build the Feed Page
**Reference**: `stitch/devconnect_main_feed_dashboard/code.html`
- [ ] Create `src/pages/FeedPage.jsx`
- [ ] Learn: `useEffect` — runs code when the component first appears
- [ ] Fetch posts from: `GET /api/posts?page=1&limit=10`
- [ ] Learn: **Loading state** pattern (`isLoading`, `error`, `data`)

### Step 4.2 — Render the Post List
- [ ] Learn: `.map()` — rendering a list of components from an array
- [ ] Learn: Why does React need a `key` prop on list items?
- [ ] Render `<PostCard>` for each post from the API

### Step 4.3 — Add Filter Tabs
- [ ] Build the "All | Questions | Resources | Discussions" tabs
- [ ] Learn: Filtering data with query parameters (`?type=QUESTION`)
- [ ] Refetch posts when the active tab changes

### Step 4.4 — Build the Create Post Composer
**Reference**: `stitch/create_new_post/code.html`
- [ ] Build the composer card at the top of the feed
- [ ] Learn: `FormData` — how to send files (images) to the backend
- [ ] Connect to: `POST /api/posts`
- [ ] After posting, refresh the feed to show the new post

---

## 👤 Phase 5: Profiles & Details (Days 10-11)

> **You will learn**: Dynamic routes, URL parameters, modals

### Step 5.1 — Build the Post Detail Page
**Reference**: `stitch/devconnect_post_detail/code.html`
- [ ] Create `src/pages/PostDetailPage.jsx`
- [ ] Learn: **Dynamic routes** (`/posts/:postId`)
- [ ] Learn: `useParams()` — extracting the `postId` from the URL
- [ ] Fetch and display full post + comments

### Step 5.2 — Build the Comment Section
- [ ] Create `src/components/CommentCard.jsx`
- [ ] Add a "Write a comment" input
- [ ] Connect to: `POST /api/posts/:postId/comments`

### Step 5.3 — Build the Developer Profile Page
**Reference**: `stitch/devconnect_developer_profile/code.html`
- [ ] Create `src/pages/ProfilePage.jsx`
- [ ] Route: `/profile/:username`
- [ ] Fetch from: `GET /api/users/:username`
- [ ] Display skills, stats, and recent posts

### Step 5.4 — Build the Edit Profile Modal
**Reference**: `stitch/devconnect_edit_profile_modal/code.html`
- [ ] Learn: How to build a **Modal** in React (overlay + backdrop)
- [ ] Connect to: `PUT /api/users/me`

---

## 💬 Phase 6: Real-Time Chat (Days 12-14)

> **You will learn**: WebSockets with Socket.io, real-time state updates

### Step 6.1 — Install Socket.io Client
- [ ] Run: `bun add socket.io-client`
- [ ] Learn: HTTP vs WebSockets (request/response vs persistent connection)

### Step 6.2 — Build the Chat Page Layout
**Reference**: `stitch/devconnect_messages_chat/code.html`
- [ ] Create `src/pages/ChatPage.jsx`
- [ ] Two-panel layout: conversation list + active chat
- [ ] Fetch conversations from: `GET /api/chat`

### Step 6.3 — Build Chat Bubbles
- [ ] Create `src/components/ChatBubble.jsx`
- [ ] Sent messages → right-aligned, teal gradient
- [ ] Received messages → left-aligned, dark surface
- [ ] Fetch messages from: `GET /api/chat/:convId/messages`

### Step 6.4 — Wire Up Real-Time Messaging
- [ ] Learn: `socket.emit('send_message', data)` — sending
- [ ] Learn: `socket.on('new_message', callback)` — receiving
- [ ] Messages appear instantly without refreshing!

### Step 6.5 — Build the Create Group Chat Modal
**Reference**: `stitch/create_group_chat_modal/code.html`
- [ ] Connect to: `POST /api/chat/group`

---

## 🔔 Phase 7: Notifications & Search (Days 15-16)

> **You will learn**: Real-time notifications, search/filter UX

### Step 7.1 — Build the Notifications Page
**Reference**: `stitch/devconnect_notifications/code.html`
- [ ] Create `src/pages/NotificationsPage.jsx`
- [ ] Fetch from: `GET /api/notifications`
- [ ] Mark as read: `PUT /api/notifications/:id/read`
- [ ] Listen for `new_notification` Socket.io events

### Step 7.2 — Add Notification Badge to Sidebar
- [ ] Show unread count on the bell icon
- [ ] Learn: **Lifting state up** — sharing state between components

### Step 7.3 — Build the Explore/Search Page
**Reference**: `stitch/devconnect_explore_search/code.html`
- [ ] Create `src/pages/ExplorePage.jsx`
- [ ] Learn: **Debouncing** — wait for user to stop typing before searching
- [ ] Search developers: `GET /api/users?skill=React`
- [ ] Search posts: `GET /api/posts?search=prisma`

---

## 🏁 Phase 8: Polish & Deploy (Days 17-18)

> **You will learn**: Error handling, responsive design, deployment

### Step 8.1 — Global Error & Loading States
- [ ] Create reusable `<Spinner />` and `<ErrorMessage />` components
- [ ] Add error boundaries

### Step 8.2 — Responsive Design
- [ ] Make the sidebar collapse on mobile
- [ ] Add the mobile bottom navigation bar (from the Stitch design)

### Step 8.3 — Deploy
- [ ] Build: `bun run build`
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Deploy backend to Railway/Render

---

## 🎯 Key React Concepts You'll Learn (In Order)

| # | Concept | Phase | Why It Matters |
|---|---------|-------|----------------|
| 1 | JSX | 1 | Writing HTML inside JavaScript |
| 2 | Components | 1 | Reusable UI building blocks |
| 3 | Props | 1 | Passing data into components |
| 4 | useState | 1 | Making things interactive |
| 5 | Event Handlers | 1 | Responding to clicks, typing |
| 6 | React Router | 2 | Page navigation without reload |
| 7 | children / Outlet | 2 | Shared layouts |
| 8 | Controlled Inputs | 3 | Form handling |
| 9 | fetch + async/await | 3 | Talking to your backend |
| 10 | useEffect | 4 | Loading data on page load |
| 11 | .map() + key | 4 | Rendering lists |
| 12 | useParams | 5 | Reading URL parameters |
| 13 | Modals | 5 | Overlay UI patterns |
| 14 | Socket.io | 6 | Real-time communication |
| 15 | Lifting State Up | 7 | Sharing data between components |
| 16 | Debouncing | 7 | Search optimization |

---

## 📌 Golden Rule

> **Never copy-paste a full component.** Instead, look at the Stitch HTML reference, understand what each line does, then write the React version yourself. Ask me to explain anything you don't understand!
