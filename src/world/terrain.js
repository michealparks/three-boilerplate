import {
  MeshPhongMaterial,
  Mesh,
  PlaneBufferGeometry,
  SphereBufferGeometry,
  BufferAttribute
} from 'three'

import {
  NUM_MAP_TILES,
  SIZE_MAP,
  COLOR_MOON
} from '../util/constants'

import SimplexNoise from 'simplex-noise'

const simplex = new SimplexNoise(Math.random())
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

// Create a geometry with N segments.
// const geometry = new PlaneBufferGeometry(
//   SIZE_MAP, SIZE_MAP, NUM_MAP_TILES, NUM_MAP_TILES)

const geometry = new SphereBufferGeometry(
   // Radius
  SIZE_MAP / 2,
  // Width segments
  NUM_MAP_TILES,
  // Height segments
  NUM_MAP_TILES,
  // horizontal starting angle
  0,
  // horizontal sweep angle size
  Math.PI,
  // vertical starting angle
  0,
  // vertical sweep angle size
  Math.PI
)

const vertices = new Float32Array(geometry.getAttribute('position').array)

const SCALE = 0.01
const FREQ = 1.1
const ELEVATION_SCALE = 1.6

console.log(vertices.length)

for (let i = 2, l = vertices.length; i < l; i += 3) {
  const x = i % NUM_MAP_TILES
  const y = Math.floor(i / NUM_MAP_TILES)
  const elevation = ELEVATION_SCALE * (
    FREQ * 1.000 * noise2D(FREQ * SCALE * x, FREQ * SCALE * y) +
    FREQ * 0.500 * noise2D(FREQ * 2 * SCALE * x, FREQ * 2 * SCALE * y) +
    FREQ * 0.250 * noise2D(FREQ * 4 * SCALE * x, FREQ * 4 * SCALE * y) +
    FREQ * 0.125 * noise2D(FREQ * 8 * SCALE * x, FREQ * 8 * SCALE * y)
  )

  vertices[i] += (elevation < 0 ? 0 : elevation) + Math.random() * (SCALE * 4)
}

geometry.addAttribute('position', new BufferAttribute(vertices, 3))

// Update geometry.
geometry.computeVertexNormals()
geometry.computeFaceNormals()

// Create plane
const plane = new Mesh(geometry, material)

plane.translateZ(-SIZE_MAP / 2)
plane.updateMatrix()

// Make static
plane.matrixAutoUpdate = false
plane.receiveShadow = true

export default plane
