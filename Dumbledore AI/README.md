
# 🧠 Dumbledore AI Assistant 🪄  
A magical, voice-activated AI assistant built with Electron and Akash API. Ask anything related to the Hogwarts OS or the wizarding world—and if it’s beyond knowledge, Dumbledore himself will admit it with grace.

---

## 📦 Table of Contents

1. [Features](#features)  
2. [Screenshots](#-screenshots)  
3. [Prerequisites](#-prerequisites)  
4. [Installation](#-installation)  
5. [Usage](#-usage)  
6. [How It Works](#-how-it-works)  
7. [Commands & Examples](#-commands--examples)  
8. [Voice Mode (Optional)](#-voice-mode-optional)  
9. [Troubleshooting](#-troubleshooting)  
10. [Customization](#-customization)  
11. [Contribution](#-contributing)  
12. [Credits](#-credits)

---

## ✨ Features

- 🧙 Answers Hogwarts-related queries (houses, spells, professors, etc.)
- 🧠 Integrates with **Akash AI API** for magical reasoning
- 💬 Accepts text input, optionally voice (voice-to-text supported)
- 🧵 Context-aware dialogue handling
- 🤷 Gracefully responds when it doesn't know an answer
- 🪄 Electron-powered desktop experience
- 📁 Lightweight and cross-platform

---

## 📸 Screenshots


![ai-1](https://github.com/user-attachments/assets/d6215830-163d-4b42-ab04-e11a4e005411)
Screenshots of Dumbledore’s chat window responding to magical queries.*

---

## 🛠 Prerequisites

Make sure these are installed:

- **Node.js**: [https://nodejs.org](https://nodejs.org)
- **npm**: Comes with Node.js
- **Git**: [https://git-scm.com](https://git-scm.com)

Optional but recommended:
```bash
npm install -g electron
```

---

## 📥 Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/dumbledore-ai-assistant.git
cd dumbledore-ai-assistant
```

---

#### 2️⃣ Install Dependencies
```bash
npm install
```

---

#### 3️⃣ Setup Akash AI API

Create a `.env` file and add your API key:
```env
AKASH_API_KEY=your-akash-api-key-here
```

Get one from [Akash AI](https://akashai.example.com)

---

#### 4️⃣ Launch the App
```bash
npm start
```

Or, if Electron is installed globally:
```bash
electron .
```

---

## 🧠 How It Works

Dumbledore AI is backed by **Akash AI**, which powers its intelligence on wizarding topics.  
- Input goes to `src/aiCore.js`
- Processed with Akash API
- Responses styled with personality (Dumbledore-ish grace!)
- Voice-to-text via `webkitSpeechRecognition` (optional)

---

## 🔮 Commands & Examples

You can ask questions like:

| 🗣️ Question | 🧠 Response |
|------------|------------|
| “What house is Harry in?” | “Harry Potter was in Gryffindor, of course.” |
| “Who teaches Potions?” | “Professor Severus Snape, a complicated man indeed.” |
| “Tell me about the Deathly Hallows.” | Summarized lore from Akash AI |
| “How to access Marauder’s Map?” | Secret answers revealed if known |
| “What’s 2 + 2?” | “That’s four, my dear.” |
| “How’s the weather?” | “Ah, I fear I do not dabble in Muggle forecasts.” |

If unsure:
> 🧙 “I must admit, that’s beyond my current understanding.”

---

## 🗣 Voice Mode (Optional)

Enable mic access and click the 🎤 button to ask questions aloud.

Dumbledore will respond in text (voice synthesis coming soon).

---

## 🧹 Troubleshooting

| Issue | Solution |
|-------|----------|
| App not launching | Ensure `electron` is installed and `npm start` runs |
| No response from AI | Check `.env` and Akash API key |
| Voice not working | Ensure mic access is granted; browser may block |
| Blank window | Check Electron version and logs |

---

## 🧪 Customization

Want to make it yours?

- Edit Dumbledore's tone in `src/formatter.js`
- Change UI in `renderer/` (HTML/CSS/JS)
- Add commands via `intentHandler.js`
- Plug into other APIs or local models

Ideas:
- Make him talk via TTS
- Add Hogwarts calendar sync
- Create personality modes (e.g., Snape AI 😈)

---

## 👥 Contributing

Pull requests are welcome!

To contribute:
```bash
# Fork and clone
git checkout -b my-feature

# Make your changes
# Commit and push
```

---

## 👑 Credits

- Created by a Muggle who wished to speak to Dumbledore  
- Powered by ⚡ [Electron.js](https://www.electronjs.org) and 🧠 [Akash AI](https://akashai.example.com)  
- Inspired by the wisdom of Hogwarts and the world of Harry Potter ✨

---

## 📜 License

MIT License. Use freely, but always with magical intent ✨  
No dark magic, please.

---
