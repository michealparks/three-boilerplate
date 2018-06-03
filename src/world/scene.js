import {Scene, AxesHelper} from 'three'
import {plane, wireframe} from './terrain'
import {directionalLight} from './lights'
import CameraPivot from './camera'

const scene = new Scene()

if (__dev__) {
  // x = red, y = green, z = blue
  scene.add(new AxesHelper(5))
}

scene.add(CameraPivot)
scene.add(wireframe)
scene.add(plane)
scene.add(directionalLight)

export default scene
