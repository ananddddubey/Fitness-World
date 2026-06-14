import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Lazy-loaded or safely initialized Gemini API client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined. Please add your Gemini API key in the App Settings Secrets pane.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// API endpoint
app.post("/api/trainer", async (req, res) => {
  const { question, context } = req.body;
  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }

  try {
    const ai = getGeminiClient();
    
    // Construct full content with specific exercise context if available
    const fullPrompt = context 
      ? `User asks about: [${context}]. Question/Concern: "${question}"`
      : question;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: "You are an expert personal trainer at Fitness World gym. Give concise, motivating, practical advice about workouts, exercise form, nutrition, and fitness goals. Keep responses under 120 words. Use direct, energetic, powerful, gym-focused coaching language.",
        temperature: 0.75,
      },
    });

    const answer = response.text || "Keep grinding, champ! No days off. Focus on control and dynamic power.";
    res.json({ answer });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    // Provide general robust feedback and instructions if key is absent
    let friendlyMessage = "Brace your core, focus on execution, and keep pushing limits! Technique comes first, then intensity. Squeeze at the target and control the eccentric.";
    if (!process.env.GEMINI_API_KEY) {
      friendlyMessage += " (To enable live AI coaching, add your GEMINI_API_KEY in the Google AI Studio settingsSecrets panel.)";
    } else {
      friendlyMessage += ` (AI details: ${err.message || "trainer online offline"})`;
    }
    res.json({ answer: friendlyMessage });
  }
});

// Serve assets
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
