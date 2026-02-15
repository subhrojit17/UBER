# Backend API Documentation

Base URL (local): `http://localhost:4000`

## Setup

Create `Backend/.env`:

```env
PORT=4000
DB_CONNECT=<mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

Install and run:

```bash
cd Backend
npm install
node Server.js
```

## Authentication

Protected routes accept token from either:
- `Authorization: Bearer <token>`
- `token` cookie

## API Routes

### `GET /`

Health/basic route.

Success `200`:

```json
"Hello World"
```

### `POST /users/register`

Registers a user.

Request body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "strongPass123"
}
```

Validation:
- `email` must be valid
- `fullname.firstname` min length `3`
- `password` min length `8`

Success `201`:

```json
{
  "token": "<jwt>",
  "user": {
    "_id": "object_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```

Error `400`:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

or

```json
{
  "message": "User already exists"
}
```

### `POST /users/login`

Logs in a user.

Request body:

```json
{
  "email": "john@example.com",
  "password": "strongPass123"
}
```

Validation:
- `email` must be valid
- `password` min length `8`

Success `200`:

```json
{
  "token": "<jwt>",
  "user": {
    "_id": "object_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```

Error `400`:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

Error `401`:

```json
{
  "error": "Invalid email or password."
}
```

### `GET /users/profile` (Protected)

Returns authenticated user profile.

Success `200`:

```json
{
  "_id": "object_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "socketId": null
}
```

Error `401`:

```json
{
  "message": "Unauthorized"
}
```

### `GET /users/logout` (Protected)

Logs out user and blacklists token.

Success `200`:

```json
{
  "message": "Logged out"
}
```

Error `401`:

```json
{
  "message": "Unauthorized"
}
```

### `GET /captains/vehicle-types`

Returns allowed captain vehicle types from the Captain model enum.

Success `200`:

```json
{
  "vehicleTypes": ["car", "two-wheeler", "shuttle", "auto"]
}
```

### `POST /captains/register`

Registers a captain.

Request body:

```json
{
  "fullname": {
    "firstname": "Alex",
    "lastname": "Rider"
  },
  "email": "alex@example.com",
  "password": "strongPass123",
  "vehicle": {
    "color": "Black",
    "plate": "AB12XYZ",
    "capacity": 4,
    "vehicleType": "two-wheeler"
  }
}
```

Validation:
- `fullname.firstname` min length `3`
- `fullname.lastname` min length `3`
- `email` must be valid
- `password` min length `8`
- `vehicle.color` min length `3`
- `vehicle.plate` min length `3`
- `vehicle.capacity` integer, min `1`
- `vehicle.vehicleType` in model enum

Success `201`:

```json
{
  "token": "<jwt>",
  "captain": {
    "_id": "object_id",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Rider"
    },
    "email": "alex@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "AB12XYZ",
      "capacity": 4,
      "vehicleType": "two-wheeler"
    }
  }
}
```

Error `400`:

```json
{
  "errors": [
    {
      "msg": "Vehicle type must be either car, two-wheeler, shuttle or auto.",
      "path": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

or

```json
{
  "message": "Captain already exists"
}
```

### `POST /captains/login`

Logs in a captain.

Request body:

```json
{
  "email": "alex@example.com",
  "password": "strongPass123"
}
```

Validation:
- `email` must be valid
- `password` min length `8`

Success `200`:

```json
{
  "token": "<jwt>",
  "captain": {
    "_id": "object_id",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Rider"
    },
    "email": "alex@example.com",
    "status": "inactive"
  }
}
```

Error `400`:

```json
{
  "errors": [
    {
      "msg": "Please use a valid email address.",
      "path": "email",
      "location": "body"
    }
  ]
}
```

Error `401`:

```json
{
  "error": "Invalid email or password."
}
```

### `GET /captains/profile` (Protected)

Returns authenticated captain profile.

Success `200`:

```json
{
  "captain": {
    "_id": "object_id",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Rider"
    },
    "email": "alex@example.com",
    "status": "inactive"
  }
}
```

Error `401`:

```json
{
  "message": "Unauthorized"
}
```

### `GET /captains/logout` (Protected)

Logs out captain and blacklists token.

Success `200`:

```json
{
  "message": "Logged out successfully"
}
```

Error `401`:

```json
{
  "message": "Unauthorized"
}
```
