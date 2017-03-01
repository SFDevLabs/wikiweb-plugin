import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax } from 'gsap';
import Add from './Add.react';

const startIndex = 0;
const endIndex = 3;

const mapStateToProps = (state) => {
  const { entity:
    { id,
      entityCount,
      isFetching,
      title,
      superEdges,
      queryLink,
      canonicalLink,
    },
  } = state;
  return {
    id,
    entityCount,
    title,
    isFetching,
    superEdges,
    queryLink,
    canonicalLink,
  };
};

class Box extends Component {
  componentWillEnter (callback) {
    const el = this.container;
    TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
  }

  componentWillLeave (callback) {
    const el = this.container;
    TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
  }

  render () {
    return <div className="box" ref={c => this.container = c} style={{ backgroundColor: 'beige' }}>BOX</div>;
  }
}


class Connections extends Component {
  state = {
    isUserLoggedIn: false,
    isAddConnectionToggledOn: false,
    shouldShowConnectionBox: true,
    dummyData: {
      recommendations: 183,
      connectionsIndex: 0,
      connections: [
        {
          title: 'Gone with the Wind, a hunters classic',
          connection_url: 'http://paulgraham.com/ds.html',
          base_url: 'https://www.wsj.com/',
          connected_by: 'Nick Sinai',
          connected_by_handle: 'NickSinai',
          connected_by_handle_url: 'http://twitter.com/NickSinai',
        },
        {
          title: 'Only a Savant Would Click Like a Reindeer',
          connection_url: 'http://paulgraham.com/ds.html',
          base_url: 'https://eoinmcmillan.com',
          connected_by: 'Eoin McMillan',
          connected_by_handle: 'mceoin',
          connected_by_handle_url: 'http://twitter.com/mceoin',
        },
        {
          title: 'John Travolta Aint Got Nothin on Me, said Testosterone',
          connection_url: 'http://paulgraham.com/ds.html',
          base_url: 'http://sfdevlabs.com/',
          connected_by: 'Jeff Jenkins',
          connected_by_handle: 'jeffj',
          connected_by_handle_url: 'http://twitter.com/jeffj',
        }
      ]
    }
  };

  toggleBox = () => {
    this.setState({
      shouldShowConnectionBox: !this.state.shouldShowConnectionBox
    });
  };

  toggleLogin = () => {
    this.setState({
      isUserLoggedIn: !this.state.isUserLoggedIn
    });
  }

  incrementConnectionsIndex = (e) => {
    const workingDataConst = this.state.dummyData;
    if (workingDataConst.connections.length > 0 && workingDataConst.connectionsIndex < workingDataConst.connections.length-1){
      this.setState({
        dummyData: {
          ...this.state.dummyData,
          connectionsIndex: workingDataConst.connectionsIndex + 1  
        }
      })
    }
  }

  decrementConnectionsIndex = (e) => {
    const workingDataConst = this.state.dummyData;
    if (workingDataConst.connections.length > 0 && workingDataConst.connectionsIndex > 0){
      this.setState({
        dummyData: {
          ...this.state.dummyData,
          connectionsIndex: workingDataConst.connectionsIndex - 1  
        }
      })
    } 
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    superEdges: PropTypes.array.isRequired,
    entityCount: PropTypes.number.isRequired,
    id: PropTypes.string,
  }

  componentDidMount() {
    //no opp
  }

  // @TODO DATA PULLED FROM API! THERE ARE {superEdges? superEdges.length: 0} connections(s) ON THIS PAGE!

