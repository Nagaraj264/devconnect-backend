---
name: DevConnect Backend Standards
description: Core architectural patterns, naming conventions, and security standards for the DevConnect project.
---

# DevConnect Backend Development Skill

This skill defines the mandatory coding standards for the DevConnect project. All new features must adhere to these patterns.

## 🏛️ Architectural Pattern

We follow the **Controller-Route-Service** pattern:

1. **Routes** (`src/routes/`): Define endpoints and apply middleware (Auth, Validation).
2. **Controllers** (`src/controllers/`): Extract request data and handle business logic.
3. **Services** (`src/services/`): Pure database interactions or external API calls (e.g., `prisma`).
4. **Middleware** (`src/middleware/`): Safety checks and preprocessing.

## 🛡️ Security & Auth Standards

- **Token Flow**: Use Access (15m) and Refresh (7d) tokens.
- **Route Protection**: Apply the `protect` middleware to any route that requires a logged-in user.
- **Hashing**: Always hash passwords with `bcryptjs` (salt rounds: 10).
- **Secrets**: Never hardcode secrets. Always use `process.env`.

## ✅ Validation (Zod)

- **Mandatory**: Every `POST`, `PUT`, or `PATCH` request must be validated using a Zod schema.
- **Logic**:
  - Define schemas in `src/utils/validators.js`.
  - Apply use the `validate(schema)` middleware in the route file.
  - The controller should assume the data is valid.

## 🚨 Error Handling

- **Pattern**: Always wrap controller logic in `try/catch`.
- **Catch Block**: Always call `next(error)` to trigger the global error handler in `src/middleware/error.js`.
- **Formatting**: Return consistent JSON: `{ "message": "readable error", "errors": [] }`.

## 📦 Database (Prisma)

- **Client**: Always import the singleton client from `src/services/db.js`.
- **Naming**: Use camelCase for field names in `schema.prisma`.
- **Keys**: Preference for `cuid()` as primary keys.

## 📝 Naming Conventions

- **Files**: `camelCase` (e.g., `authController.js`).
- **Functions**: `camelCase` (e.g., `signUpUser`).
- **Variables**: `camelCase`.
- **Constants**: `UPPER_SNAKE_CASE`.
