import {
  SphereBufferGeometry,
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  BufferAttribute,
  Color
} from 'three'

import loadTexture from '../util/load-texture'

const geometry = new SphereGeometry(
  // Radius
  8,
  // Width Segments
  50,
  // Height Segments
  25)

const uv = geometry.faceVertexUvs[0]
for (let i = 0, l = uv.length; i < l; i += 1) {
  uv[i][1] = uv[i][0]
  uv[i][2] = uv[i][0]
}

geometry.uvsNeedUpdate = true

const material = new MeshPhongMaterial({
  map: loadTexture('public/assets/earth.jpg'),
  shininess: 5,
  flatShading: true,
  bumpMap: loadTexture('public/assets/earth_bump.jpg'),
  bumpScale: 1,
  specularMap: loadTexture('public/assets/earth_specular.jpg'),
  specular: new Color('grey')
})

const earth = new Mesh(geometry, material)

export default earth
