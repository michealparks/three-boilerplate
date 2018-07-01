precision mediump float;
uniform vec3 screenPosition;
uniform vec2 scale;
uniform sampler2D occlusionMap;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUV;
varying lowp float vVisibility;

void main () {
  lowp vec4 visibility_1;
  vUV = uv;
  visibility_1 = (texture2D (occlusionMap, vec2(0.1, 0.1)) + texture2D (occlusionMap, vec2(0.5, 0.1)));
  visibility_1 = (visibility_1 + texture2D (occlusionMap, vec2(0.9, 0.1)));
  visibility_1 = (visibility_1 + texture2D (occlusionMap, vec2(0.9, 0.5)));
  visibility_1 = (visibility_1 + texture2D (occlusionMap, vec2(0.9, 0.9)));
  visibility_1 = (visibility_1 + texture2D (occlusionMap, vec2(0.5, 0.9)));
  visibility_1 = (visibility_1 + texture2D (occlusionMap, vec2(0.1, 0.9)));
  visibility_1 = (visibility_1 + texture2D (occlusionMap, vec2(0.1, 0.5)));
  visibility_1 = (visibility_1 + texture2D (occlusionMap, vec2(0.5, 0.5)));
  vVisibility = (visibility_1.x / 9.0);
  vVisibility = (vVisibility * (1.0 - (visibility_1.y / 9.0)));
  vVisibility = (vVisibility * (visibility_1.z / 9.0));
  highp vec4 tmpvar_2;
  tmpvar_2.w = 1.0;
  tmpvar_2.xy = ((position.xy * scale) + screenPosition.xy);
  tmpvar_2.z = screenPosition.z;
  gl_Position = tmpvar_2;
}

// precision mediump float;
// uniform vec3 screenPosition;
// uniform vec2 scale;
// uniform sampler2D occlusionMap;
// attribute vec3 position;
// attribute vec2 uv;
// varying vec2 vUV;
// varying float vVisibility;

// void main() {
//   vUV = uv;
//   vec2 pos = position.xy;
//   vec4 visibility = texture2D(occlusionMap, vec2(0.1, 0.1));
//   visibility += texture2D(occlusionMap, vec2(0.5, 0.1));
//   visibility += texture2D(occlusionMap, vec2(0.9, 0.1));
//   visibility += texture2D(occlusionMap, vec2(0.9, 0.5));
//   visibility += texture2D(occlusionMap, vec2(0.9, 0.9));
//   visibility += texture2D(occlusionMap, vec2(0.5, 0.9));
//   visibility += texture2D(occlusionMap, vec2(0.1, 0.9));
//   visibility += texture2D(occlusionMap, vec2(0.1, 0.5));
//   visibility += texture2D(occlusionMap, vec2(0.5, 0.5));

//   vVisibility =        visibility.r / 9.0;
//   vVisibility *= 1.0 - visibility.g / 9.0;
//   vVisibility *=       visibility.b / 9.0;

//   gl_Position = vec4((pos * scale + screenPosition.xy).xy, screenPosition.z, 1.0);
// }
