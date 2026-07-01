# Fitness World - AI Personal Trainer & Workout Tracker

Fitness World is an intense, immersive, AI-powered personal trainer and workout tracker designed to level up your fitness journey. Get real-time, professional advice tailored specifically to your workout split (e.g., Bodybuilder, Powerlifter, Athletic, Beginner, or Weight Loss) using advanced artificial intelligence.

Webapp link: ( https://fitness-world-5lq2.onrender.com/ )

---

## 🚀 Key Features

* **🤖 Gemini-Powered AI Coach**: Converse with an expert personal trainer. Get motivational, practical advice on workouts, exercise form, nutrition, and recovery.
* **🏋️ Dynamic Workout Programs**: Swap splits on the fly! Features specialized training routines:
  * **Powerlifter Split**: Focusing on Bench, Squat, and Deadlift strength.
  * **Bodybuilder Split**: Hypertrophy focus with Push/Pull/Legs.
  * **Athletic Performance**: Power, rotation, and conditioning.
  * **Beginner & Weight Loss Splits**: Structured for fat burning and learning foundation movements.
* **📊 Visual Form Corrector & Tips**: Dynamic overlays and expert coaching prompts for each exercise to ensure safety and max power.
* **📱 Android Mobile Wrapper**: Native Android app package with full-screen WebView, letting you take your AI trainer with you straight to the gym floor.
* **🎨 Immersive Dark UI**: High-fidelity dark mode with neon accents, custom tactile buttons, and smooth micro-animations.

---

## 🛠 Tech Stack

* **Frontend**: React (v19), TypeScript, Vite (v6), TailwindCSS (v4), Motion (Framer Motion)
* **Backend**: Express (v4), Node.js
* **AI Engine**: Google GenAI (`@google/genai` utilizing `gemini-3.5-flash`)
* **Mobile Wrapper**: Android Native SDK (Jetpack Compose, WebView)

---

## 💻 Running Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v20+ recommended)

### Setup Steps
1. **Clone the repository** (if cloned from remote):
   ```bash
   git clone https://github.com/ananddddubey/Fitness-World.git
   cd Fitness-World
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   GEMINI_API_KEY="your-google-ai-studio-api-key"
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The backend Express server and Vite development server will spin up on `http://localhost:3000`.

---

## 🌐 Deploying to Render

This app is structured to run both the client and API server together in production.

1. Create a new **Web Service** on [Render](https://dashboard.render.com).
2. Connect your GitHub repository: `https://github.com/ananddddubey/Fitness-World.git`
3. Configure the settings:
   * **Language**: `Node`
   * **Branch**: `main`
   * **Build Command**: `npm install && npm run build`
   * **Start Command**: `npm run start`
4. In **Advanced**, add your **Environment Variables**:
   * `GEMINI_API_KEY`: *(Your Gemini API key)*
   * `NODE_ENV`: `production`

Render will compile the Vite assets and launch the Express backend to serve them.

---

## 📱 Native Android Mobile App

The `android` directory contains a native Android app wrapper built using **Jetpack Compose**. It runs a full-screen hardware-accelerated WebView pointing to your deployed Render website.

### Configuration
1. Open the `android/app/src/main/java/com/fitnessworld/MainActivity.kt` file.
2. Update the `DEPLOYED_URL` constant with your live Render app URL:
   ```kotlin
   private const val DEPLOYED_URL = "https://your-fitness-world-app.onrender.com"
   ```

### Building & Running the App
* **Using Android Studio**: Import the `android` folder as a project. Click **Run** to launch it on an emulator or a connected device.
* **Using Android CLI**:
  ```bash
  cd android
  ./gradlew assembleDebug
  ```
  This generates the debug APK at `app/build/outputs/apk/debug/app-debug.apk`.
