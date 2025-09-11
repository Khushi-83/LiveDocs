import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image,
  Link,
  Save,
  Share,
  Users,
  MessageCircle,
  MoreHorizontal,
  Undo,
  Redo,
  FileText
} from "lucide-react";

const DocumentEditor = () => {
  const [documentContent, setDocumentContent] = useState(`# Project Proposal: AI-Powered Content Management System

## Executive Summary
This document outlines our proposal for developing an AI-powered content management system that will revolutionize how teams collaborate on content creation and editing.

## Key Features
- Real-time collaborative editing
- AI-powered content suggestions
- Advanced formatting options
- Version control and history
- Seamless integrations

## Timeline
The project is expected to take 12-16 weeks from initiation to deployment.

## Team Collaboration
Multiple team members can edit this document simultaneously, with changes reflected in real-time.`);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const formatText = (command: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = documentContent.substring(start, end);
    
    let formattedText = selectedText;
    
    switch (command) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
    }
    
    const newContent = 
      documentContent.substring(0, start) + 
      formattedText + 
      documentContent.substring(end);
    
    setDocumentContent(newContent);
  };

  const collaborators = [
    { id: 1, name: "Alex Johnson", avatar: "", initials: "AJ", status: "editing" },
    { id: 2, name: "Sarah Chen", avatar: "", initials: "SC", status: "viewing" },
    { id: 3, name: "Mike Wilson", avatar: "", initials: "MW", status: "commenting" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">Project Proposal Document</h1>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Users className="h-3 w-3" />
                {collaborators.length} collaborators
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share className="h-4 w-4" />
                Share
              </Button>
              <Button size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Card className="p-0 overflow-hidden">
              {/* Toolbar */}
              <div className="border-b p-4 bg-muted/30">
                <div className="flex items-center gap-1 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('bold')}
                      className="h-8 w-8 p-0"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('italic')}
                      className="h-8 w-8 p-0"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => formatText('underline')}
                      className="h-8 w-8 p-0"
                    >
                      <Underline className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Separator orientation="vertical" className="h-6 mx-2" />
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Separator orientation="vertical" className="h-6 mx-2" />
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Separator orientation="vertical" className="h-6 mx-2" />
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Separator orientation="vertical" className="h-6 mx-2" />
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Undo className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Redo className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Editor Content */}
              <div className="p-6">
                <Textarea
                  ref={textareaRef}
                  value={documentContent}
                  onChange={(e) => setDocumentContent(e.target.value)}
                  className="min-h-[600px] border-0 p-0 resize-none text-base leading-relaxed focus-visible:ring-0"
                  placeholder="Start typing your document..."
                />
                
                {/* Collaboration Indicators */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    {collaborators.filter(c => c.status === 'editing').map((collaborator) => (
                      <div key={collaborator.id} className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 ring-2 ring-primary">
                          <AvatarImage src={collaborator.avatar} />
                          <AvatarFallback className="text-xs">{collaborator.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {collaborator.name} is editing...
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Collaborators */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Collaborators ({collaborators.length})
              </h3>
              <div className="space-y-3">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={collaborator.avatar} />
                      <AvatarFallback className="text-xs">{collaborator.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{collaborator.name}</p>
                      <p className="text-xs text-muted-foreground">{collaborator.status}</p>
                    </div>
                    <Badge 
                      variant={collaborator.status === 'editing' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {collaborator.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Comments */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Comments (3)
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">SC</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Sarah Chen</span>
                    <span className="text-xs text-muted-foreground">2m ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8">
                    Great start on the executive summary! Should we add more details about the target market?
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">MW</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Mike Wilson</span>
                    <span className="text-xs text-muted-foreground">5m ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8">
                    The timeline looks reasonable. Let's discuss the resource allocation in our next meeting.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">AJ</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Alex Johnson</span>
                    <span className="text-xs text-muted-foreground">10m ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8">
                    I've updated the key features section. Please review when you have a moment.
                  </p>
                </div>
              </div>
            </Card>

            {/* Document Info */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Document Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>2 days ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last modified</span>
                  <span>5 minutes ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Words</span>
                  <span>247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Characters</span>
                  <span>1,523</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;