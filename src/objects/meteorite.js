import {
  SphereBufferGeometry,
  BufferAttribute,
  MeshPhongMaterial,
  Mesh
} from 'three'

import {
  COLOR_ROCK
} from '../constants'

import scene from '../world/scene'
import Actor from './actor'

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

  // const vertices = geometry.getAttribute('position').array

  // for (let i = 2, l = vertices.length; i < l; i += 3) {
  //   vertices[i] += (Math.random() - 0.5) / 10
  // }

  // geometry.addAttribute('position', new BufferAttribute(vertices, 3))

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

// export default class Meteorite extends Actor {
//   constructor (props) {
//     super(props)

//     const radius = props.size || 0.3
//     const segments = 4
//     const geometry = new SphereBufferGeometry(
//       /* radius         */ radius,
//       /* widthSegments  */ segments,
//       /* heightSegments */ segments
//     )

//     const material = new MeshPhongMaterial({
//       color: COLOR_ROCK,
//       specular: COLOR_ROCK,
//       emissive: COLOR_ROCK,
//       shininess: 20,
//       flatShading: true
//     })

//     this.mesh = new Mesh(geometry, material)
//     this.mesh.position.set(props.x || 0, props.y || 0, props.z || 0)
//     this.mesh.castShadow = true
//     this.mesh.userData.isClickable = true

//     const vertices = new Float32Array(
//       geometry.getAttribute('position').array)

//     for (let i = 2, l = vertices.length; i < l; i += 3) {
//       vertices[i] += (Math.random() - 0.5) / 10
//     }

//     geometry.addAttribute(
//       'position', new BufferAttribute(vertices, 3))

//     geometry.computeVertexNormals()
//     geometry.computeFaceNormals()

//     this.player_v = 0
//     this.camera_v = 0
//     this.rotator = 0

//     this.z = 0
//     this.camera_z = 0

//     this.speed = 25

//     this.vx = Math.random() / 20
//     this.vy = Math.random() / 20
//     this.vz = Math.random() / 20

//     // \\addEventListener('keydown', this.onKeydown.bind(this))
//     // \\addEventListener('keyup', this.onKeyUp.bind(this))

//     this.update = this.update.bind(this)
//   }

//   onKeydown (e) {
//     switch (e.keyCode) {
//       case 65: return this.movement(-1)
//       case 68: return this.movement(+1)
//       case 83: return this.zoom(-1)
//       case 87: return this.zoom(+1)
//     }
//   }

//   onKeyUp (e) {
//     this.v = 0
//     this.z = 0
//   }

//   movement (direction) {
//     this.v = direction / this.speed
//     this.rotator = direction / this.speed
//   }

//   zoom (direction) {
//     this.z = direction / this.speed
//   }

//   catchup (v1, v2) {
//     return (v1 - v2) / this.speed
//   }

//   slowRotator () {
//     return (0 - this.rotator) / this.speed
//   }

//   update () {
//     super.update()

//     this.mesh.rotation.x += this.vx
//     this.mesh.rotation.y += this.vy
//     this.mesh.rotation.z += this.vz

//     // this.mesh.position.x += this.player_v
//     // this.mesh.rotation.z += this.rotator
//     // Camera.position.x += this.camera_v
//     // Camera.position.z += this.camera_z

//     // this.player_v += this.catchup(this.v, this.player_v)
//     // this.camera_v += this.catchup(this.player_v, this.camera_v)
//     // this.camera_z += this.catchup(this.z, this.camera_z)
//     // this.rotator += this.slowRotator()
//   }
// }
