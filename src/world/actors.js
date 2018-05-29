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

export const removeActors = (i) => {
  actors.splice()
  updatorFns.splice()
}

export const updateActors = () => {
  for (let i = 0, l = updatorFns.length; i < l; i++) {
    updatorFns[i]()
  }
}
