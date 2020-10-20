import { app, BrowserWindow } from 'electron'
import * as isDev from 'electron-is-dev'
import * as path from 'path'

let mainWindow = BrowserWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    center: true,
    kiosk: !isDev,
    resizable: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  if (isDev) {
    mainWindow.loadURL('http://localhost:3019')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'))
  }
  mainWindow.on('closed', () => {
    mainWindow = undefined
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
