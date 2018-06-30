import {
  STRUCTURE_TYPE_DELETE,
  STRUCTURE_TYPE_NONE
} from '../constants'

import {addStructure, deleteStructure} from '../objects/structure'
import findIntersectObjects from './intersect-objects'
import state from '../state'

const onNoObjectClick = (e) => {

}

const onObjectClick = (object) => {

}

export default (e) => {
  const [intersect] = findIntersectObjects(e)

  if (intersect === undefined) return onNoObjectClick(e)

  const {object} = intersect
  const {name} = object
  const {x, y, z} = intersect.point
  const curBP = state.curStructBlueprint

  if (curBP === STRUCTURE_TYPE_DELETE) {
    if (name === 'structure') {
      return deleteStructure(object)
    }

    return
  }

  // user is placing a structure in the world
  if (name === 'terrain' && curBP !== STRUCTURE_TYPE_NONE) {
    return addStructure(x, y, z, curBP)
  }

  // user is selecting a preexisting object
  return onObjectClick(intersect.object)
}
