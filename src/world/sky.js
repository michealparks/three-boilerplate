import {
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  BackSide
} from 'three'

import {RADIUS_SKY_DOME} from '../constants'
import {skyTexture} from '../textures'
import scene from './scene'

const geometry = new SphereBufferGeometry(
  RADIUS_SKY_DOME,
  // Width segments
  20,
  // Height segments
  20
)

const material = new MeshBasicMaterial({
  map: skyTexture,
  side: BackSide
})

const sky = new Mesh(geometry, material)

scene.add(sky)

export default sky
