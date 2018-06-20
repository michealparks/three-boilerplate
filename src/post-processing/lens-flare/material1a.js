import {RawShaderMaterial} from 'three'

export default new RawShaderMaterial({
  uniforms: {
    scale: {value: null},
    screenPosition: {value: null}
  },
  vertexShader: `
    precision highp float;
    uniform vec3 screenPosition;
    uniform vec2 scale;
    attribute vec3 position;

    void main() {
      gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );
    }
  `,
  fragmentShader: `
    precision highp float;
    void main() {
      gl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );
    }
  `,
  depthTest: true,
  depthWrite: false,
  transparent: false
})
