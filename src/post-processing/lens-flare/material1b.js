import {RawShaderMaterial} from 'three'
import tempMap from './temp-map'
import vertexShader from './shaders/material1b_vertex.glsl'
import fragmentShader from './shaders/material1b_fragment.glsl'

export default new RawShaderMaterial({
  uniforms: {
    map: {value: tempMap},
    scale: {value: null},
    screenPosition: {value: null}
  },
  vertexShader,
  fragmentShader,
  depthTest: false,
  depthWrite: false,
  transparent: false
})
