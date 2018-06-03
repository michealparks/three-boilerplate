import './utils/boilerplate'
import Player from './objects/player'
import Actor from './objects/actor'

import {playFrames, pauseFrames} from './world/renderer'
import {addActor} from './world/actors'

let isPaused = false

const toggle = (p = !isPaused) => {
  isPaused = p
  return isPaused ? pauseFrames() : playFrames()
}

for (let i = 1; i < 300; i++) {
  addActor(new Player({x: i / 2, y: i / 2, z: i / 2}))
}

playFrames()

document.addEventListener('visibilitychange', () => {
  toggle(document.visibilityState === 'hidden')
})

addEventListener('keydown', ({keyCode}) => {
  if (keyCode === 80) toggle()
})
