import {
  STRUCTURE_TYPE_DELETE,
  STRUCTURE_TYPE_NONE
} from '../constants'

import {addStructure, deleteStructure} from '../objects/structure'
import findIntersectObjects from './intersect-objects'
import state from '../state'

const onNoObjectClick = (e) => {

}

const onObjectClick = (e) => {

}

export default (e) => {
  const intersects = findIntersectObjects(e)
  const [intersect] = intersects

  if (!intersect) return onNoObjectClick(e)

  const {name} = intersect.object
  const {x, y, z} = intersect.point

  // user is deleting a structure
  if (name === 'structure' && state.curStructBlueprint === STRUCTURE_TYPE_DELETE) {
    console.log(intersect.object.id)
    return deleteStructure(intersect.object)
  }

  // user is placing a structure in the world
  if (name === 'terrain' && state.curStructBlueprint !== STRUCTURE_TYPE_NONE) {
    return addStructure(x, y, z, state.curStructBlueprint)
  }

  // user is selecting a preexisting object
  for (let i = 0, l = intersects.length; i < l; i++) {
    if (intersects[i].object.userData.isClickable === true) {
      return onObjectClick(intersects[i].object)
    }
  }
}
