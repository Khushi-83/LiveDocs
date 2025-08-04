import { FileText, Twitter, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">LiveDocs</span>
              </div>
              <p className="text-muted-foreground">
                The future of collaborative work. Real-time document editing meets seamless video conferencing.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Product</h3>
              <div className="space-y-2 text-muted-foreground">
                <a href="#" className="block hover:text-primary transition-colors">Features</a>
                <a href="#" className="block hover:text-primary transition-colors">Pricing</a>
                <a href="#" className="block hover:text-primary transition-colors">API</a>
                <a href="#" className="block hover:text-primary transition-colors">Integrations</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Company</h3>
              <div className="space-y-2 text-muted-foreground">
                <a href="#" className="block hover:text-primary transition-colors">About</a>
                <a href="#" className="block hover:text-primary transition-colors">Blog</a>
                <a href="#" className="block hover:text-primary transition-colors">Careers</a>
                <a href="#" className="block hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Support</h3>
              <div className="space-y-2 text-muted-foreground">
                <a href="#" className="block hover:text-primary transition-colors">Help Center</a>
                <a href="#" className="block hover:text-primary transition-colors">Documentation</a>
                <a href="#" className="block hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 LiveDocs. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Built with ❤️ for modern teams
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;