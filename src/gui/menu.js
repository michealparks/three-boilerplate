import {Component, h} from 'preact'
import {updateQuality} from '../engine/renderer'
import state from '../state'

import {
  SCREEN_MENU,
  SCREEN_SETTINGS,
  RENDER_QUALITY_DECENT,
  RENDER_QUALITY_GOOD,
  RENDER_QUALITY_BEAUTIFUL
} from '../constants'

export default class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {screen: SCREEN_MENU}
  }

  onExit () {
    // Todo save
    window.App_Quit()
  }

  onFullscreen () {
    state.isFullscreen = !state.isFullscreen
    window.App_ToggleFullScreen(state.isFullscreen)
  }

  render (props, {screen}) {
    return (
      <div class='menu-overlay'>
        <div class='menu'>
          {screen === SCREEN_MENU &&
          <div class='menu-main'>
            <h1>moon</h1>
            <button onClick={() => this.setState({screen: SCREEN_SETTINGS})}>
              settings
            </button>
            <button onClick={this.onExit}>
              exit
            </button>
          </div>}

          {screen === SCREEN_SETTINGS &&
          <div class='menu-settings'>
            <button onClick={this.onFullscreen}>
              Fullscreen
            </button>
            <p>Render quality</p>
            <button onClick={() => updateQuality(RENDER_QUALITY_DECENT)}>
              Decent
            </button>
            <button onClick={() => updateQuality(RENDER_QUALITY_GOOD)}>
              Good
            </button>
            <button onClick={() => updateQuality(RENDER_QUALITY_BEAUTIFUL)}>
              Beautiful
            </button>
          </div>}
        </div>
      </div>
    )
  }
}
