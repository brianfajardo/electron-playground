const { app, BrowserWindow } = require('electron')
const path = require('path')
const CustomTray = require('./app/CustomTray')

let mainWindow
let tray

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

  // Prevent icon disappearing by assigning a variable
  // and preventing garbage collection
  tray = new CustomTray(iconPath, mainWindow)
})