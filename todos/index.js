const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  console.log('Electron is ready')
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(`file://${__dirname}/main.html`)
})