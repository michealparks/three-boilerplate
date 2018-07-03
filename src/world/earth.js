import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  Color
} from 'three'

import {
  EARTH_SEGMENTS,
  EARTH_RADIUS,
  SIZE_MAP
} from '../constants'

import {DEG2RAD} from '../math'
import scene from './scene'
import loadTexture from '../util/load-texture'
import earthClouds from './earth-clouds'
import earthSpotLight from './earth-spotlight'

const geometry = new SphereGeometry(
  // Radius
  EARTH_RADIUS,
  // Width Segments
  EARTH_SEGMENTS * 2,
  // Height Segments
  EARTH_SEGMENTS
)

const material = new MeshPhongMaterial({
  map: loadTexture('public/assets/earth_2.jpg'),
  shininess: 5,
  flatShading: true,
  bumpMap: loadTexture('public/assets/earth_bump.jpg'),
  bumpScale: 1,
  specularMap: loadTexture('public/assets/earth_specular.jpg'),
  specular: new Color('grey')
})

const uv = geometry.faceVertexUvs[0]
for (let i = 0, l = uv.length; i < l; i += 1) {
  uv[i][1] = uv[i][0]
  uv[i][2] = uv[i][0]
}

for (let i = 0, v = geometry.vertices, l = v.length; i < l; i++) {
  v[i].x += (Math.random() - 0.5) / 2.4
  v[i].y += (Math.random() - 0.5) / 2.4
  v[i].z += (Math.random() - 0.5) / 3
}

geometry.uvsNeedUpdate = true

const earth = new Mesh(geometry, material)

earth.name = 'earth'
earth.position.x = earthClouds.position.x = -(SIZE_MAP / 2) - 10
earth.position.z = earthClouds.position.z = -25
earth.rotation.x = earthClouds.rotation.x = (80 * DEG2RAD)
earthSpotLight.target = earthClouds

scene.add(earth)
scene.add(earthClouds)
scene.add(earthSpotLight)

export default earth
