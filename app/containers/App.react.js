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
      wikiwebExpanded: false
    };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const url = unescape(this.getParamValue('href'));
    dispatch(fetchSearch(url));
    dispatch(fetchProfile());
  }

  render() {
    const { wikiwebExpanded } = this.state;
    return (
      <div id='wikiwebApp' >
        <Connections expanded={wikiwebExpanded} fullPageToggle={this.fullPageToggle} />
        {wikiwebExpanded ?
          <FullPage fullPageToggle={this.fullPageToggle} /> :
          null
        }
      </div>
    );
  }

  fullPageToggle = () => {
    const { wikiwebExpanded } = this.state;
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      const tab = tabs[0];
      if (tab) {
        chrome.tabs.sendMessage(tab.id, {wikiwebExpanded: !wikiwebExpanded});
      }
    });
    this.setState({
      wikiwebExpanded: !wikiwebExpanded,
    });
  }

  getParamValue = (paramName) => {
    const url = window.location.search.substring(1); //get rid of "?" in querystring
    const qArray = url.split('&'); //get key-value pairs
    for (let i = 0; i < qArray.length; i + 1) {
      const pArr = qArray[i].split('='); //split key and value
      if (pArr[0] === paramName) {
        return pArr[1]; //return value
      }
    }
  }
}

export default connect()(App);
