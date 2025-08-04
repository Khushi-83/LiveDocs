import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { FileText, Plus, Search, Star, Clock, Trash, MoreHorizontal, Users } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  lastEdited: string;
  owner: string;
  starred: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  
  // Mock documents data - in a real app, this would come from your backend
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'welcome',
      title: 'Welcome to LiveDocs',
      lastEdited: '2 minutes ago',
      owner: 'LiveDocs Team',
      starred: true
    },
    {
      id: 'project-proposal',
      title: 'Project Proposal',
      lastEdited: '3 hours ago',
      owner: 'You',
      starred: true
    },
    {
      id: 'meeting-notes',
      title: 'Team Meeting Notes',
      lastEdited: 'Yesterday',
      owner: 'You',
      starred: false
    },
    {
      id: 'roadmap',
      title: 'Product Roadmap 2023',
      lastEdited: 'Last week',
      owner: 'Product Team',
      starred: false
    },
  ]);
  
  const handleCreateDocument = () => {
    if (!newDocTitle.trim()) return;
    
    // Generate a random ID - in a real app, this would be handled by your backend
    const newId = 'doc-' + Math.random().toString(36).substring(2, 9);
    
    const newDocument: Document = {
      id: newId,
      title: newDocTitle,
      lastEdited: 'Just now',
      owner: 'You',
      starred: false
    };
    
    setDocuments([newDocument, ...documents]);
    setIsCreateDialogOpen(false);
    setNewDocTitle('');
    
    // Navigate to the new document
    navigate(`/documents/${newId}`);
  };
  
  const toggleStar = (id: string) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, starred: !doc.starred } : doc
    ));
  };
  
  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const starredDocuments = filteredDocuments.filter(doc => doc.starred);
  const recentDocuments = filteredDocuments.sort((a, b) => {
    // This is a simplified sort - in a real app, you'd use actual timestamps
    if (a.lastEdited.includes('Just now')) return -1;
    if (b.lastEdited.includes('Just now')) return 1;
    if (a.lastEdited.includes('minute')) return -1;
    if (b.lastEdited.includes('minute')) return 1;
    if (a.lastEdited.includes('hour')) return -1;
    if (b.lastEdited.includes('hour')) return 1;
    if (a.lastEdited.includes('Yesterday')) return -1;
    if (b.lastEdited.includes('Yesterday')) return 1;
    return 0;
  });
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">LD</span>
            </div>
            <h1 className="text-xl font-bold">LiveDocs</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="default" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-1 h-4 w-4" />
              New Document
            </Button>
            
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">US</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="recent">
          <TabsList className="mb-6">
            <TabsTrigger value="recent">
              <Clock className="mr-1 h-4 w-4" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="starred">
              <Star className="mr-1 h-4 w-4" />
              Starred
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentDocuments.map((doc) => (
                <DocumentCard 
                  key={doc.id} 
                  document={doc} 
                  onToggleStar={toggleStar} 
                  onOpen={() => navigate(`/documents/${doc.id}`)} 
                />
              ))}
            </div>
            
            {recentDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No documents found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'Try a different search term' : 'Create your first document to get started'}
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-1 h-4 w-4" />
                  New Document
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="starred" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {starredDocuments.map((doc) => (
                <DocumentCard 
                  key={doc.id} 
                  document={doc} 
                  onToggleStar={toggleStar} 
                  onOpen={() => navigate(`/documents/${doc.id}`)} 
                />
              ))}
            </div>
            
            {starredDocuments.length === 0 && (
              <div className="text-center py-12">
                <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No starred documents</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'Try a different search term' : 'Star documents to find them quickly'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Create document dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Document</DialogTitle>
            <DialogDescription>
              Give your document a title. You can change it later.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
              placeholder="Untitled Document"
              className="mt-2"
              autoFocus
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateDocument} disabled={!newDocTitle.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface DocumentCardProps {
  document: Document;
  onToggleStar: (id: string) => void;
  onOpen: () => void;
}

const DocumentCard = ({ document, onToggleStar, onOpen }: DocumentCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-medium truncate cursor-pointer hover:text-primary transition-colors" onClick={onOpen}>
          {document.title}
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>Owned by {document.owner}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(document.id);
            }}
          >
            <Star className={`h-4 w-4 ${document.starred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
          </Button>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div 
          className="h-32 border rounded-md bg-muted/30 flex items-center justify-center cursor-pointer"
          onClick={onOpen}
        >
          <FileText className="h-12 w-12 text-muted-foreground" />
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between text-sm text-muted-foreground">
        <span>Edited {document.lastEdited}</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Users className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Dashboard;