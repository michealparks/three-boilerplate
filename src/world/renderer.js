import {
  WebGLRenderer,
  PCFSoftShadowMap
} from 'three'

import cameraPivot from './camera'
import scene from './scene'
import {sun} from './lights'
import {updateActors} from './actors'
import {clamp} from '../math'

const updateSun = sun.update
const [camera] = cameraPivot.children
const updateCamera = cameraPivot.update
const renderer = new WebGLRenderer({canvas: window.canvas, antialias: true})
const render = renderer.render.bind(renderer)

let frameID, resizeID

renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(clamp(window.devicePixelRatio / 2, 1, 2))
renderer.setClearColor(0x000000, 1.0)

addEventListener('resize', (e) => {
  if (!resizeID) {
    resizeID = requestAnimationFrame(onResize)
  }
})

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  resizeID = null
}

export const playFrames = (actors) => {
  frameID = requestAnimationFrame(playFrames)
  updateSun()
  updateActors()
  updateCamera()
  render(scene, camera)
}

export const pauseFrames = () => {
  cancelAnimationFrame(frameID)
}

export default renderer
