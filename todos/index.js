const { app, BrowserWindow, Menu } = require('electron')

let mainWindow

app.on('ready', () => {
  console.log('Electron is ready!')
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(`file://${__dirname}/main.html`)

  const mainMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(mainMenu)
})

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      { label: 'Add New Todo' },
      {
        label: 'Exit',
        click() {
          app.quit()
        }
      }
    ]
  }
]

// Mac menu compatibility
// Create a new obj @ the start of menuTemplate array
if (process.platform === 'darwin') {
  menuTemplate.unshift({})
}