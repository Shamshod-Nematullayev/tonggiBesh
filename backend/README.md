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
```json
{
    "token": "wjdsndsvmnjdfds..."
}
```