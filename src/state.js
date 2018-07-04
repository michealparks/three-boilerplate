import {
  STORED_ROTATE_SPEED,
  STORED_IS_FULLSCREEN,
  STORED_IS_MUSIC_ON,
  ROTATE_SPEED_MEDIUM,
  STRUCTURE_TYPE_NONE
} from './constants'

import {get} from './util/storage'

const state = {
  isPaused: false,

  // settings
  isFullscreen: get(STORED_IS_FULLSCREEN) || false,
  isMusicOn: get(STORED_IS_MUSIC_ON) || true,

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
  rotationSpeed: get(STORED_ROTATE_SPEED) || ROTATE_SPEED_MEDIUM,

  // structure manipulation
  curStructBlueprint: STRUCTURE_TYPE_NONE,
  curStructure: STRUCTURE_TYPE_NONE
}

export default state
