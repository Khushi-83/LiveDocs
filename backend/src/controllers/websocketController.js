/**
 * WebSocket Controller for handling real-time document collaboration
 * and WebRTC signaling for live video conferencing.
 */

// Store connected clients and their document associations (existing doc-collab rooms)
const documents = new Map();

// --- Video conferencing signaling state ---
// roomId -> Set<WebSocket>
const videoRooms = new Map();
// clientId -> WebSocket
const clientIdToSocket = new Map();
// WebSocket -> { clientId, roomId, displayName }
const socketMetadata = new Map();

function generateClientId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function wsSend(ws, type, payload) {
  if (ws && ws.readyState === 1) {
    ws.send(JSON.stringify({ type, ...payload }));
  }
}

function broadcastToRoom(roomId, senderWs, type, payload) {
  const peers = videoRooms.get(roomId);
  if (!peers) return;
  peers.forEach((peer) => {
    if (peer !== senderWs && peer.readyState === 1) {
      peer.send(JSON.stringify({ type, ...payload }));
    }
  });
}

/**
 * Setup WebSocket handlers for the server
 * @param {WebSocketServer} wss - The WebSocket server instance
 */
export function setupWebSocketHandlers(wss) {
  wss.on('connection', (ws) => {
    console.log('Client connected');
    let documentId = null;

    // Assign identity for video signaling
    const clientId = generateClientId();
    clientIdToSocket.set(clientId, ws);
    socketMetadata.set(ws, { clientId, roomId: null, displayName: null });
    wsSend(ws, 'welcome', { clientId });

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

            // --- Video signaling handlers ---
            case 'join-room': {
              const { roomId, displayName } = data;
              const meta = socketMetadata.get(ws) || {};
              meta.roomId = roomId;
              meta.displayName = displayName || null;
              socketMetadata.set(ws, meta);

              if (!videoRooms.has(roomId)) {
                videoRooms.set(roomId, new Set());
              }
              const peers = videoRooms.get(roomId);
              // Notify the new client about existing participants
              const participants = Array.from(peers).map((peer) => {
                const pMeta = socketMetadata.get(peer);
                return { clientId: pMeta?.clientId, displayName: pMeta?.displayName };
              }).filter(Boolean);
              wsSend(ws, 'participants', { roomId, participants });

              // Add to room
              peers.add(ws);

              // Notify others that a new participant joined
              broadcastToRoom(roomId, ws, 'user-joined', {
                roomId,
                participant: { clientId: meta.clientId, displayName: meta.displayName }
              });
              break;
            }

            case 'leave-room': {
              const meta = socketMetadata.get(ws);
              const { roomId } = meta || {};
              if (roomId && videoRooms.has(roomId)) {
                const peers = videoRooms.get(roomId);
                peers.delete(ws);
                broadcastToRoom(roomId, ws, 'user-left', { roomId, clientId: meta.clientId });
                if (peers.size === 0) videoRooms.delete(roomId);
              }
              // Clear meta
              socketMetadata.set(ws, { ...meta, roomId: null });
              break;
            }

            case 'offer':
            case 'answer':
            case 'ice-candidate': {
              // Relay to specific target inside same room (if provided)
              const { targetClientId } = data;
              const target = clientIdToSocket.get(targetClientId);
              if (target && target.readyState === 1) {
                const fromMeta = socketMetadata.get(ws);
                target.send(JSON.stringify({
                  type: data.type,
                  fromClientId: fromMeta?.clientId,
                  payload: data.payload
                }));
              }
              break;
            }
              
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

      // Handle video signaling cleanup
      const meta = socketMetadata.get(ws);
      if (meta) {
        const { roomId } = meta;
        if (roomId && videoRooms.has(roomId)) {
          const peers = videoRooms.get(roomId);
          peers.delete(ws);
          broadcastToRoom(roomId, ws, 'user-left', { roomId, clientId: meta.clientId });
          if (peers.size === 0) videoRooms.delete(roomId);
        }
        socketMetadata.delete(ws);
      }
      clientIdToSocket.delete(clientId);
    });
  });
}