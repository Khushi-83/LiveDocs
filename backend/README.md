# LiveDocs Backend

This is the backend server for the LiveDocs collaborative document editing application. It provides WebSocket support for real-time collaboration and RESTful API endpoints for document management.

## Directory Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers and business logic
│   ├── middleware/      # Express middleware functions
│   ├── models/          # Data models
│   ├── routes/          # API route definitions
│   ├── utils/           # Utility functions
│   └── index.js         # Main application entry point
└── package.json         # Project dependencies and scripts
```

## Features

- Real-time document collaboration using WebSockets
- API endpoints for document management (placeholder for future implementation)
- User authentication (placeholder for future implementation)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Production

```bash
# Build and start the production server
npm start
```

## API Endpoints

### Documents

- `GET /api/documents` - Get all documents
- `GET /api/documents/:id` - Get a specific document
- `POST /api/documents` - Create a new document
- `PUT /api/documents/:id` - Update a document
- `DELETE /api/documents/:id` - Delete a document
- `POST /api/documents/:id/share` - Share a document with another user

### Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile` - Get the current user's profile
- `PUT /api/users/profile` - Update the current user's profile
- `POST /api/users/logout` - Logout the current user

## WebSocket Protocol

The WebSocket server handles real-time collaboration between users. Clients can send and receive the following message types:

### Client to Server

- `join` - Join a document session
  ```json
  {
    "type": "join",
    "documentId": "doc123",
    "username": "user1"
  }
  ```

- `update` - Send document updates
  ```json
  {
    "type": "update",
    "documentId": "doc123",
    "content": "..."
  }
  ```

### Binary Messages

The server also supports binary messages for Yjs updates, which are automatically forwarded to other clients in the same document.