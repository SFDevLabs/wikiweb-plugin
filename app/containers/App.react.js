import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import ReactGA from 'react-ga';
import Connections from './Connections.react';
import Login from './Login.react';
import Add from './Add.react';
ReactGA.initialize('UA-90661699-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

class App extends Component {
  render() {
    return (
      <Router history={hashHistory} onUpdate={logPageView}>
        <Route path="/" component={Connections} />
        <Route path="add" component={Add} />
        <Route path="login" component={Login} />
      </Router>
    );
  }
}

export default App;
