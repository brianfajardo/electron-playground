const { app, BrowserWindow } = require('electron')
const path = require('path')
const CustomTray = require('./app/CustomTray')

let mainWindow

app.on('ready', () => {
  // Main Window
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false
  })
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

  // Tray
  const icon = process.platform === 'darwin' ? 'iconTray_mac.png' : 'iconTray_windows.png'
  const iconPath = path.join(__dirname, `./src/assets/${icon}`)
  new CustomTray(iconPath, mainWindow)
})