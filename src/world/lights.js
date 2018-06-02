import {DirectionalLight} from 'three'

export const directionalLight = new DirectionalLight(0xffffff, 0.1)

directionalLight.position.set(1, 1, 20)

// TODO: shadow map
// https://threejs.org/docs/#api/lights/shadows/DirectionalLightShadow
directionalLight.castShadow = true
