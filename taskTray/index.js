const { app, BrowserWindow, Tray } = require('electron')
const path = require('path')

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


  tray = new Tray(iconPath)
  tray.on('click', (e, bounds) => {
    // CLick event bounds
    const { x, y } = bounds
    // Window height & width
    const { height, width } = mainWindow.getBounds()

    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      const yPosition = process.platform === 'darwin' ? y : (y - height)
      const boundsConfig = {
        x: Math.floor(x - (width / 2)),
        y: yPosition,
        height,
        width,
      }
      console.log(boundsConfig)
      mainWindow.setBounds(boundsConfig)
      // mainWindow.setBounds({
      //   x: x - (width / 2),
      //   y: yPosition,
      //   height,
      //   width
      // })
      mainWindow.show()
    }
  })
})