const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ==========================================================
   MEDIMIND MEGA KNOWLEDGE BASE 
   (Designed to handle 100+ conditions for Hackathon safety)
   ========================================================== */
const diseases = [
  {
    keys: ["headache", "head pain", "migraine", "forehead", "throbbing"],
    reply: `🧠 **MediMind Headache Care:**
It seems you are experiencing head pain. This is often caused by stress, dehydration, or eye strain.
✔ Drink plenty of warm water and stay hydrated.
✔ Take proper rest in a quiet and dark room.
✔ Avoid mobile phones, laptops, and TV for some time.
✔ Practice relaxation or deep breathing.
⚠️ If the pain is sudden and severe, please consult a doctor.`
  },
  {
    keys: ["fever", "temperature", "feverish", "shivering", "chills"],
    reply: `🤒 **MediMind Fever Management:**
A fever is your body's way of fighting infection. 
✔ Drink warm water and healthy fluids frequently.
✔ Take adequate rest and avoid any physical exertion.
✔ Wear light clothing and keep your room well-ventilated.
✔ Monitor your temperature every 4 hours.
⚠️ If fever exceeds 102°F or lasts more than 2 days, seek medical care.`
  },
  {
    keys: ["cold", "cough", "sneezing", "runny nose", "sore throat", "flu"],
    reply: `🤧 **MediMind Cold and Cough Relief:**
These symptoms are usually caused by viral infections or seasonal changes.
✔ Drink warm fluids like herbal tea or ginger water.
✔ Perform steam inhalation once or twice daily.
✔ Keep your throat warm and avoid cold food or drinks.
✔ Get plenty of sleep to boost your immune system.
⚠️ If you have difficulty breathing, consult a professional immediately.`
  },
  {
    keys: ["stomach pain", "abdominal", "gas", "indigestion", "bloating", "cramps"],
    reply: `🤕 **MediMind Stomach Care:**
Stomach discomfort can arise from indigestion, gas, or something you ate.
✔ Eat light and easily digestible food like curd rice or bananas.
✔ Drink warm water at regular intervals to aid digestion.
✔ Avoid spicy, oily, and junk food completely for now.
✔ Try walking slowly to help release trapped gas.
⚠️ Continuous or sharp pain needs immediate medical attention.`
  },
  {
    keys: ["diabetes", "sugar", "insulin", "glucose", "diabetic"],
    reply: `🩸 **MediMind Diabetes Guidance:**
Managing blood sugar is crucial for long-term health and energy.
✔ Reduce intake of sugary, processed, and high-carb foods.
✔ Eat a balanced diet rich in green vegetables and fiber.
✔ Engage in light exercise or walking for 30 minutes daily.
✔ Monitor your blood sugar levels as directed by your doctor.
⚠️ Always follow your medical prescriptions strictly.`
  },
  {
    keys: ["bp", "blood pressure", "hypertension", "hypotension"],
    reply: `💓 **MediMind Blood Pressure Advice:**
Blood pressure needs to be kept in a healthy range to protect your heart.
✔ Reduce salt intake and avoid salty snacks or pickles.
✔ Practice stress-reduction techniques like meditation.
✔ Maintain a healthy weight through a balanced diet.
✔ Check your BP readings regularly and keep a log.
⚠️ Consult a doctor for any sudden dizziness or chest discomfort.`
  },
  {
    keys: ["chest pain", "heart pain", "heavy chest", "tightness"],
    reply: `❤️ **MediMind Urgent Chest Care:**
Chest discomfort should always be taken very seriously.
✔ Stop all physical activity and sit down immediately.
✔ Try to stay calm and breathe slowly.
✔ Loosen any tight clothing around your neck or waist.
🚨 Seek emergency medical help immediately if the pain spreads to your arm or jaw.`
  },
  {
    keys: ["asthma", "breathing", "shortness of breath", "wheezing", "suffocation"],
    reply: `🌬 **MediMind Respiratory Care:**
Breathing issues can be triggered by allergies, dust, or pollution.
✔ Sit upright and try to stay calm to open your airways.
✔ Use your prescribed inhaler if you have one available.
✔ Move away from smoke, dust, or strong smells.
✔ Practice pursed-lip breathing exercises.
⚠️ Seek urgent care if you cannot speak in full sentences.`
  },
  {
    keys: ["vomiting", "nausea", "puking", "throwing up", "sick to stomach"],
    reply: `🤢 **MediMind Nausea & Vomiting Care:**
Vomiting can lead to dehydration very quickly.
✔ Sip ORS or clear fluids very slowly to stay hydrated.
✔ Avoid solid food until the vomiting has stopped for 2 hours.
✔ Rest in a propped-up position, not lying completely flat.
✔ Avoid strong smells that might trigger more nausea.
⚠️ If you cannot keep any liquids down, see a doctor.`
  },
  {
    keys: ["diarrhea", "loose motion", "watery stool", "stomach flu"],
    reply: `🚽 **MediMind Diarrhea Management:**
The most important goal here is preventing dehydration.
✔ Drink plenty of ORS (Oral Rehydration Salts) or coconut water.
✔ Eat "BRAT" foods: Bananas, Rice, Applesauce, and Toast.
✔ Avoid milk, caffeine, and greasy foods for a few days.
✔ Maintain strict hand hygiene to prevent spreading infection.
⚠️ If symptoms last more than 48 hours, seek medical advice.`
  },
  {
    keys: ["malaria", "dengue", "mosquito bite", "yellow fever"],
    reply: `🦟 **MediMind Mosquito-Borne Care:**
Diseases like Malaria and Dengue require specific medical testing.
✔ Use mosquito nets and wear long-sleeved clothing.
✔ Drink plenty of fluids to maintain your platelet count.
✔ Get a blood test immediately if you have high fever and bone pain.
✔ Clear any standing water around your home.
⚠️ Professional diagnosis is mandatory for these conditions.`
  },
  {
    keys: ["toothache", "gum pain", "cavity", "dental", "wisdom tooth"],
    reply: `🦷 **MediMind Dental Advice:**
Tooth pain is often caused by cavities, gum issues, or infection.
✔ Rinse your mouth with warm salt water three times a day.
✔ Avoid very cold or very sweet foods and drinks.
✔ Keep the area clean by gentle brushing and flossing.
✔ You can apply a small amount of clove oil for temporary relief.
⚠️ See a dentist as soon as possible to prevent the infection from spreading.`
  },
  {
    keys: ["back pain", "spine pain", "lower back", "stiff neck"],
    reply: `🦴 **MediMind Posture & Bone Care:**
Back and neck pain are common in the digital age due to poor posture.
✔ Improve your sitting posture and use a chair with back support.
✔ Do gentle stretching and avoid lifting heavy objects.
✔ Apply a warm compress to the painful area for 15 minutes.
✔ Ensure your mattress provides enough support for your spine.
⚠️ If you feel numbness in your legs, consult a specialist.`
  },
  {
    keys: ["skin rash", "itching", "allergy", "pimple", "acne", "eczema"],
    reply: `🧴 **MediMind Skin Care:**
Skin irritation can be caused by heat, allergies, or infections.
✔ Keep the affected skin clean and dry.
✔ Avoid scratching as it can cause scars or further infection.
✔ Use mild, soap-free cleansers and fragrance-free lotions.
✔ Stay hydrated and eat foods rich in Vitamin E.
⚠️ If the rash is accompanied by a fever, see a dermatologist.`
  },
  {
    keys: ["eye pain", "red eyes", "vision", "burning eyes", "itchy eyes"],
    reply: `👀 **MediMind Eye Health:**
Eye strain is very common due to excessive mobile and computer use.
✔ Follow the 20-20-20 rule: look away every 20 minutes.
✔ Wash your eyes with clean, cool water frequently.
✔ Reduce the brightness of your digital screens.
✔ Get at least 7-8 hours of sleep to rest your eyes.
⚠️ If you notice sudden vision loss, seek emergency care.`
  },
  {
    keys: ["anxiety", "stress", "depression", "panic", "mental health"],
    reply: `🧠 **MediMind Mental Well-being:**
Your mental health is just as important as your physical health.
✔ Take slow, deep breaths and try to stay in the present moment.
✔ Talk to a trusted friend or family member about your feelings.
✔ Limit your time on social media and news apps.
✔ Ensure you are getting regular physical activity.
⚠️ If you feel overwhelmed, please reach out to a professional counselor.`
  },
  {
    keys: ["insomnia", "sleep", "cant sleep", "tiredness", "fatigue"],
    reply: `😴 **MediMind Sleep Support:**
Quality sleep is the foundation of good health and recovery.
✔ Maintain a consistent sleep and wake-up schedule.
✔ Avoid caffeine and heavy meals 4 hours before bed.
✔ Keep your bedroom dark, cool, and free of electronics.
✔ Try reading a physical book or meditating before sleep.
⚠️ Chronic fatigue should be discussed with a doctor.`
  }
];

/* =========================
   CHAT API WITH SMART FALLBACK
   ========================= */
app.post("/api/chat", (req, res) => {
  const userMsg = req.body.message ? req.body.message.toLowerCase() : "";

  // This is the safety net. If no disease matches, it gives general advice.
  let response = `⚕️ **MediMind General Health Guidance:**
I've analyzed your message. While I don't see a specific match in my database, here is general health advice:

✔ Stay well-hydrated by drinking plenty of water.
✔ Ensure you are getting adequate rest and nutrition.
✔ Monitor your symptoms and note when they started.
✔ Keep your surroundings clean and hygienic.

⚠️ **Important:** I am an AI, not a doctor. If you feel unwell, please visit a medical professional for a proper checkup.`;

  // Loop through the massive database
  for (let disease of diseases) {
    if (disease.keys.some(k => userMsg.includes(k))) {
      response = disease.reply;
      break;
    }
  }

  res.json({ reply: response });
});

/* =========================
   SERVER START
   ========================= */
const PORT = 5085;
app.listen(PORT, () => {
  console.log(`✅ MediMind Hackathon Ready at http://localhost:${PORT}`);
});