import {
  WebGLRenderer,
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  RepeatWrapping,
  BackSide
} from 'three'

import {SIZE_MAP} from '../constants'
import loadTexture from '../util/load-texture'

const SKY_SEGMENTS = 10
const geometry = new SphereBufferGeometry(
  // Radius
  SIZE_MAP * 2.2,
  // Width segments
  SKY_SEGMENTS,
  // Height segments
  SKY_SEGMENTS
)

const texture = loadTexture('public/assets/space.jpg')
texture.wrapS = RepeatWrapping
texture.wrapT = RepeatWrapping
texture.repeat.x = 18
texture.repeat.y = 18
texture.anisotropy = new WebGLRenderer().capabilities.getMaxAnisotropy()

const material = new MeshBasicMaterial({
  map: texture,
  side: BackSide
})

const sky = new Mesh(geometry, material)
// sky.matrixAutoUpdate = false

// sky.updateMatrix()

export default sky
