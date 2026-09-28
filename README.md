# Skill Nexis – Week 3 Full Stack Integration

A MERN Task Manager that connects a React frontend with an Express + MongoDB backend.

## Week 3 tasks covered

### Full Stack To-Do / Task Manager
- React frontend connected to Express REST API using Axios
- JWT authentication
- Protected routes
- CRUD task operations
- Task filtering
- React Router
- Context API for authentication state
- Form validation

### Image Upload
- Multer upload endpoint
- Image preview before upload
- Uploaded image display
- Static file serving from Express

### Practice Questions
- User REST API
- Express + MongoDB/Mongoose connection
- CRUD operations
- JWT authentication
- Postman testing

## Project Structure

```text
skill-nexis-week-3/
├── README.md
├── backend/
└── frontend/
```

## 1. Backend

Open a terminal inside `backend`:

```bash
npm install
```

Create `.env` from `.env.example` and set your MongoDB URI and JWT secret.

```bash
npm run dev
```

Backend runs on `http://localhost:5000`.

## 2. Frontend

Open another terminal inside `frontend`:

```bash
npm install
npm run dev
```

Frontend runs on the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Test Flow

1. Register a new account.
2. Login.
3. Create, edit, complete and delete tasks.
4. Use the filters.
5. Upload an image and preview it.
6. Logout and confirm the protected dashboard is no longer accessible.

## Postman

See `backend/postman/Week-3-Postman-Guide.md`.

Do not commit `.env`, `node_modules`, or uploaded runtime files.
