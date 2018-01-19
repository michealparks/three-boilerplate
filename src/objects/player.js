import {BoxBufferGeometry, MeshNormalMaterial, Mesh} from 'three'
import Actor from './actor'
import Camera from '../world/camera'

export default class Player extends Actor {
  constructor (props = {}) {
    super(props)

    const size = props.size || 0.3

    const geometry = new BoxBufferGeometry(size, size, size)
    const material = new MeshNormalMaterial()

    material.flatShading = true

    this.mesh = new Mesh(geometry, material)
    this.mesh.rotation.x = 35
    this.mesh.rotation.y = 20

    this.mesh.position.y = 3
    this.mesh.position.z = 1

    this.player_v = 0
    this.camera_v = 0
    this.rotator = 0

    this.z = 0
    this.camera_z = 0

    this.speed = 25

    addEventListener('keydown', this.onKeydown.bind(this))
    addEventListener('keyup', this.onKeyUp.bind(this))
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

    this.mesh.position.x += this.player_v
    this.mesh.rotation.z += this.rotator
    Camera.position.x += this.camera_v
    Camera.position.z += this.camera_z

    this.player_v += this.catchup(this.v, this.player_v)
    this.camera_v += this.catchup(this.player_v, this.camera_v)
    this.camera_z += this.catchup(this.z, this.camera_z)
    this.rotator += this.slowRotator()
  }
}
