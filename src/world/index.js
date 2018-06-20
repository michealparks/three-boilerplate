import {SIZE_MAP} from '../constants'
import {DEG2RAD} from '../math'
import sky from './sky'
import sun from './sun'
import earth from './earth'
import earthClouds from './earth-clouds'
import {lensFlare} from '../post-processing/lens-flare'
import {cameraPivot} from '../camera'

const MOON_ROTATION_SPEED = 5e-4

const shadowCamera = sun.shadow.camera

let theta = 0
let sinVal = 0

earth.position.x = earthClouds.position.x = -(SIZE_MAP / 2) - 10
earth.position.z = earthClouds.position.z = -25
earth.rotation.x = earthClouds.rotation.x = (80 * DEG2RAD)

lensFlare.position.z = (sun.position.z - 50)

const updateWorld = () => {
  // sky
  theta += MOON_ROTATION_SPEED

  if (theta >= Math.PI * 2) theta = 0

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

  sun.position.x = x
  sun.position.y = y
  lensFlare.position.x = x
  lensFlare.position.y = y
}

export default updateWorld
