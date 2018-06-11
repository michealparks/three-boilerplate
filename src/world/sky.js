import {resolve} from 'path'
import {
  WebGLRenderer,
  SphereBufferGeometry,
  TextureLoader,
  MeshBasicMaterial,
  Mesh,
  RepeatWrapping,
  BackSide
} from 'three'
import {SIZE_MAP} from '../util/constants'

const segments = 20
const skyGeo = new SphereBufferGeometry(
  // Radius
  SIZE_MAP / 2,
  // Width segments
  segments,
  // Height segments
  segments,
  // horizontal starting angle
  0,
  // horizontal sweep angle size
  Math.PI,
  // vertical starting angle
  0,
  // vertical sweep angle size
  Math.PI
)

const texture = new TextureLoader()
  .load(resolve(__root__, 'public/assets/space.jpg'))

texture.wrapS = RepeatWrapping
texture.wrapT = RepeatWrapping
texture.repeat.x = 18
texture.repeat.y = 18
texture.anisotropy = new WebGLRenderer().capabilities.getMaxAnisotropy()

const material = new MeshBasicMaterial({
  map: texture,
  side: BackSide
})

const sky = new Mesh(skyGeo, material)

export default sky