  render() {
    const {
      superEdges,
      entityCount,
      id,
      isFetching,
      title
    } = this.props;

    const {
      dummyData,
      isUserLoggedIn,
      isAddConnectionToggledOn
    } = this.state;

    let incrementButtonStyle;
    let decrementButtonStyle;

    if (dummyData.connections.length) {  
      incrementButtonStyle = { color: 'rgba(0,0,0,.6)' };
      decrementButtonStyle = { color: 'rgba(0,0,0,.6)' };
      if (dummyData.connections.length - 1 === dummyData.connectionsIndex) {
        decrementButtonStyle = { color: 'rgba(0,0,0,.33)' };
      } else if (dummyData.connectionsIndex === 0) {
        incrementButtonStyle = { color: 'rgba(0,0,0,.33)' };
      }
    } else {
      incrementButtonStyle = { display: 'none' };
      decrementButtonStyle = { display: 'none' };
    }

    // onClick={function () { chrome.tabs.create({ url: 'http://localhost:3000/login' }); }}

    const showLoginInfo = isAddConnectionToggledOn && !isUserLoggedIn ? 'flex' : 'none';
    const loginButton = (
      <span className={'loginButton'} style={{ display: showLoginInfo }} onClick={this.toggleLogin}>
        Login
      </span>);

    const loginTextJSX = (
      <div className={'loginText'} style={{ display: showLoginInfo }}>
        <span>You must be logged in to make a connection</span>
      </div>
    )

    const inputBoxJSX = isUserLoggedIn && isAddConnectionToggledOn ? (
      <div className={'inputBox'}>
        <Add />
      </div>) : null;

    const showRecommendationBox = isAddConnectionToggledOn ? 'none' : 'flex';
    const recommendationBoxJSX = dummyData.connections.length > 0 ?
      (<div className={'recommendationBox'} style={{display: showRecommendationBox}}>
          <div style={{ width: 480 }}>
            <div className={'readNext'}>
              <span className={'noOverflow'}>
                <a href={dummyData.connections[dummyData.connectionsIndex].connection_url}>Read next</a>
              </span>
            </div>
            <div className={'nextRead'}>
              <span className={'noOverflow'}>
                <a href={dummyData.connections[dummyData.connectionsIndex].connection_url}>{dummyData.connections[dummyData.connectionsIndex].title}</a>
              </span>
            </div>
          </div>
          <div className={'changeRecommendationBox'}>
            <i onClick={this.incrementConnectionsIndex.bind(this)} style={decrementButtonStyle} className={'fa fa-caret-up recommendationToggleCaret'}></i>
            <i onClick={this.decrementConnectionsIndex.bind(this)} style={incrementButtonStyle} className={'fa fa-caret-down recommendationToggleCaret'}></i>
          </div>
        </div>) : 
        ( <div className={'recommendationBox'} style={{display: showRecommendationBox}}>
            <div style={{ width: 480 }}>
              Bro. Bro! Add a link. And style this section while you&#39;re at it.
            </div>
          </div>)

    return (
      <div className={'wikiwebFooter'} style={{ height: 45 }} >
        <div className={'centerBox'}>

        <div id='leftCol'>
          <div className={'addMetaBox'}>
            <div className={'heartBox'} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <div onMouseEnter={enterHeartIcon} onMouseLeave={leaveHeartIcon} >
                <i id='heartIcon' className={'fa fa-heart-o heartIcon'} style={{ fontSize: 22, paddingRight: 4 }} />
              </div>
              <div onMouseEnter={enterHeartText} onMouseLeave={leaveHeartText} >
                <span id='heartText' className={'heartText'}>{dummyData.recommendations}</span>
              </div>
            </div>
            <div className={'addBox'} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
              <div onMouseEnter={enterConnectionBox} onMouseLeave={leaveConnectionBox} className={'addConnectionBox'} >
                <i id='addConnectionIcon' onClick={toggleMiddleSection.bind(this)} className={'fa fa-plus-square-o'} style={{ color: 'rgba(0,0,0,.33)', fontSize: 27, paddingTop: 3 }} />
              </div>
            </div>
            <div className={'verticalDivider'} style={{ marginLeft: 20 }}></div>
          </div>
        </div>
          
          <div id='middleCol'>
            {recommendationBoxJSX}
            {loginTextJSX}
            {inputBoxJSX}
          </div>
          
          <div id='rightCol'>
            <div className={'verticalDivider'} style={{ justifyContent: 'flex-end' }}></div>
            {loginButton}
          </div>

        </div>
      </div>
    );
  }
}

// <div className='animationsExperiment' style={{ backgroundColor: 'blue' }}>
//   <TransitionGroup>
//     { this.state.shouldShowBox && <Box/>}
//   </TransitionGroup>
//   <button
//     className="toggle-btn"
//     onClick={this.toggleBox}
//   >
//     toggle
//   </button>
// </div>


export default connect(mapStateToProps)(Connections);

// Functons and constants
const styles = {
  /* currently blank... styles moved to stylesheet */
}

function enterHeartIcon(e) {
  var el = document.getElementById('heartIcon');
  el.classList.remove('leaveHeartIcon');
  el.className += ' enterHeartIcon';
  e.preventDefault();
}

function leaveHeartIcon(e) {
  var el = document.getElementById('heartIcon');
  el.classList.remove('enterHeartIcon');
  el.className += ' leaveHeartIcon';
  e.preventDefault();
}

function enterHeartText(e) {
  var el = document.getElementById('heartText');
  el.classList.remove('leaveHeartText');
  el.className += ' enterHeartText';
  e.preventDefault();
}

function leaveHeartText(e) {
  var el = document.getElementById('heartText');
  el.classList.remove('enterHeartText');
  el.className += ' leaveHeartText';
  e.preventDefault();
}

function enterConnectionBox(e) {
  var el = document.getElementById('addConnectionIcon');
  el.style.color='rgba(128,0,128,.6)';
  el.classList.remove('rotateOut');
  el.className += ' rotateIn';
  e.preventDefault();
}

function leaveConnectionBox(e) {
  var el = document.getElementById('addConnectionIcon');
  var otherEl = document.getElementById('urlSubmitForm');
  if (otherEl.classList.contains('activeUrlSubmitForm')){
    // do nothing.
  } else {
    el.style.color='rgba(0,0,0,.33)';
    el.classList.remove('rotateIn');
    el.classList += ' rotateOut';
  }
  e.preventDefault();
}

function toggleMiddleSection(e) {
  this.setState({
    isAddConnectionToggledOn: !this.state.isAddConnectionToggledOn
  });
  e.preventDefault();
}

window.onkeyup = function(e) {
  if (e.keyCode == 27) { /* escape key */
    /* Yo Jeff - I'm too tired to think this one through, but how do I pass state through to a function on keypress? */
    /* thoughts are to attach this to body and pass state "this" through on all keystrokes, ... seems excessive */
  }
}
