import {GLTFLoader} from 'three/examples/js/loaders/GLTFLoader'

const loader = new GLTFLoader()
const load = loader.load.bind(loader)

export default (path, next) => {
  load(`${__root__}/${path}`, next)
}
