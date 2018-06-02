import {BoxGeometry, MeshNormalMaterial, Mesh} from 'three'
import Actor from './actor'

export default class Cube extends Actor {
  constructor (props = {}) {
    super(props)

    const size = props.size || 0.2

    this.mesh = new Mesh(
      new BoxGeometry(size, size, size),
      new MeshNormalMaterial())
  }

  update () {
    super.update()
  }
}
