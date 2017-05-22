const { Tray } = require('electron')

class CustomTray extends Tray {
  constructor(iconPath) {
    super(iconPath)

  }
}

module.exports = CustomTray