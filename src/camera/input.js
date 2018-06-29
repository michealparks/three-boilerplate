import {
  CAMERA_MOVE_SPEED,
  CAMERA_ROTATE_SPEED
} from '../constants'

import {Matrix4} from 'three'
import {camera, cameraPivot} from './index'
import {DEG2RAD} from '../math'

const rotateMatrix = new Matrix4()
const translateMatrix = new Matrix4()

let dx = 0.0
let dy = 0.0
let dz = 0.0
let dr = 0.0

let camDx = 0.0
let camDy = 0.0
let camDz = 0.0
let camDr = 0.0

const catchUp = (v1, v2) => (v1 - v2) * CAMERA_MOVE_SPEED

export const toggleMove = (x, y, r, z, isDown) => {
  if (x !== 0) dx = isDown ? (x * CAMERA_MOVE_SPEED) : 0
  if (y !== 0) dy = isDown ? (y * CAMERA_MOVE_SPEED) : 0
  if (z !== 0) dz = isDown ? (z * CAMERA_MOVE_SPEED) : 0
  if (r !== 0) dr = isDown ? (r * CAMERA_ROTATE_SPEED * DEG2RAD) : 0
}

export const updateCamera = () => {
  // TODO exit if not moving
  camera.applyMatrix(rotateMatrix.makeRotationZ(camDr))
  camDr += catchUp(dr, camDr)

  const {z} = camera.rotation
  const cosZ = Math.cos(z)
  const sinZ = Math.sin(z)

  translateMatrix.set(
    1, 0, 0, camDx * cosZ - camDy * sinZ,
    0, 1, 0, camDx * sinZ + camDy * cosZ,
    0, 0, 1, camDz,
    0, 0, 0, 1
  )

  camDx += catchUp(dx, camDx)
  camDy += catchUp(dy, camDy)
  camDz += catchUp(dz, camDz)

  cameraPivot.applyMatrix(translateMatrix)
  cameraPivot.updateMatrix()
  camera.updateMatrix()
}
