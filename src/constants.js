// Camera
export const CAMERA_MOVE_SPEED = 0.15
export const CAMERA_ROTATE_SPEED = 2.25

// Mouse
export const MOUSE_LEFT_DRAG_SPEED = 0.125
export const MOUSE_RIGHT_DRAG_SPEED = 0.0625
export const MOUSE_WHEEL_SPEED = 0.05

// game speed enum
export const GAME_SPEED_PAUSED = 0
export const GAME_SPEED_SLOW = 1
export const GAME_SPEED_MEDIUM = 2
export const GAME_SPEED_FAST = 3

// rotation speed
export const ROTATE_SPEED_SLOW = 1e-5
export const ROTATE_SPEED_MEDIUM = 1e-4
export const ROTATE_SPEED_FAST = 1e-3

// storage enum
export const STORED_RENDER_QUALITY = 0
export const STORED_ROTATE_SPEED = 1

// setting screens enum
export const SCREEN_MENU = 0
export const SCREEN_SETTINGS = 1
export const SCREEN_INTRO = 2

// rendering pixel ratio level enum
export const RENDER_QUALITY_BAD = 0
export const RENDER_QUALITY_DECENT = 1
export const RENDER_QUALITY_GOOD = 2
export const RENDER_QUALITY_BEAUTIFUL = 3

// Colors
export const COLOR_MOON = 0xA2A8AE
export const COLOR_ROCK = 0x958D84
export const COLOR_SUNLIGHT = 0xFAD6A5

// Earth
export const EARTH_RADIUS = 8
export const EARTH_SEGMENTS = 20

// Structure types enum
export const STRUCTURE_TYPE_DELETE = -1
export const STRUCTURE_TYPE_NONE = 0
export const STRUCTURE_TYPE_DOME = 1
export const STRUCTURE_TYPE_SOLAR_GRID = 2

// Terrain
// has a large impact on performance,
// especially when raytracing clicks
export const NUM_MAP_TILES = 500
export const NUM_CRATERS = 40
export const SIZE_MAP = NUM_MAP_TILES / 2
export const SIZE_MAP_TILE = SIZE_MAP / NUM_MAP_TILES
export const SIZE_SHADOW_MAP = 2 ** 12
