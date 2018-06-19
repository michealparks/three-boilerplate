import {Scene, AxesHelper} from 'three'
import terrain from './terrain'
import {sun, sunHelper, sunShadowHelper, lensFlare} from './sun'
import {cameraPivot} from '../camera'
import sky from './sky'

const scene = new Scene()

if (__dev__) {
  // x = red, y = green, z = blue
  // scene.add(new AxesHelper(100))
}

scene.add(cameraPivot)
scene.add(terrain)
scene.add(sun)
scene.add(sky)
scene.add(sunHelper)
scene.add(sunShadowHelper)
scene.add(lensFlare)

export default scene
