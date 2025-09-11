import { useCallback, useEffect, useRef, useState } from 'react';
import { createSignalingSocket, getSignalingUrl } from '@/meet/signaling';

type Participant = { clientId: string; displayName?: string | null };

type Props = {
  roomId: string;
  displayName?: string;
  signalingUrl?: string;
};

type PeerRecord = { connection: RTCPeerConnection; stream: MediaStream };

const defaultStunServers: RTCIceServer[] = [{ urls: 'stun:stun.l.google.com:19302' }];

export default function VideoConference({ roomId, displayName, signalingUrl }: Props) {
  const [clientId, setClientId] = useState('');
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
    try { record.connection.close(); } catch (e) { console.warn('close peer failed', e); }
    try { record.stream.getTracks().forEach((t) => t.stop()); } catch (e) { console.warn('stop tracks failed', e); }
    peersRef.current.delete(remoteId);
  }, []);

  const ensurePeer = useCallback(async (remoteId: string) => {
    if (peersRef.current.has(remoteId)) return;
    const pc = new RTCPeerConnection({ iceServers: defaultStunServers });
    const remoteStream = new MediaStream();
    peersRef.current.set(remoteId, { connection: pc, stream: remoteStream });

    const local = localStreamRef.current;
    if (local) {
      for (const track of local.getTracks()) pc.addTrack(track, local);
    }

    pc.ontrack = (ev) => {
      // Save stream reference
      const rec = peersRef.current.get(remoteId);
      if (rec) rec.stream = ev.streams[0];
      // Try immediate attach
      const attach = () => {
        const video = document.getElementById(`remote-${remoteId}`) as HTMLVideoElement | null;
        if (video && !video.srcObject) {
          video.srcObject = ev.streams[0];
          return true;
        }
        return false;
      };
      if (!attach()) {
        // Retry shortly in case element not yet rendered
        setTimeout(() => attach(), 50);
        setTimeout(() => attach(), 200);
      }
    };
    pc.onicecandidate = (ev) => {
      if (ev.candidate) send({ type: 'ice-candidate', targetClientId: remoteId, payload: ev.candidate });
    };
  }, [send]);

  const createOfferTo = useCallback(async (remoteId: string) => {
    await ensurePeer(remoteId);
    const rec = peersRef.current.get(remoteId)!;
    const offer = await rec.connection.createOffer();
    await rec.connection.setLocalDescription(offer);
    send({ type: 'offer', targetClientId: remoteId, payload: offer });
  }, [ensurePeer, send]);

  useEffect(() => {
    const url = signalingUrl || getSignalingUrl();
    const ws = createSignalingSocket(url);
    wsRef.current = ws;
    setWsStatus('connecting');

    ws.onopen = () => setWsStatus('open');
    ws.onerror = () => setWsStatus('error');
    ws.onclose = () => setWsStatus('closed');

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'welcome':
          setClientId(data.clientId);
          break;
        case 'participants': {
          const list: Participant[] = data.participants || [];
          setParticipants(list);
          if (joined) {
            for (const p of list) await createOfferTo(p.clientId);
          }
          break;
        }
        case 'user-joined': {
          const p: Participant = data.participant;
          setParticipants((prev) => prev.find((x) => x.clientId === p.clientId) ? prev : [...prev, p]);
          if (joined) await createOfferTo(p.clientId);
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
          await ensurePeer(fromId);
          const rec = peersRef.current.get(fromId)!;
          await rec.connection.setRemoteDescription(data.payload);
          const answer = await rec.connection.createAnswer();
          await rec.connection.setLocalDescription(answer);
          send({ type: 'answer', targetClientId: fromId, payload: answer });
          break;
        }
        case 'answer': {
          const fromId: string = data.fromClientId;
          const rec = peersRef.current.get(fromId);
          if (rec) await rec.connection.setRemoteDescription(data.payload);
          break;
        }
        case 'ice-candidate': {
          const fromId: string = data.fromClientId;
          const rec = peersRef.current.get(fromId);
          if (rec) try { await rec.connection.addIceCandidate(new RTCIceCandidate(data.payload)); } catch (e) { console.warn('addIceCandidate failed', e); }
          break;
        }
      }
    };

    return () => {
      try { ws.close(); } catch (e) { console.warn('ws close failed', e); }
      wsRef.current = null;
    };
  }, [roomId, signalingUrl, joined, createOfferTo, ensurePeer, teardownPeer, send]);

  async function joinRoom() {
    if (joined) return;
    let stream: MediaStream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true }); }
    catch (e) { alert('Allow camera and microphone to join.'); return; }
    localStreamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    setJoined(true);
    send({ type: 'join-room', roomId, displayName });
  }

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

  useEffect(() => () => { leaveRoom(); }, [leaveRoom]);

  function toggleMic() {
    const s = localStreamRef.current; if (!s) return;
    const next = !micEnabled; s.getAudioTracks().forEach((t) => (t.enabled = next)); setMicEnabled(next);
  }
  function toggleCam() {
    const s = localStreamRef.current; if (!s) return;
    const next = !camEnabled; s.getVideoTracks().forEach((t) => (t.enabled = next)); setCamEnabled(next);
  }

  return (
    <div className="space-y-3">
      <div className="text-xs text-muted-foreground">Signaling: {wsStatus} · You: {displayName || clientId}</div>
      <div className="flex gap-3 items-center">
        {!joined ? (
          <button className="px-3 py-2 rounded bg-primary text-primary-foreground" onClick={joinRoom}>Join</button>
        ) : (
          <button className="px-3 py-2 rounded bg-destructive text-destructive-foreground" onClick={leaveRoom}>Leave</button>
        )}
        <button className="px-3 py-2 rounded border" onClick={toggleMic}>{micEnabled ? 'Mute' : 'Unmute'}</button>
        <button className="px-3 py-2 rounded border" onClick={toggleCam}>{camEnabled ? 'Camera Off' : 'Camera On'}</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <video ref={localVideoRef} autoPlay playsInline muted className="w-full rounded bg-black aspect-video" />
        {participants.map((p) => (
          <div key={p.clientId} className="relative">
            <video id={`remote-${p.clientId}`} autoPlay playsInline className="w-full rounded bg-black aspect-video" />
            <div className="absolute bottom-1 left-1 text-xs px-1.5 py-0.5 rounded bg-black/60 text-white">{p.displayName || p.clientId}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


