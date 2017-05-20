const { app, BrowserWindow, Tray } = require('electron')
const path = require('path')

let mainWindow
let tray

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
  })
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

  const icon = process.platform === 'darwin' ? 'iconTray_mac.png' : 'iconTray_windows.png'
  const iconPath = path.join(__dirname, `./src/assets/${icon}`)
  tray = new Tray(iconPath)
})