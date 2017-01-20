import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {

  // goToAddConnectionPage = () => { chrome.tabs.update(null, { url: 'http://localhost:3000/login' }); };
  render() {
    return (
      <div className={'loginJS'} >
        <Link to="/" style={{ textDecoration: 'none' }} ><span style={{ paddingLeft: 6, paddingRight: 6, fontSize: 24, color: '#70037C' }} >&#8592;</span></Link>
        <div style={{ paddingLeft: '15%', paddingRight: '15%' }}>
          <div style={{ marginTop: 20 }}>You must be logged in to make a connection.</div>
          <a href="">
            <div className={'twitterButton'} onClick={function () { chrome.tabs.create({ url: 'http://localhost:3000/login' }); }}>
              <img alt="" src="img/Twitter_Logo_White.svg" />
              <span>Continue with Twitter</span>
            </div>
          </a>
        </div>
        <div className={'disclaimerFooter'}>
          <span>* We will never post to Twitter without your permission.</span>
        </div>
      </div>);
  }
}

export default Login;
