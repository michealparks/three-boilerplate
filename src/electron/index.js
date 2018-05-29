require('./globals')
const electron = require('electron')
const {format} = require('url')
const {resolve} = require('path')

const {app, BrowserWindow} = electron

const onFatalCrash = (e) => {
  if (__dev__) console.error(e.stack)

  // TODO
}

app.on('gpu-process-crashed', onFatalCrash)
process.on('uncaughtException', onFatalCrash)

const shouldQuit = app.makeSingleInstance(__noop__)

if (shouldQuit) {
  app.quit()
} else {
  app.commandLine.appendSwitch('disable-renderer-backgrounding')
  app.commandLine.appendSwitch('js-flags', '--use_strict')

  app.once('ready', () => {
    const {bounds} = electron.screen.getPrimaryDisplay()

    const win = new BrowserWindow({
      title: '',
      x: bounds.x + 100,
      y: bounds.y + 100,
      width: bounds.width - 200,
      height: bounds.height - 200,
      show: false,
      webPreferences: {
        backgroundThrottling: false
      }
    })

    win.once('ready-to-show', win.show)

    win.loadURL(format({
      protocol: 'file',
      slashes: true,
      pathname: resolve(__dirname, '../../public/index.html')
    }))

    if (__dev__) {
      win.openDevTools({mode: 'detach'})
    }
  })
}
