import renderer, {render} from '../engine/renderer'
import EffectComposer from '../post-processing/effect-composer'
import RenderPass from '../post-processing/effect-composer/render-pass'
// import BokehPass from '../post-processing/bokeh'
// import FilmPass from '../post-processing/film-pass'
import {camera} from '../camera'
import {updateCamera} from '../camera/input'
import scene from './scene'
import updateWorld from '.'
import {updateMeteorites} from '../objects/meteorite'

const composer = new EffectComposer(renderer)

composer.addPass(new RenderPass(scene, camera, {renderToScreen: true}))
// composer.addPass(new FilmPass({renderToScreen: true}))
// composer.addPass(new BokehPass(scene, camera, {renderToScreen: true}))

const MsPF = (1 / 60) * 1000

let frameID = -1
let lastTime = 0.0

const frame = (time) => {
  const delta = (time - lastTime) - MsPF
  lastTime = time

  updateWorld(delta)
  updateMeteorites(delta)
  updateCamera(delta)
  // render(scene, camera)
  composer.render(delta)

  frameID = requestAnimationFrame(frame)
}

export const playFrames = () => {
  lastTime = window.performance.now()
  frameID = requestAnimationFrame(frame)
}

export const pauseFrames = () => {
  cancelAnimationFrame(frameID)
}
