import './index.css'
import Player from './objects/player'

import {playFrames, pauseFrames} from './world/renderer'
import {addActor} from './world/actors'

let isPaused = false

const toggle = () => {
  isPaused = !isPaused
  return isPaused ? pauseFrames() : playFrames()
}

addActor(new Player())
playFrames()

addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 80: return toggle()
  }
})

// addEventListener('keydown', ({keyCode}) => console.log(keyCode))
