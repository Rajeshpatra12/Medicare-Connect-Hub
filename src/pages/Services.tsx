import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Stethoscope, Heart, Brain, Bone, Baby, Eye,
  Syringe, Pill, Microscope, Ambulance, Scissors, Shield
} from "lucide-react";

const departments = [
  { icon: Stethoscope, title: "General Medicine", desc: "Primary care, routine checkups, preventive health screenings, and treatment for common illnesses.", color: "bg-blue-50 text-blue-600" },
  { icon: Heart, title: "Cardiology", desc: "Diagnosis and treatment of heart conditions including ECG, echocardiography, and cardiac rehabilitation.", color: "bg-red-50 text-red-500" },
  { icon: Brain, title: "Neurology", desc: "Treatment for neurological disorders including stroke, epilepsy, migraines, and Parkinson's disease.", color: "bg-purple-50 text-purple-600" },
  { icon: Bone, title: "Orthopedics", desc: "Joint replacement, fracture treatment, sports injuries, and spine surgery by expert surgeons.", color: "bg-amber-50 text-amber-600" },
  { icon: Baby, title: "Pediatrics", desc: "Complete children's healthcare including vaccinations, growth monitoring, and pediatric emergency care.", color: "bg-pink-50 text-pink-500" },
  { icon: Eye, title: "Ophthalmology", desc: "Comprehensive eye care, cataract surgery, LASIK, glaucoma treatment, and retina services.", color: "bg-cyan-50 text-cyan-600" },
  { icon: Syringe, title: "Vaccination Center", desc: "All essential vaccinations for children and adults, including COVID-19, flu, and travel vaccines.", color: "bg-green-50 text-green-600" },
  { icon: Pill, title: "Pharmacy", desc: "24/7 in-house pharmacy with prescription fulfillment, medication counseling, and home delivery.", color: "bg-orange-50 text-orange-500" },
  { icon: Microscope, title: "Laboratory", desc: "State-of-the-art diagnostic lab with blood tests, imaging, pathology, and rapid result delivery.", color: "bg-indigo-50 text-indigo-600" },
  { icon: Ambulance, title: "Emergency Care", desc: "Round-the-clock emergency services with trauma care, critical stabilization, and ambulance dispatch.", color: "bg-red-50 text-red-600" },
  { icon: Scissors, title: "Surgery", desc: "Advanced surgical procedures including minimally invasive, laparoscopic, and robotic-assisted surgery.", color: "bg-teal-50 text-teal-600" },
  { icon: Shield, title: "Health Checkup", desc: "Comprehensive health packages for individuals and corporates with personalized health reports.", color: "bg-emerald-50 text-emerald-600" },
];

const Services = () => (
  <Layout>
    <section className="py-16" style={{ background: "var(--hero-gradient)" }}>
      <div className="container mx-auto px-4">
        <h1 className="font-sans font-extrabold text-4xl text-primary-foreground mb-3">Our Services</h1>
        <p className="text-primary-foreground/70 text-lg max-w-lg">World-class medical facilities and expert care across 12+ departments.</p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((d) => (
          <Card key={d.title} className="group hover:shadow-lg transition-all border border-border">
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${d.color}`}>
                <d.icon className="w-6 h-6" />
              </div>
              <h3 className="font-sans font-bold text-lg text-foreground mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{d.desc}</p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/appointments">Book Appointment</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  </Layout>
);

export default Services;
