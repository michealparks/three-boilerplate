import {PerspectiveCamera, Group, Matrix4} from 'three'
// import Matrix4 from '../math/Matrix4'
import {TO_RAD} from '../util/constants'

const CameraPivot = new Group()

const Camera = new PerspectiveCamera(
  // Field of view
  50,
  // Aspect ratio
  window.innerWidth / window.innerHeight,
  // Near clipping plane
  0.1,
  // Far clipping plane
  500
)

CameraPivot.add(Camera)

CameraPivot.matrixAutoUpdate = false
Camera.matrixAutoUpdate = false

const rotateSpeed = 0.5
const speed = 10
const radius = 5
const {sin, cos} = Math

let dx = 0
let dy = 0
let dz = 0
let dr = 0

// Distance camera from the center of the scene.
CameraPivot.position.set(0, 0, 4)
Camera.rotation.set(55 * TO_RAD, 0, 0)
Camera.position.set(0, -radius, 0)

CameraPivot.updateMatrix()
Camera.updateMatrix()

const rotateMatrix = new Matrix4()
const translateMatrix = new Matrix4()

CameraPivot.update = () => {
  if (dx !== 0 || dy !== 0 || dz !== 0 || dr !== 0) {
    Camera.applyMatrix(rotateMatrix.makeRotationZ(dr * TO_RAD))

    const {z} = Camera.rotation
    const cosZ = cos(z)
    const sinZ = sin(z)

    translateMatrix.set(
      1, 0, 0, dx * cosZ - dy * sinZ,
      0, 1, 0, dx * sinZ + dy * cosZ,
      0, 0, 1, dz,
      0, 0, 0, 1
    )

    CameraPivot.applyMatrix(translateMatrix)
    CameraPivot.updateMatrix()
    Camera.updateMatrix()
  }
}

const toggleMovementInput = (inputCode, isDown) => {
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

addEventListener('keydown', (e) =>
  toggleMovementInput(e.keyCode, true))

addEventListener('keyup', (e) =>
  toggleMovementInput(e.keyCode, false))

if ('onwheel' in window) {
  let timeoutID = -1
  let inputCode = 0

  addEventListener('wheel', (e) => {
    inputCode = e.deltaY > 0 ? 82 : 70
    toggleMovementInput(inputCode, true)

    if (timeoutID !== -1) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      toggleMovementInput(inputCode, false)
    }, 250)
  })
}

export default CameraPivot
