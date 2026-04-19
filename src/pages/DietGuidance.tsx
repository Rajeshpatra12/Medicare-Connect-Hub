import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Apple, Utensils, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

type Disease = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  overview: string;
  foods_to_eat: { name: string; benefit: string }[];
  foods_to_avoid: { name: string; reason: string }[];
  meal_plan: { meal: string; suggestion: string }[];
  tips: string[];
};

const diseases: Disease[] = [
  {
    id: "diabetes",
    name: "Diabetes",
    emoji: "🩸",
    color: "bg-blue-50 border-blue-200",
    overview: "Managing blood sugar levels through controlled carbohydrate intake, high fiber, and balanced meals.",
    foods_to_eat: [
      { name: "Leafy greens (spinach, kale)", benefit: "Low glycemic, rich in nutrients" },
      { name: "Whole grains (oats, brown rice)", benefit: "Slow-release carbs, fiber-rich" },
      { name: "Lean proteins (fish, chicken)", benefit: "Stabilizes blood sugar" },
      { name: "Nuts & seeds", benefit: "Healthy fats, low GI" },
      { name: "Berries", benefit: "Low sugar fruit, antioxidants" },
    ],
    foods_to_avoid: [
      { name: "White bread & pasta", reason: "Spikes blood sugar rapidly" },
      { name: "Sugary drinks & sodas", reason: "High sugar content" },
      { name: "Fried foods", reason: "Increases insulin resistance" },
      { name: "Candy & sweets", reason: "Empty calories, sugar spikes" },
    ],
    meal_plan: [
      { meal: "Breakfast", suggestion: "Oatmeal with berries, almonds & cinnamon" },
      { meal: "Lunch", suggestion: "Grilled chicken salad with olive oil dressing, quinoa" },
      { meal: "Snack", suggestion: "Handful of walnuts with green tea" },
      { meal: "Dinner", suggestion: "Baked salmon with steamed vegetables & brown rice" },
    ],
    tips: ["Eat at regular intervals", "Monitor portions carefully", "Stay hydrated with water", "Exercise 30 min daily"],
  },
  {
    id: "heart-disease",
    name: "Heart Disease",
    emoji: "❤️",
    color: "bg-red-50 border-red-200",
    overview: "Low sodium, low saturated fat diet focusing on omega-3 fatty acids and heart-healthy foods.",
    foods_to_eat: [
      { name: "Fatty fish (salmon, mackerel)", benefit: "Omega-3 for heart health" },
      { name: "Olive oil", benefit: "Healthy monounsaturated fats" },
      { name: "Avocados", benefit: "Reduces bad cholesterol" },
      { name: "Garlic & onions", benefit: "Natural blood thinners" },
      { name: "Dark chocolate (70%+)", benefit: "Flavonoids improve circulation" },
    ],
    foods_to_avoid: [
      { name: "Processed meats", reason: "High sodium & nitrates" },
      { name: "Trans fats & margarine", reason: "Clogs arteries" },
      { name: "Excessive salt", reason: "Raises blood pressure" },
      { name: "Red meat (excess)", reason: "High saturated fat" },
    ],
    meal_plan: [
      { meal: "Breakfast", suggestion: "Whole grain toast with avocado, poached egg" },
      { meal: "Lunch", suggestion: "Mediterranean salad with chickpeas, olive oil, feta" },
      { meal: "Snack", suggestion: "Apple slices with almond butter" },
      { meal: "Dinner", suggestion: "Grilled salmon with roasted sweet potatoes & asparagus" },
    ],
    tips: ["Limit sodium to 1500mg/day", "Choose lean protein sources", "Eat 5 servings of fruits & veggies", "Avoid smoking and excess alcohol"],
  },
  {
    id: "kidney-disease",
    name: "Kidney Disease",
    emoji: "🫘",
    color: "bg-amber-50 border-amber-200",
    overview: "Controlled protein, low potassium, low phosphorus, and restricted sodium diet to reduce kidney workload.",
    foods_to_eat: [
      { name: "Cabbage & cauliflower", benefit: "Low potassium vegetables" },
      { name: "White rice & pasta", benefit: "Low phosphorus carbs" },
      { name: "Egg whites", benefit: "High quality, low phosphorus protein" },
      { name: "Apples & cranberries", benefit: "Low potassium fruits" },
      { name: "Onions & garlic", benefit: "Flavor without sodium" },
    ],
    foods_to_avoid: [
      { name: "Bananas & oranges", reason: "Very high in potassium" },
      { name: "Dairy products", reason: "High phosphorus content" },
      { name: "Nuts & seeds", reason: "High potassium & phosphorus" },
      { name: "Processed & canned foods", reason: "High sodium content" },
    ],
    meal_plan: [
      { meal: "Breakfast", suggestion: "Egg white omelet with bell peppers & onions" },
      { meal: "Lunch", suggestion: "Chicken breast with white rice, steamed cabbage" },
      { meal: "Snack", suggestion: "Apple slices or unsalted crackers" },
      { meal: "Dinner", suggestion: "Baked fish with cauliflower mash, green beans" },
    ],
    tips: ["Track fluid intake", "Monitor protein portions", "Avoid salt substitutes (contain potassium)", "Regular kidney function tests"],
  },
  {
    id: "liver-disease",
    name: "Liver Disease",
    emoji: "🫁",
    color: "bg-green-50 border-green-200",
    overview: "High-calorie, moderate-protein diet with emphasis on complex carbs and avoiding alcohol and toxins.",
    foods_to_eat: [
      { name: "Whole grains & oats", benefit: "Sustained energy, fiber" },
      { name: "Lean chicken & fish", benefit: "Moderate quality protein" },
      { name: "Fruits & vegetables", benefit: "Antioxidants for liver repair" },
      { name: "Green tea", benefit: "Contains catechins for liver health" },
      { name: "Turmeric & ginger", benefit: "Anti-inflammatory properties" },
    ],
    foods_to_avoid: [
      { name: "Alcohol (completely)", reason: "Direct liver damage" },
      { name: "Fried & fatty foods", reason: "Increases liver fat" },
      { name: "Raw shellfish", reason: "Risk of hepatitis" },
      { name: "Excess sugar", reason: "Can cause fatty liver" },
    ],
    meal_plan: [
      { meal: "Breakfast", suggestion: "Oatmeal with banana and honey, green tea" },
      { meal: "Lunch", suggestion: "Grilled chicken with brown rice and mixed salad" },
      { meal: "Snack", suggestion: "Fresh fruit smoothie with yogurt" },
      { meal: "Dinner", suggestion: "Steamed fish with sweet potato, steamed broccoli" },
    ],
    tips: ["Avoid alcohol completely", "Eat small frequent meals", "Stay hydrated", "Avoid over-the-counter painkillers"],
  },
  {
    id: "hypertension",
    name: "Hypertension (High BP)",
    emoji: "🩺",
    color: "bg-purple-50 border-purple-200",
    overview: "DASH diet approach — high in potassium, calcium, magnesium, and low in sodium and saturated fats.",
    foods_to_eat: [
      { name: "Bananas & sweet potatoes", benefit: "Rich in potassium" },
      { name: "Low-fat dairy", benefit: "Calcium for BP regulation" },
      { name: "Leafy greens", benefit: "Magnesium-rich" },
      { name: "Beets", benefit: "Natural nitrates lower BP" },
      { name: "Berries", benefit: "Anthocyanins improve vessels" },
    ],
    foods_to_avoid: [
      { name: "Table salt & salty snacks", reason: "Directly raises BP" },
      { name: "Pickles & preserved foods", reason: "Extremely high sodium" },
      { name: "Caffeine (excess)", reason: "Temporarily spikes BP" },
      { name: "Alcohol (excess)", reason: "Raises blood pressure" },
    ],
    meal_plan: [
      { meal: "Breakfast", suggestion: "Greek yogurt with banana, berries & flax seeds" },
      { meal: "Lunch", suggestion: "Spinach salad with grilled turkey, beet slices, vinaigrette" },
      { meal: "Snack", suggestion: "Carrot sticks with hummus" },
      { meal: "Dinner", suggestion: "Baked chicken with sweet potato, steamed kale" },
    ],
    tips: ["Follow DASH diet principles", "Exercise regularly", "Manage stress with meditation", "Monitor BP at home"],
  },
  {
    id: "gastric-ulcer",
    name: "Gastric / Stomach Ulcer",
    emoji: "🤢",
    color: "bg-orange-50 border-orange-200",
    overview: "Bland, non-irritating diet that protects stomach lining and promotes healing.",
    foods_to_eat: [
      { name: "Yogurt & probiotics", benefit: "Good bacteria fights H. pylori" },
      { name: "Honey", benefit: "Antibacterial, soothes lining" },
      { name: "Broccoli & cabbage", benefit: "Contains sulforaphane" },
      { name: "Bananas & papayas", benefit: "Protects stomach lining" },
      { name: "Whole grains", benefit: "Gentle fiber, non-irritating" },
    ],
    foods_to_avoid: [
      { name: "Spicy foods", reason: "Irritates stomach lining" },
      { name: "Coffee & caffeine", reason: "Increases acid production" },
      { name: "Citrus fruits & juices", reason: "Acidic, worsens ulcers" },
      { name: "Alcohol", reason: "Erodes stomach lining" },
    ],
    meal_plan: [
      { meal: "Breakfast", suggestion: "Plain oatmeal with banana slices & honey" },
      { meal: "Lunch", suggestion: "Boiled chicken with mashed potato, steamed carrots" },
      { meal: "Snack", suggestion: "Yogurt with a teaspoon of honey" },
      { meal: "Dinner", suggestion: "Steamed rice with mild vegetable soup, boiled fish" },
    ],
    tips: ["Eat small frequent meals", "Don't eat 2 hours before bed", "Avoid NSAIDs like aspirin", "Manage stress levels"],
  },
];

