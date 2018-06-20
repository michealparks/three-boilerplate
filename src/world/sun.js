import {
  DirectionalLight,
  DirectionalLightHelper,
  CameraHelper
} from 'three'

import {
  COLOR_SUNLIGHT,
  SIZE_MAP,
  SIZE_SHADOW_MAP
} from '../constants'

import {DEG2RAD} from '../math'
import state from '../state'

export const sun = new DirectionalLight(COLOR_SUNLIGHT, state.sunBrightness)
export const sunHelper = new DirectionalLightHelper(sun, /* length */ 20)
export const sunShadowHelper = new CameraHelper(sun.shadow.camera)

// https://threejs.org/docs/#api/lights/shadows/DirectionalLightShadow
sun.castShadow = true
sun.shadow.mapSize.width = SIZE_SHADOW_MAP
sun.shadow.mapSize.height = SIZE_SHADOW_MAP

// sun.shadow.camera.far = 100
// sun.shadow.bias = -0.00001
// sun.shadow.darkness = 1

sun.position.set((SIZE_MAP / 2), 0, 30)
sun.rotation.set(-90 * DEG2RAD, 0, -90 * DEG2RAD)

export default sun
