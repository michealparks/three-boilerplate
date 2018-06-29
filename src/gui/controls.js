import {
  ROTATE_SPEED_SLOW,
  ROTATE_SPEED_MEDIUM,
  ROTATE_SPEED_FAST,
  STORED_ROTATE_SPEED,
  STRUCTURE_TYPE_DELETE,
  STRUCTURE_TYPE_NONE,
  STRUCTURE_TYPE_DOME,
  STRUCTURE_TYPE_SOLAR_GRID
} from '../constants'

import {h, Component} from 'preact'
import state from '../state'
import {set} from '../util/storage'

export default class Controls extends Component {
  constructor (props) {
    super(props)

    this.updateSpeed = this.updateSpeed.bind(this)
    this.updateStruct = this.updateStruct.bind(this)

    this.state = {
      rotationSpeed: state.rotationSpeed,
      structure: state.curStructBlueprint
    }
  }

  updateSpeed (e) {
    const speed = Number.parseFloat(e.target.id)
    state.rotationSpeed = speed
    this.setState({rotationSpeed: speed})
    set(STORED_ROTATE_SPEED, speed)
  }

  updateStruct (e) {
    const structure = Number.parseInt(e.target.id)

    if (structure === state.curStructBlueprint) {
      state.curStructBlueprint = STRUCTURE_TYPE_NONE
    } else {
      state.curStructBlueprint = structure
    }

    this.setState({structure: state.curStructBlueprint})
  }

  render (props, {rotationSpeed, structure}) {
    return (
      <div class='controls'>
        <div class='speed'>
          <button
            id={ROTATE_SPEED_SLOW}
            class={rotationSpeed === ROTATE_SPEED_SLOW ? 'selected' : null}
            onClick={this.updateSpeed}>
            slow
          </button>
          <button
            id={ROTATE_SPEED_MEDIUM}
            class={rotationSpeed === ROTATE_SPEED_MEDIUM ? 'selected' : null}
            onClick={this.updateSpeed}>
            medium
          </button>
          <button
            id={ROTATE_SPEED_FAST}
            class={rotationSpeed === ROTATE_SPEED_FAST ? 'selected' : null}
            onClick={this.updateSpeed}>
            fast
          </button>
        </div>

        <div class='structures'>
          <button
            id={STRUCTURE_TYPE_DOME}
            class={structure === STRUCTURE_TYPE_DOME ? 'selected' : null}
            onClick={this.updateStruct}>
            dome
          </button>
          <button
            id={STRUCTURE_TYPE_SOLAR_GRID}
            class={structure === STRUCTURE_TYPE_SOLAR_GRID ? 'selected' : null}
            onClick={this.updateStruct}>
            solar grid
          </button>
          <button
            id={STRUCTURE_TYPE_DELETE}
            class={structure === STRUCTURE_TYPE_DELETE ? 'selected' : null}
            onClick={this.updateStruct}>
            delete
          </button>
        </div>
      </div>
    )
  }
}
