precision mediump float;
uniform sampler2D map;
varying vec2 vUV;

void main () {
  lowp vec4 tmpvar_1;
  tmpvar_1 = texture2D (map, vUV);
  gl_FragColor = tmpvar_1;
}

// precision mediump float;
// uniform sampler2D map;
// varying vec2 vUV;

// void main() {
//   gl_FragColor = texture2D(map, vUV);
// }