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
