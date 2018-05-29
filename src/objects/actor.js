import {JSONLoader, Mesh} from 'three'

const {resolve} = require('path')
const loader = new JSONLoader()

export default class Actor {
  constructor (props) {
    if (!props) {
      throw new Error('Props not supplied to actor.')
    }

    this.v = props.v || 0

    if (props.json) {
      loader.load(resolve(__root__, `src/models/${props.json}.json`),
        // onload
        (geometry, materials) => {
          this.mesh = new Mesh(geometry, materials[0])
          this.onReady(this)
        },
        // onProgress
        () => {},
        // onError
        () => {})
    }
  }

  update () {

  }
}
