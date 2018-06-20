import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  DoubleSide,
  Color
} from 'three'

import loadTexture from '../util/load-texture'

const geometry = new SphereGeometry(
  8.2,
  90,
  90
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
  specular: new Color('white'),
  side: DoubleSide,
  opacity: 1,
  transparent: true,
  depthWrite: false
})

const earthClouds = new Mesh(geometry, material)

export default earthClouds
