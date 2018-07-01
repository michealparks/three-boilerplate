/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

import vertexShader from './copy-shader_vertex.glsl'
import fragmentShader from './copy-shader_fragment.glsl'

export default {
  uniforms: {
    tDiffuse: {value: null},
    opacity: {value: 1.0}
  },
  vertexShader,
  fragmentShader
}
