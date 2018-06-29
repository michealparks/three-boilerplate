import {
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  RepeatWrapping,
  BackSide
} from 'three'

import {SIZE_MAP} from '../constants'
import renderer from '../engine/renderer'
import loadTexture from '../util/load-texture'

const geometry = new SphereBufferGeometry(
  // Radius
  SIZE_MAP * 2.2,
  // Width segments
  10,
  // Height segments
  10
)

const texture = loadTexture('public/assets/space.jpg')
texture.wrapS = RepeatWrapping
texture.wrapT = RepeatWrapping
texture.repeat.x = 18
texture.repeat.y = 18
texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

const material = new MeshBasicMaterial({
  map: texture,
  side: BackSide
})

const sky = new Mesh(geometry, material)

export default sky
