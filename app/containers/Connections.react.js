import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax } from 'gsap';
import Add from './Add.react';
import Message from '../components/Message.react';
import { fetchPostEdge } from '../actions/edge';
import { fetchHeart } from '../actions/heart';

const startIndex = 0;
const endIndex = 3;

const mapStateToProps = (state) => {
  const {
    user: {
      isLoggedIn,
    },
    edge,
    connectEntity,
    currentPage: {
      id,
      entityCount,
      isFetching,
      title,
      superEdges,
      queryLink,
      canonicalLink,
      heartCount,
      heartValue,
    },
  } = state;

  const connectEntityId = connectEntity.id;
  const isFetchingEdge = edge.isFetching;
  const messages = edge.messages;

  return {
    isLoggedIn,
    edge,
    id,
    connectEntityId,
    entityCount,
    title,
    isFetching,
    isFetchingEdge,
    superEdges,
    queryLink,
    canonicalLink,
    messages,
    heartCount,
    heartValue,
  };
};

class Connections extends Component {
  state = {
    connectionDisplayIndex: 0,
    isAddConnectionToggledOn: false,
    shouldShowConnectionBox: true,
  };

  toggleBox = () => {
    this.setState({
      shouldShowConnectionBox: !this.state.shouldShowConnectionBox
    });
  };

  incrementConnectionsIndex = (e) => {
    if (this.state.connectionDisplayIndex < this.props.entityCount - 1) {
      this.setState({
        connectionDisplayIndex: this.state.connectionDisplayIndex + 1
      })
    }
  }

