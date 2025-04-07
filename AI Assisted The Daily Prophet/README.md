
# 🗞️ The Daily Prophet  
A magical, AI-powered wizarding newspaper brought to life with ✨ **ElectronJS** and 🧠 **AgentAI**. Stay updated with Hogwarts and the wizarding world, one spellbinding headline at a time.

---

## 📚 Table of Contents  
1. 🔍 [Project Description](#1-project-description)  
2. ✨ [Features](#2-features)  
3. 🖼️ [Screenshots](#3-screenshots)  
4. 🛠️ [Tech Stack](#4-tech-stack)  
5. 📦 [Installation](#5-installation)  
6. 🧪 [Usage](#6-usage)  
7. 🧠 [How It Works](#7-how-it-works)  
8. 🧩 [Challenges Faced](#8-challenges-faced)  
9. 🤝 [Contribution](#9-contribution)  
10. 🙌 [Credits](#10-credits)  
11. 📄 [License](#11-license)

---

## 1. 🔍 Project Description

**The Daily Prophet** is a Harry Potter-inspired desktop newspaper app built using ElectronJS. It generates magical headlines using **AgentAI** and offers a beautiful, immersive news-reading experience – straight out of the wizarding world.

---

## 2. ✨ Features

- 🧠 **AgentAI**-powered magical headline generation  
- 🧙‍♂️ Themed UI inspired by the Daily Prophet  
- 🧳 Offline fallback with static templates  
- 🧭 Auto-scroll and animated magical effects  
- 🔍 Hover-over spell reveals and summaries

---

## 3. 🖼️ Screenshots

![np-1](https://github.com/user-attachments/assets/d463cd8b-16ec-41d0-b079-e41341d2e5b0)


---![np-2](https://github.com/user-attachments/assets/57d528d9-f94e-403c-a310-01b2b4ed5691)


## 4. 🛠️ Tech Stack

| ⚙️ Tech        | 🔧 Purpose                             |
|---------------|----------------------------------------|
| 🖥️ ElectronJS  | Cross-platform desktop app             |
| 🤖 AgentAI     | Headline generation                    |
| 💾 fs-extra    | File I/O and template management       |
| 🎨 HTML/CSS/JS | UI and interactive behavior            |
| 🌐 Axios       | API handling for AI integration        |

---

## 5. 📦 Installation

### 🛑 Prerequisites

- Node.js (v16+)  
- npm  
- Git  

### 🔐 Setup AgentAI Key

> Create a `.env` file in the root folder and add:

```env
AGENTAi_API_KEY=your_agent_ai_api_key_here
```

### 🚀 Setup Project

```bash
# Clone the repo
git clone https://github.com/your-username/daily-prophet-ai.git
cd daily-prophet-ai

# Install dependencies
npm install
```

---

## 6. 🧪 Usage

```bash
npm start
```

- Launches the magical Daily Prophet window  
- Headlines are generated on app start or refresh using AgentAI

---

## 7. 🧠 How It Works

### 🤖 AgentAI Usage:

- **Headline Generation**: AgentAI is triggered to create witty, Hogwarts-style headlines when new articles are loaded.  
- **Tone Matching**: Headlines are adapted to suit magical, humorous, or dramatic moods using prompt logic.  

---

## 8. 🧩 Challenges Faced

- 🐧 Drag-and-drop `.desktop` file support varied across Linux  
- 🧠 Balancing AgentAI performance with UI responsiveness  
- 💬 Maintaining a magical tone without sacrificing clarity  
- 📂 Linux issues due to changes in root directory structure  
- ⚡ Avoiding UI glitches when AI responses update content live

---

## 9. 🤝 Contribution

Want to add your own spell?  
1. Fork the repo  
2. Create your spell branch  
3. Commit your magic  
4. Open a pull request! 🪄

---

## 10. 🙌 Credits

- 🧙‍♀️ Inspired by the Harry Potter universe  
- 💡 AgentAI for intelligent headline generation  
- ✨ Designed and built with a spellbook in hand

---

## 11. 📄 License

MIT License – cast, create, and collaborate responsibly. 🧙‍♂️

---
