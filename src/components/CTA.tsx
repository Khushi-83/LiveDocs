import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Users, FileText } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden p-12 bg-gradient-hero text-white">
            <div className="absolute inset-0 bg-black/10"></div>
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
                <Button variant="secondary" size="xl" className="group">
                  Start your free trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
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
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTA;