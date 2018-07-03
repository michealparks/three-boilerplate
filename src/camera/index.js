import {
  PerspectiveCamera,
  Group
} from 'three'

import {DEG2RAD} from '../math'
import scene from '../world/scene'

const FOV = 50
const ASPECT_RATIO = window.innerWidth / window.innerHeight
const NEAR_CLIP = 0.1
const FAR_CLIP = 700
const RADIUS = 5.0

export const cameraPivot = new Group()
cameraPivot.matrixAutoUpdate = false

export const camera = new PerspectiveCamera(
  FOV,
  ASPECT_RATIO,
  NEAR_CLIP,
  FAR_CLIP)
camera.matrixAutoUpdate = false

cameraPivot.add(camera)

cameraPivot.position.set(0, 0, 4)
camera.rotation.set(55 * DEG2RAD, 0, 0)
camera.position.set(0, -RADIUS, 0)

cameraPivot.updateMatrix()
camera.updateMatrix()

scene.add(cameraPivot)

export default camera
