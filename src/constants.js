// events
export const EVENT_RENDER_QUALITY = 0

// setting screens
export const SCREEN_MENU = 0
export const SCREEN_SETTINGS = 1

// rendering pixel ratio level
export const RENDER_QUALITY_BAD = 0
export const RENDER_QUALITY_DECENT = 1
export const RENDER_QUALITY_GOOD = 2
export const RENDER_QUALITY_BEAUTIFUL = 3

// Color
export const COLOR_MOON = 0xA2A8AE
export const COLOR_ROCK = 0x958D84
export const COLOR_SUNLIGHT = 0xFAD6A5

// Brightness

// Terrain
// has a large impact on performance,
// especially when raytracing clicks
export const NUM_MAP_TILES = 500
export const NUM_CRATERS = 40
export const SIZE_MAP = NUM_MAP_TILES / 2
export const SIZE_MAP_TILE = SIZE_MAP / NUM_MAP_TILES
export const SIZE_SHADOW_MAP = 2 ** 12
