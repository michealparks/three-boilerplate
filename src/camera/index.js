import {
  PerspectiveCamera,
  Group
} from 'three'

import {DEG2RAD} from '../math'

const radius = 5.0

export const cameraPivot = new Group()
cameraPivot.matrixAutoUpdate = false
cameraPivot.userData.isClickable = false

export const camera = new PerspectiveCamera(
  // Field of view
  50,
  // Aspect ratio
  window.innerWidth / window.innerHeight,
  // Near clipping plane
  0.1,
  // Far clipping plane
  600
)

camera.matrixAutoUpdate = false
camera.userData.isClickable = false

cameraPivot.add(camera)

cameraPivot.position.set(0, 0, 4)
camera.rotation.set(55 * DEG2RAD, 0, 0)
camera.position.set(0, -radius, 0)

cameraPivot.updateMatrix()
camera.updateMatrix()
