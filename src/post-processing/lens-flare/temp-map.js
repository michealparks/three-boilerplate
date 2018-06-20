import {
  DataTexture,
  RGBFormat,
  NearestFilter,
  ClampToEdgeWrapping
} from 'three'

const tempMap = new DataTexture(
  new Uint8Array(16 * 16 * 3), 16, 16, RGBFormat)
tempMap.minFilter = NearestFilter
tempMap.magFilter = NearestFilter
tempMap.wrapS = ClampToEdgeWrapping
tempMap.wrapT = ClampToEdgeWrapping
tempMap.needsUpdate = true

export default tempMap
