import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Left side - Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} AzraRecipes. All rights reserved.
            </p>
          </div>

          {/* Center - Built by */}
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by</span>
            <Link
              to="#"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Azra
            </Link>
          </div>

          {/* Right side - Tech stack */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground md:justify-end">
            <span>Built with</span>
            <div className="flex items-center space-x-2">
              <Link
                to="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                React
              </Link>
              <span>•</span>
              <Link
                to="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                Tailwind
              </Link>
              <span>•</span>
              <Link
                to="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                shadcn/ui
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile-optimized version */}
        <div className="mt-6 pt-6 border-t md:hidden">
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Made with React, Tailwind CSS & shadcn/ui
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
