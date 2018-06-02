import Scene from './scene'

const actors = []
const updatorFns = []

export const getActor = (i) => {
  return actors[i]
}

export const addActor = (actor) => {
  actors.push(actor)
  updatorFns.push(actor.update)
  Scene.add(actor.mesh)
}

export const removeActor = (i) => {
  actors.splice(i, 1)
  updatorFns.splice(i, 1)
}

export const updateActors = () => {
  for (let i = 0, l = updatorFns.length; i < l; i++) {
    updatorFns[i]()
  }
}

export default {getActor, addActor, removeActor, updateActors}
