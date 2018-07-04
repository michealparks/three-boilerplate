import {
  WebGLRenderer,
  PCFSoftShadowMap
} from 'three'

import {
  STORED_RENDER_QUALITY,
  RENDER_QUALITY_BAD,
  RENDER_QUALITY_DECENT,
  RENDER_QUALITY_GOOD,
  RENDER_QUALITY_BEAUTIFUL
} from '../constants'

import {camera} from '../camera'
import {clamp} from '../math'
import storage from '../util/storage'

let resizeID = -1

const renderer = new WebGLRenderer({
  canvas: window.canvas,
  antialias: true,
  powerPreference: 'high-performance'
})

export const render = renderer.render.bind(renderer)
export const maxAnisotropy = renderer.capabilities.getMaxAnisotropy()

storage.get(STORED_RENDER_QUALITY, (quality) => {
  renderer.setPixelRatio(quality || clamp(window.devicePixelRatio / 2, 1, 2))
})

renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 1.0)

export const updateQuality = (quality) => {
  let val

  switch (quality) {
    case RENDER_QUALITY_BAD:
      val = 0.5; break

    case RENDER_QUALITY_DECENT:
      val = 1.0; break

    case RENDER_QUALITY_GOOD:
      val = 1.5; break

    case RENDER_QUALITY_BEAUTIFUL:
      val = 2.0; break
  }

  renderer.setPixelRatio(clamp(val, 0.5, window.devicePixelRatio))
  storage.set(STORED_RENDER_QUALITY, val)
}

window.addEventListener('resize', (e) => {
  if (resizeID === -1) resizeID = requestAnimationFrame(onResize)
})

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  resizeID = -1
}

export default renderer
