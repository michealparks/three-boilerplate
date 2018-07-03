import {Raycaster, Vector2} from 'three'
import {camera} from '../camera'
import scene from './scene'

const raycaster = new Raycaster(undefined, undefined, 1, 100)
const setFromCamera = raycaster.setFromCamera.bind(raycaster)
const intersectObjects = raycaster.intersectObjects.bind(raycaster)
const mouse = new Vector2()

export const findIntersectObjects = ({clientX, clientY}) => {
  mouse.x = (clientX / window.innerWidth) * 2 - 1
  mouse.y = -(clientY / window.innerHeight) * 2 + 1

  setFromCamera(mouse, camera)

  return intersectObjects(scene.children, /* recursive */ false)
}
