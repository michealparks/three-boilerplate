import {
  WebGLRenderer,
  PCFSoftShadowMap
} from 'three'

import {
  EVENT_RENDER_QUALITY,
  RENDER_QUALITY_BAD,
  RENDER_QUALITY_DECENT,
  RENDER_QUALITY_GOOD,
  RENDER_QUALITY_BEAUTIFUL
} from '../constants'

import {camera} from '../camera'
import {updateCamera} from '../camera/input'
import scene from './scene'
import {updateSun} from './sun'
import {updateMeteorites} from '../objects/meteorite'
import {clamp} from '../math'
import {on} from '../util/mediator'

const renderer = new WebGLRenderer({
  canvas: window.canvas,
  antialias: true
})

const render = renderer.render.bind(renderer)

let frameID = -1
let resizeID = -1

renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(clamp(window.devicePixelRatio / 2, 1, 2))
renderer.setClearColor(0x000000, 1.0)

on(EVENT_RENDER_QUALITY, (quality) => {
  let val

  switch (quality) {
    case RENDER_QUALITY_BAD:
      val = 0.5; break
    case RENDER_QUALITY_DECENT:
      val = 1.0; break
    case RENDER_QUALITY_GOOD:
      val = 2.0; break
    case RENDER_QUALITY_BEAUTIFUL:
      val = 3.0; break
  }

  renderer.setPixelRatio(
    clamp(val, 0.5, window.devicePixelRatio))
})

addEventListener('resize', (e) => {
  if (!resizeID) resizeID = requestAnimationFrame(onResize)
})

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  resizeID = null
}

export const playFrames = (delta) => {
  frameID = requestAnimationFrame(playFrames)
  updateSun()
  updateMeteorites()
  updateCamera()
  render(scene, camera)
}

export const pauseFrames = () => {
  cancelAnimationFrame(frameID)
}

export default renderer
