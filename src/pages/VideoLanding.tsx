import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const VideoLanding = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  function createRandomRoom() {
    const id = Math.random().toString(36).slice(2, 8);
    setRoomId(id);
  }

  function join() {
    if (!roomId) return;
    navigate(`/video/${roomId}`);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-semibold">Join a Video Call</h1>
        <div className="space-y-2">
          <Input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
          />
          <div className="flex gap-2">
            <Button onClick={join} disabled={!roomId}>Join</Button>
            <Button variant="secondary" onClick={createRandomRoom}>Generate ID</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VideoLanding;


