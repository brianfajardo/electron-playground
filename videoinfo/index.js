// Electron runs in Node therefore uses CommonJS
const { app, BrowserWindow, ipcMain } = require('electron')
const ffmpeg = require('fluent-ffmpeg')

// Global mainWindow
let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(`file://${__dirname}/index.html`)
})

// Receiving an event from ipcRenderer from BrowserWindow
ipcMain.on('video:submit', (e, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send('video:duration', metadata.format.duration)
  })
})