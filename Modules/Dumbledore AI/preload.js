const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  askAkash: (question) => ipcRenderer.invoke("ask-akash", question),
});
