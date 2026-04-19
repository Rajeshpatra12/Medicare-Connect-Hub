import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Heart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Diet Guidance", path: "/diet-guidance" },
  { label: "Appointments", path: "/appointments" },
  { label: "AI Chatbot", path: "/chatbot" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--hero-gradient)" }}>
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-sans font-extrabold text-xl text-foreground tracking-tight">MediCare<span className="text-primary">+</span></span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === l.path
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button size="sm" variant="outline" className="gap-1.5" asChild>
            <a href="tel:+1234567890"><Phone className="w-4 h-4" /> Emergency</a>
          </Button>
          <Button size="sm" asChild>
            <Link to="/appointments">Book Now</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                location.pathname === l.path
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button className="w-full mt-2" asChild>
            <Link to="/appointments" onClick={() => setOpen(false)}>Book Appointment</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
