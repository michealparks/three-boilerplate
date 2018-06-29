import {
  STORED_ROTATE_SPEED,
  ROTATE_SPEED_MEDIUM,
  STRUCTURE_TYPE_NONE
} from './constants'

import {get} from './util/storage'

const state = {
  isPaused: false,

  // settings
  isFullscreen: false,

  // navigation
  isInHomeScreen: false,
  isInMenu: false,

  // input
  isLeftMouseDown: false,
  isRightMouseDown: false,
  mouseMovementWhileDownX: 0.0,
  mouseMovementWhileDownY: 0.0,

  // world
  sunBrightness: 0.4,
  rotationSpeed: ROTATE_SPEED_MEDIUM,

  // structure manipulation
  curStructBlueprint: STRUCTURE_TYPE_NONE,
  curStructure: STRUCTURE_TYPE_NONE
}

get(STORED_ROTATE_SPEED, (x) => {
  if (x !== null) state.rotationSpeed = x
})

export default state
