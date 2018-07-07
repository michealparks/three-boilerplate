import {Component, h} from 'preact'
import {updateQuality} from '../engine/renderer'
import {updateLensFlareScaling} from '../post-processing/lens-flare'
import {toggleMusic} from '../audio'
import state from '../state'
import {set} from '../util/storage'

import {
  SCREEN_MENU,
  SCREEN_SETTINGS,
  SCREEN_GRAPHICS,
  RENDER_QUALITY_DECENT,
  RENDER_QUALITY_GOOD,
  RENDER_QUALITY_BEAUTIFUL,
  STORED_IS_FULLSCREEN,
  STORED_IS_MUSIC_ON
} from '../constants'

export default class Menu extends Component {
  constructor (props) {
    super(props)

    this.toggleFullscreen = this.toggleFullscreen.bind(this)
    this.toggleIsMusicOn = this.toggleIsMusicOn.bind(this)
    this.navigateTo = this.navigateTo.bind(this)

    this.state = {
      screen: SCREEN_MENU,
      isFullscreen: state.isFullscreen,
      isMusicOn: state.isMusicOn
    }
  }

  onExit () {
    // Todo save
    window.App_Quit()
  }

  toggleFullscreen () {
    const isFullscreen = !state.isFullscreen
    state.isFullscreen = isFullscreen

    this.setState({isFullscreen})
    window.App_ToggleFullScreen(isFullscreen)
    set(STORED_IS_FULLSCREEN, isFullscreen)
  }

  toggleIsMusicOn () {
    const isMusicOn = !state.isMusicOn
    state.isMusicOn = isMusicOn

    this.setState({isMusicOn})
    toggleMusic(isMusicOn)
    set(STORED_IS_MUSIC_ON, isMusicOn)
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

  render (props, {screen, isFullscreen, isMusicOn}) {
    return (
      <div class='menu-overlay'>
        <div class='menu'>
          {screen === SCREEN_MENU &&
          <div>
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
            <button onClick={this.toggleFullscreen}>
              fullscreen {isFullscreen ? 'on' : 'off'}
            </button>
            <button onClick={this.toggleIsMusicOn}>
              music {isMusicOn ? 'on' : 'off'}
            </button>
          </div>}

          {screen === SCREEN_GRAPHICS &&
          <div>
            <p>render quality</p>
            <button id={RENDER_QUALITY_DECENT} onClick={this.updateRenderQuality}>
              decent
            </button>
            <button id={RENDER_QUALITY_GOOD} onClick={this.updateRenderQuality}>
              good
            </button>
            <button id={RENDER_QUALITY_BEAUTIFUL} onClick={this.updateRenderQuality}>
              beautiful
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
