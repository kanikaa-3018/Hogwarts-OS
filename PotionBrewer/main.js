const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,  // Allow require() in renderer.js
            contextIsolation: false
        }
    });

    mainWindow.loadFile("index.html");
});
