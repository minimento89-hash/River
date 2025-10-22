const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  // Determine the URL to load based on environment
  const isDevelopment = process.env.NODE_ENV === 'development' || process.env.VITE_DEV_SERVER_URL;
  const startUrl = isDevelopment
    ? 'http://localhost:8080' // Explicitly use port 8080 in development
    : url.format({
        pathname: path.join(__dirname, './dist/index.html'),
        protocol: 'file:',
        slashes: true
      });

  console.log('Attempting to load URL:', startUrl); // Added for debugging
  mainWindow.loadURL(startUrl);

  // Open the DevTools only in development
  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});