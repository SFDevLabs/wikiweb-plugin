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
      <div className={'addJS'} style={{ minHeight: 266, paddingTop: 4, fontFamily: 'Verdana, Geneva, sans-serif', color: '#000000', borderTop: '3px solid #70037C' }}>
        <Link to="/" >back</Link>
        <form>
          <input />
          <input />
          <input />
        </form>
        <div>Add Holder <input onKeyDown={this.onKeyDown} value={this.state.val} /></div>
      </div>
    );
  }

}

export default Add;
