import { useCallback, useEffect, useRef, useState } from 'react';

type Participant = {
  clientId: string;
  displayName?: string | null;
};

type Props = {
  roomId: string;
  displayName?: string;
  signalingUrl?: string; // defaults to same origin ws(s)
};

type PeerRecord = {
  connection: RTCPeerConnection;
  stream: MediaStream;
};

const defaultStunServers: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
];

export default function VideoConference({ roomId, displayName, signalingUrl }: Props) {
  const [clientId, setClientId] = useState<string>('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [joined, setJoined] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);
  const [wsStatus, setWsStatus] = useState<'connecting' | 'open' | 'closed' | 'error'>('connecting');

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Map<string, PeerRecord>>(new Map());
  const wsRef = useRef<WebSocket | null>(null);

  const send = useCallback((obj: Record<string, unknown>) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(obj));
    }
  }, []);

  const teardownPeer = useCallback((remoteId: string) => {
    const record = peersRef.current.get(remoteId);
    if (!record) return;
    try {
      record.connection.onicecandidate = null;
      record.connection.ontrack = null;
      record.connection.close();
    } catch (e) {
      // ignore
    }
    try {
      record.stream.getTracks().forEach((t) => t.stop());
    } catch (e) {
      // ignore
    }
    peersRef.current.delete(remoteId);
  }, []);

  const ensurePeer = useCallback(async (remoteId: string) => {
    if (peersRef.current.has(remoteId)) return;
    const pc = new RTCPeerConnection({ iceServers: defaultStunServers });
    const remoteStream = new MediaStream();
    const record: PeerRecord = { connection: pc, stream: remoteStream };
    peersRef.current.set(remoteId, record);

    // add local tracks
    const localStream = localStreamRef.current;
    if (localStream) {
      for (const track of localStream.getTracks()) {
        pc.addTrack(track, localStream);
      }
    }

    pc.ontrack = (ev) => {
      ev.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
      const video = document.getElementById(`remote-${remoteId}`) as HTMLVideoElement | null;
      if (video && !video.srcObject) {
        video.srcObject = remoteStream;
      }
    };

    pc.onicecandidate = (ev) => {
      if (ev.candidate) {
        send({ type: 'ice-candidate', targetClientId: remoteId, payload: ev.candidate });
      }
    };
  }, [send]);

  const createOfferTo = useCallback(async (remoteId: string) => {
    await ensurePeer(remoteId);
    const record = peersRef.current.get(remoteId)!;
    const offer = await record.connection.createOffer();
    await record.connection.setLocalDescription(offer);
    send({ type: 'offer', targetClientId: remoteId, payload: offer });
  }, [ensurePeer, send]);

  const leaveRoom = useCallback(() => {
    if (!joined) return;
    setJoined(false);
    send({ type: 'leave-room' });
    peersRef.current.forEach((_, id) => teardownPeer(id));
    peersRef.current.clear();
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
  }, [joined, send, teardownPeer]);

  // Initialize WebSocket
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const url = signalingUrl || `${protocol}://${window.location.host}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;
    setWsStatus('connecting');

    ws.onopen = () => {
      setWsStatus('open');
    };

    ws.onerror = () => {
      console.error('WebSocket connection error:', url);
      setWsStatus('error');
    };

    ws.onclose = (ev) => {
      console.warn('WebSocket closed:', ev.code, ev.reason);
      setWsStatus('closed');
    };

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'welcome':
          setClientId(data.clientId);
          break;
        case 'participants': {
          const list: Participant[] = data.participants || [];
          setParticipants(list);
          // create offers to all existing participants
          if (joined) {
            for (const p of list) {
              await createOfferTo(p.clientId);
            }
          }
          break;
        }
        case 'user-joined': {
          const p: Participant = data.participant;
          setParticipants((prev) => {
            if (prev.find((x) => x.clientId === p.clientId)) return prev;
            return [...prev, p];
          });
          if (joined) {
            await createOfferTo(p.clientId);
          }
          break;
        }
        case 'user-left': {
          const leftId: string = data.clientId;
          setParticipants((prev) => prev.filter((p) => p.clientId !== leftId));
          teardownPeer(leftId);
          break;
        }
        case 'offer': {
          const fromId: string = data.fromClientId;
          const description: RTCSessionDescriptionInit = data.payload;
          await ensurePeer(fromId);
          const record = peersRef.current.get(fromId)!;
          await record.connection.setRemoteDescription(description);
          const answer = await record.connection.createAnswer();
          await record.connection.setLocalDescription(answer);
          send({ type: 'answer', targetClientId: fromId, payload: answer });
          break;
        }
        case 'answer': {
          const fromId: string = data.fromClientId;
          const description: RTCSessionDescriptionInit = data.payload;
          const record = peersRef.current.get(fromId);
          if (record) {
            await record.connection.setRemoteDescription(description);
          }
          break;
        }
        case 'ice-candidate': {
          const fromId: string = data.fromClientId;
          const candidate = new RTCIceCandidate(data.payload);
          const record = peersRef.current.get(fromId);
          if (record) {
            try { await record.connection.addIceCandidate(candidate); } catch (e) {
              // ignore addIceCandidate errors during negotiation glare
            }
          }
          break;
        }
      }
    };

    return () => {
      try { ws.close(); } catch (e) {
        // ignore
      }
      wsRef.current = null;
    };
  }, [roomId, signalingUrl, joined, createOfferTo, ensurePeer, teardownPeer, send]);

  async function joinRoom() {
    if (joined) return;
    // get media
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    } catch (err) {
      alert('Failed to access camera/microphone. Please allow permissions and try again.');
      return;
    }
    localStreamRef.current = stream;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    setJoined(true);
    send({ type: 'join-room', roomId, displayName });
  }

  // replaced by useCallback versions above

  function toggleMic() {
    const stream = localStreamRef.current;
    if (!stream) return;
    const next = !micEnabled;
    stream.getAudioTracks().forEach((t) => (t.enabled = next));
    setMicEnabled(next);
  }

  function toggleCam() {
    const stream = localStreamRef.current;
    if (!stream) return;
    const next = !camEnabled;
    stream.getVideoTracks().forEach((t) => (t.enabled = next));
    setCamEnabled(next);
  }

  useEffect(() => {
    return () => {
      leaveRoom();
    };
  }, [leaveRoom]);

  return (
    <div className="space-y-3">
      <div className="text-xs text-muted-foreground">Signaling: {wsStatus}</div>
      <div className="flex gap-3 items-center">
        {!joined ? (
          <button className="px-3 py-2 rounded bg-primary text-primary-foreground" onClick={joinRoom}>Join Call</button>
        ) : (
          <button className="px-3 py-2 rounded bg-destructive text-destructive-foreground" onClick={leaveRoom}>Leave</button>
        )}
        <button className="px-3 py-2 rounded border" onClick={toggleMic}>{micEnabled ? 'Mute' : 'Unmute'}</button>
        <button className="px-3 py-2 rounded border" onClick={toggleCam}>{camEnabled ? 'Camera Off' : 'Camera On'}</button>
        <span className="text-sm text-muted-foreground">You: {displayName || clientId}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <video ref={localVideoRef} autoPlay playsInline muted className="w-full rounded bg-black aspect-video" />
        {participants.map((p) => (
          <div key={p.clientId} className="relative">
            <video id={`remote-${p.clientId}`} autoPlay playsInline className="w-full rounded bg-black aspect-video" />
            <div className="absolute bottom-1 left-1 text-xs px-1.5 py-0.5 rounded bg-black/60 text-white">
              {p.displayName || p.clientId}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


