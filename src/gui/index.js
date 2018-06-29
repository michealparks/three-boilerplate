import {h, Component} from 'preact'
import state from '../state'
import Menu from './menu'
import Controls from './controls'

export default class Gui extends Component {
  constructor (props) {
    super(props)
    this.state = {isInMenu: state.isInMenu}
  }

  componentDidMount () {
    addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        state.isInMenu = !state.isInMenu
        this.setState({isInMenu: state.isInMenu})
      }
    })
  }

  render (props, {isInMenu}) {
    return (
      <span class='gui'>
        {isInMenu ? <Menu /> : null}
        <Controls />
      </span>
    )
  }
}
