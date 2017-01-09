import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class Add extends Component {

  constructor(props) {
    super()
    this.state = {
      val: ""
    }
  }
  static propTypes = {

  }

  render() {
    return (
      <div>
        <Link to="/" >back</Link>
        <div>Add Holder <input onKeyDown={this.onKeyDown} value={this.state.val} /></div>
      </div>

    )
  }

  onKeyDown  = (e) => {
    this.setState({
      val:e.target.val
    });
  }
}

export default Add
