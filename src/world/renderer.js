import {WebGLRenderer} from 'three'
import Camera from './camera'
import Scene from './scene'
import {updateActors} from './actors'

const renderer = new WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true
})

const render = renderer.render.bind(renderer)

let id

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio / 2)
renderer.setClearColor('#000', 1.0)

document.body.appendChild(renderer.domElement)

export const playFrames = (actors) => {
  id = requestAnimationFrame(playFrames)
  updateActors()
  render(Scene, Camera)
}

export const pauseFrames = () => {
  cancelAnimationFrame(id)
}
