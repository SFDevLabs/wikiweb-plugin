import React, { Component } from 'react';
import { Link } from 'react-router';

class Add extends Component {

  static propTypes = {

  }

  constructor() {
    super();
    this.state = {
      val: '',
    };
  }

  onKeyDown = (e) => {
    this.setState({
      val: e.target.val
    });
  }

  render() {
    return (
      <div>
        <Link to="/" >back</Link>
        <div>Add Holder <input onKeyDown={this.onKeyDown} value={this.state.val} /></div>
      </div>

    );
  }

}

export default Add;
