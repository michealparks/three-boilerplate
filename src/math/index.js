export const DEG2RAD = Math.PI / 180
export const RAD2DEG = 180 / Math.PI

export const clamp = (n, min, max) => Math.max(min, Math.min(max, n))

// compute euclidian modulo of m % n
// https://en.wikipedia.org/wiki/Modulo_operation
export const euclideanModulo = (n, m) => ((n % m) + m) % m

// Linear mapping from range <a1, a2> to range <b1, b2>
export const mapLinear = (x, a1, a2, b1, b2) => b1 + (x - a1) * (b2 - b1) / (a2 - a1)

// https://en.wikipedia.org/wiki/Linear_interpolation
export const lerp = (x, y, t) => (1 - t) * x + t * y

// http://en.wikipedia.org/wiki/Smoothstep
export const smoothstep = (x, min, max) => {
  if (x <= min) return 0
  if (x >= max) return 1
  const n = (x - min) / (max - min)
  return n * n * (3 - 2 * n)
}

export const smootherstep = (x, min, max) => {
  if (x <= min) return 0
  if (x >= max) return 1
  const n = (x - min) / (max - min)
  return n * n * n * (n * (n * 6 - 15) + 10)
}

// Random integer from <low, high> interval
export const randInt = (l, h) => l + Math.floor(Math.random() * (h - l + 1))

// Random float from <low, high> interval
export const randFloat = (l, h) => l + Math.random() * (h - l)

// Random float from <-range/2, range/2> interval
export const randFloatSpread = (r) => r * (0.5 - Math.random())

export const degToRad = (degrees) => degrees * DEG2RAD

export const radToDeg = (radians) => radians * RAD2DEG

export const isPowerOfTwo = (n) => (n & (n - 1)) === 0 && n !== 0

export const ceilPowerOfTwo = (n) => Math.pow(2, Math.ceil(Math.log(n) / Math.LN2))

export const floorPowerOfTwo = (n) => Math.pow(2, Math.floor(Math.log(n) / Math.LN2))

const lut = []
for (let i = 0; i < 256; i++) {
  lut[i] = (i < 16 ? '0' : '') + (i).toString(16)
}

// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
export const generateUUID = () => {
  const d0 = Math.random() * 0xffffffff | 0
  const d1 = Math.random() * 0xffffffff | 0
  const d2 = Math.random() * 0xffffffff | 0
  const d3 = Math.random() * 0xffffffff | 0
  const uuid = lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
    lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
    lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
    lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ]

  // .toUpperCase() here flattens concatenated strings to save heap memory space.
  return uuid.toUpperCase()
}

export const _Math = {
  DEG2RAD,
  RAD2DEG,
  clamp,
  euclideanModulo,
  mapLinear,
  lerp,
  smoothstep,
  smootherstep,
  randInt,
  randFloat,
  randFloatSpread,
  degToRad,
  radToDeg,
  isPowerOfTwo,
  ceilPowerOfTwo,
  floorPowerOfTwo,
  generateUUID
}

export default _Math
