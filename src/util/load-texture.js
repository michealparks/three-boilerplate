import {TextureLoader} from 'three'
import {resolve} from 'path'

const loader = new TextureLoader()
const load = loader.load.bind(loader)

export default (path) => load(resolve(__root__, path))
