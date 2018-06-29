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

import {COLOR_SUNLIGHT} from '../../constants'
import loadTexture from '../../util/load-texture'
import shader from './shader'
import tempMap from './temp-map'
import material1a from './material1a'
import material1b from './material1b'

const textures = [
  loadTexture('public/assets/lensflare0.png'),
  loadTexture('public/assets/lensflare0.png'),
  loadTexture('public/assets/lensflare1.png'),
  loadTexture('public/assets/lensFlare2.png'),
  loadTexture('public/assets/lensflare3.png')
]

const colors = [
  new Color(COLOR_SUNLIGHT),
  new Color(COLOR_SUNLIGHT),
  new Color(COLOR_SUNLIGHT),
  new Color(COLOR_SUNLIGHT),
  new Color(COLOR_SUNLIGHT)
]

const sizes = [350, 60, 70, 150, 100]
// const distances = [0.0, 0.01, 0.05, 0.1, 0.2]

const distances = [0.0, 0.02, 0.1, 0.15, 0.2]

const interleavedBuffer = new InterleavedBuffer(new Float32Array([
  -1, -1, 0, 0, 0,
  1, -1, 0, 1, 0,
  1, 1, 0, 1, 1,
  -1, 1, 0, 0, 1
]), 5)

const geometry = new BufferGeometry()
geometry.setIndex([0, 1, 2, 0, 2, 3])
geometry.addAttribute('position', new InterleavedBufferAttribute(interleavedBuffer, 3, 0, false))
geometry.addAttribute('uv', new InterleavedBufferAttribute(interleavedBuffer, 2, 3, false))

const material = new MeshBasicMaterial({opacity: 0, transparent: true})

const occlusionMap = new DataTexture(new Uint8Array(16 * 16 * 3), 16, 16, RGBFormat)
occlusionMap.minFilter = NearestFilter
occlusionMap.magFilter = NearestFilter
occlusionMap.wrapS = ClampToEdgeWrapping
occlusionMap.wrapT = ClampToEdgeWrapping
occlusionMap.needsUpdate = true

// the following object is used for occlusionMap generation
const mesh1 = new Mesh(geometry, material1a)
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

  for (let i = 0, l = textures.length; i < l; i++) {
    textures[i].dispose()
  }
}

export const lensFlare = new Mesh(geometry, material)

lensFlare.type = lensFlare.name = 'Lensflare'
lensFlare.frustumCulled = false
lensFlare.renderOrder = -Infinity
lensFlare.isLensflare = true

const positionScreen = new Vector3()
const m1aUniforms = material1a.uniforms
const m1bUniforms = material1b.uniforms

lensFlare.onBeforeRender = (renderer, scene, camera) => {
  viewport.copy(renderer.getCurrentViewport())

  const invAspect = viewport.w / viewport.z
  const halfViewportWidth = viewport.z / 2.0
  const halfViewportHeight = viewport.w / 2.0

  const size = 16 / viewport.w
  scale.set(size * invAspect, size)

  validArea.min.set(viewport.x - 50, viewport.y - 50)
  validArea.max.set(
    (viewport.x + (viewport.z - 16)) + 50,
    (viewport.y + (viewport.w - 16)) + 50
  )

  // calculate position in screen space
  positionScreen.setFromMatrixPosition(lensFlare.matrixWorld)
  positionScreen.applyMatrix4(camera.matrixWorldInverse)
  positionScreen.applyMatrix4(camera.projectionMatrix)

  // horizontal and vertical coordinate of the lower left corner of the pixels to copy
  screenPositionPixels.x = viewport.x + (positionScreen.x * halfViewportWidth) + halfViewportWidth - 8
  screenPositionPixels.y = viewport.y + (positionScreen.y * halfViewportHeight) + halfViewportHeight - 8

  // screen cull
  if (!validArea.containsPoint(screenPositionPixels)) return

  // save current RGB to temp texture
  renderer.copyFramebufferToTexture(screenPositionPixels, tempMap)

  // render pink quad
  m1aUniforms.scale.value = scale
  m1aUniforms.screenPosition.value = positionScreen

  renderer.renderBufferDirect(
    camera, null, geometry, material1a, mesh1, null)

  // copy result to occlusionMap
  renderer.copyFramebufferToTexture(
    screenPositionPixels, occlusionMap)

  // restore graphics
  m1bUniforms.scale.value = scale
  m1bUniforms.screenPosition.value = positionScreen

  renderer.renderBufferDirect(
    camera, null, geometry, material1b, mesh1, null)

  // render elements
  const vecX = -positionScreen.x * 2
  const vecY = -positionScreen.y * 2
  const uniforms = material2.uniforms

  for (let i = 0, l = textures.length; i < l; i++) {
    uniforms.color.value.copy(colors[i])
    uniforms.map.value = textures[i]
    uniforms.screenPosition.value.x = positionScreen.x + vecX * distances[i]
    uniforms.screenPosition.value.y = positionScreen.y + vecY * distances[i]

    const size = sizes[i] / viewport.w

    uniforms.scale.value.set(size * invAspect, size)

    material2.uniformsNeedUpdate = true

    renderer.renderBufferDirect(camera, null, geometry, material2, mesh2, null)
  }
}