const DietGuidance = () => {
  const [selected, setSelected] = useState<Disease | null>(null);

  if (selected) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button variant="ghost" className="mb-6 gap-2" onClick={() => setSelected(null)}>
            <ArrowLeft className="w-4 h-4" /> Back to all diseases
          </Button>

          <div className="mb-8">
            <h1 className="font-sans font-extrabold text-3xl text-foreground mb-2">
              {selected.emoji} {selected.name} — Diet Guide
            </h1>
            <p className="text-muted-foreground leading-relaxed">{selected.overview}</p>
          </div>

          {/* Foods to Eat */}
          <Card className="mb-6 border-success/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <h2 className="font-sans font-bold text-xl text-foreground">Foods to Eat</h2>
              </div>
              <div className="space-y-3">
                {selected.foods_to_eat.map((f) => (
                  <div key={f.name} className="flex items-start gap-3 p-3 rounded-lg bg-success/5">
                    <Apple className="w-4 h-4 mt-0.5 text-success shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">{f.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">— {f.benefit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Foods to Avoid */}
          <Card className="mb-6 border-destructive/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-destructive" />
                <h2 className="font-sans font-bold text-xl text-foreground">Foods to Avoid</h2>
              </div>
              <div className="space-y-3">
                {selected.foods_to_avoid.map((f) => (
                  <div key={f.name} className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5">
                    <XCircle className="w-4 h-4 mt-0.5 text-destructive shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">{f.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">— {f.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Meal Plan */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="w-5 h-5 text-primary" />
                <h2 className="font-sans font-bold text-xl text-foreground">Sample Meal Plan</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selected.meal_plan.map((m) => (
                  <div key={m.meal} className="p-4 rounded-lg bg-accent">
                    <Badge variant="secondary" className="mb-2">{m.meal}</Badge>
                    <p className="text-sm text-foreground">{m.suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <h2 className="font-sans font-bold text-xl text-foreground">Important Tips</h2>
              </div>
              <ul className="space-y-2">
                {selected.tips.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16" style={{ background: "var(--hero-gradient)" }}>
        <div className="container mx-auto px-4">
          <h1 className="font-sans font-extrabold text-4xl text-primary-foreground mb-3">Disease-Specific Diet Guidance</h1>
          <p className="text-primary-foreground/70 text-lg max-w-lg">
            Every disease requires a unique diet. Select your condition below for personalized eating instructions.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map((d) => (
            <Card
              key={d.id}
              className={`cursor-pointer hover:shadow-lg transition-all border-2 ${d.color}`}
              onClick={() => setSelected(d)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{d.emoji}</div>
                <h3 className="font-sans font-bold text-lg text-foreground mb-2">{d.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{d.overview}</p>
                <Button size="sm">View Diet Plan</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default DietGuidance;
