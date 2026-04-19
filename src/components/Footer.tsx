import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground mt-auto">
    <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-primary" />
          <span className="font-sans font-bold text-lg">MediCare+</span>
        </div>
        <p className="text-sm opacity-70 font-body leading-relaxed">
          Comprehensive hospital management providing world-class healthcare services and personalized guidance.
        </p>
      </div>
      <div>
        <h4 className="font-sans font-semibold mb-3">Quick Links</h4>
        <ul className="space-y-2 text-sm opacity-70 font-body">
          <li><Link to="/services" className="hover:opacity-100 transition">Services</Link></li>
          <li><Link to="/diet-guidance" className="hover:opacity-100 transition">Diet Guidance</Link></li>
          <li><Link to="/appointments" className="hover:opacity-100 transition">Appointments</Link></li>
          <li><Link to="/chatbot" className="hover:opacity-100 transition">AI Chatbot</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-sans font-semibold mb-3">Departments</h4>
        <ul className="space-y-2 text-sm opacity-70 font-body">
          <li>Cardiology</li>
          <li>Neurology</li>
          <li>Orthopedics</li>
          <li>Pediatrics</li>
        </ul>
      </div>
      <div>
        <h4 className="font-sans font-semibold mb-3">Contact</h4>
        <ul className="space-y-2 text-sm opacity-70 font-body">
          <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (234) 567-890</li>
          <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@medicare.com</li>
          <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Health St, Medical City</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10 py-4 text-center text-xs opacity-50 font-body">
      © 2026 MediCare+. All rights reserved.
    </div>
  </footer>
);

export default Footer;
