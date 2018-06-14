require('./globals')

if (__dev__) require('../../webpack')

const electron = require('electron')
const {format} = require('url')
const {resolve} = require('path')

const {app, BrowserWindow} = electron

const onFatalCrash = (e) => {
  if (__dev__) console.error(e.stack)

  process.exit(1)
  // TODO
}

app.on('gpu-process-crashed', onFatalCrash)
process.on('uncaughtException', onFatalCrash)

const shouldQuit = app.makeSingleInstance(__noop__)

if (shouldQuit) {
  app.quit()
} else {
  app.commandLine.appendSwitch('enable-precise-memory-info')
  app.commandLine.appendSwitch('disable-renderer-backgrounding')
  app.commandLine.appendSwitch('js-flags', '--use_strict')

  app.once('ready', () => {
    const {bounds} = electron.screen.getPrimaryDisplay()

    const win = new BrowserWindow({
      title: '',
      center: true,
      width: bounds.width - 200,
      height: bounds.height - 200,
      minWidth: bounds.width / 2,
      minHeight: bounds.height * 3 / 4,
      show: false,
      titleBarStyle: 'hidden',
      webPreferences: {
        backgroundThrottling: false
      }
    })

    win.setMenuBarVisibility(false)
    win.once('ready-to-show', win.show)

    win.loadURL(format({
      protocol: 'file',
      slashes: true,
      pathname: resolve(__dirname, '../../public/index.html')
    }))

    if (__dev__) {
      win.openDevTools(/* {mode: 'detach'} */)
    }
  })
}
