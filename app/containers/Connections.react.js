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
    shouldShowBox: true
  };

  toggleBox = () => {
    this.setState({
      shouldShowBox: !this.state.shouldShowBox
    });
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    superEdges: PropTypes.array.isRequired,
    entityCount: PropTypes.number.isRequired,
    id: PropTypes.string,
  }

  componentDidMount() {

  }

  render() {
    const {
      superEdges,
      entityCount,
      id,
      isFetching
    } = this.props;


    return (
      <div className={'wikiwebFooter'} style={ styles.main } >

        <div style={ styles.noEdges }>
          <div style={ styles.centerBox }>
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              
              <div className={'heartBox'} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                <div onMouseEnter={enterHeartIcon} onMouseLeave={leaveHeartIcon} >
                  <i id='heartIcon' className={'fa fa-heart-o heartIcon'} style={{ fontSize: 22, paddingRight: 4 }} />
                </div>
                <div onMouseEnter={enterHeartText} onMouseLeave={leaveHeartText} >
                  <span id='heartText' className={ 'heartText' } style={{ fontSize: 16, fontFamily: '"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif' }}>183</span>
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

              <div className={'recommendationBox'}>
                <div style={{ width: 400, paddingLeft: 10 }}>
                  <div className={'readNext'} style={styles.readNext}>
                    <span className={'noOverflow'}>Read next</span>
                  </div>
                  <div className={'nextRead'} style={styles.nextRead}>
                    <span className={'noOverflow'}>
                      The Tech Resistance Awakens from Darth Maul&apos;s Lair
                    </span>
                  </div>
                </div>
              </div>

              <div className="experiment" style={{ backgroundColor: 'blue' }}>

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
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(Connections);

// Functons and constants
const styles = {
  main: {
    height: 45,
    backgroundColor: 'white',
    display: 'flex',
    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif !important',
    color: 'rgba(0,0,0,.8)',
    fontSize: '16px',
  },
  edgeBox: {
    /* Left Blank until data */
  },
  noEdges: {
    color: 'rgba(0,0,0,.8)',
    flexDirection: 'row',
    listStyle: 'none',
    display: '-webkit-box',
    display: '-moz-box',
    display: '-ms-flexbox',
    display: '-webkit-flex',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  centerBox: {
    marginLeft: '20%',
    marginRight: '20%',
    width: 936,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
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

function edgeBoxJSX(data){
  return (
    <div style={ styles.edgeBox }>
      <div>Page Has {data.length} Connection(s)</div>
    </div>
  );
}
