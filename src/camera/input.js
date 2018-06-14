import {Matrix4} from 'three'
import {camera, cameraPivot} from './index'
import {DEG2RAD} from '../math'
import state from '../state'

const speed = 10.0
const rotateSpeed = 0.5
const rotateMatrix = new Matrix4()
const translateMatrix = new Matrix4()

let dx = 0.0
let dy = 0.0
let dz = 0.0
let dr = 0.0

// Mouse handlers
let lastScreenX = 0.0
let lastScreenY = 0.0
let deltaX = 0.0
let deltaY = 0.0
let mouseWheelTimeoutId = -1
let mouseWheelInputCode = 0

const toggleInput = (inputCode, isDown) => {
  switch (inputCode) {
    // move DOWN
    case 83: case 40: return toggleMove(0, -1, 0, 0, isDown)
    // move UP
    case 87: case 38: return toggleMove(0, +1, 0, 0, isDown)
    // move LEFT
    case 65: case 37: return toggleMove(-1, 0, 0, 0, isDown)
    // move RIGHT
    case 68: case 39: return toggleMove(+1, 0, 0, 0, isDown)
    // rotate LEFT
    case 81: return toggleMove(0, 0, -1, 0, isDown)
    // rotate RIGHT
    case 69: return toggleMove(0, 0, +1, 0, isDown)
    // zoom IN
    case 82: return toggleMove(0, 0, 0, -1, isDown)
    // zoom OUT
    case 70: return toggleMove(0, 0, 0, +1, isDown)
  }
}

const toggleMove = (x, y, r, z, isDown) => {
  if (x !== 0) dx = isDown ? (x / speed) : 0
  if (y !== 0) dy = isDown ? (y / speed) : 0
  if (z !== 0) dz = isDown ? (z / speed) : 0
  if (r !== 0) dr = isDown ? (r / rotateSpeed) : 0
}

const onLeftMouseMove = ({clientX, clientY}) => {
  deltaX = clientX - lastScreenX
  deltaY = clientY - lastScreenY
  lastScreenX = clientX
  lastScreenY = clientY
  toggleMove(-deltaX / 8, deltaY / 8, 0, 0, true)
}

const onRightMouseMove = ({clientX}) => {
  deltaX = clientX - lastScreenX
  lastScreenX = clientX
  toggleMove(0, 0, deltaX / 16, 0, true)
}

export const updateCamera = () => {
  if (dx !== 0 || dy !== 0 || dz !== 0 || dr !== 0) {
    camera.applyMatrix(rotateMatrix.makeRotationZ(dr * DEG2RAD))

    const {z} = camera.rotation
    const cosZ = Math.cos(z)
    const sinZ = Math.sin(z)

    translateMatrix.set(
      1, 0, 0, dx * cosZ - dy * sinZ,
      0, 1, 0, dx * sinZ + dy * cosZ,
      0, 0, 1, dz,
      0, 0, 0, 1
    )

    cameraPivot.applyMatrix(translateMatrix)
    cameraPivot.updateMatrix()
    camera.updateMatrix()
  }
}

window.canvas.addEventListener('mousedown', (e) => {
  if (e.target.id !== e.currentTarget.id) return

  const {which, clientX, clientY} = e

  if (e.which === 1) {
    lastScreenX = clientX
    lastScreenY = clientY
    state.isLeftMouseDown = true
    window.canvas.addEventListener('mousemove', onLeftMouseMove)
  } else if (which === 3) {
    lastScreenX = clientX
    state.isRightMouseDown = true
    window.canvas.addEventListener('mousemove', onRightMouseMove)
  }
})

window.canvas.addEventListener('mouseup', (e) => {
  if (e.target.id !== e.currentTarget.id) return

  const {which} = e

  if (which === 1) {
    state.isLeftMouseDown = false
    toggleMove(1, 1, 0, 0, false)
    window.canvas.removeEventListener('mousemove', onLeftMouseMove)
  } else if (which === 3) {
    state.isRightMouseDown = true
    toggleMove(0, 0, 1, 0, false)
    window.canvas.removeEventListener('mousemove', onRightMouseMove)
  }
})

if ('onwheel' in window) {
  addEventListener('wheel', (e) => {
    mouseWheelInputCode = e.deltaY > 0 ? 82 : 70
    toggleInput(mouseWheelInputCode, true)

    if (mouseWheelTimeoutId !== -1) {
      clearTimeout(mouseWheelTimeoutId)
    }

    mouseWheelTimeoutId = setTimeout(() => {
      toggleInput(mouseWheelInputCode, false)
    }, 250)
  })
}

addEventListener('gamepadconnected', (e) => {})
addEventListener('keydown', (e) => toggleInput(e.keyCode, true))
addEventListener('keyup', (e) => toggleInput(e.keyCode, false))
