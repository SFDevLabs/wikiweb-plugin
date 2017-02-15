import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import Connections from './Connections.react';
import Login from './Login.react';
import Add from './Add.react';
import { fetchSearch } from '../actions/entity';
import { fetchProfile } from '../actions/user';

ReactGA.initialize('UA-90661699-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

class App extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      const url = tabs[0].url.split('?')[0];
      const tabId = tabs[0].id;
      dispatch(fetchSearch(url, tabId));
      dispatch(fetchProfile());
    });
  }

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

export default connect()(App);
