import {
  Mesh,
  MeshBasicMaterial,
  Vector3,
  DataTexture,
  RGBFormat,
  NearestFilter,
  ClampToEdgeWrapping,
  RawShaderMaterial,
  Vector2,
  AdditiveBlending,
  Box2,
  Vector4,
  BufferGeometry,
  InterleavedBuffer,
  InterleavedBufferAttribute,
  Color
} from 'three'

const geometry = new BufferGeometry()

const float32Array = new Float32Array([
  -1, -1, 0, 0, 0,
  1, -1, 0, 1, 0,
  1, 1, 0, 1, 1,
  -1, 1, 0, 0, 1
])

const interleavedBuffer = new InterleavedBuffer(float32Array, 5)

geometry.setIndex([0, 1, 2, 0, 2, 3])
geometry.addAttribute('position', new InterleavedBufferAttribute(interleavedBuffer, 3, 0, false))
geometry.addAttribute('uv', new InterleavedBufferAttribute(interleavedBuffer, 2, 3, false))

const material = new MeshBasicMaterial({opacity: 0, transparent: true})

const shader = {
  uniforms: {
    map: {value: null},
    occlusionMap: {value: null},
    color: {value: null},
    scale: {value: null},
    screenPosition: {value: null}
  },

  vertexShader: `
    precision highp float;
    uniform vec3 screenPosition;
    uniform vec2 scale;
    uniform sampler2D occlusionMap;
    attribute vec3 position;
    attribute vec2 uv;
    varying vec2 vUV;
    varying float vVisibility;

    void main() {
      vUV = uv;
      vec2 pos = position.xy;
      vec4 visibility = texture2D(occlusionMap, vec2(0.1, 0.1));
      visibility += texture2D(occlusionMap, vec2(0.5, 0.1));
      visibility += texture2D(occlusionMap, vec2(0.9, 0.1));
      visibility += texture2D(occlusionMap, vec2(0.9, 0.5));
      visibility += texture2D(occlusionMap, vec2(0.9, 0.9));
      visibility += texture2D(occlusionMap, vec2(0.5, 0.9));
      visibility += texture2D(occlusionMap, vec2(0.1, 0.9));
      visibility += texture2D(occlusionMap, vec2(0.1, 0.5));
      visibility += texture2D(occlusionMap, vec2(0.5, 0.5));

      vVisibility =        visibility.r / 9.0;
      vVisibility *= 1.0 - visibility.g / 9.0;
      vVisibility *=       visibility.b / 9.0;

      gl_Position = vec4((pos * scale + screenPosition.xy).xy, screenPosition.z, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;
    uniform sampler2D map;
    uniform vec3 color;
    varying vec2 vUV;
    varying float vVisibility;

    void main() {
      vec4 texture = texture2D( map, vUV );
      texture.a *= vVisibility;
      gl_FragColor = texture;
      gl_FragColor.rgb *= color;
    }
  `
}

const positionScreen = new Vector3()

// textures
const tempMap = new DataTexture(new Uint8Array(16 * 16 * 3), 16, 16, RGBFormat)
tempMap.minFilter = NearestFilter
tempMap.magFilter = NearestFilter
tempMap.wrapS = ClampToEdgeWrapping
tempMap.wrapT = ClampToEdgeWrapping
tempMap.needsUpdate = true

const occlusionMap = new DataTexture(new Uint8Array(16 * 16 * 3), 16, 16, RGBFormat)
occlusionMap.minFilter = NearestFilter
occlusionMap.magFilter = NearestFilter
occlusionMap.wrapS = ClampToEdgeWrapping
occlusionMap.wrapT = ClampToEdgeWrapping
occlusionMap.needsUpdate = true

