/**
 * @author alteredq / http://alteredqualia.com/
 */

import Pass from './pass'

export default class RenderPass extends Pass {
  constructor (scene, camera, params) {
    super()

    const {
      renderToScreen = false,
      overrideMaterial,
      clearColor,
      clearAlpha = 0
    } = params || {}

    this.renderToScreen = renderToScreen
    this.scene = scene
    this.camera = camera
    this.overrideMaterial = overrideMaterial
    this.clearColor = clearColor
    this.clearAlpha = clearAlpha
    this.clear = true
    this.clearDepth = false
    this.needsSwap = false
  }

  render (renderer, writeBuffer, readBuffer, delta, maskActive) {
    const oldAutoClear = renderer.autoClear
    renderer.autoClear = false

    this.scene.overrideMaterial = this.overrideMaterial

    let oldClearColor, oldClearAlpha

    if (this.clearColor !== undefined) {
      oldClearColor = renderer.getClearColor().getHex()
      oldClearAlpha = renderer.getClearAlpha()
      renderer.setClearColor(this.clearColor, this.clearAlpha)
    }

    if (this.clearDepth !== false) {
      renderer.clearDepth()
    }

    renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear)

    if (this.clearColor !== undefined) {
      renderer.setClearColor(oldClearColor, oldClearAlpha)
    }

    this.scene.overrideMaterial = null
    renderer.autoClear = oldAutoClear
  }
}
