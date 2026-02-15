# UBER Backend

Express + MongoDB API for user and captain authentication.

## Environment
Create `Backend/.env`:

```env
PORT=4000
DB_CONNECT=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

## Install and Run
```bash
npm install
node Server.js
```

## Base URL
`http://localhost:4000`

## User Endpoints
- `POST /users/register`
- `POST /users/login`
- `GET /users/profile` (protected)
- `GET /users/logout` (protected)

## Captain Endpoints
- `GET /captains/vehicle-types`
- `POST /captains/register`
- `POST /captains/login`
- `GET /captains/profile` (protected)
- `GET /captains/logout` (protected)

## Vehicle Types Source of Truth
- `GET /captains/vehicle-types` reads values from `Captain` model enum:
`captainModel.schema.path("vehicle.vehicleType").enumValues`
- Registration validation for `vehicle.vehicleType` uses the same enum source.

## Authentication
- JWT is issued on successful login/register.
- Protected routes accept `Authorization: Bearer <token>` and cookie-based token access.
- Logout blacklists the active token.

## Captain Register Payload
```json
{
  "fullname": {
    "firstname": "Alex",
    "lastname": "Rider"
  },
  "email": "alex.rider@example.com",
  "password": "strongPassword123",
  "vehicle": {
    "color": "Black",
    "plate": "AB12XYZ",
    "capacity": 4,
    "vehicleType": "two-wheeler"
  }
}
```
