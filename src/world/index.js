import sky from './sky'
import sun from './sun'
import {lensFlare} from '../post-processing/lens-flare'
import {cameraPivot} from '../camera'

const shadowCamera = sun.shadow.camera

let sinVal = 0

lensFlare.position.z = (sun.position.z - 50)

const updateWorld = () => {
  // sky
  sky.rotation.z += 0.0005

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

  lensFlare.position.x = sun.position.x
  lensFlare.position.y = sun.position.y
}

export default updateWorld
