/**
 * @author alteredq / http://alteredqualia.com/
 */

import {
  UniformsUtils,
  ShaderMaterial,
  OrthographicCamera,
  Scene,
  Mesh,
  PlaneBufferGeometry
} from 'three'

import Pass from '../effect-composer/pass'
import shader from './shader'

export default class FilmPass extends Pass {
  constructor (params) {
    super()
    this.uniforms = UniformsUtils.clone(shader.uniforms)

    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    })

    const {
      grayscale = 0.0,
      noiseIntensity = 0.1,
      scanlinesIntensity = 0.0,
      scanlinesCount = 4096,
      renderToScreen = false
    } = params

    this.renderToScreen = renderToScreen
    this.uniforms.grayscale.value = grayscale
    this.uniforms.nIntensity.value = noiseIntensity
    this.uniforms.sIntensity.value = scanlinesIntensity
    this.uniforms.sCount.value = scanlinesCount

    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.scene = new Scene()

    this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null)
    this.quad.frustumCulled = false // Avoid getting clipped
    this.scene.add(this.quad)
  }

  render (renderer, writeBuffer, readBuffer, delta, maskActive) {
    this.uniforms.tDiffuse.value = readBuffer.texture
    this.uniforms.time.value += delta

    this.quad.material = this.material

    if (this.renderToScreen === true) {
      renderer.render(this.scene, this.camera)
    } else {
      renderer.render(this.scene, this.camera, writeBuffer, this.clear)
    }
  }
}
