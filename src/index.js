import './world/terrain'
import './input'
import './audio'
import './util/boilerplate'
import {h, render} from 'preact'
import {playFrames} from './world/renderer'

import Gui from './gui'

render(<Gui />, document.body)
playFrames()
