import {
  Mesh,
  MeshPhongMaterial,
  SphereBufferGeometry,
  TorusBufferGeometry
} from 'three'

import {
  STRUCTURE_TYPE_DOME,
  STRUCTURE_TYPE_SOLAR_GRID
} from '../constants'

import scene from '../world/scene'

const structures = new Map()

const material = new MeshPhongMaterial({
  color: 0x444444,
  specular: 0x444444,
  emissive: 0x444444,
  shininess: 20,
  transparent: true,
  opacity: 0.6,
  flatShading: true
})

const domeGeo = new SphereBufferGeometry(/* r */ 2, /* wSeg */ 8, /* hSeg */ 8)
const solarGridGeo = new TorusBufferGeometry(2, 2, 10, 20)

export const addStructure = (x, y, z, type) => {
  let geometry

  if (type === STRUCTURE_TYPE_DOME) {
    geometry = domeGeo
  } else if (type === STRUCTURE_TYPE_SOLAR_GRID) {
    geometry = solarGridGeo
  } else {
    throw new Error('Structure type is invalid or unspecified')
  }

  const mesh = new Mesh(geometry, material)
  mesh.name = 'structure'
  mesh.position.set(x, y, z)
  mesh.castShadow = true

  structures.set(mesh.id, mesh)
  scene.add(mesh)
}

export const deleteStructure = (object) => {
  structures.delete(object.id)
  scene.remove(object)
  if (object.dispose) object.dispose()
}
