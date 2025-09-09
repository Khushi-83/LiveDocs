import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VideoConference from '@/components/VideoConference';
import DocumentEditor from '@/components/DocumentEditor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, FileText } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';

const VideoCall = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [username] = useState('User-' + Math.floor(Math.random() * 1000));
  const [showEditor, setShowEditor] = useState(true);
  const [docId, setDocId] = useState<string>(roomId || '');

  useEffect(() => {
    if (roomId && !docId) setDocId(roomId);
  }, [roomId, docId]);

  const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
  const isDev = Boolean((env as unknown as { DEV?: boolean }).DEV);
  const explicit = env.VITE_WS_URL;
  const defaultSameOrigin = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host;
  const defaultDev = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + 'localhost:3000';
  const signalingUrl = explicit || (isDev ? defaultDev : defaultSameOrigin);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-medium text-lg">Video Call — Room {roomId}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowEditor((v) => !v)}>
              <FileText className="w-4 h-4 mr-1" />
              {showEditor ? 'Hide Editor' : 'Show Editor'}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorBoundary>
            <Card className="p-6 shadow-md">
              <h2 className="text-base font-semibold mb-3">Live Call</h2>
              {roomId && (
                <VideoConference roomId={roomId} displayName={username} signalingUrl={signalingUrl} />
              )}
            </Card>
          </ErrorBoundary>

          <Card className="p-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold">Live Document</h2>
              <div className="flex items-center gap-2">
                <Input
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                  placeholder="Document ID"
                  className="w-48"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/documents/${docId}`)}
                  disabled={!docId}
                >
                  Open Full Page
                </Button>
              </div>
            </div>
            {showEditor && docId ? (
              <DocumentEditor documentId={docId} username={username} />
            ) : (
              <div className="text-sm text-muted-foreground">Editor hidden</div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VideoCall;


