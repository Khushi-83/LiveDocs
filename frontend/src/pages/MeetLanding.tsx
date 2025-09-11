import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getSignalingUrl } from '@/meet/signaling';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MeetLanding = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  function newMeeting() {
    const id = Math.random().toString(36).slice(2, 8);
    navigate(`/meet/${id}`);
  }

  function join() {
    if (roomId) navigate(`/meet/${roomId}`);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">Video calls and meetings</h1>
        <div className="text-xs text-muted-foreground mb-2">Signaling: {getSignalingUrl()}</div>
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <Button onClick={newMeeting} className="w-full md:w-auto">New meeting</Button>
          <div className="flex items-center gap-2 w-full">
            <Input placeholder="Enter a code or link" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <Button variant="secondary" onClick={join} disabled={!roomId}>Join</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MeetLanding;


