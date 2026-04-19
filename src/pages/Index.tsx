import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Stethoscope, Brain, Bone, Baby, Eye, Heart,
  Utensils, MessageCircle, CalendarCheck, ArrowRight, Shield, Clock, Users
} from "lucide-react";

const services = [
  { icon: Stethoscope, title: "General Medicine", desc: "Comprehensive primary healthcare" },
  { icon: Heart, title: "Cardiology", desc: "Heart and cardiovascular care" },
  { icon: Brain, title: "Neurology", desc: "Brain and nervous system" },
  { icon: Bone, title: "Orthopedics", desc: "Bone and joint treatment" },
  { icon: Baby, title: "Pediatrics", desc: "Children's healthcare" },
  { icon: Eye, title: "Ophthalmology", desc: "Eye care and surgery" },
];

const stats = [
  { icon: Users, value: "50K+", label: "Patients Treated" },
  { icon: Shield, value: "200+", label: "Expert Doctors" },
  { icon: Clock, value: "24/7", label: "Emergency Care" },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--hero-gradient)" }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6">
            Your Health,<br />Our Priority
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Complete hospital management with disease-specific diet guidance, AI-powered health assistant, and seamless appointment booking.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="secondary" className="font-sans font-semibold" asChild>
              <Link to="/appointments">Book Appointment</Link>
            </Button>
            <Button size="lg" variant="outline" className="font-sans font-semibold bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20" asChild>
              <Link to="/chatbot">Talk to AI Doctor</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="container mx-auto px-4 -mt-10 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-lg border-0" style={{ boxShadow: "var(--card-shadow)" }}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-sans font-extrabold text-2xl text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    {/* Services */}
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="font-sans font-bold text-3xl text-foreground mb-3">Our Services</h2>
        <p className="text-muted-foreground max-w-md mx-auto">Expert medical care across multiple specializations</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => (
          <Card key={s.title} className="group hover:shadow-lg transition-shadow border border-border cursor-pointer">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-accent shrink-0 group-hover:bg-primary transition-colors">
                <s.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button variant="outline" className="gap-2" asChild>
          <Link to="/services">View All Services <ArrowRight className="w-4 h-4" /></Link>
        </Button>
      </div>
    </section>

    {/* Features */}
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-sans font-bold text-3xl text-foreground mb-3">Key Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "var(--hero-gradient)" }}>
                <Utensils className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-sans font-bold text-lg text-foreground mb-2">Diet Guidance</h3>
              <p className="text-sm text-muted-foreground mb-4">Personalized eating plans for diabetes, heart disease, kidney issues, and more — each disease gets specific guidance.</p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/diet-guidance">Explore Diets</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "var(--hero-gradient)" }}>
                <MessageCircle className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-sans font-bold text-lg text-foreground mb-2">AI Health Chatbot</h3>
              <p className="text-sm text-muted-foreground mb-4">Get instant medical advice, symptom checking, and health tips from our intelligent medical assistant.</p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/chatbot">Start Chat</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "var(--hero-gradient)" }}>
                <CalendarCheck className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-sans font-bold text-lg text-foreground mb-2">Easy Appointments</h3>
              <p className="text-sm text-muted-foreground mb-4">Book appointments online with your preferred doctor and department. Quick and hassle-free scheduling.</p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/appointments">Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
