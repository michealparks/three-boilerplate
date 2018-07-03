let controller

let buttonsLayout = []
let buttonsCache = []
let buttonsStatus = []
let axesStatus = []
let pressed = []

export const update = () => {
  pressed = []

  if (controller === undefined) return pressed

  buttonsCache = []

  for (let k = 0; k < buttonsStatus.length; k++) {
    buttonsCache[k] = buttonsStatus[k]
  }

  buttonsStatus = []

  if (controller.buttons) {
    for (var b = 0, t = controller.buttons.length; b < t; b++) {
      if (controller.buttons[b].pressed === true) {
        pressed.push(buttonsLayout[b])
      }
    }
  }

  axesStatus = []

  if (controller.axes) {
    for (let a = 0, x = controller.axes.length; a < x; a++) {
      axesStatus.push(controller.axes[a].toFixed(2))
    }
  }

  buttonsStatus = pressed

  return pressed
}

export const buttonsPressed = (button, hold) => {
  let newPress = false

  for (let i = 0, s = buttonsStatus.length; i < s; i++) {
    if (buttonsStatus[i] === button) {
      newPress = true
      if (hold === false) {
        for (var j = 0, p = buttonsCache.length; j < p; j++) {
          if (buttonsCache[j] === button) {
            newPress = false
          }
        }
      }
    }
  }

  return newPress
}

window.addEventListener('gamepadconnected', ({gamepad}) => {
  if (controller !== undefined) return
  controller = gamepad
})

window.addEventListener('gamepaddisconnected', (event) => {
  controller = undefined
})
