 
const foodData = {
  banana:  { category: "moderate", note: "High in natural sugar — eat half a banana at a time." },
  apple:   { category: "safe",     note: "Rich in fiber and antioxidants. Great daily choice." },
  mango:   { category: "avoid",    note: "Very high glycemic index — avoid or eat tiny portions." },
  lychee:  { category: "avoid",    note: "High sugar content — not recommended for diabetics." },
  orange:  { category: "safe",     note: "Low GI and rich in vitamin C. Eat whole, not juiced." },
  papaya:  { category: "moderate", note: "Good fiber but moderate sugar — small portions." },
  rice:    { category: "moderate", note: "Prefer brown or basmati rice, limit white rice." },
  bread:   { category: "moderate", note: "Choose whole-grain bread over white bread." },
  potato:  { category: "avoid",    note: "Starchy and spikes blood sugar — avoid fried forms." },
  oats:    { category: "safe",     note: "Excellent fiber source. Helps stabilize blood sugar." },
  milk:    { category: "safe",     note: "Low-fat or skimmed milk is a healthy option." }
};
 
function checkFood() {
  const sugar = parseFloat(document.getElementById("sugar").value);
  const food = document.getElementById("food").value;
  const result = document.getElementById("result");

  // Validation
  if (isNaN(sugar) || sugar <= 0) {
    showResult(result, "avoid", "⚠ Please enter a valid blood sugar level.");
    return;
  }
  if (!food) {
    showResult(result, "moderate", "⚠ Please select a food or fruit.");
    return;
  }

  const info = foodData[food];
  let category = info.category;

  // If sugar is very high, downgrade moderate foods to "avoid"
  if (sugar > 180 && category === "moderate") category = "avoid";
  // If sugar is normal, moderate stays moderate, safe stays safe

  let label = "";
  if (category === "safe")     label = "✅ Safe to Eat";
  if (category === "moderate") label = "⚠ Eat in Moderation";
  if (category === "avoid")    label = "❌ Avoid";

  const sugarMsg = sugar > 180
    ? ` Your sugar level (${sugar} mg/dL) is high — be extra careful.`
    : ` Your sugar level (${sugar} mg/dL) is in a manageable range.`;

  showResult(result, category, `${label} — ${food.toUpperCase()}. ${info.note}${sugarMsg}`);
}

function showResult(el, type, message) {
  el.className = "result " + type;
  el.textContent = message;
  el.classList.remove("hidden");
}
 
function calculateBMI() {
  const w = parseFloat(document.getElementById("weight").value);
  const h = parseFloat(document.getElementById("height").value) / 100;
  const out = document.getElementById("bmiResult");

  if (!w || !h) {
    showResult(out, "moderate", "⚠ Please enter both weight and height.");
    return;
  }

  const bmi = (w / (h * h)).toFixed(1);
  let category, type;
  if (bmi < 18.5)        { category = "Underweight";   type = "moderate"; }
  else if (bmi < 25)     { category = "Normal weight"; type = "safe"; }
  else if (bmi < 30)     { category = "Overweight";    type = "moderate"; }
  else                   { category = "Obese";         type = "avoid"; }

  showResult(out, type, `Your BMI is ${bmi} — ${category}.`);
}
  
let glasses = 0;
function addGlass() {
  if (glasses < 8) glasses++;
  updateWater();
}
function resetGlass() { glasses = 0; updateWater(); }
function updateWater() {
  document.getElementById("glassCount").textContent = glasses;
  document.getElementById("waterFill").style.width = (glasses / 8 * 100) + "%";
}

/* ----- Dark mode toggle ----- */
const toggle = document.getElementById("darkToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀" : "🌙";
});
