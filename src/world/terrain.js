import {
  MeshPhongMaterial,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  PlaneBufferGeometry,
  BufferAttribute
} from 'three'

import {MAP_SIZE, COLOR_MOON} from './state'

const {floor, random} = Math

const numCraters = 40
const widthSegments = 400
const heightSegments = 400

const material = new MeshPhongMaterial({
  // Specular color of the material (light)
  specular: 0xfb8717,
  // Geometry color in hexadecimal
  color: COLOR_MOON,
  // Emissive color of the material (dark)
  emissive: COLOR_MOON,
  // How shiny the specular highlight is
  shininess: 30,

  flatShading: true
})

const n = 100

// Create a geometry with N segments.
const geometry = new PlaneGeometry(MAP_SIZE, MAP_SIZE, widthSegments, heightSegments)

const l = geometry.vertices.length

// Move the vertices by random.
for (let i = geometry.vertices.length - 1; i > -1; i -= 1) {
  geometry.vertices[i].x += (-0.001 + Math.random() / 5)
  geometry.vertices[i].y += (-0.001 + Math.random() / 5)
  geometry.vertices[i].z += (-0.001 + Math.random() / 5 * 1.5)
}

for (let i = 0; i < numCraters; i++) {
  const x = floor(random() * l)

    geometry.vertices[x].x += (Math.random() * 2)
    geometry.vertices[x].y += (Math.random() * 2)
    geometry.vertices[x].z += (Math.random() * 2)
}



// Update geometry.
geometry.computeFaceNormals()

// Create plane
export const plane = new Mesh(geometry, material)

// Make static
plane.matrixAutoUpdate = false
plane.recieveShadow = true

// Create a wireframe
export const wireframe = new Mesh(geometry, new MeshBasicMaterial({
  color: COLOR_MOON,
  wireframe: true
}))
