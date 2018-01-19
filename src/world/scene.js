import {Scene} from 'three'
import {plane, wireframe} from './terrain'
import {directionalLight} from './lights'

const scene = new Scene()

scene.add(wireframe)
scene.add(plane)
scene.add(directionalLight)

export default scene
