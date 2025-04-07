const { app, BrowserWindow, ipcMain } = require("electron");
const axios = require("axios");
const say = require("say");
require("dotenv").config();
const { exec } = require("child_process");

let preloaderWindow;
let mainWindow;
let speechProcess = null; // Track speech process

app.whenReady().then(() => {
  // 🦉 Preloader (Owl Animation)
  preloaderWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  preloaderWindow.loadFile("preloader.html");

  // 🎩 Listen for signal from preloader to launch the main window
  ipcMain.on("animation-finished", () => {
    preloaderWindow.close(); // Close owl animation
    launchMainApp(); // Open Hogwarts OS
  });
});

// 🚀 Function to launch the main app
function launchMainApp() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("close", () => {
    stopSpeech(); // Stop AI speech when the window is closed
  });

  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow.webContents.send("fetch-welcome-message");
  });
}

// 🛑 Function to stop speech
function stopSpeech() {
  if (speechProcess) {
    speechProcess.kill();
    speechProcess = null;
  }
  say.stop(); // Stop speech on macOS/Windows
}

// 📜 Format magical newspaper
function formatAsNews(responseText) {
  return `
==========================================
📰 **THE DAILY PROPHET** 📰
==========================================

✨ **HOGWARTS OS UNVEILED!** ✨  
------------------------------------------
${responseText}

🔮 Type **'accio_help'** to explore more! 🔮
==========================================
`;
}

// 🔊 Function to speak text
function speakText(text) {
  stopSpeech(); // Stop any previous speech

  if (process.platform === "linux") {
    speechProcess = exec(`espeak -v en+f3 -s 125 -p 40 "${text}"`, (err) => {
      if (err) console.error("Speech error:", err);
      speechProcess = null;
    });
  } else {
    say.speak(text);
  }
}

// Stop speech from renderer process
ipcMain.on("stop-speech", () => {
  stopSpeech();
});
ipcMain.handle("fetch-agent-intro", async () => {
  try {
    const API_KEY = process.env.AGENT_AI_KEY;
    const API_URL = "https://api-lr.agent.ai/v1/action/invoke_agent";

    if (!API_KEY) throw new Error("API key missing! Set it in .env");

    const response = await axios.post(
      API_URL,
      {
        id: "deepseek-r1",
        user_input: "Generate three short, concise news headlines covering Hogwarts' latest weather, magical events, and general happenings. Keep it factual and immersive without assuming user intent.",
      },
      { headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" } }
    );

    let introText = response.data.response || "A magical operating system for wizards and witches!";
    const formattedText = formatAsNews(introText);

    console.log(formattedText);
    speakText(introText); // Speak response

    return formattedText;
  } catch (error) {
    console.error("Error fetching AI introduction:", error);
    return formatAsNews("🚨 Oops! The magical network failed. Try again later.");
  }
});

// 🧙 Handle AI response request
// Stop speech when the app is quitting (for Ctrl + C)
process.on("SIGINT", () => {
  console.log("\nStopping AI speech and exiting...");
  stopSpeech();
  process.exit();
});
