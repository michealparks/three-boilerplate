const {ipcRenderer: ipc} = require('electron')

window.App_Quit = () => {
  ipc.send('quit')
}

window.App_ToggleFullScreen = (toggle) => {
  ipc.send('toggleFullScreen', toggle)
}
