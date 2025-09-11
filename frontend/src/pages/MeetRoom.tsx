import { useParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VideoConference from '@/components/VideoConference';
import DocumentEditor from '@/pages/DocumentEditor';
import { Input } from '@/components/ui/input';

const MeetRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [username] = useState('User-' + Math.floor(Math.random() * 1000));
  const [docId, setDocId] = useState<string>('');
  const [mode, setMode] = useState<'none' | 'new' | 'existing'>('none');

  const signalingUrl = useMemo(() => {
    const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
    const sameOrigin = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host;
    const devDefault = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + 'localhost:3000';
    const isDev = Boolean((env as unknown as { DEV?: boolean }).DEV);
    return env.VITE_WS_URL || (isDev ? devDefault : sameOrigin);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-base font-semibold mb-3">Meeting: {roomId}</h2>
          {roomId && <VideoConference roomId={roomId} displayName={username} signalingUrl={signalingUrl} />}
        </Card>
        <Card className="p-6">
          <h2 className="text-base font-semibold mb-3">Document</h2>
          {mode === 'none' && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button onClick={() => setMode('new')}>Start New Document</Button>
                <Button variant="secondary" onClick={() => setMode('existing')}>Edit Existing</Button>
              </div>
            </div>
          )}
          {mode === 'new' && (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">A temporary document ID will be created.</div>
              <Button onClick={() => setDocId('doc-' + Math.random().toString(36).slice(2, 8))}>Create ID</Button>
              {docId && (
                <div className="mt-3">
                  <DocumentEditor />
                </div>
              )}
            </div>
          )}
          {mode === 'existing' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Input placeholder="Enter document ID" value={docId} onChange={(e) => setDocId(e.target.value)} />
                <Button variant="secondary" onClick={() => docId && setMode('existing')}>Load</Button>
              </div>
              {docId && (
                <div className="mt-3">
                  <DocumentEditor />
                </div>
              )}
            </div>
          )}
          <div className="mt-4 text-sm text-muted-foreground">Open full editor: {docId && (
            <Button variant="link" onClick={() => navigate(`/documents/${docId}`)}>Go to /documents/{docId}</Button>
          )}</div>
        </Card>
      </div>
    </div>
  );
};

export default MeetRoom;


