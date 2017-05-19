const { app, BrowserWindow, Menu } = require('electron')

let mainWindow
let addTodoWindow

app.on('ready', () => {
  console.log('Electron is ready!')
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(`file://${__dirname}/main.html`)
  // Closes mainWindow and all other windows of the app
  mainWindow.on('closed', () => app.quit())

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
  addTodoWindow.loadURL(`file://${__dirname}/addTodoWindow.html`)
}

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add New Todo',
        // Hotkey compatible for both macOS (darwin) and Windows
        accelerator: process.platform === 'darwin' ? 'Command+E' : 'Ctrl+E',
        click() { createAddTodoWindow() }
      },
      {
        label: 'Exit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() { app.quit() }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Close window',
        accelerator: process.platform === 'darwin' ? 'Command+W' : 'Ctrl+W',
        click(item, focusedWindow) { focusedWindow !== mainWindow ? focusedWindow.close() : null }
      }
    ]
  }
]

// Mac menu compatibility
// Create a new object @ the start of menuTemplate array
process.platform === 'darwin' ? menuTemplate.unshift({}) : null

// Allow access to console while in production (when using a custom menu)
if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Console',
    accelerator: process.platform === 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
    click(item, focusedWindow) { focusedWindow.toggleDevTools() }
  })
}