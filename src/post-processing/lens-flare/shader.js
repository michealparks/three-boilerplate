import vertexShader from './shaders/shader_vertex.glsl'
import fragmentShader from './shaders/shader_fragment.glsl'

export default {
  uniforms: {
    map: {value: null},
    occlusionMap: {value: null},
    color: {value: null},
    scale: {value: null},
    screenPosition: {value: null}
  },
  vertexShader,
  fragmentShader
}
