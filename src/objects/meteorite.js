import {
  SphereBufferGeometry,
  BufferAttribute,
  MeshPhongMaterial,
  Mesh
} from 'three'

import {
  COLOR_ROCK
} from '../util/constants'

import scene from '../world/scene'

const MAX_METEORITES = 500
const METEORITE_SEGMENTS = 4

const meteorites = []
const rx = new Float32Array(MAX_METEORITES)
const ry = new Float32Array(MAX_METEORITES)
const rz = new Float32Array(MAX_METEORITES)

let n = 0

const material = new MeshPhongMaterial({
  color: COLOR_ROCK,
  specular: COLOR_ROCK,
  emissive: COLOR_ROCK,
  shininess: 20,
  flatShading: true
})

export const addMeteorite = (x, y, z, r) => {
  const geometry = new SphereBufferGeometry(
    /* radius         */ r,
    /* widthSegments  */ METEORITE_SEGMENTS,
    /* heightSegments */ METEORITE_SEGMENTS
  )

  const mesh = new Mesh(geometry, material)
  mesh.position.set(x || 0, y || 0, z || 0)
  mesh.castShadow = true

  const vertices = geometry.getAttribute('position').array

  for (let i = 2, l = vertices.length; i < l; i += 3) {
    vertices[i] += (Math.random() - 0.5) / 10
  }

  geometry.addAttribute('position', new BufferAttribute(vertices, 3))

  rx[n] = Math.random() / 20
  ry[n] = Math.random() / 20
  rz[n] = Math.random() / 20
  meteorites.push(mesh)
  scene.add(mesh)

  n += 1
}

export const updateMeteorites = () => {
  for (let i = 0, l = meteorites.length; i < l; i++) {
    const {rotation} = meteorites[i]
    rotation.x += rx[i]
    rotation.y += ry[i]
    rotation.z += rz[i]
  }
}
