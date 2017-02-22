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
      document.getElementById('heartIcon').style.color='purple'
      e.preventDefault();
    }

    function leaveHeartIcon(e) {
      document.getElementById('heartIcon').style.color='rgba(128,0,128, 0.6)'
      e.preventDefault();
    }

    function enterHeartText(e) {
      document.getElementById('heartText').style.color='rgba(0,0,0,.6)'
      e.preventDefault();
    }

    function leaveHeartText(e) {
      document.getElementById('heartText').style.color='rgba(0,0,0,.44)'
      e.preventDefault();
    }

    function enterConnectionBox(e) {
      document.getElementById('addConnectionIcon').style.color='rgba(128,0,128,.6)'
      e.preventDefault();
    }

    function leaveConnectionBox(e) {
      document.getElementById('addConnectionIcon').style.color='rgba(0,0,0,.33)'
      e.preventDefault();
    }



    // @TODO This should be outside the function
    function noEdgesJSX() {
      return (
        <div style={ styles.noEdges }>
          <div style={ styles.leftBox }>
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <div className={'heartBox'} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                <div onMouseEnter={enterHeartIcon} onMouseLeave={leaveHeartIcon} >
                  <i id='heartIcon' className={'fa fa-heart-o'} style={{ color: 'rgba(128,0,128, 0.6)', fontSize: 22, paddingRight: 4 }} />
                </div>
                <div onMouseEnter={enterHeartText} onMouseLeave={leaveHeartText} >
                  <span id='heartText' style={{ color: 'rgba(0,0,0,.44)', fontSize: 16, fontFamily: '"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif' }}>183</span>
                </div>
              </div>
              <div className={'addConnectionBox'} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', marginLeft: 12 }}>
                <div onMouseEnter={enterConnectionBox} onMouseLeave={leaveConnectionBox} >
                  <i id='addConnectionIcon' className={'fa fa-plus-square-o'} style={{ color: 'rgba(0,0,0,.33)', fontSize: 28, marginTop: 2 }} />
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
