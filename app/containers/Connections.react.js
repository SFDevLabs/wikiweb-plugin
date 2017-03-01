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
    shouldShowBox: true,
    dummyData: {
      recommendations: 183,
      connectionsIndex: 0,
      connections: [
        {
          title: 'Gone with the Wind, a hunters classic',
          base_url: 'https://www.wsj.com/',
          connected_by: 'Nick Sinai',
          connected_by_handle: 'NickSinai',
          connected_by_handle_url: 'http://twitter.com/NickSinai',
        },
        {
          title: 'Only a Savant Would Click Like a Reindeer',
          base_url: 'https://eoinmcmillan.com',
          connected_by: 'Eoin McMillan',
          connected_by_handle: 'mceoin',
          connected_by_handle_url: 'http://twitter.com/mceoin',
        },
        {
          title: 'John Travolta Aint Got Nothin on Me, said Testosterone',
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
      shouldShowBox: !this.state.shouldShowBox
    });
  };

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
      dummyData
    } = this.state;

    let incrementButtonStyle;
    let decrementButtonStyle;

    if (dummyData.connections.length) {  
      incrementButtonStyle = { color: 'rgba(0,0,0,.6)' };
      decrementButtonStyle = { color: 'rgba(0,0,0,.6)' };
      if (dummyData.connections.length - 1 === dummyData.connectionsIndex) {
        incrementButtonStyle = { color: 'rgba(0,0,0,.33)' };
      } else if (dummyData.connectionsIndex === 0) {
        decrementButtonStyle = { color: 'rgba(0,0,0,.33)' };
      }
    } else {
      incrementButtonStyle = { display: 'none' };
      decrementButtonStyle = { display: 'none' };
    }

    return (
      <div className={'wikiwebFooter'} style={{ height: 45 }} >
        <div className={'centerBox'}>

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
              <div onMouseEnter={enterConnectionBox} onMouseLeave={leaveConnectionBox} >
                <i id='addConnectionIcon' onClick={toggleUrlSubmitForm} className={'fa fa-plus-square-o'} style={{ color: 'rgba(0,0,0,.33)', fontSize: 27, paddingTop: 3 }} />
              </div>
              <div className={'inputBox'}>
                <Add />
              </div>
            </div>
            <div className={'verticalDivider'} style={{ marginRight: 4 }}></div>
          </div>

          <div className={'recommendationBox'}>
            <div style={{ width: 500, paddingLeft: 10 }}>
              <div className={'readNext'}>
                <span className={'noOverflow'}>Read next</span>
              </div>
              <div className={'nextRead'}>
                <span className={'noOverflow'}>
                  {dummyData.connections[dummyData.connectionsIndex].title}
                </span>
              </div>
            </div>
            <div className={'rotateRecommendationsBox'}>
              <i onClick={this.incrementConnectionsIndex.bind(this)} style={incrementButtonStyle} className={'fa fa-caret-up recommendationToggleCaret'}></i>
              <i onClick={this.decrementConnectionsIndex.bind(this)} style={decrementButtonStyle} className={'fa fa-caret-down recommendationToggleCaret'}></i>
            </div>
            <div className={'verticalDivider'} style={{ justifyContent: 'flex-end' }}></div>
          </div>

          <div className='animationsExperiment' style={{ backgroundColor: 'blue' }}>
            <TransitionGroup>
              { this.state.shouldShowBox && <Box/>}
            </TransitionGroup>
            <button
              className="toggle-btn"
              onClick={this.toggleBox}
            >
              toggle
            </button>
          </div>

        </div>
        <div style={{position:"fixed", top:0, left:0, backgroundColor:'purple' }}>
          TITLE: {title}
        </div>
      </div>
    );
  }
}

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

function toggleUrlSubmitForm(e) {
  var urlSubmitForm = document.getElementById('urlSubmitForm');
  var addConnectionIcon = document.getElementById('addConnectionIcon');
  if (urlSubmitForm.classList.contains('activeUrlSubmitForm')) {
    urlSubmitForm.classList.remove('activeUrlSubmitForm');
    urlSubmitForm.classList += ' inactiveUrlSubmitForm';
    addConnectionIcon.style.color='rgba(0,0,0,.33)';
    addConnectionIcon.classList.remove('rotateIn');
    addConnectionIcon.classList += ' rotateOut';
  } else {
    urlSubmitForm.classList.remove('inactiveUrlSubmitForm');
    urlSubmitForm.classList += ' activeUrlSubmitForm';
    document.getElementById('inputUrl').focus();
    if (addConnectionIcon.classList.contains('rotateOut')){
      addConnectionIcon.style.color='rgba(128,0,128,.6)';
      addConnectionIcon.classList.remove('rotateOut');
      addConnectionIcon.className += ' rotateIn';
    }
  }
  e.preventDefault();
}

window.onkeyup = function(e) {
  if (e.keyCode == 27) { // escape key maps to keycode `27`
    var urlSubmitForm = document.getElementById('urlSubmitForm');
    var addConnectionIcon = document.getElementById('addConnectionIcon');
    if (urlSubmitForm.classList.contains('activeUrlSubmitForm')) {
      urlSubmitForm.classList.remove('activeUrlSubmitForm');
      urlSubmitForm.classList += ' inactiveUrlSubmitForm';
      addConnectionIcon.style.color='rgba(0,0,0,.33)';
      addConnectionIcon.classList.remove('rotateIn');
      addConnectionIcon.classList += ' rotateOut';
    }
  }
}
