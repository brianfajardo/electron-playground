const { BrowserWindow } = require('electron')

class MainWindow extends BrowserWindow {

  constructor() {
    // super props are specific to this app
    super({
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      // On app blur, prevent background throttling
      // Fixes app freeze on blur
      webPreferences: { backgroundThrottling: false }
    })
    this.on('blur', this.onBlur.bind(this))
  }

  onBlur() {
    this.hide()
  }
}

module.exports = MainWindow