import './util/boilerplate'
import {h, render} from 'preact'
import {addMeteorite} from './objects/meteorite'
import {SIZE_MAP} from './constants'
import {playFrames, pauseFrames} from './world/renderer'
import {findIntersectObjects} from './world/input'
import {clamp} from './math'
import Gui from './gui'

let isPaused = false

const toggle = (p) => {
  isPaused = p
  return isPaused ? pauseFrames() : playFrames()
}

const onObjectClick = (object) => {

}

const onNoObjectClick = () => {

}

addEventListener('keydown', (e) => {
  // P key
  if (e.keyCode === 80) toggle(!isPaused)
})

for (let i = 1; i < 100; i++) {
  addMeteorite(
    /* x */ (Math.random() * SIZE_MAP) - (SIZE_MAP / 2),
    /* y */ (Math.random() * SIZE_MAP) - (SIZE_MAP / 2),
    /* z */ Math.random() + 2,
    /* radius */ clamp(Math.random() / 5, 0.05, 1)
  )
}

render(<Gui />, document.body)

playFrames()

addEventListener('mousedown', (e) => {
  const intersects = findIntersectObjects(e)

  for (let i = 0, l = intersects.length; i < l; i++) {
    if (intersects[i].object.userData.isClickable === true) {
      return onObjectClick(intersects[i].object)
    }
  }

  return onNoObjectClick()
})
