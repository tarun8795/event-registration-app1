
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Menu, 
  User, 
  LogOut, 
  PlusCircle, 
  Home,
  Search,
  X
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LoginModal from "../modals/LoginModal";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, logout } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 mb-4 border-b">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                      <Calendar className="h-5 w-5 text-eventBrand-600" />
                      <span>Event Registration App</span>
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <nav className="space-y-2 flex-1 overflow-y-auto">
                    <Link to="/" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Link>
                    <Link to="/events" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md">
                      <Calendar className="h-4 w-4" />
                      <span>Events</span>
                    </Link>
                    <Link to="/search" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md">
                      <Search className="h-4 w-4" />
                      <span>Search</span>
                    </Link>
                    {user?.isAdmin && (
                      <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md">
                        <PlusCircle className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Calendar className="h-5 w-5 text-eventBrand-600" />
              <span>Event Registration App</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-5 mx-6">
            <Link to="/" className="text-sm font-medium hover:text-eventBrand-600 transition-colors">
              Home
            </Link>
            <Link to="/events" className="text-sm font-medium hover:text-eventBrand-600 transition-colors">
              Events
            </Link>
            <Link to="/search" className="text-sm font-medium hover:text-eventBrand-600 transition-colors">
              Search
            </Link>
            {user?.isAdmin && (
              <Link to="/admin" className="text-sm font-medium hover:text-eventBrand-600 transition-colors">
                Admin Panel
              </Link>
            )}
          </nav>

          <div className="flex-1" />
          
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden md:flex items-center gap-2"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={logout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:h-16 md:flex-row md:items-center">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Event Registration App. All rights reserved.
          </p>
          <div className="flex-1" />
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-4 md:gap-2">
            <Link to="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <Link to="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
    </div>
  );
};

export default MainLayout;
