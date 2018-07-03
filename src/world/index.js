import {
  SIZE_MAP,
  RADIUS_SKY_DOME
} from '../constants'

import state from '../state'
import {DEG2RAD} from '../math'
import sky from './sky'
import sun from './sun'
import earth from './earth'
import earthClouds from './earth-clouds'
import earthSpotLight from './earth-spotlight'
import {lensFlare} from '../post-processing/lens-flare'
import {cameraPivot} from '../camera'

const shadowCamera = sun.shadow.camera

let theta = 0.0

const sunZ = 30
sun.position.z = sunZ
sun.rotation.x = -90 * DEG2RAD
sun.rotation.z = -90 * DEG2RAD
earthSpotLight.position.z = sunZ + 60
lensFlare.position.z = (sunZ - 150)

const updateWorld = (delta) => {
  theta += (state.rotationSpeed)

  if (theta >= Math.PI * 2) theta = 0.0

  sky.rotation.x = Math.PI / 3
  sky.rotation.y = theta
  earth.rotation.y = (-theta * 8)
  earthClouds.rotation.y = (-theta * 16)

  // Todo: account for viewing direction
  const {x: cx, y: cy} = cameraPivot.position
  shadowCamera.right = cx + 20
  shadowCamera.left = cx - 20
  shadowCamera.top = cy + 20
  shadowCamera.bottom = cy - 20
  shadowCamera.updateProjectionMatrix()

  const x = SIZE_MAP * 1.9 * Math.cos(theta)
  const y = SIZE_MAP * 1.9 * Math.sin(theta)

  sun.position.x = lensFlare.position.x = x
  sun.position.y = lensFlare.position.y = y

  earthSpotLight.position.x = SIZE_MAP / 2 * Math.cos(theta)
  earthSpotLight.position.y = SIZE_MAP / 2 * Math.sin(theta)
}

export default updateWorld
