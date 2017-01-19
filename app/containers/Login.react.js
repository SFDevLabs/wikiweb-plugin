import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {
  render() {
    return (
      <div className={'footer'} style={{ position: 'absolute', bottom: 0, paddingTop: 1, borderTop: '1px solid #DCDCDC', height: 40, display: 'block' }}>
        Please Log In.
        <Link to="/" style={{ lineHeight: '40px', textDecoration: 'none', color: '#4d4d4d', outline: 'none' }}>
          Back
        </Link>
      </div>);
  }
}

export default Login;