  decrementConnectionsIndex = (e) => {
    if (this.state.connectionDisplayIndex > 0) {
      this.setState({
        connectionDisplayIndex: this.state.connectionDisplayIndex - 1
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
      isLoggedIn,
      superEdges,
      entityCount,
      id,
      isFetching,
      title,
      isFetchingEdge,
      messages,
      heartValue,
      heartCount
    } = this.props;

    const {
      connectionDisplayIndex,
      isAddConnectionToggledOn
    } = this.state;

    let incrementButtonStyle;
    let decrementButtonStyle;

    if (entityCount > 0) {
      incrementButtonStyle = { color: 'rgba(0,0,0,.6)' };
      decrementButtonStyle = { color: 'rgba(0,0,0,.6)' };
      if (connectionDisplayIndex === entityCount - 1) {
        decrementButtonStyle = { color: 'rgba(0,0,0,.33)' };
      } else if (connectionDisplayIndex === 0) {
        incrementButtonStyle = { color: 'rgba(0,0,0,.33)' };
      }
    } else {
      incrementButtonStyle = { display: 'none' };
      decrementButtonStyle = { display: 'none' };
    }

    /* TODO: make this login link dynamic */
    const showLoginInfo = isAddConnectionToggledOn && !isLoggedIn ? 'flex' : 'none';
    const loginButton = (
      <div className={'loginButton'} style={{ display: showLoginInfo }}>
        <span><a target="_blank" href="http://localhost:3000/login">Log in</a></span>
      </div>)

    const loginText = (
      <div className={'loginText'} style={{ display: showLoginInfo }}>
        <span>You must be logged in to make a connection</span>
      </div>)

    const showRecommenderInfo = !isAddConnectionToggledOn && isLoggedIn ? 'flex' : 'none';
    const recommenderInfo =  entityCount > 0 ?
      (<div className={'recommenderInfo'} style={{ display: showRecommenderInfo }}>
        <span>recommender info goes here</span>
      </div>) : null

    const showAddRecommendationButton = !isAddConnectionToggledOn && isLoggedIn ? 'flex' : 'none';
    const addRecommendationButton = entityCount === 0 ?
      (<div className={'addRecommendationButton'} onClick={toggleMiddleSection.bind(this)} style={{ display: showAddRecommendationButton }} >
        <span>Add Recommendation</span>
      </div>) : null


    const inputBox = isLoggedIn && isAddConnectionToggledOn ? (
      <div className={'inputBox'}>
        <Add onSave={this.onSave}/>
      </div>) : null;

    const showRecommendationBox = isAddConnectionToggledOn ? 'none' : 'flex';
    const recommendationBox = entityCount > 0 ?
      (<div className={'recommendationBox'} style={{ display: showRecommendationBox }}>
          <div style={{ width: 480 }}>
            <div className={'readNext'}>
              <span className={'noOverflow'}>
                <a href={superEdges[connectionDisplayIndex].entity.canonicalLink}>Read next</a>
              </span>
            </div>
            <div className={'nextRead'}>
              <span className={'noOverflow'}>
                <a href={superEdges[connectionDisplayIndex].entity.canonicalLink}>{superEdges[connectionDisplayIndex].entity.title}</a>
              </span>
            </div>
          </div>
          <div className={'changeRecommendationBox'}>
            <i onClick={this.incrementConnectionsIndex.bind(this)} style={decrementButtonStyle} className={'fa fa-caret-up recommendationToggleCaret'}></i>
            <i onClick={this.decrementConnectionsIndex.bind(this)} style={incrementButtonStyle} className={'fa fa-caret-down recommendationToggleCaret'}></i>
          </div>
        </div>) : null

    const noRecommendationBox = entityCount === 0 ?
      ( <div className={'recommendationBox'} style={{display: showRecommendationBox}}>
            <div className={'noRecommendations'} style={{ width: 480 }}>
              <span style={{ marginLeft: 100 }}>
                There are no recommendations for this page
              </span>
            </div>
          </div>) : null

    const inputSuccessErrorMessages = isAddConnectionToggledOn ?
      (<div className={'inputSuccessErrorMessages noOverflow'}>
        <span>{isFetchingEdge?'isFetchingEdge':''}</span>
        <Message messages={messages} />
      </div>) : null

    const heartClass = heartValue ? 'fa-heart':'fa-heart-o'

    return (
      <div className={'wikiwebFooter'} style={{ height: 45 }} >
        <div className={'centerBox'}>

        <div id='leftCol'>
          <div className={'addMetaBox'}>
            <div className={'heartSubmit'} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
              <div onMouseEnter={()=>{}} onMouseLeave={()=>{}} onClick={this.onHeart} >
                <i id='heartIcon' className={'fa '+heartClass+' heartIcon'} style={{ fontSize: 22, paddingRight: 4 }} />
              </div>

              <div onMouseEnter={()=>{}} onMouseLeave={()=>{}} >
                <span id='heartText' className={'heartText'}>{heartCount}</span>
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
            {recommendationBox}
            {noRecommendationBox}
            {loginText}
            {inputBox}
          </div>

          <div id='rightCol'>
            <div className={'verticalDivider'} style={{ justifyContent: 'flex-end' }}></div>
            {loginButton}
            {recommenderInfo}
            {addRecommendationButton}
            {inputSuccessErrorMessages}
          </div>

        </div>
      </div>
    );
  }

  onSave = (e) => {
    const { dispatch, id, connectEntityId } = this.props;

    //const { description, tags } = this.state;
    dispatch(fetchPostEdge(
      id,
      connectEntityId,
      '',
      []
    ));
    this.setState({
      isAddConnectionToggledOn: !this.state.isAddConnectionToggledOn
    });
    e.preventDefault();
  }
  onHeart = (e) => {
    const { dispatch, id, heartValue } = this.props;
    dispatch(fetchHeart(
      id,
      !heartValue,
    ));
    e.preventDefault();
  }
}

export default connect(mapStateToProps)(Connections);

// Functons and constants
const styles = {
  /* currently blank... styles moved to stylesheet */
}

// function enterHeartIcon(e) {
//   var el = document.getElementById('heartIcon');
//   el.classList.remove('leaveHeartIcon');
//   el.className += ' enterHeartIcon';
//   e.preventDefault();
// }
//
// function leaveHeartIcon(e) {
//   var el = document.getElementById('heartIcon');
//   el.classList.remove('enterHeartIcon');
//   el.className += ' leaveHeartIcon';
//   e.preventDefault();
// }
//
// function enterHeartText(e) {
//   var el = document.getElementById('heartText');
//   el.classList.remove('leaveHeartText');
//   el.className += ' enterHeartText';
//   e.preventDefault();
// }
//
// function leaveHeartText(e) {
//   var el = document.getElementById('heartText');
//   el.classList.remove('enterHeartText');
//   el.className += ' leaveHeartText';
//   e.preventDefault();
// }


// function enterHeartIcon(e) {
//   var el = document.getElementById('heartIcon');
//   el.classList.remove('leaveHeartIcon');
//   el.className += ' enterHeartIcon';
//   e.preventDefault();
// }
//
// function leaveHeartIcon(e) {
//   var el = document.getElementById('heartIcon');
//   el.classList.remove('enterHeartIcon');
//   el.className += ' leaveHeartIcon';
//   e.preventDefault();
// }
//
// function enterHeartText(e) {
//   var el = document.getElementById('heartText');
//   el.classList.remove('leaveHeartText');
//   el.className += ' enterHeartText';
//   e.preventDefault();
// }
//
// function leaveHeartText(e) {
//   var el = document.getElementById('heartText');
//   el.classList.remove('enterHeartText');
//   el.className += ' leaveHeartText';
//   e.preventDefault();
// }

function enterConnectionBox(e) {

}

function leaveConnectionBox(e) {
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
