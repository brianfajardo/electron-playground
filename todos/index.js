const { app, BrowserWindow, Menu } = require('electron')

let mainWindow
let addTodoWindow

app.on('ready', () => {
  console.log('Electron is ready!')
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(`file://${__dirname}/main.html`)

  const mainMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(mainMenu)
})

function createAddTodoWindow() {
  addTodoWindow = new BrowserWindow({
    // pixel values
    height: 250,
    width: 400,
    title: 'Add Todo'
  })
}

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add New Todo',
        // Hotkey compatible for both macOS (darwin) and Windows
        accelerator: process.platform === 'darwin' ? 'Command+A' : 'Ctrl+A',
        click() { createAddTodoWindow() }
      },
      {
        label: 'Exit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() { app.quit() }
      }
    ]
  }
]

// Mac menu compatibility
// Create a new object @ the start of menuTemplate array
if (process.platform === 'darwin') {
  menuTemplate.unshift({})
}