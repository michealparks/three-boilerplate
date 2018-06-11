import './util/boilerplate'
import Player from './objects/player'
import {SIZE_MAP} from './util/constants'
import {playFrames, pauseFrames} from './world/renderer'
import {addActor} from './world/actors'

let isPaused = false

const toggle = (p = !isPaused) => {
  isPaused = p
  return isPaused ? pauseFrames() : playFrames()
}

document.addEventListener('visibilitychange', () => {
  toggle(document.visibilityState === 'hidden')
})

addEventListener('keydown', ({keyCode}) => {
  if (keyCode === 80) toggle()
})

for (let i = 1; i < 500; i++) {
  addActor(new Player({
    x: (Math.random() * SIZE_MAP) - (SIZE_MAP / 2),
    y: (Math.random() * SIZE_MAP) - (SIZE_MAP / 2),
    z: Math.random() + 2
  }))
}

playFrames()
