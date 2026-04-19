import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";

type Message = { role: "user" | "bot"; text: string };

const quickQuestions = [
  "What are symptoms of diabetes?",
  "How to reduce high blood pressure?",
  "Best diet for heart patients?",
  "When should I see a doctor for headaches?",
  "How to boost immunity naturally?",
];

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("diabetes") || lower.includes("sugar")) {
    return "**Diabetes** is a condition where blood sugar levels are too high. Common symptoms include frequent urination, excessive thirst, fatigue, and blurred vision.\n\n**Diet tips:** Eat whole grains, leafy greens, lean proteins. Avoid sugary drinks and white bread.\n\nWould you like to see our detailed diabetes diet guide? Visit the **Diet Guidance** section.";
  }
  if (lower.includes("blood pressure") || lower.includes("bp") || lower.includes("hypertension")) {
    return "**High Blood Pressure** can be managed through lifestyle changes:\n\n• Reduce sodium intake (under 1500mg/day)\n• Eat potassium-rich foods (bananas, spinach)\n• Exercise 30 min daily\n• Manage stress\n• Limit alcohol & caffeine\n\nCheck our **Diet Guidance** for a complete hypertension meal plan.";
  }
  if (lower.includes("heart") || lower.includes("cardiac")) {
    return "For **heart health**, follow these guidelines:\n\n• Eat omega-3 rich fish like salmon\n• Use olive oil instead of butter\n• Include plenty of fruits & vegetables\n• Avoid processed meats & trans fats\n• Exercise regularly\n\nVisit our **Cardiology** department for checkups.";
  }
  if (lower.includes("headache") || lower.includes("migraine")) {
    return "**Headaches** can have many causes. See a doctor if you experience:\n\n• Severe sudden headache\n• Headache after injury\n• Fever with stiff neck\n• Vision changes\n• Headache lasting more than 72 hours\n\nFor mild headaches: stay hydrated, rest, and avoid screen glare. You can book a **Neurology** appointment from our Appointments page.";
  }
  if (lower.includes("immunity") || lower.includes("immune")) {
    return "**Boost your immunity** naturally:\n\n• Eat vitamin C rich foods (citrus, bell peppers)\n• Get enough sleep (7-8 hours)\n• Exercise moderately\n• Include probiotics (yogurt, fermented foods)\n• Stay hydrated\n• Manage stress levels\n• Include zinc-rich foods (nuts, seeds)";
  }
  if (lower.includes("fever") || lower.includes("temperature")) {
    return "For **fever management**:\n\n• Rest and stay hydrated\n• Take prescribed antipyretics\n• Use lukewarm compress\n• See a doctor if fever exceeds 103°F (39.4°C) or lasts more than 3 days\n\nYou can book an appointment with **General Medicine**.";
  }
  if (lower.includes("covid") || lower.includes("corona")) {
    return "**COVID-19 precautions**:\n\n• Wear masks in crowded places\n• Wash hands frequently\n• Get vaccinated and boosted\n• If symptomatic: isolate, rest, hydrate\n• Seek medical help if breathing difficulty occurs\n\nVisit our **Vaccination Center** for COVID boosters.";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! 👋 I'm your **MediCare+ Health Assistant**. I can help you with:\n\n• Disease symptoms & information\n• Diet recommendations\n• When to see a doctor\n• General health tips\n\nWhat would you like to know?";
  }
  return "Thank you for your question! While I can provide general health information, I recommend:\n\n1. Visit our **Diet Guidance** section for disease-specific eating plans\n2. **Book an Appointment** with our specialist doctors\n3. For emergencies, call our **24/7 helpline**\n\nCould you tell me more about your specific health concern?";
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! 👋 I'm your **MediCare+ Health Assistant**. Ask me about symptoms, diet advice, or health tips. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(text) }]);
    }, 600);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl flex flex-col" style={{ height: "calc(100vh - 12rem)" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--hero-gradient)" }}>
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-xl text-foreground">AI Health Assistant</h1>
            <p className="text-xs text-muted-foreground">Powered by MediCare+ Medical Knowledge</p>
          </div>
        </div>

        {/* Quick questions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickQuestions.map((q) => (
            <Button key={q} variant="outline" size="sm" className="text-xs gap-1" onClick={() => send(q)}>
              <Sparkles className="w-3 h-3" /> {q}
            </Button>
          ))}
        </div>

        {/* Chat area */}
        <Card className="flex-1 overflow-hidden flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {m.text.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-1" : ""}>
                      {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={k}>{part.slice(2, -2)}</strong>
                        ) : (
                          <span key={k}>{part}</span>
                        )
                      )}
                    </p>
                  ))}
                </div>
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </CardContent>

          <div className="p-4 border-t border-border">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about symptoms, diet, or health tips..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Chatbot;
