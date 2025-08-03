import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Video, 
  Users, 
  Shield, 
  Zap, 
  Clock, 
  Share2, 
  Smartphone,
  Edit3,
  History,
  Search,
  Cloud
} from "lucide-react";

const Features = () => {
  const documentFeatures = [
    {
      icon: Edit3,
      title: "Real-Time Collaboration",
      description: "Work together on documents simultaneously with instant updates visible to everyone."
    },
    {
      icon: History,
      title: "Auto-Save & Version History",
      description: "Never lose your work with automatic saving and the ability to revert to previous versions."
    },
    {
      icon: FileText,
      title: "Rich Text Formatting",
      description: "Format text, add images, tables, and media with our powerful editor."
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share documents and control permissions with granular access settings."
    },
    {
      icon: Smartphone,
      title: "Cross-Device Access",
      description: "Work seamlessly across computers, tablets, and smartphones."
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find documents and content quickly with powerful search capabilities."
    }
  ];

  const videoFeatures = [
    {
      icon: Video,
      title: "HD Video & Audio",
      description: "Crystal clear video and audio quality for professional meetings."
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Host meetings with multiple participants without performance issues."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "End-to-end encryption keeps your conversations and data safe."
    },
    {
      icon: Share2,
      title: "Screen Sharing",
      description: "Share your screen with participants for better collaboration."
    },
    {
      icon: Zap,
      title: "Real-Time Chat",
      description: "Send messages and share files during meetings instantly."
    },
    {
      icon: Cloud,
      title: "Cloud Recording",
      description: "Record meetings and access them from anywhere, anytime."
    }
  ];

  const FeatureCard = ({ icon: Icon, title, description }: { 
    icon: any, 
    title: string, 
    description: string 
  }) => (
    <Card className="p-6 hover:shadow-medium transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Everything you need to 
              <span className="bg-gradient-hero bg-clip-text text-transparent"> collaborate</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combine the power of real-time document editing with seamless video conferencing
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Document Features */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Document Collaboration</h3>
              </div>
              
              <div className="space-y-6">
                {documentFeatures.map((feature, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <FeatureCard {...feature} />
                  </div>
                ))}
              </div>
            </div>

            {/* Video Features */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Video Conferencing</h3>
              </div>
              
              <div className="space-y-6">
                {videoFeatures.map((feature, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${(index + 6) * 0.1}s` }}>
                    <FeatureCard {...feature} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;