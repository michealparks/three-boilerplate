import {
  COLOR_METEORITE,
  SIZE_MAP
} from '../constants'

import {MeshPhongMaterial, Mesh} from 'three'
import {clamp} from '../math'
import scene from '../world/scene'
import loadGLTF from '../util/load-gltf'

const SIZE_MAP_HALF = SIZE_MAP / 2
const NUM_METEORITES = 100

const meteorites = []
const rotations = []
const positions = []
const rx = new Float32Array(NUM_METEORITES)
const ry = new Float32Array(NUM_METEORITES)
const rz = new Float32Array(NUM_METEORITES)
const vx = new Float32Array(NUM_METEORITES)
const vy = new Float32Array(NUM_METEORITES)
const vz = new Float32Array(NUM_METEORITES)

let n = 0
let geo

loadGLTF('public/assets/meteorite.gltf', (gltf) => {
  const {geometry} = gltf.scene.children[0]
  geo = geometry

  for (let i = 1; i < 100; i++) {
    addMeteorite(
      // x
      (Math.random() * SIZE_MAP) - SIZE_MAP_HALF,
      // y
      (Math.random() * SIZE_MAP) - SIZE_MAP_HALF,
      // z
      60,
      // radius
      clamp(Math.random() / 5.0, 0.05, 1)
    )
  }
})

const material = new MeshPhongMaterial({
  color: COLOR_METEORITE,
  specular: COLOR_METEORITE,
  emissive: COLOR_METEORITE,
  flatShading: true
})

export const addMeteorite = (x, y, z, r) => {
  const mesh = new Mesh(geo, material)
  mesh.position.set(x, y, z)
  mesh.scale.set(
    ((Math.random() / 4.0) + 0.875) - 0.9,
    ((Math.random() / 4.0) + 0.875) - 0.9,
    ((Math.random() / 4.0) + 0.875) - 0.9)
  mesh.castShadow = true
  mesh.name = 'meteorite'

  rx[n] = Math.random() / 20.0
  ry[n] = Math.random() / 20.0
  rz[n] = Math.random() / 20.0

  vx[n] = (Math.random() - 0.5) / 128
  vy[n] = (Math.random() - 0.5) / 128
  vz[n] = (Math.random() - 1.0) / 8

  meteorites.push(mesh)
  rotations.push(mesh.rotation)
  positions.push(mesh.position)
  scene.add(mesh)

  n += 1
}

export const updateMeteorites = () => {
  for (let i = 0, l = n, r, p; i < l; i++) {
    r = rotations[i]
    p = positions[i]

    r.x += rx[i]
    r.y += ry[i]
    r.z += rz[i]

    p.x += vx[i]
    p.y += vy[i]
    p.z += vz[i]

    if (p.z <= -SIZE_MAP_HALF) {
      p.set(
        (Math.random() * SIZE_MAP) - SIZE_MAP_HALF,
        (Math.random() * SIZE_MAP) - SIZE_MAP_HALF,
        60)
    }
  }
}
