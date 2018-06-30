import {RawShaderMaterial} from 'three'
import tempMap from './temp-map'

export default new RawShaderMaterial({
  uniforms: {
    map: {value: tempMap},
    scale: {value: null},
    screenPosition: {value: null}
  },
  vertexShader: `
    precision mediump float;
    uniform vec3 screenPosition;
    uniform vec2 scale;
    attribute vec3 position;
    attribute vec2 uv;
    varying vec2 vUV;

    void main() {
      vUV = uv;
      gl_Position = vec4(
        position.xy * scale + screenPosition.xy,
        screenPosition.z,
        1.0
      );
    }
  `,
  fragmentShader: `
    precision mediump float;
    uniform sampler2D map;
    varying vec2 vUV;

    void main() {
      gl_FragColor = texture2D(map, vUV);
    }
  `,
  depthTest: false,
  depthWrite: false,
  transparent: false
})
