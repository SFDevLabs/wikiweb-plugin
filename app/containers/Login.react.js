import React, { Component } from 'react';

class Login extends Component {

  render() {

    return (
      <div className={'pleaseLoginBox'} style={{ width: 500, display: 'flex', justifyContent: 'center' }}>
        <a href="">
          <span onClick={function () { chrome.tabs.create({ url: 'http://localhost:3000/login' }); }}>You must be logged in to make a connection</span>
        </a>
      </div>);
  }
}

export default Login;
