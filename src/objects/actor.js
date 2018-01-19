export default class Actor {
  constructor (props) {
    this.v = props.v || 0
    this.update = this.update.bind(this)
  }

  update (matrix) {
    const {mesh} = this
  }
}
