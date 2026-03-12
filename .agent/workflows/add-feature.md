---
description: How to add a new CRUD feature to DevConnect
---

# Workflow: Adding a CRUD Feature

Follow these steps to add a new entity (like Posts, Comments, or Chat).

1. **Prisma Schema**:
   - Update `src/prisma/schema.prisma` with the new model.
   - Run `npm run prisma:push` to sync the database.
   - Run `npm run prisma:generate` to update the client.

2. **Validation**:
   - Add a new Zod schema in `src/utils/validators.js`.

3. **Controller**:
   - Create `src/controllers/[entity]Controller.js`.
   - Wrap all functions in `try/catch` and use `next(error)`.
   - Use `import prisma from "../services/db.js"` for DB access.

4. **Routes**:
   - Create `src/routes/[entity].js`.
   - Import `validate` and `protect` middleware as needed.
   - Apply `protect` to sensitive routes and `validate(schema)` to write routes.

5. **App Integration**:
   - Import the new routes in `src/app.js`.
   - Mount them at `/api/[entity]`.

6. **Documentation**:
   - Update `docs/api_reference.md` with the new endpoints.
   - Update `docs/roadmap.md` status.
