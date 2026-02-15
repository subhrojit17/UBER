# UBER Clone Monorepo

This repository contains:
- `frontend/`: React + Vite client
- `Backend/`: Express + MongoDB API

## Architecture (Current)

### Frontend
- React Router handles page routing and protected route wrappers.
- Axios is used for API calls to backend.
- JWT token is stored in `localStorage` as `token`.
- Protected wrappers:
  - `UserProtectedWrapper` verifies `/users/profile`
  - `CaptainProtectedWrapper` verifies `/captains/profile`

### Backend
- Express app with route modules:
  - `users` routes under `/users`
  - `captains` routes under `/captains`
- Mongoose models for `User`, `Captain`, and token blacklist.
- JWT-based auth middleware for user/captain protected routes.
- Request validation via `express-validator`.

## Project Structure

```text
UBER/
|-- frontend/
|   |-- src/
|   |   |-- context/
|   |   |-- pages/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- package.json
|   `-- README.md
|-- Backend/
|   |-- controllers/
|   |-- db/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   |-- services/
|   |-- app.js
|   |-- Server.js
|   |-- package.json
|   `-- README.md
`-- README.md
```

## Setup

### 1. Backend
Create `Backend/.env`:

```env
PORT=4000
DB_CONNECT=<mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

Run backend:

```bash
cd Backend
npm install
node Server.js
```

### 2. Frontend
Create `frontend/.env`:

```env
VITE_BASE_URL=http://localhost:4000/
```

Run frontend:

```bash
cd frontend
npm install
npm run dev
```

## Documentation
- Backend API details: `Backend/README.md`
- Frontend route and integration notes: `frontend/README.md`
