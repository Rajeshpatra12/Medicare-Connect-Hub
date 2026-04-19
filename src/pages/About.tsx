import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Users, Clock, ShieldCheck } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", desc: "World-class medical care with the latest technology and techniques." },
  { icon: Users, title: "Patient-Centered", desc: "Every treatment plan is personalized to individual patient needs." },
  { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock emergency services and patient support." },
  { icon: ShieldCheck, title: "Trust & Safety", desc: "Strict protocols ensuring patient privacy and safety." },
];

const About = () => (
  <Layout>
    <section className="py-16" style={{ background: "var(--hero-gradient)" }}>
      <div className="container mx-auto px-4">
        <h1 className="font-sans font-extrabold text-4xl text-primary-foreground mb-3">About MediCare+</h1>
        <p className="text-primary-foreground/70 text-lg max-w-lg">
          Trusted healthcare partner serving the community with dedication since 2005.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-muted-foreground leading-relaxed">
          MediCare+ is a comprehensive hospital management system designed to bring all healthcare services under one roof.
          From booking appointments with specialists to getting disease-specific dietary guidance, our platform empowers
          patients with the tools they need for better health outcomes.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Our AI-powered health assistant provides instant medical guidance, while our team of 200+ specialist doctors
          ensures you receive the best possible care across all departments.
        </p>
      </div>

      <h2 className="font-sans font-bold text-2xl text-foreground mb-6 text-center">Our Core Values</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {values.map((v) => (
          <Card key={v.title}>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-accent shrink-0">
                <v.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-foreground mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" asChild>
          <Link to="/appointments">Get Started — Book an Appointment</Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default About;
