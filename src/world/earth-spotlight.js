import {SpotLight} from 'three'

const earthSpotLight = new SpotLight(
  // Color
  0xffffff,
  // Intensity: default - 1
  0.9,
  // Distance: default - 0.0
  0.0,
  // Angle: default - Math.PI / 3
  Math.PI / 35
)

export default earthSpotLight
