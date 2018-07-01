precision mediump float;
uniform vec3 screenPosition;
uniform vec2 scale;
attribute vec3 position;

void main () {
  highp vec4 tmpvar_1;
  tmpvar_1.w = 1.0;
  tmpvar_1.xy = ((position.xy * scale) + screenPosition.xy);
  tmpvar_1.z = screenPosition.z;
  gl_Position = tmpvar_1;
}

// precision mediump float;
// uniform vec3 screenPosition;
// uniform vec2 scale;
// attribute vec3 position;

// void main() {
//   gl_Position = vec4(
//     position.xy * scale + screenPosition.xy,
//     screenPosition.z,
//     1.0
//   );
// }