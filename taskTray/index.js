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
  tray = new CustomTray(iconPath)

  tray.on('click', (e, bounds) => {
    const { x, y } = bounds // Click event bounds
    const { height, width } = mainWindow.getBounds()
    const yPosition = process.platform === 'darwin' ? y : (y - height)

    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.setBounds({
        x: Math.floor(x - (width / 2)),
        y: yPosition,
        height,
        width
      })
      mainWindow.show()
    }
  })
})