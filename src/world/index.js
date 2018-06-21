import {
  SIZE_MAP
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
let sinVal = 0.0

earth.position.x = earthClouds.position.x = -(SIZE_MAP / 2) - 10
earth.position.z = earthClouds.position.z = -25
earth.rotation.x = earthClouds.rotation.x = (80 * DEG2RAD)

earthSpotLight.target = earth

const sunZ = 30
sun.position.z = sunZ
sun.rotation.x = -90 * DEG2RAD
sun.rotation.z = -90 * DEG2RAD
earthSpotLight.position.z = sunZ + 60
lensFlare.position.z = (sunZ - 50)

const updateWorld = () => {
  theta += state.rotationSpeed

  if (theta >= Math.PI * 2) theta = 0.0

  sky.rotation.z = theta

  earth.rotation.y = (-theta * 8)
  earthClouds.rotation.y = (-theta * 16)

  // sun
  // sun.position.y += (Math.sin(sinVal)) * 0.05
  sinVal += 0.001

  if (sinVal > Math.PI) {
    sinVal = -Math.PI
  }
  // Todo: account for viewing direction
  shadowCamera.right = cameraPivot.position.x + 10
  shadowCamera.left = cameraPivot.position.x - 10
  shadowCamera.top = cameraPivot.position.y + 10
  shadowCamera.bottom = cameraPivot.position.y - 20
  shadowCamera.updateProjectionMatrix()

  const x = SIZE_MAP / 2 * Math.cos(theta)
  const y = SIZE_MAP / 2 * Math.sin(theta)

  sun.position.x = earthSpotLight.position.x = lensFlare.position.x = x
  sun.position.y = earthSpotLight.position.y = lensFlare.position.y = y
}

export default updateWorld
