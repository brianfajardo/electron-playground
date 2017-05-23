const { app, BrowserWindow } = require('electron')
const MainWindow = require('./app/MainWindow.js')
const CustomTray = require('./app/CustomTray')
const path = require('path')

let mainWindow
let tray

app.on('ready', () => {
  // Main Window
  process.platform === 'darwin' ? app.dock.hide() : null
  mainWindow = new MainWindow()
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

  // Tray
  const icon = process.platform === 'darwin' ? 'iconTray_mac.png' : 'iconTray_windows.png'
  const iconPath = path.join(__dirname, `./src/assets/${icon}`)

  // Prevent icon disappearing by assigning a variable
  // and preventing garbage collection
  tray = new CustomTray(iconPath, mainWindow)
})