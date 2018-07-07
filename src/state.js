import {
  STORED_ROTATE_SPEED,
  STORED_IS_FULLSCREEN,
  STORED_IS_MUSIC_ON,
  ROTATE_SPEED_MEDIUM,
  STRUCTURE_TYPE_NONE
} from './constants'

import {get} from './util/storage'

const init = () => {
  const isFullscreen = get(STORED_IS_FULLSCREEN)
  const isMusicOn = get(STORED_IS_MUSIC_ON)
  const rotationSpeed = get(STORED_ROTATE_SPEED)

  return {
    isPaused: false,

    // settings
    isFullscreen: isFullscreen !== null ? isFullscreen : false,
    isMusicOn: isMusicOn !== null ? isMusicOn : true,

    // navigation
    isInHomeScreen: false,
    isInMenu: false,

    // input
    isLeftMouseDown: false,
    isRightMouseDown: false,
    mouseMovementWhileDownX: 0.0,
    mouseMovementWhileDownY: 0.0,

    // world
    sunBrightness: 0.2,
    rotationSpeed: rotationSpeed !== null ? rotationSpeed : ROTATE_SPEED_MEDIUM,

    // structure manipulation
    curStructBlueprint: STRUCTURE_TYPE_NONE,
    curStructure: STRUCTURE_TYPE_NONE
  }
}

const state = init()

export default state
