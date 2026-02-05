# UBER Backend API Documentation

## Endpoint

**POST** `/users/register`

---

## Description

This endpoint is used to register a new user in the system. It validates the incoming request body, hashes the user's password, creates a new user record in the database, and returns a JWT authentication token upon successful registration.

---

## Request Headers

```
Content-Type: application/json
```

---

## Request Body

The request body **must** be sent in JSON format with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "strongPassword123"
}
```

### Field Requirements

| Field              | Type   | Required | Validation Rules                   |
| ------------------ | ------ | -------- | ---------------------------------- |
| fullname.firstname | string | ✅ Yes    | Minimum 3 characters               |
| fullname.lastname  | string | ❌ No     | Minimum 3 characters (if provided) |
| email              | string | ✅ Yes    | Must be a valid email format       |
| password           | string | ✅ Yes    | Minimum 8 characters               |

---

## Success Response

### **201 Created**

Returned when the user is successfully registered.

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "64f...",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

* The password is **not** returned in the response.
* The token is a signed JWT containing the user ID.

---

## Error Responses

### **400 Bad Request**

Returned when request validation fails.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

Common validation errors:

* Invalid email format
* First name shorter than 3 characters
* Password shorter than 8 characters

---

### **500 Internal Server Error**

Returned when an unexpected server-side error occurs (e.g., database failure).

```json
{
  "message": "Internal server error"
}
```

---

## Notes

* Email must be unique across users.
* Passwords are hashed using **bcrypt** before being stored.
* JWT token is generated using the `JWT_SECRET` environment variable.

---

## Example cURL Request

```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "strongPassword123"
}'
```

---

## Endpoint

**POST** `/users/login`

---

## Description

This endpoint is used to authenticate an existing user. It validates the provided credentials, verifies the password against the stored hashed password, and returns a JWT authentication token if the credentials are valid.

---

## Request Headers

```
Content-Type: application/json
```

---

## Request Body

The request body **must** be sent in JSON format with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "strongPassword123"
}
```

### Field Requirements

| Field    | Type   | Required | Validation Rules             |
| -------- | ------ | -------- | ---------------------------- |
| email    | string | ✅ Yes    | Must be a valid email format |
| password | string | ✅ Yes    | Minimum 8 characters         |

---

## Success Response

### **200 OK**

Returned when the user is successfully authenticated.

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "64f...",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

* The password is **not** included in the response.
* The token is a signed JWT containing the user ID.

---

## Error Responses

### **400 Bad Request**

Returned when request validation fails.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

Common validation errors:

* Invalid email format
* Password shorter than 8 characters

---

### **401 Unauthorized**

Returned when authentication fails due to incorrect credentials.

```json
{
  "error": "Invalid email or password."
}
```

---

### **500 Internal Server Error**

Returned when an unexpected server-side error occurs.

```json
{
  "message": "Internal server error"
}
```

---

## Notes

* Email must exist in the system.
* Password comparison is performed using **bcrypt**.
* JWT token is generated using the `JWT_SECRET` environment variable.

---

## Example cURL Request

```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "strongPassword123"
}'
```

---

## Endpoint

**GET** `/users/profile`

---

## Description

This endpoint returns the authenticated user's profile information. It is a protected route and requires a valid, non-blacklisted JWT token.

---

## Authentication

The request must include a JWT token using **either** of the following methods:

* **Authorization Header**

  ```
  Authorization: Bearer <JWT_TOKEN>
  ```

* **Cookie**

  ```
  token=<JWT_TOKEN>
  ```

---

## Success Response

### **200 OK**

Returned when the token is valid and the user is authenticated.

```json
{
  "_id": "64f...",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}
```

---

## Error Responses

### **401 Unauthorized**

Returned when:

* No token is provided
* Token is invalid or expired
* Token is blacklisted

```json
{
  "message": "Unauthorized"
}
```

---

## Notes

* Tokens expire after **24 hours**.
* Blacklisted tokens are stored temporarily to prevent reuse after logout.

---

## Endpoint

**GET** `/users/logout`

---

## Description

This endpoint logs out the authenticated user by invalidating the current JWT token. The token is cleared from cookies (if present) and added to a blacklist to prevent further use.

---

## Authentication

Requires a valid JWT token via:

* `Authorization: Bearer <JWT_TOKEN>` header, or
* `token` cookie

---

## Success Response

### **200 OK**

Returned when the user is successfully logged out.

```json
{
  "message": "Logged out"
}
```

---

## Error Responses

### **401 Unauthorized**

Returned when:

* Token is missing
* Token is already blacklisted

```json
{
  "message": "Unauthorized"
}
```

---

## Token Blacklisting Strategy

* On logout, the active JWT token is stored in a **BlacklistedToken** collection.
* Blacklisted tokens automatically expire after **24 hours** using MongoDB TTL indexing.
* Every protected route checks:

  1. Token existence
  2. Token validity
  3. Token blacklist status

This ensures stateless JWT authentication while allowing secure logout behavior.

---

## Example cURL Requests

### Get Profile

```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer <JWT_TOKEN>"
```

### Logout

```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer <JWT_TOKEN>"
```

---

## Endpoint

**POST** `/captains/register`

---

## Description

This endpoint registers a new captain. It validates the request body, hashes the password, creates a captain record, and returns a JWT token.

---

## Request Headers

```
Content-Type: application/json
```

---

## Request Body

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
    "vehicleType": "car"
  }
}
```

### Field Requirements

| Field                 | Type   | Required | Validation Rules |
| --------------------- | ------ | -------- | ---------------- |
| fullname.firstname    | string | ✅ Yes   | Minimum 3 characters |
| fullname.lastname     | string | ✅ Yes   | Minimum 3 characters |
| email                 | string | ✅ Yes   | Must be a valid email format |
| password              | string | ✅ Yes   | Minimum 8 characters |
| vehicle.color         | string | ✅ Yes   | Minimum 3 characters |
| vehicle.plate         | string | ✅ Yes   | Minimum 3 characters |
| vehicle.capacity      | number | ✅ Yes   | Integer, minimum 1 |
| vehicle.vehicleType   | string | ✅ Yes   | One of: car, motorcycle, shuttle, auto |

---

## Success Response

### **201 Created**

```json
{
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "64f...",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Rider"
    },
    "email": "alex.rider@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "AB12XYZ",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## Error Responses

### **400 Bad Request**

Returned when validation fails or the captain already exists.

```json
{
  "errors": [
    {
      "msg": "First name must be atleast 3 characters long.",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

```json
{
  "message": "Captain already exists"
}
```

---

## Example cURL Request

```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Alex", "lastname": "Rider" },
    "email": "alex.rider@example.com",
    "password": "strongPassword123",
    "vehicle": { "color": "Black", "plate": "AB12XYZ", "capacity": 4, "vehicleType": "car" }
  }'
```
