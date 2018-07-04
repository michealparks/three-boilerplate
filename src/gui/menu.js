import {Component, h} from 'preact'
import {updateQuality} from '../engine/renderer'
import {updateLensFlareScaling} from '../post-processing/lens-flare'
import state from '../state'

import {
  SCREEN_MENU,
  SCREEN_SETTINGS,
  SCREEN_GRAPHICS,
  RENDER_QUALITY_DECENT,
  RENDER_QUALITY_GOOD,
  RENDER_QUALITY_BEAUTIFUL
} from '../constants'

export default class Menu extends Component {
  constructor (props) {
    super(props)

    this.navigateTo = this.navigateTo.bind(this)

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

  updateRenderQuality (e) {
    const quality = Number.parseInt(e.target.id)
    updateQuality(quality)
    updateLensFlareScaling()
  }

  navigateTo (e) {
    const screen = Number.parseInt(e.target.id)
    this.setState({screen})
  }

  render (props, {screen}) {
    return (
      <div class='menu-overlay'>
        <div class='menu'>
          {screen === SCREEN_MENU &&
          <div>
            <h1>moon</h1>
            <button id={SCREEN_SETTINGS} onClick={this.navigateTo}>
              preferences
            </button>
            <button id={SCREEN_GRAPHICS} onClick={this.navigateTo}>
              graphics
            </button>
            <button onClick={this.onExit}>
              exit
            </button>
          </div>}

          {screen === SCREEN_SETTINGS &&
          <div>
            <button onClick={this.onFullscreen}>
              Fullscreen
            </button>
          </div>}

          {screen === SCREEN_GRAPHICS &&
          <div>
            <p>Render quality</p>
            <button id={RENDER_QUALITY_DECENT} onClick={this.updateRenderQuality}>
              Decent
            </button>
            <button id={RENDER_QUALITY_GOOD} onClick={this.updateRenderQuality}>
              Good
            </button>
            <button id={RENDER_QUALITY_BEAUTIFUL} onClick={this.updateRenderQuality}>
              Beautiful
            </button>
          </div>}

          {screen !== SCREEN_MENU &&
          <button id={SCREEN_MENU} onClick={this.navigateTo}>
            back
          </button>}
        </div>
      </div>
    )
  }
}
