/**
 * @author zz85 / https://github.com/zz85 | twitter.com/blurspline
 *
 * Depth-of-field shader with bokeh
 * ported from GLSL shader by Martins Upitis
 * http://blenderartists.org/forum/showthread.php?237488-GLSL-depth-of-field-with-bokeh-v2-4-(update)
 *
 * Requires #define RINGS and SAMPLES integers
 */

import {Vector2} from 'three'
import vertexShader from './vertex-2.glsl'
import fragmentShader from './fragment-2.glsl'

export default {
  uniforms: {
    textureWidth: {value: 1.0},
    textureHeight: {value: 1.0},

    focalDepth: {value: 1.0},
    focalLength: {value: 24.0},
    fstop: {value: 0.9},

    tColor: {value: null},
    tDepth: {value: null},

    maxblur: {value: 1.0},

    showFocus: {value: 0},
    manualdof: {value: 0},
    vignetting: {value: 0},
    depthblur: {value: 0},

    threshold: {value: 0.5},
    gain: {value: 2.0},
    bias: {value: 0.5},
    fringe: {value: 0.7},

    znear: {value: 0.1},
    zfar: {value: 100},

    noise: {value: 1},
    dithering: {value: 0.0001},
    pentagon: {value: 0},

    shaderFocus: {value: 1},
    focusCoords: {value: new Vector2()}
  },

  vertexShader,
  fragmentShader
}

export const BokehDepthShader = {
  uniforms: {
    mNear: { value: 1.0 },
    mFar: { value: 1000.0 },
  },

  vertexShader: [

    "varying float vViewZDepth;",

    "void main() {",

    " #include <begin_vertex>",
    " #include <project_vertex>",

    " vViewZDepth = - mvPosition.z;",

    "}"

  ].join( "\n" ),

  fragmentShader: [

    "uniform float mNear;",
    "uniform float mFar;",

    "varying float vViewZDepth;",

    "void main() {",

    " float color = 1.0 - smoothstep( mNear, mFar, vViewZDepth );",
    " gl_FragColor = vec4( vec3( color ), 1.0 );",

    "} "

  ].join( "\n" )

};