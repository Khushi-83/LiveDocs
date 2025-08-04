import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const server = createServer(app);

// Initialize WebSocket server
const wss = new WebSocketServer({ server });

// Store connected clients and their document associations
const documents = new Map();

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('Client connected');
  let documentId = null;

  // Handle messages from clients
  ws.on('message', (message) => {
    // First, check if the message is a string or binary data
    if (typeof message === 'string') {
      try {
        const data = JSON.parse(message);
        
        // Handle different message types
        switch (data.type) {
          case 'join':
            // Client is joining a document
            documentId = data.documentId;
            
            // Add client to document's client list
            if (!documents.has(documentId)) {
              documents.set(documentId, new Set());
            }
            documents.get(documentId).add(ws);
            
            console.log(`Client joined document: ${documentId}`);
            console.log(`Active clients in document: ${documents.get(documentId).size}`);
            break;
            
          case 'update':
            // Client is sending an update to the document
            if (documentId && documents.has(documentId)) {
              // Broadcast the update to all other clients in the same document
              documents.get(documentId).forEach((client) => {
                if (client !== ws && client.readyState === 1) { // WebSocket.OPEN = 1
                  client.send(message);
                }
              });
            }
            break;
            
          default:
            console.log(`Unknown message type: ${data.type}`);
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    } else {
      // Handle binary data (likely from y-websocket)
      if (documentId && documents.has(documentId)) {
        // Broadcast the binary data to all other clients in the same document
        documents.get(documentId).forEach((client) => {
          if (client !== ws && client.readyState === 1) { // WebSocket.OPEN = 1
            client.send(message);
          }
        });
      }
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    
    // Remove client from document's client list
    if (documentId && documents.has(documentId)) {
      documents.get(documentId).delete(ws);
      
      // If no clients left in the document, remove the document
      if (documents.get(documentId).size === 0) {
        documents.delete(documentId);
        console.log(`Document removed: ${documentId}`);
      } else {
        console.log(`Active clients in document: ${documents.get(documentId).size}`);
      }
    }
  });
});

// Serve static files from the 'dist' directory in production
app.use(express.static(join(__dirname, 'dist')));

// Handle all other requests by serving the main index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});