# 🧹 Harry Potter Quidditch - Subproject of Hogwarts OS 🧙‍♂️

Welcome to the **Harry Potter Quidditch Game**, a magical subproject of the **Hogwarts OS**, created for our Hackathon submission! This fast-paced 2D game brings the thrill of Quidditch right to your screen, complete with flying bludgers, golden snitches, rival Slytherins, magical weather, and high-speed broomstick action.

<p align="left">
  <img src="https://github.com/user-attachments/assets/e591b8ec-392a-45d5-909a-80f26c03ff5e" width="150" alt="Quidditch">
</p>

---

## ✨ Features

- 🎮 **Fully interactive 2D Quidditch match**
- 🧙‍♀️ Play as a Gryffindor seeker dodging bludgers and chasing the snitch
- 🧠 Smart AI opponents from Slytherin chasing the quaffle
- 🟡 Catch the golden snitch for huge points!
- 🥅 Score through animated Quidditch hoops
- 🌧️ Dynamic magical weather effects (wind + rain)
- 🔊 Sound effects for catching, scoring, and bludger hits
- ⏱️ Time-based gameplay with health bar and scoring HUD
- 💀 Game Over and Start Menu states with full keyboard navigation

---

## 📦 Folder Structure

```bash
Hogwarts-OS/
│
├── QuidditchGame/
│   ├── quidditch.py            # Main game code
│   ├── sounds/
│   │   ├── catch.wav
│   │   ├── score.wav
│   │   ├── bludger_hit.wav
│   │   └── background.mp3
│   ├── assets/                 # [Optional] For future images/sprites
│   └── README.md               # You're here!
└── ...
```

## 🚀 Getting Started
Prerequisites
Python 3.7+
pygame module

### Installation
```bash
git clone https://github.com/your-username/hogwarts-os.git
cd hogwarts-os/QuidditchGame
pip install pygame
python quidditch.py
```
>"🎉 That’s it! The game will launch in a new window."

---

## 🎮 Controls

| Action              | Key         |
|---------------------|-------------|
| Move Player         | Arrow Keys  |
| Pick/Throw Quaffle  | Spacebar    |
| Catch Snitch        | Automatically on contact |
| Start Game          | Enter       |
| Quit Game           | ESC         |

---

## 🕹️ Game Mechanics

- 🟡 Catch the **Golden Snitch** for **+150 points**
- 🏀 Score using the **Quaffle** through the hoops for **+10 points**
- 💥 Getting hit by **Bludgers** reduces your health
- 🌩️ Magical weather (wind/rain) affects ball and player physics
- 🕒 The game ends when time runs out or your health reaches zero

---

## 🔊 Audio

All sounds are located in the `sounds/` directory:

- `catch.wav` – Triggered when catching the snitch or quaffle
- `score.wav` – When scoring a goal
- `bludger_hit.wav` – When hit by a bludger
- `background.mp3` – Ambient Quidditch background sounds

> 💡 If sound files are missing or corrupted, the game uses dummy sounds to avoid crashing.

---

## 📺 Game States

- **MENU** – Start screen where you press **Enter** to begin
- **PLAYING** – Active game with HUD, scoring, and opponents
- **GAME_OVER** – Display of final score with option to restart

---

## 🤖 AI & Gameplay Logic

- 🧠 **Slytherin AI Players**: Automatically chase the quaffle and try to outscore you.
- 🌪️ **Weather AI**: Simulated wind and rain affects bludger and quaffle movement.
- 🔁 **Dynamic Events**: Randomized timing for snitch appearance, bludger paths, and weather changes.

---

## 🛠️ Future Additions

- 🎮 Local or online **multiplayer mode**
- 🏠 House selection with perks (e.g. faster broom for Gryffindor)
- 🖼️ Animated sprites and particle effects
- 🌈 Visual weather effects (rain, wind gusts)
- 📡 Integration with **Hogwarts OS** features like:
  - Wizard Chess (vs AI)
  - Potions Mini-lab
  - Spell Casting Terminal

---

## 🙌 Contributing

We’d love your help!

1. **Fork** the repository
2. Create a new **branch**
3. **Commit** your changes
4. Submit a **pull request** with a clear description

> Contributions that enhance gameplay, add new magical features, or improve code structure are especially welcome.

---

## 💡 About the Hackathon Project

This game is part of **Hogwarts OS**, our team’s submission for [Hackathon Name], aiming to bring a full magical desktop experience themed around Harry Potter.

The **Quidditch Game** is a subproject focusing on real-time gameplay using `pygame`, where players get a fun and nostalgic glimpse into the world of Hogwarts athletics.

---

## 👥 Credits

- 🧑‍💻 Team Name: **Team AccioCode**
- 🪄 Hackathon: **Hogwarts OS**
- 🎮 Game Subproject: **Quidditch (Seeker Simulation Game)**
- ⚙️ Stack: **Python 3.10**, **Pygame 2.5**

---

## 📜 License

MIT License – feel free to fork, remix, and create your own magical variations.

---

> _"You catch this, Potter, and we win." – Oliver Wood_

---

🔗 Return to main [Hacknovate-6.0-CodeFusion-Hogwart](Hacknovate-6.0-CodeFusion-Hogwart)
