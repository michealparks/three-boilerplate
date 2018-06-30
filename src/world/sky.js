import {
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  BackSide
} from 'three'

import {SIZE_MAP} from '../constants'
import {skyTexture} from '../textures'

const geometry = new SphereBufferGeometry(
  // Radius
  SIZE_MAP * 2.2,
  // Width segments
  10,
  // Height segments
  10
)

const material = new MeshBasicMaterial({
  map: skyTexture,
  side: BackSide
})

const sky = new Mesh(geometry, material)

export default sky
