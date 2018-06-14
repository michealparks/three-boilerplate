import {
  SphereBufferGeometry,
  BufferAttribute,
  MeshPhongMaterial,
  Mesh
} from 'three'
import {COLOR_ROCK} from '../util/constants'
import Actor from './actor'
// import Camera from '../world/camera'

export default class Meteorite extends Actor {
  constructor (props) {
    super(props)

    const radius = props.size || 0.3
    const segments = 4
    const geometry = new SphereBufferGeometry(
      /* radius         */ radius,
      /* widthSegments  */ segments,
      /* heightSegments */ segments
    )

    const material = new MeshPhongMaterial({
      color: COLOR_ROCK,
      specular: COLOR_ROCK,
      emissive: COLOR_ROCK,
      shininess: 20,
      flatShading: true
    })

    this.mesh = new Mesh(geometry, material)
    this.mesh.position.set(props.x || 0, props.y || 0, props.z || 0)
    this.mesh.castShadow = true
    this.mesh.userData.isClickable = true

    const vertices = new Float32Array(
      geometry.getAttribute('position').array)

    for (let i = 2, l = vertices.length; i < l; i += 3) {
      vertices[i] += (Math.random() - 0.5) / 10
    }

    console.log(vertices.length)

    geometry.addAttribute(
      'position', new BufferAttribute(vertices, 3))

    geometry.computeVertexNormals()
    geometry.computeFaceNormals()

    this.player_v = 0
    this.camera_v = 0
    this.rotator = 0

    this.z = 0
    this.camera_z = 0

    this.speed = 25

    this.vx = Math.random() / 20
    this.vy = Math.random() / 20
    this.vz = Math.random() / 20

    // \\addEventListener('keydown', this.onKeydown.bind(this))
    // \\addEventListener('keyup', this.onKeyUp.bind(this))

    this.update = this.update.bind(this)
  }

  onKeydown (e) {
    switch (e.keyCode) {
      case 65: return this.movement(-1)
      case 68: return this.movement(+1)
      case 83: return this.zoom(-1)
      case 87: return this.zoom(+1)
    }
  }

  onKeyUp (e) {
    this.v = 0
    this.z = 0
  }

  movement (direction) {
    this.v = direction / this.speed
    this.rotator = direction / this.speed
  }

  zoom (direction) {
    this.z = direction / this.speed
  }

  catchup (v1, v2) {
    return (v1 - v2) / this.speed
  }

  slowRotator () {
    return (0 - this.rotator) / this.speed
  }

  update () {
    super.update()

    this.mesh.rotation.x += this.vx
    this.mesh.rotation.y += this.vy
    this.mesh.rotation.z += this.vz

    // this.mesh.position.x += this.player_v
    // this.mesh.rotation.z += this.rotator
    // Camera.position.x += this.camera_v
    // Camera.position.z += this.camera_z

    // this.player_v += this.catchup(this.v, this.player_v)
    // this.camera_v += this.catchup(this.player_v, this.camera_v)
    // this.camera_z += this.catchup(this.z, this.camera_z)
    // this.rotator += this.slowRotator()
  }
}
