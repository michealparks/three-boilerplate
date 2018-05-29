import {
  MeshPhongMaterial,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry
} from 'three'

const material = new MeshPhongMaterial({
  // Specular color of the material (light)
  specular: 0xfb8717,
  // Geometry color in hexadecimal
  color: 0xFF4E50,
  // Emissive color of the material (dark)
  emissive: 0xFF4E50,
  // How shiny the specular highlight is
  shininess: 30
})

material.flatShading = true

// Create a geometry with N segments.
const geometry = new PlaneGeometry(30, 30, 30, 30)

// Move the vertices by random.
for (let i = geometry.vertices.length - 1; i > -1; i -= 1) {
  geometry.vertices[i].x += (-0.5 + Math.random())
  geometry.vertices[i].y += (-0.5 + Math.random())
  geometry.vertices[i].z += (-0.5 + Math.random() * 1.5)
}

// Update geometry.
geometry.computeFaceNormals()

// Create plane
export const plane = new Mesh(geometry, material)

// Make static
plane.matrixAutoUpdate = false

// Create a wireframe
export const wireframe = new Mesh(geometry, new MeshBasicMaterial({
  color: 0xFF4E50,
  wireframe: true
}))
