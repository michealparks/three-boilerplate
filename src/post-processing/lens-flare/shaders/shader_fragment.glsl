precision mediump float;
uniform sampler2D map;
uniform vec3 color;
varying vec2 vUV;
varying float vVisibility;

void main () {
  lowp vec4 texture_1;
  lowp vec4 tmpvar_2;
  tmpvar_2 = texture2D (map, vUV);
  texture_1.xyz = tmpvar_2.xyz;
  texture_1.w = (tmpvar_2.w * vVisibility);
  gl_FragColor = texture_1;
  gl_FragColor.xyz = (gl_FragColor.xyz * color);
}

// unoptimized
// precision mediump float;
// uniform sampler2D map;
// uniform vec3 color;
// varying vec2 vUV;
// varying float vVisibility;

// void main() {
//   vec4 texture = texture2D(map, vUV);
//   texture.a *= vVisibility;
//   gl_FragColor = texture;
//   gl_FragColor.rgb *= color;
// }
