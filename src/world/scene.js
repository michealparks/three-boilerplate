import {Scene, AxesHelper} from 'three'
import terrain from './terrain'
import {lensFlare} from '../post-processing/lens-flare'
import {sun, sunHelper, sunShadowHelper} from './sun'
import {ambientLight} from './lights'
import {cameraPivot} from '../camera'
import earth from './earth'
import earthClouds from './earth-clouds'
import earthSpotLight from './earth-spotlight'
import sky from './sky'

const scene = new Scene()

if (__dev__) {
  // x = red, y = green, z = blue
  // scene.add(new AxesHelper(100))
  // scene.add(sunHelper)
  // scene.add(sunShadowHelper)
}

scene.add(sky)
scene.add(ambientLight)
scene.add(sun)
scene.add(earthSpotLight)
scene.add(earth)
scene.add(earthClouds)
scene.add(lensFlare)
scene.add(terrain)
scene.add(cameraPivot)

export default scene
