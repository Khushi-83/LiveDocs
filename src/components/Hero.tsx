import { Button } from "@/components/ui/button";
import { Play, FileText, Video, Users, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  Real-time collaboration platform
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Where documents and 
                  <span className="bg-gradient-hero bg-clip-text text-transparent"> meetings</span> come to life
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  StreamLine collaboration with real-time document editing and integrated video conferencing. 
                  Work together seamlessly, no matter where your team is located.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" className="group">
                  Start collaborating
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="xl" className="group">
                  <Play className="w-5 h-5" />
                  Watch demo
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Real-time editing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">HD video calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Team collaboration</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-strong">
                <img 
                  src={heroImage} 
                  alt="LiveDocs collaborative workspace" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-background border border-border rounded-lg p-3 shadow-medium animate-bounce" style={{ animationDelay: '1s' }}>
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-lg p-3 shadow-medium animate-bounce" style={{ animationDelay: '1.5s' }}>
                <Video className="w-6 h-6 text-success" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;