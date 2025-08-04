import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Video, Users, LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">LiveDocs</span>
          <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">v1.1.1</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;