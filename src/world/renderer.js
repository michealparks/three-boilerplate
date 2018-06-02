import {WebGLRenderer} from 'three'
import CameraPivot from './camera'
import Scene from './scene'
import {updateActors} from './actors'

const [Camera] = CameraPivot.children
const {update} = CameraPivot

const Renderer = new WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true
})

Renderer.shadowMap.enabled = true

const render = Renderer.render.bind(Renderer)

let id, RAFid

Renderer.setSize(window.innerWidth, window.innerHeight)
Renderer.setPixelRatio(window.devicePixelRatio / 1.5)
Renderer.setClearColor('#000', 1.0)

Scene.add(CameraPivot)

addEventListener('resize', (e) => {
  if (!RAFid) {
    RAFid = requestAnimationFrame(onResize)
  }
})

const onResize = () => {
  Camera.aspect = window.innerWidth / window.innerHeight
  Camera.updateProjectionMatrix()
  Renderer.setSize(window.innerWidth, window.innerHeight)
  RAFid = null
}

export const playFrames = (actors) => {
  id = requestAnimationFrame(playFrames)
  updateActors()
  update()
  render(Scene, Camera)
}

export const pauseFrames = () => {
  cancelAnimationFrame(id)
}
