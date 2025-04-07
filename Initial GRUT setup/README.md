
# 🎩 Initial GRUB Setup 🪄

A magical Harry Potter–themed GRUB bootloader experience that welcomes users to Hogwarts by assigning them a house and patronus! This is the very first layer of Hogwarts OS — where your wizarding journey begins.

---

## 📦 Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Screenshots](#screenshots)  
4. [Demo Video](#demo-video)  
5. [Prerequisites](#prerequisites)  
6. [Installation](#installation)  
7. [How it Works](#how-it-works)  
8. [Spell Logic](#spell-logic)  
9. [Customization](#customization)  
10. [Challenges Faced](#challenges-faced)  
11. [License](#license)  
12. [Credits](#credits)

---

## 🧾 Overview

The **Sorting Hat GRUB Setup** transforms your OS boot experience into an interactive Hogwarts ceremony. Users are assigned to a Hogwarts House (Gryffindor, Slytherin, Ravenclaw, Hufflepuff) and given a Patronus. This assignment either occurs randomly or based on a magical quiz.

Each house completely re-themes your Hogwarts OS — from wallpapers to terminal prompts!

---

## ✨ Features

- 🎩 Interactive Sorting Hat during boot
- 🏰 House Assignment via quiz or random choice
- 🐺 Patronus auto-generated per user
- 🎨 Dynamic house-based theming of the OS
- 📜 Boot-time animations and dialogues
- 💾 Assignment logic controlled by `assign.sh`
- 🧙 Fully compatible with custom Linux distros (GRUB2)

---

## 📸 Screenshots

![pat-1](https://github.com/user-attachments/assets/31f19b3d-f553-470b-8b46-626df6401091)

![pat-2](https://github.com/user-attachments/assets/98030cd9-ec04-4037-aaea-754b9aa1a010)
---

## 🛠 Prerequisites

Make sure your system has:

- 🐧 A Linux distro with GRUB2 bootloader  
- 🎮 Basic shell scripting support  
- 💼 `assign.sh` script placed in the GRUB environment  
- 📂 Writable `/boot/grub/` directory

---

## 📥 Installation

1. **Clone or Download the Repository**
```bash
git clone https://github.com/your-username/sorting-hat-grub.git
cd sorting-hat-grub
```

2. **Copy the GRUB assets**
```bash
sudo cp -r grub-themes/* /boot/grub/
```

3. **Place the assignment logic**
```bash
sudo cp assign.sh /boot/grub/assign.sh
chmod +x /boot/grub/assign.sh
```

4. **Update GRUB Configuration**
```bash
sudo update-grub
```

---

## 🧙 How It Works

- When the OS boots, `assign.sh` runs before login.
- If the user is new, they get the **Sorting Hat Ceremony**:
  - Option to take a short **magical quiz**
  - Or let the Hat assign a house **randomly**
- A **Patronus** is also assigned randomly.
- The OS theme changes based on the house:
  - Gryffindor: Brave Red Theme
  - Slytherin: Emerald Green Theme
  - Ravenclaw: Wise Blue Theme
  - Hufflepuff: Loyal Yellow Theme

---

## 🔮 Spell Logic (assign.sh)

```bash
# Inside assign.sh

echo "🎩 Welcome to the Sorting Hat Ceremony..."
sleep 2
# Ask user if they want to take the quiz
# Assign house based on logic/quiz/random
# Set house theme environment variable
# Generate random patronus from a magical list
```

---

## 🧪 Customization

- Add your own house themes in `grub-themes/`
- Modify `assign.sh` to change logic/questions
- Update patronus options to match your lore
- Change fonts, background animations, and UI effects

---

## 🚧 Challenges Faced

- Supporting GRUB scripting limitations
- Creating consistent behavior across distros
- Maintaining animated effects with minimal boot lag
- Making the boot theme immersive but lightweight
- Debugging Linux root path changes that broke GRUB
- Ensuring randomized logic didn’t overwrite themes on each reboot

---

## 📜 License

MIT License.  
This project is licensed for magical and non-magical use 🪄  
No dark magic allowed.

---
