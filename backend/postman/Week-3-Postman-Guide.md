# Week 3 Postman Guide

Base URL: `http://localhost:5000`

## Register
POST `/api/auth/register`

```json
{
  "name": "Vijendra",
  "email": "vijendra@example.com",
  "password": "password123"
}
```

## Login
POST `/api/auth/login`

```json
{
  "email": "vijendra@example.com",
  "password": "password123"
}
```

Copy the returned JWT.

For protected routes set:
`Authorization: Bearer <TOKEN>`

## Users CRUD
- GET `/api/users`
- GET `/api/users/:id`
- PUT `/api/users/:id`
- DELETE `/api/users/:id`

## Tasks CRUD
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

Create task example:

```json
{
  "title": "Finish Week 3",
  "description": "Connect React with Express",
  "priority": "High",
  "status": "Pending"
}
```

Filter example:
`GET /api/tasks?status=Completed&priority=High`

## Image Upload
POST `/api/uploads/avatar`

Body → form-data:
- key: `image`
- type: File
- choose an image

Maximum size: 5 MB.
