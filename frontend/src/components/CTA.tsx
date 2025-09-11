import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Users, FileText } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-background relative">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden p-12 bg-gradient-hero text-white border-0 shadow-elevation">
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-white/5"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative z-10 text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  Ready to transform your workflow?
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Start collaborating like never before
                </h2>
                
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Join thousands of teams who've revolutionized their collaboration with LiveDocs. 
                  Real-time editing meets seamless video conferencing.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="premium" size="xl" className="group">
                  Start your free trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="glass" size="xl" className="group">
                  Schedule a demo
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-8 pt-8 text-white/80">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">10,000+ teams</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-sm">1M+ documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm">99.9% uptime</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-accent/30 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTA;