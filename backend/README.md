# Realtime chat API Documentation

## 1. Overview

This API is designed for a real time-time chat system, where users can exchange messages with each other. The API supports `RESTful` and `Socket.io`

- Technologies: Node.js, Express.js, MongoDB, Socket.io, JWT, Cloudinary
- Key features:
  - User Registration and Login
  - Send and Receive Chat Messages (Socket.io)
  - Get information about online users

## 2. Authentication and security

The API works based on a JWT token. Before to use protected endpoint `Authorization: Bearer <token>` should be send by header.

## 🔹 Login

```console
POST /api/auth/login
```

## Request Body

```json
{
  "email": "user@exapmle.com",
  "password": "password1234"
}
```

## Response

Cookie: `Authorization: <jwt token>`

```json
{
  "email": "user@exapmle.com",
  "password": "password1234",
  "username": "john doe",
  "profilePicture": "https://cloudnary.com..."
}
```

## Error Conditions

```json
{
  "message": "Invalid credentials"
}
```

### Status Code `400`

## 🔹 Register

```console
POST /api/auth/signup
```

## Request Body

```json
{
  "email": "user@exapmle.com",
  "password": "password1234",
  "username": "john doe"
}
```

## Response

Cookie: `Authorization: <jwt token>`

`Status: 201`

```json
{
  "_id": "6417e10e42198a81cbe1db31",
  "username": "john doe",
  "email": "user@exapmle.com"
}
```

## Error Conditions

`Status: 400`

```json
{
  "message": "Please fill all fields"
}
```

`Status: 400`

```json
{
  "message": "Password must be at least 3 characters long"
}
```

`Status: 400`

```json
{
  "message": "Email already in use"
}
```

## 🔹 Get chat messages
