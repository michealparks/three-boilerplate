import {
  DirectionalLight,
  DirectionalLightHelper,
  CameraHelper
} from 'three'

import {
  COLOR_SUNLIGHT,
  SIZE_MAP,
  SIZE_SHADOW_MAP
} from '../util/constants'

import {DEG2RAD} from '../math'

import state from '../state'

export const sun = new DirectionalLight(COLOR_SUNLIGHT, state.sunBrightness)
export const sunHelper = new DirectionalLightHelper(sun, /* length */ 20)

// https://threejs.org/docs/#api/lights/shadows/DirectionalLightShadow
sun.castShadow = true
sun.shadow.mapSize.width = SIZE_SHADOW_MAP
sun.shadow.mapSize.height = SIZE_SHADOW_MAP
sun.shadow.camera.left = -SIZE_MAP / 2
sun.shadow.camera.right = SIZE_MAP / 2
sun.shadow.camera.top = SIZE_MAP / 2
sun.shadow.camera.bottom = -SIZE_MAP / 2

sun.position.set(0, 0, (SIZE_MAP / 3))
sun.rotation.set(-90 * DEG2RAD, 0, 0)

sun.update = () => {
  sun.rotateX(0.01)
  sunHelper.rotateX(0.01)
  sunShadowHelper.rotateX(0.01)
}

export const sunShadowHelper = new CameraHelper(sun.shadow.camera)
