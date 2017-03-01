import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { connect } from 'react-redux';
//import ReactGA from 'react-ga';
import Connections from './Connections.react';
import { fetchSearch } from '../actions/currentPage';
import { fetchProfile } from '../actions/user';

function logPageView() {
  if ( typeof(_gaq) !== 'undefined'){
    _gaq.push(['_setAccount', 'UA-90661699-1']);
    _gaq.push(['_trackPageview', location.hash]);
  }
}

class App extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    chrome.runtime.onMessage.addListener(
      (sender) => {
        const { url } = sender;
        dispatch(fetchSearch(url));
        dispatch(fetchProfile());
      }
    );
  }

  render() {
    return (
      <Connections />
    );
  }
}

export default connect()(App);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  ga.onload = function(){
    setTimeout(function(){
      _gaq.push(['_setAccount', 'UA-90661699-1']);
      _gaq.push(['_trackPageview', 'extentionOpened']);
      logPageView();
    }, 10)
  }
})();
