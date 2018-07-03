/**
 * Depth-of-field post-process with bokeh shader
 */

import {
  WebGLRenderTarget,
  LinearFilter,
  RGBFormat,
  MeshDepthMaterial,
  RGBADepthPacking,
  NoBlending,
  UniformsUtils,
  ShaderMaterial,
  OrthographicCamera,
  Scene,
  Mesh,
  Color,
  PlaneBufferGeometry
} from 'three'

import shader from './shader'
import Pass from '../effect-composer/pass'

export default class BokehPass extends Pass {
  constructor (scene, camera, params) {
    super()

    const {
      focus = 100,
      aspect = camera.aspect,
      aperture = 0.000009,
      maxblur = 0.01,
      renderToScreen = false,
      width = window.innerWidth,
      height = window.innerHeight
    } = params

    this.renderToScreen = renderToScreen
    this.scene = scene
    this.camera = camera

    // render targets
    this.renderTargetColor = new WebGLRenderTarget(width, height, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBFormat
    })

    this.renderTargetColor.texture.name = 'BokehPass.color'
    this.renderTargetDepth = this.renderTargetColor.clone()
    this.renderTargetDepth.texture.name = 'BokehPass.depth'

    // depth material

    this.materialDepth = new MeshDepthMaterial()
    this.materialDepth.depthPacking = RGBADepthPacking
    this.materialDepth.blending = NoBlending

    var bokehUniforms = UniformsUtils.clone(shader.uniforms)

    bokehUniforms[ 'tDepth' ].value = this.renderTargetDepth.texture

    bokehUniforms[ 'focus' ].value = focus
    bokehUniforms[ 'aspect' ].value = aspect
    bokehUniforms[ 'aperture' ].value = aperture
    bokehUniforms[ 'maxblur' ].value = maxblur
    bokehUniforms[ 'nearClip' ].value = camera.near
    bokehUniforms[ 'farClip' ].value = camera.far

    this.materialBokeh = new ShaderMaterial({
      defines: Object.assign({}, shader.defines),
      uniforms: bokehUniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    })

    this.uniforms = bokehUniforms
    this.needsSwap = false

    this.camera2 = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.scene2 = new Scene()

    this.quad2 = new Mesh(new PlaneBufferGeometry(2, 2), null)
    this.quad2.frustumCulled = false // Avoid getting clipped
    this.scene2.add(this.quad2)

    this.oldClearColor = new Color()
    this.oldClearAlpha = 1
  }

  render (renderer, writeBuffer, readBuffer, delta, maskActive) {
    this.quad2.material = this.materialBokeh

    // Render depth into texture
    this.scene.overrideMaterial = this.materialDepth

    this.oldClearColor.copy(renderer.getClearColor())
    this.oldClearAlpha = renderer.getClearAlpha()
    this.oldAutoClear = renderer.autoClear
    renderer.autoClear = false

    renderer.setClearColor(0xffffff)
    renderer.setClearAlpha(1.0)
    renderer.render(this.scene, this.camera, this.renderTargetDepth, true)

    // Render bokeh composite

    this.uniforms[ 'tColor' ].value = readBuffer.texture
    this.uniforms[ 'nearClip' ].value = this.camera.near
    this.uniforms[ 'farClip' ].value = this.camera.far

    if (this.renderToScreen === true) {
      renderer.render(this.scene2, this.camera2)
    } else {
      renderer.render(this.scene2, this.camera2, writeBuffer, this.clear)
    }

    this.scene.overrideMaterial = null
    renderer.setClearColor(this.oldClearColor)
    renderer.setClearAlpha(this.oldClearAlpha)
    renderer.autoClear = this.oldAutoClear
  }
}
