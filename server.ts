import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { 
  getUserByUsername, 
  getUserByToken, 
  createUser, 
  updateUserToken, 
  saveUserData 
} from "./db";

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

// Helper function to extract token from auth header
function getBearerToken(req: express.Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

// Auth API Endpoints
app.post("/api/auth/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  if (username.length < 3) {
    return res.status(400).json({ error: "Username must be at least 3 characters long" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }

  try {
    const existingUser = getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = createUser(username, passwordHash);
    const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    updateUserToken(user.id, token);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        profile: user.profile,
        completedSets: user.completedSets
      }
    });
  } catch (err: any) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error during registration" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const user = getUserByUsername(username);
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    updateUserToken(user.id, token);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        profile: user.profile,
        completedSets: user.completedSets
      }
    });
  } catch (err: any) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error during login" });
  }
});

app.get("/api/auth/me", async (req, res) => {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const user = getUserByToken(token);
  if (!user) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  res.json({
    user: {
      id: user.id,
      username: user.username,
      profile: user.profile,
      completedSets: user.completedSets
    }
  });
});

app.post("/api/auth/sync", async (req, res) => {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const user = getUserByToken(token);
  if (!user) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  const { profile, completedSets } = req.body;
  if (!profile || !completedSets) {
    return res.status(400).json({ error: "Missing sync payload" });
  }

  saveUserData(user.id, profile, completedSets);
  res.json({ success: true });
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
