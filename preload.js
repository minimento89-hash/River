const { contextBridge } = require('electron');

// Expose a limited set of APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Example: You could expose a function to save files here
  // saveFile: (data) => ipcRenderer.invoke('save-file', data)
});