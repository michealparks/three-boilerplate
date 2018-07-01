import {RawShaderMaterial} from 'three'
import vertexShader from './shaders/material1a_vertex.glsl'
import fragmentShader from './shaders/material1a_fragment.glsl'

export default new RawShaderMaterial({
  uniforms: {
    scale: {value: null},
    screenPosition: {value: null}
  },
  vertexShader,
  fragmentShader,
  depthTest: true,
  depthWrite: false,
  transparent: false
})
