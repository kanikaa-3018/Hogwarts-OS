# 🧙‍♂️ Hogwarts OS – A Magical Linux-Based Operating System

Welcome to **Hogwarts OS**, a fully immersive and wizardry-themed operating system built on top of Linux Mint Cinnamon 21.3. Inspired by the world of **Harry Potter**, this project reimagines the computing experience with a unique blend of **custom themes, spell-based terminal commands, AI-powered tools, gamification, and interactive visuals**.

Developed as part of the **Hackanovate Hackathon** at **ABES Institute**, Hogwarts OS is designed to combine fun, functionality, and fantasy for all magic and tech enthusiasts.

---

## 🧩 Problem Statement

Most operating systems offer a generic, monotonous user experience, especially for creative users and students who crave engagement, personalization, and intuitive design.

Hogwarts OS solves this by:

- ✨ Turning the entire OS into a **magical universe** with house-based personalization.
- 🧠 Embedding **AI-powered tools** for intuitive interactions.
- 🧪 Introducing **gamification, XP, and unlockables** to make computing enjoyable and rewarding.
- 💻 Offering both **a full OS experience** and **installable modules**, making it versatile for all users.

---

## ✨ Key Features

| Feature | Description |
|--------|-------------|
| 🧙 **Sorting Hat on First Login** | Assigns a Hogwarts House (Gryffindor, Ravenclaw, Hufflepuff, or Slytherin) via random choice or quiz, dynamically applying matching themes, wallpapers, and system sounds. |
| 🗺️ **Marauder’s Map File Explorer** | Electron-based custom file explorer with parchment UI, spell-based navigation, XP unlocking, folder animations, and **Agent AI** for semantic search and smart file organization. |
| 🔥 **House-Themed Common Room Desktop** | A fullscreen control panel with animated fireplace, house points tracker, Daily Prophet widget, Owl Post notifications, and ambient visuals. |
| ✨ **Spell-Based Terminal** | Replace boring commands with magical spells like `Lumos` (light mode), `Nox` (dark mode), `Accio` (search), `Evanesco` (delete), `Expelliarmus` (kill process), and more. |
| 📬 **Owl Post Notification System** | System notification system with parchment-styled popup UI and owl sounds for alerts, messages, and system events. |
| 🧪 **Potion Brewing App Installer** | An animated app installer where users drag and drop “ingredients” (app components) to brew and install applications magically. |
| 🧠 **AI-Powered Portrait Assistant** | A living portrait built using Agent AI / Akash Chat API, providing help, commands, and interaction like Dumbledore’s enchanted frame. |
| 🔐 **Patronus Lock Screen** | Custom glowing Patronus-themed lock/login screen via GDM customization. |
| 🎮 **Gamification Layer** | Earn XP, unlock secret Hogwarts areas, track House Points, uncover hidden folders/passages, and access the **Room of Requirement**. |
| 🧹 **Secret Mode Switches** | Spell commands like `Homenum Revelio` (show users), `Sectumsempra` (force delete), and more. |
| 🧙‍♀️ **Quidditch Mini-Game** | A fun Quidditch game built using Python & Pygame for entertainment. |

---

## 🧰 Architecture Overview

- **Frontend**: Electron (for file explorer & UI tools), HTML/CSS, GTK theming, Cinnamon customizations  
- **Backend**: Node.js (for Electron apps), Python (for AI, automation, games), Shell scripting  
- **AI Integration**: Agent AI / Akash Chat for smart assistant and search  
- **System Customization**: GDM, Plymouth, Grub, GNOME/GTK for visuals, startup logos, and lock screen  

📌 _Full system architecture diagram available in `/docs/architecture.png`_

---

## 🛠️ How to Use Hogwarts OS

We offer **two flexible options** for trying out Hogwarts OS:

### 🧙‍♂️ Option 1: Full Hogwarts OS (ISO File)

Get the **ready-to-install Hogwarts OS ISO** – a fully pre-configured Linux Mint distro with all features, themes, and magic built-in.

> ✅ Best for immersive experience with everything out-of-the-box  
> ⚠️ Requires VirtualBox, bare metal, or a USB installer

📥 [Download Hogwarts OS ISO](#)

---

### 🧩 Option 2: Modular App Installation on Linux Mint

Install individual magical components (Sorting Hat, Marauder’s Map, Owl Post, etc.) on **your existing Linux Mint** system.

> ✅ Best for developers and users who want to add only selected features  
> 💡 Each module comes with installation guide, setup script & dependencies

📁 Visit the [`modules/`](https://github.com/nishantharkut/Hogwarts-OS/tree/main/Modules) folder to get started!

---

## 📁 Repository Structure

```bash
hogwarts-os/
├── iso/                        # Complete OS build files (for full ISO)
│   ├── boot/                   # Bootloader files with Hogwarts branding
│   ├── casper/                 # Filesystem (squashfs) for live system
│   ├── preseed/                # Automated installation config (optional)
│   └── README.md               # Instructions for building from source
│
├── modules/                   # Individual magical features/modules
│   ├── sorting-hat/           # House selection system
│   ├── marauders-map/         # Electron-based file explorer with AI
│   ├── owl-post/              # Notification system with owl-style popups
│   ├── potion-installer/      # Gamified app installer
│   ├── enchanted-portrait/    # AI Assistant with interactive portrait
│   ├── patronus-lockscreen/   # Custom login screen (GDM/SDDM)
│   └── quidditch-game/        # Mini-game built with Python & Pygame
│
├── assets/                    # Wallpapers, icons, logos, sounds, animations
│   ├── wallpapers/
│   ├── icons/
│   ├── sounds/
│   └── animations/
│
├── scripts/                   # Theme switchers, spell terminal, setup tools
│   ├── install.sh             # Full system setup script
│   ├── theme-switcher.sh      # Switch house themes manually
│   ├── spell-terminal.sh      # Spells mapped to terminal commands
│   └── startup-animation/     # Hogwarts startup logo and animation files
│
├── docs/                      # Architecture diagrams, presentation, media
│   ├── architecture.png
│   ├── screenshots/
│   └── demo.mp4
│
├── .github/                   # GitHub workflows and issue templates
│
├── README.md                  # This file (project overview)
├── LICENSE                    # MIT License
└── CONTRIBUTING.md            # Guidelines for contributors (optional)
```

---

## 🧪 Tech Stack

| Stack | Description |
|-------|-------------|
| 🧰 OS Base | Linux Mint Cinnamon 21.3 |
| 🎨 UI | Electron, HTML, CSS, GTK, Plymouth |
| 🧠 AI | Agent AI, Akash Chat API |
| 🐍 Logic | Node.js, Python, Bash |
| 🎮 Game | Python + Pygame |
| 🖼️ Graphics | Blender (optional), GIMP, Inkscape |

---

## 📸 Screenshots

> Coming soon in `/docs/screenshots/`

---

## 🎥 Demo Video


https://github.com/user-attachments/assets/84143772-869f-4d05-89a2-b5ab23416cf2



---

## 🙌 Team Credits

> Project by: **[CodeFusion / Members: Kanika Singhal | Nishant Harkut | Apeksha Jain]**  
> Built with 💛 at **Hackanovate Hackathon** – ABES Institute of Technology

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).

---

### ⭐ If you love magic + Linux, consider giving us a star!
