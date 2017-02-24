import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { fetchSearch } from '../actions/entity';
// import { fetchProfile } from '../actions/user';

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

class Connections extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    superEdges: PropTypes.array.isRequired,
    location: PropTypes.object,
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
      isFetching,
      location: {
        search,
      },
    } = this.props;

    const styles = {
      noOverflow: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
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
      leftBox: {
        marginLeft: '20%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      rightBox: {
        marginRight: '15%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      readNext: {
        marginTop: '-3px',
        display: 'flex', 
        color: 'purple', 
        fontSize: 12, 
        lineHeight: '1.4em', 
        fontFamily: '"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue", sans-serif !important',
        letterSpacing: '0em',
        fontWeight: 700,
        fontStyle: 'normal',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      nextRead: { 
        display: 'flex',
        fontSize: 13,
        lineHeight: '1.2em',
        fontFamily: '"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif !important',
        letterSpacing: '-.02em',
        fontWeight: 700,
        fontStyle: 'normal',
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
      el.style.color='rgba(0,0,0,.33)';
      el.classList.remove('rotateIn');
      el.classList += ' rotateOut';
      e.preventDefault();
    }

    function activateUrlSubmitForm(e) {
      var el = document.getElementById('urlSubmitForm');
      if (el.classList.contains('activeUrlSubmitForm')) {
        el.classList.remove('activeUrlSubmitForm');
        el.classList += ' inactiveUrlSubmitForm';  
      } else {
        el.classList.remove('inactiveUrlSubmitForm');
        el.classList += ' activeUrlSubmitForm';  
        document.getElementById('urlInput').focus();
      }
      e.preventDefault();
    }

    function submitUrlConnection(e) {
      var el = document.getElementById('urlSubmitForm');
        if (el.classList.contains('activeUrlSubmitForm')) {
          el.classList.remove('activeUrlSubmitForm');
          el.classList += ' inactiveUrlSubmitForm';  
        }
    }

    window.onkeyup = function(e) {
      if (e.keyCode == 27) { // escape key maps to keycode `27`
        var el = document.getElementById('urlSubmitForm');
        if (el.classList.contains('activeUrlSubmitForm')) {
          el.classList.remove('activeUrlSubmitForm');
          el.classList += ' inactiveUrlSubmitForm';  
        }
      }
    }

    // @TODO This should be outside the function
    function noEdgesJSX() {
      return (
        <div style={ styles.noEdges }>
          
          <div style={ styles.leftBox }>
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <div className={'heartBox'} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                <div onMouseEnter={enterHeartIcon} onMouseLeave={leaveHeartIcon} >
                  <i id='heartIcon' className={'fa fa-heart-o heartIcon'} style={{ fontSize: 22, paddingRight: 4 }} />
                </div>
                <div onMouseEnter={enterHeartText} onMouseLeave={leaveHeartText} >
                  <span id='heartText' className={ 'heartText' } style={{ fontSize: 16, fontFamily: '"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif' }}>183</span>
                </div>
              </div>
              <div className={'addBox'} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', marginLeft: 12 }}>
                <div onMouseEnter={enterConnectionBox} onMouseLeave={leaveConnectionBox} >
                  <i id='addConnectionIcon' onClick={activateUrlSubmitForm} className={'fa fa-plus-square-o'} style={{ color: 'rgba(0,0,0,.33)', fontSize: 27, marginTop: 2 }} />
                </div>
                <div className={'inputBox'}>
                  <form action="" id='urlSubmitForm' className={'inactiveUrlSubmitForm'} style={{ display: 'flex', flexDirection: 'row' }}>
                    <input type="text" id='urlInput' name="inputBox goes here" placeholder="Add Connection" className={'inputUrl'} style={{ paddingLeft: 8 }}/>
                    <input type="submit" value="Submit" className={'inputSubmit'} onClick={submitUrlConnection} />
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div style={ styles.rightBox }>
            <div style={{ width: 270, paddingLeft: 10, alignItems: 'flex-end' }}>
              <div style={ styles.readNext }>
                <span style={ styles.noOverflow }>Read next</span>
              </div>
              <div style={ styles.nextRead }>
                <span style={ styles.noOverflow }>The Tech Resistance Awakens from Darth Maul&apos;s Lair</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    function edgeBoxJSX(data){
      return (
        <div style={ styles.edgeBox }>
          <div>Page Has Connections</div>
          <div>Page Has Connections</div>
          <div>Page Has Connections</div>
        </div>
      );
    }

    const pageJSX = superEdges.length > 0 ? edgeBoxJSX(superEdges) : noEdgesJSX(superEdges);

    return (
      <div className={'wikiwebFooter'} style={ styles.main } >
        {isFetching ?
          (
            <div style={{ height: 45 }} >
              <span>FETCHING, yo</span>
            </div>
          ) :
          pageJSX
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Connections);
