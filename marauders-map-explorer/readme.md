# 🧙 Wizarding File Explorer 🪄  
A magical, Harry Potter-themed file explorer built with Electron. Navigate your system like a Hogwarts student—with breadcrumb trails, spell-based AI file commands, XP-based unlockables, and smart file previews!

---

## 📦 Table of Contents

1. [Features]  
2. [Screenshots]  
3. [Prerequisites]  
4. [Installation] 
5. [Usage]
6. [Spell Commands]
7. [XP System & Unlockables]
8. [Supported File Types]
9. [Troubleshooting]
10. [Customization]
11. [Contrubution]
12. [Credits]

---

## Features

- 🧙 Spellcasting AI Interface (summarize, convert, explain, rewrite, etc.)
- 📂 Folder Sidebar + Breadcrumb Navigation
- 🧾 File Previews for Text, Markdown, Code
- 🔁 File Format Conversion (CSV → JSON, PDF → TXT, etc.)
- 🪜 XP-Based Folder Unlocking System
- 🌗 Light/Dark Mode Toggle
- 🔍 Search and Sort Functionality
- ⚙️ AI Agent Modular Architecture

---

## 📸 Video Demo

https://github.com/user-attachments/assets/5274317b-81b4-4a5b-a43b-424adfe3fcee


---

## 🛠 Prerequisites

Before you begin, make sure the following tools are installed on your machine:

- **Node.js** (v16 or higher): [https://nodejs.org/](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git**: [https://git-scm.com/](https://git-scm.com/)
- **Electron** (optional global install):

```bash

npm install -g electron
```
> *💡 If you don’t want to install Electron globally, it will still work as a local dependency.*

## 📥 Installation

Clone the repository and install all dependencies:
```bash
# Clone the repository
git clone https://github.com/your-username/magical-file-explorer.git
cd magical-file-explorer

# Install dependencies
npm install
```

This will install core dependencies such as:

- `electron` – Desktop framework
- `pdf-parse` – PDF parsing for AI commands
- `fs-extra` – Enhanced file system utilities
- `marked` – Markdown preview rendering
- `highlight.js` – Syntax highlighting for code previews
- `axios` – For API or LLM communication (if used)


## Running the App
```bash

# Start the magical explorer
npm start

```

If you installed Electron globally and want to run it manually:
```bash

electron .

```

## 🧙 Using the File Explorer
### 📁 Navigate Files
- Use the **sidebar** to browse folders.
- **Click files** to open them.
- Use the **breadcrumb** at the top to move between directories.

### 🧾 Preview Files
- Hover over `.txt`, `.md`, `.js`, `.json`, etc. to see file previews.
- Unsupported files show a generic message.

### 🔮 Cast Spells (AI Commands)
Use the spell input bar at the bottom to run AI-powered commands.

✅ Suggestion:

> 🪄 The spell input bar appears at the bottom of the window. Type your spell and press Enter.

#### Examples:
| Spell | Effect |
|-------|--------|
| `summarize "report.pdf"` | Summarizes the file |
| `convert "data.csv" to JSON` | Converts CSV to JSON |
| `rewrite "essay.txt"` | Rewrites file content using AI |
| `explain "code.js"` | Explains JavaScript code |
| `summarize folder` | Summarizes the current folder |

---

## 🧬 XP System & Unlockables

- 🪙 **+5 XP** per folder opened  
- ⏳ **+1 XP/min** of active usage  
- 💡 Unlock secret folders based on XP milestones:

| XP Required | Unlocks |
|-------------|---------|
| 100 | Restricted Section |
| 250 | Room of Requirement |
| 500 | Chamber of Secrets |

XP is shown in the top-right corner.

---

## 📁 Supported File Types

### 🔍 Preview Support:
- `.txt`, `.md`, `.json`, `.csv`, `.html`, `.js`, `.py`, `.ts`

### 🔁 Convert Support:
- `.csv` → `.json`
- `.pdf` → `.txt`

*(You can extend this in `spellProcessor.js`)*

---

## 🧠 AI Integration Details

Located in `src/aiAgent.js`, this file controls how AI commands are handled.

You can plug in:
- **OpenAI API**
- **Local LLMs (e.g., Ollama, LM Studio)**
- **Any custom inference engine**

Update the `invokeLLM(prompt)` method to define how spells are processed.

---

## 🧹 Troubleshooting

| Issue | Solution |
|-------|----------|
| App not launching | Ensure `electron` is installed, check `npm start` logs |
| File previews not working | Check supported file types |
| AI spells not responding | Confirm `aiAgent.js` is set up and has access to LLM |
| XP not persisting | Make sure localStorage is not blocked or cleared on restart |

---

## 🧪 Customization

- Modify the **UI** in `renderer/` (HTML/CSS/JS)
- Add new **spells** in `spellProcessor.js`
- Change **XP rewards** in `xpManager.js`
- Adjust **AI behavior** in `aiAgent.js`

Want to add:
- New themes?
- More spell types?
- Audio feedback?
- A Marauder’s Map mode?

Fork it and go wild! 🌟

---

## 🧑‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

Don’t forget to:
- Fork the repo
- Create a new branch (`git checkout -b my-feature`)
- Commit your changes
- Push and create a PR

---

## 🧙‍♂️ Credits

Created by a Muggle enchanted with magic and JavaScript 🪄  
Inspired by: **Harry Potter**, **Electron.js**, and modern UX principles.

---

## 📜 License

MIT License. Use the code freely, but no Unforgivable Curses allowed.
