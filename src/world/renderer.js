import {WebGLRenderer} from 'three'
import CameraPivot from './camera'
import Scene from './scene'
import {updateActors} from './actors'

const [Camera] = CameraPivot.children
const updateCamera = CameraPivot.update
const Renderer = new WebGLRenderer({canvas: window.canvas, antialias: true})
const render = Renderer.render.bind(Renderer)

let frameID, resizeID

Renderer.shadowMap.enabled = true
Renderer.setSize(window.innerWidth, window.innerHeight)
Renderer.setPixelRatio(window.devicePixelRatio)
Renderer.setClearColor('#000', 1.0)

addEventListener('resize', (e) => {
  if (!resizeID) {
    resizeID = requestAnimationFrame(onResize)
  }
})

const onResize = () => {
  Camera.aspect = window.innerWidth / window.innerHeight
  Camera.updateProjectionMatrix()
  Renderer.setSize(window.innerWidth, window.innerHeight)
  resizeID = null
}

export const playFrames = (actors) => {
  frameID = requestAnimationFrame(playFrames)
  updateActors()
  updateCamera()
  render(Scene, Camera)
}

export const pauseFrames = () => {
  cancelAnimationFrame(frameID)
}
