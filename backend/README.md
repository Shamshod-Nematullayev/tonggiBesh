# Realtime Chat API Documentation

## 1. Overview

This API is designed for a real-time chat system, where users can exchange messages with each other. The API supports `RESTful` and `Socket.io`.

### Technologies:

- Node.js
- Express.js
- MongoDB
- Socket.io
- JWT Authentication
- Cloudinary (for image uploads)

### Features:

- User Registration and Login
- Sending and Receiving Messages (REST & Socket.io)
- Updating and Deleting Messages
- Fetching Chat Messages
- Real-time Online Users List

## 2. Authentication and Security

This API works based on `JWT` authentication. To access protected endpoints, the `Authorization: Bearer <token>` header should be provided.

### **🔹 Register (Signup)**

```http
POST /api/auth/signup
```

#### **Request Body**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### **Response (201 Created)**

```json
{
  "_id": "64a77f6b8c4d6f001f9b9bcd",
  "username": "john_doe",
  "email": "john@example.com",
  "profilePicture": "https://cloudinary.com/default.jpg"
}
```

---

### **🔹 Login**

```http
POST /api/auth/login
```

#### **Request Body**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### **Response (200 OK)**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "user": {
    "_id": "64a77f6b8c4d6f001f9b9bcd",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

### **🔹 Logout**

```http
POST /api/auth/logout
```

#### **Response (200 OK)**

```json
{
  "message": "Logged out successfully"
}
```

---

### **🔹 Get User Profile**

```http
GET /api/auth/profile
```

#### **Response (200 OK)**

```json
{
  "_id": "64a77f6b8c4d6f001f9b9bcd",
  "username": "john_doe",
  "email": "john@example.com",
  "profilePicture": "https://cloudinary.com/default.jpg"
}
```

---

### **🔹 Update Profile Picture**

```http
PATCH /api/auth/profile
```

#### **Request Body**

```json
{
  "profilePic": "<base64_encoded_image>"
}
```

#### **Response (200 OK)**

```json
{
  "_id": "64a77f6b8c4d6f001f9b9bcd",
  "profilePicture": "https://cloudinary.com/new-profile.jpg"
}
```

---

## 3. Message Endpoints

### 🔹 Get Users List
```http
GET /api/users
```

#### Response:

```json
[
  {
  "_id": "67c08ccd42b71001cfa16881",
  "username": "John Doe",
  "createdAt": "2025-02-27T16:03:25.992Z",
  "__v": 0
  }
]
```

### 🔹 Get Chat Messages

#### Endpoint:

```http
GET /api/messages/:chatId
```

#### Description:

Retrieves all messages sent to a specific user (`chatId`).

#### Parameters:

| Parameter | Type     | Description      |
| --------- | -------- | ---------------- |
| `chatId`  | `string` | Receiver user ID |

#### Response:

```json
[
  {
    "_id": "654321abcdef",
    "text": "Hi John",
    "image": "https://cloudinary.com/xyz",
    "senderId": "123456abcdef",
    "receiverId": "654321abcdef",
    "createdAt": "2024-02-22T12:34:56.789Z"
  }
]
```

---

### 🔹 Send Message

#### Endpoint:

```http
POST /api/messages/:chatId
```

#### Description:

Sends a text message and/or an image to the specified `chatId` (receiver user ID).

#### Request Body:

```json
{
  "text": "Hi John",
  "image": "<base64-encoded image data>"
}
```

#### Response (`201 Created`):

```json
{
  "_id": "654321abcdef",
  "text": "Hi John",
  "image": "https://cloudinary.com/xyz",
  "senderId": "123456abcdef",
  "receiverId": "654321abcdef",
  "createdAt": "2024-02-22T12:34:56.789Z"
}
```

#### Real-time Event:

If the receiver is online, the message is also sent via Socket.io:

```json
{
  "event": "newMessage",
  "data": {
    "_id": "654321abcdef",
    "text": "Hi John",
    "image": "https://cloudinary.com/xyz",
    "senderId": "123456abcdef",
    "receiverId": "654321abcdef"
  }
}
```

---

## 4. Socket.IO Events

### 🔹 Connection

To connect to the WebSocket server, the client must send a JWT token:

```json
{
  "headers": {
    "Cookie": "Authorization=<Auth token - JWT>"
  }
}
```

### 🔹 Receiving a New Message

```json
{
  "event": "newMessage",
  "data": {
    "_id": "654321abcdef",
    "text": "Hi John",
    "image": "https://cloudinary.com/xyz",
    "senderId": "123456abcdef",
    "receiverId": "654321abcdef"
  }
}
```

### 🔹 Getting Online Users

Users who are currently connected:

```json
{
  "event": "onlineUsers",
  "data": ["userId1", "userId2", "userId3"]
}
```

## 5. Error Handling

If an error occurs on the server, the following response format is used:

```json
{
  "message": "Server error"
}
```

Status Codes:

- `400` - Bad Request (e.g., missing fields, invalid input)
- `401` - Unauthorized (e.g., missing or invalid token)
- `403` - Forbidden (e.g., access denied)
- `404` - Not Found (e.g., user or message not found)
- `500` - Internal Server Error
