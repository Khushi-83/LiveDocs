import { useParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VideoConference from '@/components/VideoConference';
import DocumentEditor from '@/pages/DocumentEditor';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Check, FilePlus2, PencilLine, Link2 } from 'lucide-react';

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

  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => `${window.location.origin}/meet/${roomId ?? ''}`, [roomId]);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.warn('Failed to copy link', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="border-b bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Meeting Room</h1>
            <Badge variant="secondary" className="rounded-full">{roomId}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyLink} className="gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Link'}
            </Button>
            <a href={shareUrl} target="_blank" rel="noreferrer">
              <Button size="sm" variant="ghost" className="gap-2">
                <Link2 className="w-4 h-4" />Open in new tab
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 shadow-md lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Live Call</h2>
            <span className="text-xs text-muted-foreground">You: {username}</span>
          </div>
          {roomId && <VideoConference roomId={roomId} displayName={username} signalingUrl={signalingUrl} />}
        </Card>

        <Card className="p-6 shadow-md lg:sticky lg:top-6 h-fit">
          <h2 className="text-base font-semibold">Document</h2>
          <p className="text-sm text-muted-foreground mb-4">Create a new document or continue editing an existing one alongside your call.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button onClick={() => setMode('new')} className="gap-2"><FilePlus2 className="w-4 h-4" />Start New Document</Button>
            <Button variant="secondary" onClick={() => setMode('existing')} className="gap-2"><PencilLine className="w-4 h-4" />Edit Existing</Button>
          </div>
          <Separator className="my-4" />
          {mode === 'new' && (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">Click below to generate a temporary document ID.</div>
              <Button variant="outline" onClick={() => setDocId('doc-' + Math.random().toString(36).slice(2, 8))}>Generate ID</Button>
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


