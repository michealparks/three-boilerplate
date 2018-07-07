import {RepeatWrapping} from 'three'
import loadTexture from '../util/load-texture'
import {maxAnisotropy} from '../engine/renderer'

export const lensFlareTextures = [
  loadTexture('public/assets/lensflare0.png', {anisotropy: maxAnisotropy}),
  loadTexture('public/assets/lensflare0.png', {anisotropy: maxAnisotropy}),
  loadTexture('public/assets/lensflare1.png', {anisotropy: maxAnisotropy}),
  loadTexture('public/assets/lensflare2.png', {anisotropy: maxAnisotropy}),
  loadTexture('public/assets/lensflare3.png', {anisotropy: maxAnisotropy})
]

export const skyTexture = loadTexture('public/assets/space_2.png')
skyTexture.wrapS = RepeatWrapping
skyTexture.wrapT = RepeatWrapping
skyTexture.repeat.x = 6
skyTexture.repeat.y = 6

// TODO: set in updateQuality()
skyTexture.anisotropy = maxAnisotropy
