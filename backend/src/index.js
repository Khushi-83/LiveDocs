import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Signaling state
const rooms = new Map(); // roomId -> Set<ws>
const socketMeta = new Map(); // ws -> { clientId, roomId, displayName }
const idToSocket = new Map(); // clientId -> ws

function genId() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

function wsSend(ws, type, payload) {
  if (ws.readyState === 1) ws.send(JSON.stringify({ type, ...payload }));
}

function broadcast(roomId, sender, type, payload) {
  const peers = rooms.get(roomId);
  if (!peers) return;
  for (const peer of peers) {
    if (peer !== sender && peer.readyState === 1) peer.send(JSON.stringify({ type, ...payload }));
  }
}

wss.on('connection', (ws) => {
  const clientId = genId();
  socketMeta.set(ws, { clientId, roomId: null, displayName: null });
  idToSocket.set(clientId, ws);
  wsSend(ws, 'welcome', { clientId });

  ws.on('message', (raw) => {
    try {
      const data = typeof raw === 'string' ? JSON.parse(raw) : JSON.parse(raw.toString());
      switch (data.type) {
        case 'join-room': {
          const { roomId, displayName } = data;
          const meta = socketMeta.get(ws);
          meta.roomId = roomId; meta.displayName = displayName || null;
          socketMeta.set(ws, meta);
          if (!rooms.has(roomId)) rooms.set(roomId, new Set());
          const peers = rooms.get(roomId);
          const participants = Array.from(peers).map((p) => {
            const pm = socketMeta.get(p); return { clientId: pm.clientId, displayName: pm.displayName };
          });
          wsSend(ws, 'participants', { roomId, participants });
          peers.add(ws);
          broadcast(roomId, ws, 'user-joined', { roomId, participant: { clientId: meta.clientId, displayName: meta.displayName } });
          break;
        }
        case 'leave-room': {
          const meta = socketMeta.get(ws);
          const { roomId } = meta || {};
          if (roomId && rooms.has(roomId)) {
            const peers = rooms.get(roomId);
            peers.delete(ws);
            broadcast(roomId, ws, 'user-left', { roomId, clientId: meta.clientId });
            if (peers.size === 0) rooms.delete(roomId);
          }
          socketMeta.set(ws, { ...meta, roomId: null });
          break;
        }
        case 'offer':
        case 'answer':
        case 'ice-candidate': {
          const target = idToSocket.get(data.targetClientId);
          const from = socketMeta.get(ws);
          if (target && target.readyState === 1) target.send(JSON.stringify({ type: data.type, fromClientId: from.clientId, payload: data.payload }));
          break;
        }
        default:
          break;
      }
    } catch (e) {
      // ignore malformed
    }
  });

  ws.on('close', () => {
    const meta = socketMeta.get(ws);
    if (meta?.roomId && rooms.has(meta.roomId)) {
      const peers = rooms.get(meta.roomId);
      peers.delete(ws);
      broadcast(meta.roomId, ws, 'user-left', { roomId: meta.roomId, clientId: meta.clientId });
      if (peers.size === 0) rooms.delete(meta.roomId);
    }
    idToSocket.delete(clientId);
    socketMeta.delete(ws);
  });
});

app.get('/', (_req, res) => res.send('LiveDocs signaling server running'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Signaling server on', PORT));


