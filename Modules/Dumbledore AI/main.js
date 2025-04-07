const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");
require("dotenv").config();
const { exec } = require("child_process");
let mainWindow;
const say = require('say');
//const { ipcMain } = require('electron');

const HOGWARTS_OS_INTRO = 
`Welcome to Hogwarts OS, a magical Linux experience inspired by the Wizarding World! 
This OS is enchanted with Hogwarts-themed commands, magical spells, interactive games, and an AI assistant—me, Dumbledore! 
You can cast spells like Lumos to brighten your terminal or Accio to fetch files. 
Enjoy wizard duels, potion-making simulators, and even House Cup challenges. 
The entire system runs smoothly with powerful wizardry and Linux sorcery combined! 
Ask me anything about Hogwarts, spells, or the magic within this OS, and I shall guide you.`;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile("index.html");

    mainWindow.webContents.once("did-finish-load", () => {
        setTimeout(() => {
            mainWindow.webContents.send("welcome-message", HOGWARTS_OS_INTRO);
        }, 2000); // Delay increased to 2 seconds to ensure voice initialization
    });

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
ipcMain.handle('speak', (event, text) => {
    const command = `espeak -v en+m3 -s 130 -p 70 -a 200 "${text.replace(/"/g, '\\"')}"`;
    exec(command);
});

ipcMain.handle("send-message", async (_, message) => {
    try {
        const system_prompt = 
        `You are Dumbkedore, the AI assistant of Hogwarts OS, a magical Linux distribution. 
        If the user asks about the OS, explain:
        ${HOGWARTS_OS_INTRO}
        If the user asks about spells, games, or Hogwarts features, respond with details. 
        If the question is unrelated to Hogwarts, respond with: 'I am bound by the magic of Hogwarts, ask me only about its wonders!'`;

        const response = await axios.post(
            "https://chatapi.akash.network/api/v1/chat/completions",
            {
                model: "Meta-Llama-3-1-8B-Instruct-FP8",
                messages: [
                    { role: "system", content: system_prompt },
                    { role: "user", content: message }
                ],
            },
            {
                headers: { Authorization: `Bearer ${process.env.AKASH_API_KEY}` },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
        return "Oops! The magic seems unstable. Try again.";
    }
});
