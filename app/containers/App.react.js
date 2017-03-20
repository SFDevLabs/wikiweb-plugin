import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import FullPage from './FullPage.react';
import Connections from './Connections.react';
import { fetchSearch } from '../actions/currentPage';
import { fetchProfile } from '../actions/user';

class App extends Component {

  constructor() {
    super();
    this.state = {
      wikiwebExpanded: true
    };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const that = this;
    const { dispatch } = this.props;


    chrome.storage.local.get(['wikiwebExpanded'], function (res) {
      const wikiwebExpanded = res !==null ? res.wikiwebExpanded : false;
      that.setState({
        wikiwebExpanded
      })
    });


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
    const { wikiwebExpanded } = this.state;
    return (
      <div id='wikiwebApp' >
        {wikiwebExpanded ?
          <FullPage fullPageToggle={this.fullPageToggle} /> :
          null
        }
        <Connections expanded={wikiwebExpanded} fullPageToggle={this.fullPageToggle} />
      </div>
    );
  }

  fullPageToggle = () => {
    const { wikiwebExpanded } = this.state;
    chrome.storage.local.set({ wikiwebExpanded: !wikiwebExpanded });
    this.setState({
      wikiwebExpanded: !wikiwebExpanded,
    });
  }
}

export default connect()(App);
