import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { Button } from './ui/button';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link,
  Heading1,
  Heading2,
  Undo,
  Redo,
  Save
} from 'lucide-react';

interface DocumentEditorProps {
  documentId: string;
  username: string;
  userColor?: string;
}

const DocumentEditor = ({ documentId, username, userColor = '#1e88e5' }: DocumentEditorProps) => {
  const [status, setStatus] = useState('connecting');
  const [isSaving, setIsSaving] = useState(false);
  
  // Generate a random color if not provided
  const getRandomColor = () => {
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
      '#8bc34a', '#cddc39', '#ffc107', '#ff9800', '#ff5722'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Initialize Yjs document and provider
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider(
    `ws://${window.location.hostname}:3000`, // Connect to our local WebSocket server
    `livedocs-document-${documentId}`,
    ydoc
  );
  
  // Send join message to the server
  useEffect(() => {
    if (provider.wsconnected) {
      provider.ws.send(JSON.stringify({
        type: 'join',
        documentId,
        username
      }));
    } else {
      const handleConnect = () => {
        provider.ws.send(JSON.stringify({
          type: 'join',
          documentId,
          username
        }));
      };
      
      const handleStatus = (event: any) => {
        if (event.status === 'connected') handleConnect();
      };
      
      provider.on('status', handleStatus);
      
      return () => {
        provider.off('status', handleStatus);
      };
    }
  }, [provider, documentId, username]);

  // Set up awareness (user presence)
  const awareness = provider.awareness;
  awareness.setLocalStateField('user', {
    name: username,
    color: userColor || getRandomColor(),
  });

  // Set up Tiptap editor with collaboration extensions
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // Disable built-in history as we're using Yjs
      }),
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: username,
          color: userColor || getRandomColor(),
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] max-w-none',
      },
    },
  });

  // Update connection status
  useEffect(() => {
    const handleStatusChange = (event: any) => {
      if (event.status === 'connected') {
        setStatus('connected');
      } else {
        setStatus('disconnected');
      }
    };

    provider.on('status', handleStatusChange);

    return () => {
      provider.off('status', handleStatusChange);
      provider.disconnect();
      ydoc.destroy();
    };
  }, [provider, ydoc]);

  // Simulate saving document
  const saveDocument = () => {
    setIsSaving(true);
    // In a real app, you would save the document content to your backend here
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Connection status indicator */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}
        />
        <span className="text-xs text-muted-foreground">
          {status === 'connected' ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 mb-2 border rounded-md bg-muted/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-muted' : ''}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-muted' : ''}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-muted' : ''}
        >
          <Underline className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"

          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-muted' : ''}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-muted' : ''}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="w-4 h-4" />
        </Button>
        <div className="flex-grow"></div>
        <Button
          variant="outline"
          size="sm"
          onClick={saveDocument}
          disabled={isSaving}
          className="ml-auto"
        >
          {isSaving ? 'Saving...' : 'Save'}
          <Save className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Editor content */}
      <div className="flex-grow border rounded-md p-4 overflow-auto">
        <EditorContent editor={editor} />
      </div>

      {/* Active users */}
      <div className="mt-2 text-xs text-muted-foreground">
        <span>Active users: </span>
        <span className="font-medium">{username}</span>
      </div>
    </div>
  );
};

export default DocumentEditor;