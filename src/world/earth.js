import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  Color
} from 'three'

import {
  EARTH_SEGMENTS,
  EARTH_RADIUS
} from '../constants'

import loadTexture from '../util/load-texture'

const geometry = new SphereGeometry(
  // Radius
  EARTH_RADIUS,
  // Width Segments
  EARTH_SEGMENTS * 2,
  // Height Segments
  EARTH_SEGMENTS)

const uv = geometry.faceVertexUvs[0]
for (let i = 0, l = uv.length; i < l; i += 1) {
  uv[i][1] = uv[i][0]
  uv[i][2] = uv[i][0]
}

geometry.uvsNeedUpdate = true

const material = new MeshPhongMaterial({
  map: loadTexture('public/assets/earth_2.jpg'),
  shininess: 5,
  flatShading: true,
  bumpMap: loadTexture('public/assets/earth_bump.jpg'),
  bumpScale: 1,
  specularMap: loadTexture('public/assets/earth_specular.jpg'),
  specular: new Color('grey')
})

const earth = new Mesh(geometry, material)

export default earth
