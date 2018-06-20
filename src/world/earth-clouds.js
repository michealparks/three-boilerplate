import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  DoubleSide,
  Color
} from 'three'

import {
  EARTH_RADIUS,
  EARTH_SEGMENTS
} from '../constants'

import loadTexture from '../util/load-texture'

const geometry = new SphereGeometry(
  // Radius
  EARTH_RADIUS + 0.2,
  EARTH_SEGMENTS * 4,
  EARTH_SEGMENTS * 3
)

const uv = geometry.faceVertexUvs[0]
for (let i = 0, l = uv.length; i < l; i += 1) {
  uv[i][0] = uv[i][1]
  uv[i][2] = uv[i][1]
}

geometry.uvsNeedUpdate = true

const material = new MeshPhongMaterial({
  map: loadTexture('public/assets/earth_clouds.png'),
  flatShading: true,
  shininess: 20,
  specular: new Color('white'),
  side: DoubleSide,
  opacity: 1,
  transparent: true,
  depthWrite: false
})

const earthClouds = new Mesh(geometry, material)

export default earthClouds
