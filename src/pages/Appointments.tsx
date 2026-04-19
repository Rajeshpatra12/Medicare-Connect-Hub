import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarCheck, CheckCircle2, Users, FileText, Printer } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const departments = ["General Medicine", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Ophthalmology", "Dermatology", "ENT"];
const doctors: Record<string, string[]> = {
  "General Medicine": ["Dr. Sharma", "Dr. Patel"],
  "Cardiology": ["Dr. Mehta", "Dr. Kapoor"],
  "Neurology": ["Dr. Reddy", "Dr. Singh"],
  "Orthopedics": ["Dr. Kumar", "Dr. Gupta"],
  "Pediatrics": ["Dr. Jain", "Dr. Verma"],
  "Ophthalmology": ["Dr. Das", "Dr. Nair"],
  "Dermatology": ["Dr. Rao", "Dr. Bose"],
  "ENT": ["Dr. Iyer", "Dr. Pillai"],
};
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

interface Appointment {
  id: string;
  full_name: string;
  father_name: string | null;
  aadhaar: string | null;
  blood_group: string | null;
  phone: string;
  email: string;
  age: number;
  department: string;
  doctor: string;
  appointment_date: string;
  appointment_time: string;
  notes: string | null;
  created_at: string;
}

// Convert "9:00 AM" / "2:00 PM" -> 24h "HH:MM"
const to24h = (t: string) => {
  const m = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return "00:00";
  let h = parseInt(m[1]);
  const min = m[2];
  const p = m[3].toUpperCase();
  if (p === "PM" && h !== 12) h += 12;
  if (p === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${min}`;
};

const isExpired = (a: Appointment) => {
  const dt = new Date(`${a.appointment_date}T${to24h(a.appointment_time)}:00`);
  return dt.getTime() < Date.now();
};

const Appointments = () => {
  const [dept, setDept] = useState("");
  const [doctor, setDoctor] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [receipt, setReceipt] = useState<Appointment | null>(null);

  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const cancelExpired = async (list: Appointment[]) => {
    const expiredIds = list.filter(isExpired).map((a) => a.id);
    if (expiredIds.length === 0) return list;
    const { error } = await supabase.from("appointments").delete().in("id", expiredIds);
    if (error) {
      console.error("Failed to auto-cancel expired appointments", error);
      return list;
    }
    return list.filter((a) => !expiredIds.includes(a.id));
  };

  const fetchAppointments = async () => {
    setListLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load appointments");
    } else {
      const cleaned = await cancelExpired((data || []) as Appointment[]);
      setAppointments(cleaned);
    }
    setListLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(fetchAppointments, 60000); // re-check every minute
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dept || !doctor || !time || !bloodGroup) {
      toast.error("Please fill all required fields");
      return;
    }
    if (aadhaar && !/^\d{12}$/.test(aadhaar)) {
      toast.error("Aadhaar must be 12 digits");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        full_name: fullName,
        father_name: fatherName,
        aadhaar,
        blood_group: bloodGroup,
        phone,
        email,
        age: parseInt(age),
        department: dept,
        doctor,
        appointment_date: date,
        appointment_time: time,
        notes: notes || null,
      })
      .select("*")
      .single();
    setLoading(false);
    if (error || !data) {
      toast.error("Failed to book appointment");
      return;
    }
    toast.success("Appointment booked successfully!");
    setReceipt(data as Appointment);
    fetchAppointments();
  };

  const resetForm = () => {
    setFullName(""); setFatherName(""); setAadhaar(""); setBloodGroup("");
    setPhone(""); setEmail(""); setAge("");
    setDept(""); setDoctor(""); setDate(""); setTime(""); setNotes("");
    setReceipt(null);
  };

  const totalCount = useMemo(() => appointments.length, [appointments]);

  if (receipt) {
    const r = receipt;
    return (
      <Layout>
        <section className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="text-center mb-8 print:hidden">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h1 className="font-sans font-extrabold text-3xl text-foreground mb-3">Appointment Confirmed!</h1>
            <p className="text-muted-foreground">Here is your appointment receipt. Please keep it for your records.</p>
          </div>

          <Card style={{ boxShadow: "var(--card-shadow)" }} id="receipt">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6 pb-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-sans font-bold text-2xl text-foreground">Appointment Receipt</h2>
                    <p className="text-sm text-muted-foreground">Booking ID: {r.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Issued</p>
                  <p className="font-medium text-foreground">{new Date(r.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                {[
                  ["Patient Name", r.full_name],
                  ["Father's Name", r.father_name || "-"],
                  ["Aadhaar No.", r.aadhaar || "-"],
                  ["Age", String(r.age)],
                  ["Blood Group", r.blood_group || "-"],
                  ["Phone", r.phone],
                  ["Email", r.email],
                  ["Department", r.department],
                  ["Doctor", r.doctor],
                  ["Preferred Date", r.appointment_date],
                  ["Preferred Time", r.appointment_time],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">{k}</span>
                    <span className="font-medium text-foreground">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Symptoms / Notes</p>
                <p className="text-foreground">{r.notes || "—"}</p>
              </div>

              <div className="mt-6 pt-6 border-t text-xs text-muted-foreground text-center">
                Note: This appointment will be auto-cancelled if not attended by the scheduled time.
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
            <Button onClick={() => window.print()} variant="outline">
              <Printer className="w-4 h-4" /> Print Receipt
            </Button>
            <Button onClick={resetForm}>Book Another</Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16" style={{ background: "var(--hero-gradient)" }}>
        <div className="container mx-auto px-4">
          <h1 className="font-sans font-extrabold text-4xl text-primary-foreground mb-3">Book an Appointment</h1>
          <p className="text-primary-foreground/70 text-lg">Schedule a visit with our expert doctors.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-2xl">
        <Card style={{ boxShadow: "var(--card-shadow)" }}>
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent">
                <CalendarCheck className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-sans font-bold text-xl text-foreground">Appointment Details</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input required placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Father's Name</Label>
                  <Input required placeholder="Father's full name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Aadhaar Number</Label>
                  <Input required inputMode="numeric" maxLength={12} placeholder="12-digit Aadhaar" value={aadhaar} onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))} />
                </div>
                <div className="space-y-2">
                  <Label>Blood Group</Label>
                  <Select value={bloodGroup} onValueChange={setBloodGroup}>
                    <SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input required type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input required type="number" min={1} max={120} placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input required type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={dept} onValueChange={(v) => { setDept(v); setDoctor(""); }}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Doctor</Label>
                  <Select value={doctor} onValueChange={setDoctor} disabled={!dept}>
                    <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
                    <SelectContent>
                      {(doctors[dept] || []).map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Input required type="date" min={new Date().toISOString().split("T")[0]} value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Symptoms / Notes</Label>
                <Textarea placeholder="Briefly describe your symptoms or reason for visit..." rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Booking..." : "Confirm Appointment"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-5xl">
        <Card style={{ boxShadow: "var(--card-shadow)" }}>
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-sans font-bold text-xl text-foreground">Active Appointments</h2>
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Total people booked: <span className="text-primary font-bold text-base">{totalCount}</span>
              </div>
            </div>

            {listLoading ? (
              <p className="text-center text-muted-foreground py-8">Loading...</p>
            ) : appointments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No active appointments. Be the first to book!</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((a, i) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell>{a.full_name}</TableCell>
                      <TableCell>{a.department}</TableCell>
                      <TableCell>{a.doctor}</TableCell>
                      <TableCell>{a.appointment_date}</TableCell>
                      <TableCell>{a.appointment_time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <p className="text-xs text-muted-foreground text-center mt-4">
              Appointments are auto-cancelled after their scheduled time.
            </p>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
};

export default Appointments;
