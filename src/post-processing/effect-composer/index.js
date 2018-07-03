/**
 * @author alteredq / http://alteredqualia.com/
 */

import {
  LinearFilter,
  RGBAFormat,
  WebGLRenderTarget
} from 'three'

import CopyShader from './copy-shader'
import ShaderPass from './shader-pass'
import MaskPass from './mask-pass'
import ClearMaskPass from './clear-mask-pass'

export default class EffectComposer {
  constructor (renderer) {
    this.renderer = renderer

    const size = renderer.getDrawingBufferSize()
    const target = new WebGLRenderTarget(size.width, size.height, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
      stencilBuffer: false
    })

    target.texture.name = 'EffectComposer.rt1'

    this.renderTarget1 = target
    this.renderTarget2 = target.clone()
    this.renderTarget2.texture.name = 'EffectComposer.rt2'

    this.writeBuffer = this.renderTarget1
    this.readBuffer = this.renderTarget2

    this.passes = []
    this.copyPass = new ShaderPass(CopyShader)
  }

  swapBuffers () {
    const tmp = this.readBuffer
    this.readBuffer = this.writeBuffer
    this.writeBuffer = tmp
  }

  addPass (pass) {
    this.passes.push(pass)
    const size = this.renderer.getDrawingBufferSize()
    pass.setSize(size.width, size.height)
  }

  insertPass (pass, index) {
    this.passes.splice(index, 0, pass)
  }

  render (delta) {
    // wtf is this variable
    let maskActive = false
    let il = this.passes.length
    let pass, i

    for (i = 0; i < il; i++) {
      pass = this.passes[ i ]

      if (pass.enabled === false) continue

      pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive)

      if (pass.needsSwap) {
        if (maskActive) {
          const context = this.renderer.context

          context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff)
          this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, delta)
          context.stencilFunc(context.EQUAL, 1, 0xffffffff)
        }

        this.swapBuffers()
      }

      if (pass instanceof MaskPass) {
        maskActive = true
      } else if (pass instanceof ClearMaskPass) {
        maskActive = false
      }
    }
  }

  reset (renderTarget) {
    if (renderTarget === undefined) {
      const size = this.renderer.getDrawingBufferSize()

      renderTarget = this.renderTarget1.clone()
      renderTarget.setSize(size.width, size.height)
    }

    this.renderTarget1.dispose()
    this.renderTarget2.dispose()
    this.renderTarget1 = renderTarget
    this.renderTarget2 = renderTarget.clone()

    this.writeBuffer = this.renderTarget1
    this.readBuffer = this.renderTarget2
  }

  setSize (width, height) {
    this.renderTarget1.setSize(width, height)
    this.renderTarget2.setSize(width, height)

    for (let i = 0; i < this.passes.length; i++) {
      this.passes[ i ].setSize(width, height)
    }
  }
}
