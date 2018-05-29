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

addActor(new Player({}))
playFrames()

// new Actor({
//   json: 'head',
//   onReady: (actor) => addActor(actor)
// })

document.addEventListener('visibilitychange', () => {
  switch (document.visibilityState) {
    case 'visible': return toggle(false)
    case 'hidden': return toggle(true)
  }
})

addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 80: return toggle()
  }
})
