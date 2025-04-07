const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,  
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('index.html');
}

ipcMain.handle('create-context-menu', (event, template) => {
    return Menu.buildFromTemplate(template);
});

ipcMain.handle('show-context-menu', () => {
    const menu = Menu.buildFromTemplate([
        { label: 'Open', click: () => mainWindow.webContents.send('menu-action', 'open') },
        { label: 'Delete', click: () => mainWindow.webContents.send('menu-action', 'delete') },
        { label: 'Properties', click: () => mainWindow.webContents.send('menu-action', 'properties') }
    ]);
    menu.popup();
});

app.whenReady().then(createWindow);
