const { Tray } = require('electron')

class CustomTray extends Tray {

  constructor(iconPath, mainWindow) {
    super(iconPath)
    this.mainWindow = mainWindow
    this.setToolTip('Task Timer')
    this.on('click', this.onClick.bind(this))
  }

  onClick(event, bounds) {
    const { x, y } = bounds // Click event bounds
    const { height, width } = this.mainWindow.getBounds()
    const yPosition = process.platform === 'darwin' ? y : (y - height)

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide()
    } else {
      this.mainWindow.setBounds({
        x: Math.floor(x - (width / 2)),
        y: yPosition,
        height,
        width
      })
      this.mainWindow.show()
    }
  }
}

module.exports = CustomTray