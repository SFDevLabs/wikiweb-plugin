import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {

  // goToAddConnectionPage = () => { chrome.tabs.update(null, { url: 'http://localhost:3000/login' }); };
  render() {
    return (
      <div className={'loginJS'} style={{ minHeight: 260, paddingTop: 4, fontFamily: 'Verdana, Geneva, sans-serif', color: '#000000', borderTop: '3px solid #70037C' }}>
        <Link to="/" style={{ textDecoration: 'none' }} ><span style={{ paddingLeft: 6, paddingRight: 6, fontSize: 24, color: '#70037C' }} >&#8592;</span></Link>
        <div style={{ paddingLeft: '15%', paddingRight: '15%' }}>
          <div style={{ marginTop: -4, display: 'block' }} >
            <img alt="" src="img/logo.png" style={{ height: 50, width: 50, margin: 'auto' }} />
          </div>
          <br />
          <br />
          <div>You must be logged in to make a connection.</div>
          <br />
          <div onClick={/*this.goToAddConnectionPage()*/} style={{ display: 'block', width: '100%' }}>
            <img alt="" src="img/sign-in-with-twitter-gray.png" style={{ marginTop: 15, marginLeft: 35 }} />
          </div>
          <br />
        </div>
      </div>);
  }
}

export default Login;
