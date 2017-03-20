import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import FullPage from './FullPage.react';
import Connections from './Connections.react';
import { fetchSearch } from '../actions/currentPage';
import { fetchProfile } from '../actions/user';

class App extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs) => {
        const tab = tabs[0];
        if (tab) {
          const { url } = tab;
          dispatch(fetchSearch(url));
          dispatch(fetchProfile());
        }
      });
  }

  render() {
    return (
      <div id='wikiwebApp' style={{ height: '100%' }}>
        <FullPage />
        <Connections />
      </div>
    );
  }
}

export default connect()(App);
