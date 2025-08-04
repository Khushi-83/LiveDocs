/**
 * WebSocket utility functions
 */

/**
 * Send a message to a WebSocket client
 * @param {WebSocket} ws - The WebSocket client
 * @param {string} type - The message type
 * @param {object} data - The message data
 */
export function sendMessage(ws, type, data) {
  if (ws.readyState === 1) { // WebSocket.OPEN = 1
    ws.send(JSON.stringify({
      type,
      ...data
    }));
  }
}

/**
 * Broadcast a message to all clients in a document
 * @param {Set<WebSocket>} clients - The set of WebSocket clients
 * @param {WebSocket} sender - The sender to exclude (optional)
 * @param {string} type - The message type
 * @param {object} data - The message data
 */
export function broadcastMessage(clients, sender, type, data) {
  const message = JSON.stringify({
    type,
    ...data
  });
  
  clients.forEach(client => {
    if ((!sender || client !== sender) && client.readyState === 1) { // WebSocket.OPEN = 1
      client.send(message);
    }
  });
}

/**
 * Broadcast binary data to all clients in a document
 * @param {Set<WebSocket>} clients - The set of WebSocket clients
 * @param {WebSocket} sender - The sender to exclude
 * @param {Buffer|ArrayBuffer} data - The binary data to send
 */
export function broadcastBinary(clients, sender, data) {
  clients.forEach(client => {
    if (client !== sender && client.readyState === 1) { // WebSocket.OPEN = 1
      client.send(data);
    }
  });
}