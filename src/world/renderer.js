import {
  WebGLRenderer,
  PCFSoftShadowMap
} from 'three'

import {
  STORED_RENDER_QUALITY,
  EVENT_RENDER_QUALITY,
  RENDER_QUALITY_BAD,
  RENDER_QUALITY_DECENT,
  RENDER_QUALITY_GOOD,
  RENDER_QUALITY_BEAUTIFUL
} from '../constants'

import {camera} from '../camera'
import {updateCamera} from '../camera/input'
import scene from './scene'
import updateWorld from '.'
import {updateMeteorites} from '../objects/meteorite'
import {clamp} from '../math'
import {on} from '../util/mediator'
import storage from '../util/storage'

const renderer = new WebGLRenderer({
  canvas: window.canvas,
  antialias: true
})

const render = renderer.render.bind(renderer)

let frameID = -1
let resizeID = -1

renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

storage.get(STORED_RENDER_QUALITY, (quality) => {
  renderer.setPixelRatio(quality || clamp(window.devicePixelRatio / 2, 1, 2))
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 1.0)

on(EVENT_RENDER_QUALITY, (quality) => {
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

  renderer.setPixelRatio(
    clamp(val, 0.5, window.devicePixelRatio))

  storage.set(STORED_RENDER_QUALITY, val)
})

addEventListener('resize', (e) => {
  if (resizeID === -1) resizeID = requestAnimationFrame(onResize)
})

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  resizeID = -1
}

export const playFrames = (delta) => {
  frameID = requestAnimationFrame(playFrames)
  updateWorld()
  updateMeteorites()
  updateCamera()
  render(scene, camera)
}

export const pauseFrames = () => {
  cancelAnimationFrame(frameID)
}

export default renderer
