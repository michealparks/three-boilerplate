import Scene from './scene'

const actors = []
const updates = []

export const getActor = (i) => {
  return actors[i]
}

export const addActor = (actor) => {
  actors.push(actor)
  updates.push(actor.update)
  Scene.add(actor.mesh)
}

export const removeActors = (i) => {
  actors.splice()
  updates.splice()
}

export const updateActors = () => {
  for (let i = updates.length - 1; i > -1; i -= 1) {
    updates[i]()
  }
}