// material
const material1a = new RawShaderMaterial({
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

var material1b = new RawShaderMaterial({
  uniforms: {
    map: {value: tempMap},
    scale: {value: null},
    screenPosition: {value: null}
  },
  vertexShader: `
    precision highp float;
    uniform vec3 screenPosition;
    uniform vec2 scale;
    attribute vec3 position;
    attribute vec2 uv;
    varying vec2 vUV;

    void main() {
      vUV = uv;
      gl_Position = vec4(position.xy * scale + screenPosition.xy, screenPosition.z, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;
    uniform sampler2D map;
    varying vec2 vUV;

    void main() {
      gl_FragColor = texture2D( map, vUV );
    }
  `,
  depthTest: false,
  depthWrite: false,
  transparent: false
})

// the following object is used for occlusionMap generation
const mesh1 = new Mesh(geometry, material1a)
const elements = []
const material2 = new RawShaderMaterial({
  uniforms: {
    map: {value: null},
    occlusionMap: {value: occlusionMap},
    color: {value: new Color(0xffffff)},
    scale: {value: new Vector2()},
    screenPosition: {value: new Vector3()}
  },
  vertexShader: shader.vertexShader,
  fragmentShader: shader.fragmentShader,
  blending: AdditiveBlending,
  transparent: true,
  depthWrite: false
})

const mesh2 = new Mesh(geometry, material2)

export const addLensFlareElement = (texture, size, distance, color) => {
  elements.push({texture, size, distance, color})
}

const scale = new Vector2()
const screenPositionPixels = new Vector2()
const validArea = new Box2()
const viewport = new Vector4()

export const dispose = () => {
  material1a.dispose()
  material1b.dispose()
  material2.dispose()

  tempMap.dispose()
  occlusionMap.dispose()

  for (let i = 0, l = elements.length; i < l; i++) {
    elements[i].texture.dispose()
  }
}

export const lensFlare = new Mesh(geometry, material)

lensFlare.type = 'Lensflare'
lensFlare.frustumCulled = false
lensFlare.renderOrder = Infinity
lensFlare.isLensflare = true

lensFlare.onBeforeRender = (renderer, scene, camera) => {
  viewport.copy(renderer.getCurrentViewport())

  const invAspect = viewport.w / viewport.z
  const halfViewportWidth = viewport.z / 2.0
  const halfViewportHeight = viewport.w / 2.0

  const size = 16 / viewport.w
  scale.set(size * invAspect, size)

  validArea.min.set(viewport.x, viewport.y)
  validArea.max.set(viewport.x + (viewport.z - 16), viewport.y + (viewport.w - 16))

  // calculate position in screen space
  positionScreen.setFromMatrixPosition(lensFlare.matrixWorld)
  positionScreen.applyMatrix4(camera.matrixWorldInverse)
  positionScreen.applyMatrix4(camera.projectionMatrix)

  // horizontal and vertical coordinate of the lower left corner of the pixels to copy
  screenPositionPixels.x = viewport.x + (positionScreen.x * halfViewportWidth) + halfViewportWidth - 8
  screenPositionPixels.y = viewport.y + (positionScreen.y * halfViewportHeight) + halfViewportHeight - 8

  // screen cull
  if (validArea.containsPoint(screenPositionPixels)) {
    // save current RGB to temp texture
    renderer.copyFramebufferToTexture(screenPositionPixels, tempMap)

    // render pink quad
    const u1 = material1a.uniforms
    u1.scale.value = scale
    u1.screenPosition.value = positionScreen

    renderer.renderBufferDirect(camera, null, geometry, material1a, mesh1, null)

    // copy result to occlusionMap
    renderer.copyFramebufferToTexture(screenPositionPixels, occlusionMap)

    // restore graphics
    const u2 = material1b.uniforms
    u2.scale.value = scale
    u2.screenPosition.value = positionScreen

    renderer.renderBufferDirect(camera, null, geometry, material1b, mesh1, null)

    // render elements
    const vecX = -positionScreen.x * 2
    const vecY = -positionScreen.y * 2

    for (let i = 0, l = elements.length; i < l; i++) {
      const element = elements[i]
      const uniforms = material2.uniforms

      uniforms.color.value.copy(element.color)
      uniforms.map.value = element.texture
      uniforms.screenPosition.value.x = positionScreen.x + vecX * element.distance
      uniforms.screenPosition.value.y = positionScreen.y + vecY * element.distance

      const size = element.size / viewport.w
      const invAspect = viewport.w / viewport.z

      uniforms.scale.value.set(size * invAspect, size)

      material2.uniformsNeedUpdate = true

      renderer.renderBufferDirect(camera, null, geometry, material2, mesh2, null)
    }
  }
}
