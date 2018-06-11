import {
  WebGLRenderer,
  PCFSoftShadowMap
} from 'three'

import CameraPivot from './camera'
import Scene from './scene'
import {sun} from './lights'
import {updateActors} from './actors'

const updateSun = sun.update
const [Camera] = CameraPivot.children
const updateCamera = CameraPivot.update
const renderer = new WebGLRenderer({canvas: window.canvas, antialias: true})
const render = renderer.render.bind(renderer)

let frameID, resizeID

renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio / 2)
renderer.setClearColor('#000', 1.0)

addEventListener('resize', (e) => {
  if (!resizeID) {
    resizeID = requestAnimationFrame(onResize)
  }
})

const onResize = () => {
  Camera.aspect = window.innerWidth / window.innerHeight
  Camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  resizeID = null
}

export const playFrames = (actors) => {
  frameID = requestAnimationFrame(playFrames)
  updateSun()
  updateActors()
  updateCamera()
  render(Scene, Camera)
}

export const pauseFrames = () => {
  cancelAnimationFrame(frameID)
}

export default renderer
