import {
  MOUSE_LEFT_DRAG_SPEED,
  MOUSE_RIGHT_DRAG_SPEED,
  MOUSE_WHEEL_SPEED
} from '../constants'

import onCanvasClick from './canvas-click'
import state from '../state'
import {toggleMove} from '../camera/input'
import {playFrames, pauseFrames} from '../world/renderer'

const {canvas, cursor} = window
const {style} = cursor

let startX = 0.0
let startY = 0.0
let lastX = 0.0
let lastY = 0.0
let dX = 0.0
let dY = 0.0
let wheelEndTimeoutID = -1

const onLeftMouseDownMove = ({clientX, clientY}) => {
  dX = clientX - lastX
  dY = clientY - lastY
  lastX = clientX
  lastY = clientY
  toggleMove(
    -dX * MOUSE_LEFT_DRAG_SPEED, dY * MOUSE_LEFT_DRAG_SPEED, 0, 0, true)
}

const onRightMouseDownMove = ({clientX}) => {
  dX = clientX - lastX
  lastX = clientX
  toggleMove(0, 0, dX * MOUSE_RIGHT_DRAG_SPEED, 0, true)
}

const togglePause = () => {
  state.isPaused = !state.isPaused
  return state.isPaused ? pauseFrames() : playFrames()
}

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

    // Pause
    case 80: return togglePause()
  }
}

window.addEventListener('mousemove', ({clientX, clientY}) => {
  style.transform = `translate(${clientX}px, ${clientY}px)`
}, {passive: true})

window.addEventListener('keydown', (e) =>
  toggleInput(e.keyCode, true),
{passive: true})

window.addEventListener('keyup', (e) =>
  toggleInput(e.keyCode, false),
{passive: true})

window.addEventListener('wheel', ({deltaY}) => {
  toggleMove(0, 0, 0, deltaY * MOUSE_WHEEL_SPEED, true)

  if (wheelEndTimeoutID !== -1) clearTimeout(wheelEndTimeoutID)

  wheelEndTimeoutID = setTimeout(toggleMove, 10, 0, 0, 0, 1, false)
}, {passive: true})

window.addEventListener('gamepadconnected', (e) => {
  // TODO
}, {passive: true})

canvas.addEventListener('mousedown', ({which, clientX, clientY}) => {
  startX = lastX = clientX
  startY = lastY = clientY

  if (which === 1) {
    state.isLeftMouseDown = true
    canvas.addEventListener('mousemove', onLeftMouseDownMove, {passive: true})
  } else if (which === 3) {
    state.isRightMouseDown = true
    canvas.addEventListener('mousemove', onRightMouseDownMove, {passive: true})
  }
}, {passive: true})

window.addEventListener('mouseup', (e) => {
  if (e.target.id === 'canvas' &&
      Math.abs(lastX - startX) < 5 &&
      Math.abs(lastY - startY) < 5) onCanvasClick(e)

  if (e.which === 1) {
    state.isLeftMouseDown = false
    canvas.removeEventListener('mousemove', onLeftMouseDownMove)
    toggleMove(1, 1, 0, 0, false)
  } else if (e.which === 3) {
    state.isRightMouseDown = true
    canvas.removeEventListener('mousemove', onRightMouseDownMove)
    toggleMove(0, 0, 1, 0, false)
  }
}, {passive: true})
