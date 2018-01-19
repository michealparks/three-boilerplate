import {WebGLRenderer} from 'three'
import Camera from './camera'
import Scene from './scene'
import {updateActors} from './actors'

const renderer = new WebGLRenderer({ antialias: true })
const render = renderer.render.bind(renderer)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio/2)
renderer.setClearColor('#000', 1.0)
document.body.appendChild(renderer.domElement)

let id

export const playFrames = (actors) => {
  id = window.requestAnimationFrame(playFrames)
  updateActors()
  render(Scene, Camera)
}

export const pauseFrames = () => {
  window.cancelAnimationFrame(id)
}
