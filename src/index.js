import {SIZE_MAP} from './constants'
import './input'
import './util/boilerplate'
import {h, render} from 'preact'
import {addMeteorite} from './objects/meteorite'
import {playFrames} from './world/renderer'
import {clamp} from './math'
import Gui from './gui'

for (let i = 1; i < 250; i++) {
  addMeteorite(
    // x
    (Math.random() * SIZE_MAP / 2) - (SIZE_MAP / 2),
    // y
    (Math.random() * SIZE_MAP / 2) - (SIZE_MAP / 2),
    // z
    (Math.random() + 2),
    // radius
    clamp(Math.random() / 5, 0.05, 1)
  )
}

render(<Gui />, document.body)
playFrames()
