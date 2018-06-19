import {
  DirectionalLight,
  DirectionalLightHelper,
  CameraHelper,
  TextureLoader,
  Color
} from 'three'

import {
  COLOR_SUNLIGHT,
  SIZE_MAP,
  SIZE_SHADOW_MAP
} from '../constants'

import {resolve} from 'path'
import {lensFlare, addLensFlareElement} from '../post-processing/lens-flare'
import {cameraPivot} from '../camera'
import {DEG2RAD} from '../math'
import state from '../state'

export const sun = new DirectionalLight(COLOR_SUNLIGHT, state.sunBrightness)
export const sunHelper = new DirectionalLightHelper(sun, /* length */ 20)
export const sunShadowHelper = new CameraHelper(sun.shadow.camera)

const textureFlare0 = new TextureLoader().load(
  resolve(__root__, 'public/assets/lens_flare_alpha.png')
)

addLensFlareElement(textureFlare0, 350, 0.0, new Color(COLOR_SUNLIGHT))

const shadowCamera = sun.shadow.camera

let val = 0

export const updateSun = () => {
  sun.position.y += (Math.sin(val)) * 0.05
  val += 0.001

  if (val > Math.PI) {
    val = -Math.PI
  }
  // Todo: account for viewing direction
  shadowCamera.right = cameraPivot.position.x + 10
  shadowCamera.left = cameraPivot.position.x - 10
  shadowCamera.top = cameraPivot.position.y + 10
  shadowCamera.bottom = cameraPivot.position.y - 20
  shadowCamera.updateProjectionMatrix()

  lensFlare.position.copy(sun.position)
}

// https://threejs.org/docs/#api/lights/shadows/DirectionalLightShadow
sun.castShadow = true
sun.shadow.mapSize.width = SIZE_SHADOW_MAP
sun.shadow.mapSize.height = SIZE_SHADOW_MAP

// sun.shadow.camera.far = 100
// sun.shadow.bias = -0.00001
// sun.shadow.darkness = 1

sun.position.set((SIZE_MAP / 2), 0, (SIZE_MAP / 16))
sun.rotation.set(-90 * DEG2RAD, 0, -90 * DEG2RAD)
