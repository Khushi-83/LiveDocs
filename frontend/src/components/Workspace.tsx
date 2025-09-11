import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  MoreHorizontal, 
  Users, 
  Share2,
  Phone,
  MessageCircle,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Image as ImageIcon,
  Link
} from "lucide-react";

const Workspace = () => {
  return (
    <section className="py-20 bg-gradient-subtle relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              The ultimate 
              <span className="bg-gradient-hero bg-clip-text text-transparent"> workspace</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Edit documents while staying connected with your team through integrated video calls
            </p>
          </div>

          <Card className="p-1 shadow-elevation bg-gradient-card border border-white/20 backdrop-blur-lg">
            <div className="grid lg:grid-cols-3 gap-1 h-[600px]">
              {/* Document Editor */}
              <div className="lg:col-span-2 bg-background rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">D</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Project Proposal</h3>
                      <p className="text-sm text-muted-foreground">Last edited 2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                        <span className="text-white text-xs">JD</span>
                      </div>
                      <div className="w-8 h-8 bg-success rounded-full border-2 border-background flex items-center justify-center">
                        <span className="text-white text-xs">SM</span>
                      </div>
                      <div className="w-8 h-8 bg-warning rounded-full border-2 border-background flex items-center justify-center">
                        <span className="text-white text-xs">AL</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                  <Button variant="ghost" size="sm">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Underline className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-2"></div>
                  <Button variant="ghost" size="sm">
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <AlignRight className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-border mx-2"></div>
                  <Button variant="ghost" size="sm">
                    <List className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Link className="w-4 h-4" />
                  </Button>
                </div>

                {/* Document Content */}
                <div className="flex-1 bg-card rounded-lg p-6 min-h-[400px] space-y-4">
                  <h1 className="text-2xl font-bold text-foreground">Q4 Marketing Strategy</h1>
                  
                  <div className="space-y-3 text-muted-foreground leading-relaxed">
                    <p>
                      This document outlines our comprehensive marketing strategy for the fourth quarter, 
                      focusing on digital transformation and customer engagement initiatives.
                    </p>
                    
                    <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                      <p className="text-sm text-primary font-medium">John is typing...</p>
                    </div>
                    
                    <p>
                      <strong>Key Objectives:</strong>
                    </p>
                    
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Increase brand awareness by 25%</li>
                      <li>Improve customer retention rates</li>
                      <li>Launch new product line</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Video Call Panel */}
              <div className="bg-card rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Team Meeting</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Live</span>
                  </div>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-video bg-gradient-primary rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <span className="text-white text-xs font-medium relative z-10">John D.</span>
                    <div className="absolute bottom-2 left-2 bg-black/50 rounded px-1 py-0.5">
                      <Mic className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="aspect-video bg-success rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <span className="text-white text-xs font-medium relative z-10">Sarah M.</span>
                    <div className="absolute bottom-2 left-2 bg-black/50 rounded px-1 py-0.5">
                      <MicOff className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="aspect-video bg-warning rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <span className="text-white text-xs font-medium relative z-10">Alex L.</span>
                    <div className="absolute bottom-2 left-2 bg-black/50 rounded px-1 py-0.5">
                      <Mic className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <Users className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>

                {/* Call Controls */}
                <div className="flex items-center justify-center gap-3 pt-4">
                  <Button variant="outline" size="sm">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>

                {/* Chat */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Chat</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">J</span>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Great progress on the doc!</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">S</span>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Love the new section 👍</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Workspace;