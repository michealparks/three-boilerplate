import {
  DataTexture,
  RGBFormat,
  NearestFilter,
  ClampToEdgeWrapping,
  RawShaderMaterial,
  Color,
  Vector2,
  Vector3,
  AdditiveBlending
} from 'three'

import vertexShader from './shaders/shader_vertex.glsl'
import fragmentShader from './shaders/shader_fragment.glsl'

export const occlusionMap = new DataTexture(new Uint8Array(16 * 16 * 3), 16, 16, RGBFormat)
occlusionMap.minFilter = NearestFilter
occlusionMap.magFilter = NearestFilter
occlusionMap.wrapS = ClampToEdgeWrapping
occlusionMap.wrapT = ClampToEdgeWrapping
occlusionMap.needsUpdate = true

export const shader = new RawShaderMaterial({
  uniforms: {
    map: {value: null},
    occlusionMap: {value: occlusionMap},
    color: {value: new Color(0xffffff)},
    scale: {value: new Vector2()},
    screenPosition: {value: new Vector3()}
  },
  vertexShader,
  fragmentShader,
  blending: AdditiveBlending,
  transparent: true,
  depthWrite: false
})
