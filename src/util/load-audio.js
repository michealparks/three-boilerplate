import {AudioLoader} from 'three'

const loader = new AudioLoader()
const load = loader.load.bind(loader)

export default (file, next) =>
  load(`${__root__}/public/assets/audio/${file}`, (buffer) => next(file, buffer))
