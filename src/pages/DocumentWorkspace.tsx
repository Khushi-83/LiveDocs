import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DocumentEditor from '@/components/DocumentEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Users, Share2, Save } from 'lucide-react';

const DocumentWorkspace = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [username, setUsername] = useState('User-' + Math.floor(Math.random() * 1000));
  
  // In a real app, you would fetch the document details from your backend
  useEffect(() => {
    // Simulate loading document details
    const timer = setTimeout(() => {
      if (documentId === 'welcome') {
        setDocumentTitle('Welcome to LiveDocs');
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [documentId]);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentTitle(e.target.value);
  };
  
  const handleTitleSave = () => {
    setIsEditingTitle(false);
    // In a real app, you would save the title to your backend here
  };
  
  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <Input
                  value={documentTitle}
                  onChange={handleTitleChange}
                  onBlur={handleTitleSave}
                  onKeyDown={handleTitleKeyDown}
                  autoFocus
                  className="font-medium text-lg w-64"
                />
                <Button size="sm" onClick={handleTitleSave}>
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            ) : (
              <h1 
                className="font-medium text-lg cursor-pointer hover:text-primary transition-colors"
                onClick={() => setIsEditingTitle(true)}
              >
                {documentTitle}
              </h1>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-1" />
              Invite
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Card className="p-6 shadow-md">
          {documentId ? (
            <DocumentEditor 
              documentId={documentId} 
              username={username} 
            />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Document Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The document you're looking for doesn't exist or you don't have permission to access it.
              </p>
              <Button onClick={() => navigate('/')}>
                Go to Dashboard
              </Button>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default DocumentWorkspace;