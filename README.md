# LiveDocs - Real-Time Collaborative Document Editor

## Overview

LiveDocs is an innovative platform designed to streamline collaboration in the workplace. With real-time document editing and integrated video conferencing, teams can work together seamlessly, no matter where they are.

## Features

### Document Editing
- **Real-Time Collaboration**: Multiple users can edit documents simultaneously
- **Rich Text Formatting**: Format text, add images, tables, and more
- **Auto-Saving**: Changes are automatically saved as you type
- **Version History**: Revert to previous versions if needed
- **Modular Backend**: Separate backend structure with organized controllers, models, routes, and utilities
- **RESTful API**: API endpoints for document and user management
- **WebSocket Protocol**: Structured protocol for real-time collaboration

### Coming Soon
- **Video Conferencing**: Integrated video calls while editing documents
- **Screen Sharing**: Share your screen during meetings
- **Chat**: Send messages and share files within the meeting

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Real-Time Collaboration**: Yjs, WebSockets
- **Text Editor**: Tiptap
- **Routing**: React Router

## Backend API

### Document Endpoints

- `GET /api/documents` - Get all documents
- `GET /api/documents/:id` - Get a specific document
- `POST /api/documents` - Create a new document
- `PUT /api/documents/:id` - Update a document
- `DELETE /api/documents/:id` - Delete a document
- `POST /api/documents/:id/share` - Share a document with another user

### User Endpoints

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/logout` - Logout a user

### WebSocket Protocol

The WebSocket server handles real-time collaboration through the following message types:

- `join` - Join a document session
- `update` - Send document updates (both JSON and binary formats supported)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/livedocs.git
   cd livedocs
   ```

2. Install dependencies for the frontend
   ```bash
   npm install
   # or
   yarn
   ```

3. Install dependencies for the backend
   ```bash
   cd backend
   npm install
   cd ..
   # or
   cd backend
   yarn
   cd ..
   ```
   
   Alternatively, you can run the setup script:
    ```bash
    # On Windows
    .\setup-backend.bat
    
    # On Linux/Mac
    chmod +x setup-backend.sh  # Make the script executable (first time only)
    ./setup-backend.sh
    ```

### Development

1. Start both frontend and backend development servers
   ```bash
   npm run dev:all
   # or
   yarn dev:all
   ```

   This will start both the frontend development server and the backend server concurrently.

2. Alternatively, you can start them separately:

   Start the frontend development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   In a separate terminal, start the backend server:
   ```bash
   npm run server:dev
   # or
   yarn server:dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Production Build

1. Build the application
   ```bash
   npm run build
   ```

2. Start the production server (serves both the frontend and WebSocket server)
   ```bash
   npm start
   ```

## Usage

1. Navigate to the Dashboard to see your documents
2. Create a new document or open an existing one
3. Share the document URL with collaborators
4. Edit the document together in real-time

## Project Structure

```
├── backend/            # Backend server code
│   ├── src/
│   │   ├── controllers/  # Request handlers and business logic
│   │   ├── middleware/   # Express middleware functions
│   │   ├── models/       # Data models
│   │   ├── routes/       # API route definitions
│   │   ├── utils/        # Utility functions
│   │   └── index.js      # Main application entry point
│   └── package.json      # Backend dependencies and scripts
├── public/             # Static assets
├── src/                # Frontend code
│   ├── assets/         # Images and other assets
│   ├── components/     # React components
│   │   ├── ui/         # UI components (buttons, inputs, etc.)
│   │   └── ...         # Feature components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   └── main.tsx        # Application entry point
├── server.js           # Legacy WebSocket server (for backward compatibility)
└── package.json        # Project dependencies and scripts
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Yjs](https://github.com/yjs/yjs) - CRDT implementation for real-time collaboration
- [Tiptap](https://tiptap.dev/) - Headless rich text editor
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
