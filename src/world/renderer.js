import {render} from '../engine/renderer'
import {camera} from '../camera'
import {updateCamera} from '../camera/input'
import scene from './scene'
import updateWorld from '.'
import {updateMeteorites} from '../objects/meteorite'

const MsPF = (1 / 60) * 1000

let frameID = -1
let lastTime = 0.0

const frame = (time) => {
  const delta = (time - lastTime) - MsPF
  lastTime = time

  updateWorld(delta)
  updateMeteorites(delta)
  updateCamera(delta)
  render(scene, camera)

  frameID = requestAnimationFrame(frame)
}

export const playFrames = () => {
  lastTime = window.performance.now()
  frameID = requestAnimationFrame(frame)
}

export const pauseFrames = () => {
  cancelAnimationFrame(frameID)
}
