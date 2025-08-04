import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { setupWebSocketHandlers } from './controllers/websocketController.js';
import documentRoutes from './routes/documentRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/documents', documentRoutes);
app.use('/api/users', userRoutes);

// Initialize WebSocket server
const wss = new WebSocketServer({ server });

// Setup WebSocket handlers
setupWebSocketHandlers(wss);

// Serve static files from the 'dist' directory in production
const distPath = join(__dirname, '..', '..', 'dist');
app.use(express.static(distPath));

// Handle all other requests by serving the main index.html
app.get('*', (req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});