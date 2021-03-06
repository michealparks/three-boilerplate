import {
  MeshPhongMaterial,
  Mesh,
  SphereBufferGeometry
} from 'three'

import {
  NUM_MAP_TILES,
  SIZE_MAP,
  COLOR_MOON
} from '../constants'

import scene from './scene'
import SimplexNoise from '../math/simplex-noise'

const simplex = new SimplexNoise()
const noise2D = simplex.noise2D.bind(simplex)

const material = new MeshPhongMaterial({
  // Specular color of the material (light)
  specular: 0xfb8717,
  // Geometry color in hexadecimal
  color: COLOR_MOON,
  // Emissive color of the material (dark)
  emissive: COLOR_MOON,
  // How shiny the specular highlight is
  shininess: 20,

  flatShading: true
})

const geometry = new SphereBufferGeometry(
  // Radius
  SIZE_MAP / 2,
  // Width segments
  NUM_MAP_TILES,
  // Height segments
  NUM_MAP_TILES,
  // phiStart: horizontal starting angle
  // Default - 0
  Math.PI / 4,
  // phiLength: horizontal sweep angle size
  // Default - PI * 2
  Math.PI / 2,
  // thetaStart: vertical starting angle
  // Default - 0
  Math.PI / 4,
  // Default - PI
  // thetaLength: vertical sweep angle size
  Math.PI / 2
)

const vertices = geometry.getAttribute('position').array
export const heightMap = new Float32Array(vertices.length / 3)

const SCALE = 0.01
const FREQ = 1.0
const ELEVATION_SCALE = 1.25

for (let i = 2, j = 0, l = vertices.length; i < l; i += 3, j += 1) {
  const x = i % (NUM_MAP_TILES + 1)
  const y = Math.floor(i / (NUM_MAP_TILES + 1))

  const elevation = ELEVATION_SCALE * (
    FREQ * 1.000 * noise2D(FREQ * SCALE * x, FREQ * SCALE * y) +
    FREQ * 0.500 * noise2D(FREQ * 2 * SCALE * x, FREQ * 2 * SCALE * y) +
    FREQ * 0.250 * noise2D(FREQ * 4 * SCALE * x, FREQ * 4 * SCALE * y) +
    FREQ * 0.125 * noise2D(FREQ * 8 * SCALE * x, FREQ * 8 * SCALE * y)
  )

  if (elevation > 0) {
    vertices[i] += elevation
    vertices[i - 2] += (Math.random() - 0.5) / 4
    vertices[i - 1] += (Math.random() - 0.5) / 4
    vertices[i - 0] += (Math.random() - 0.5) / 4
  } else {
    if (Math.random() > 0.75) {
      vertices[i - 2] += (Math.random() - 0.5) / 16
      vertices[i - 1] += (Math.random() - 0.5) / 16
      vertices[i - 0] += (Math.random() - 0.5) / 16
    }
  }

  heightMap[j] = vertices[i + 2]
}

// Create terrain
const terrain = new Mesh(geometry, material)

terrain.translateZ(-SIZE_MAP / 2)
terrain.updateMatrix()
terrain.name = 'terrain'

// Make static
terrain.matrixAutoUpdate = false
terrain.receiveShadow = true

scene.add(terrain)

export default terrain
