import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Connections from './Connections.react';
import Login from './Login.react';
import Add from './Add.react';

class App extends Component {

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Connections} />
        <Route path="add" component={Add} />
        <Route path="login" component={Login} />
      </Router>
    );
  }
}

export default App;
