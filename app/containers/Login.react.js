import React, { Component } from 'react';

class Login extends Component {
  render() {
    /* */
    return (
      <div className={'pleaseLoginBox'}>
        <span>
          You must be logged in to make a connection
        </span>
        <a href="">
          <span className={'loginButton'} onClick={function () { chrome.tabs.create({ url: 'http://localhost:3000/login' }); }}>
            Login
          </span>
        </a>
      </div>
    );
  }
}

export default Login;
