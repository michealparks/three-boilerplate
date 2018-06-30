import {RepeatWrapping} from 'three'
import loadTexture from '../util/load-texture'
import renderer from '../engine/renderer'

const maxAnisotropy = renderer.capabilities.getMaxAnisotropy()

export const skyTexture = loadTexture('public/assets/space.jpg')
skyTexture.wrapS = RepeatWrapping
skyTexture.wrapT = RepeatWrapping
skyTexture.repeat.x = 18
skyTexture.repeat.y = 18

// TODO: set in updateQuality()
skyTexture.anisotropy = maxAnisotropy

export const lensFlareTextures = [
  loadTexture('public/assets/lensflare0.png'),
  loadTexture('public/assets/lensflare0.png'),
  loadTexture('public/assets/lensflare1.png'),
  loadTexture('public/assets/lensFlare2.png'),
  loadTexture('public/assets/lensflare3.png')
]

for (let i = 0, l = lensFlareTextures.length; i < l; i += 1) {
  lensFlareTextures[i].anisotropy = maxAnisotropy
}
