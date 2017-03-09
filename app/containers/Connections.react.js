import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax } from 'gsap';
import Add from './Add.react';
import Message from '../components/Message.react';
import { fetchPostEdge } from '../actions/edge';
import { fetchHeart } from '../actions/heart';
import analytics from '../analytics';

import config from '../config';
const env = process.env.NODE_ENV || 'development';
const { rootURL } = config[env];

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
  const messagesEdge = edge.messages;
  const messagesConnect = connectEntity.messages;

  return {
    isFetching,
    isLoggedIn,
    edge,
    id,
    connectEntityId,
    entityCount,
    title,
    isFetchingEdge,
    superEdges,
    queryLink,
    canonicalLink,
    messagesConnect,
    heartCount,
    heartValue,
  };
};

class Connections extends Component {
  state = {
    connectionDisplayIndex: 0,
    isAddConnectionToggledOn: false,
    heartClickAttempted: false,
    rotateConnectionBox: false,
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    superEdges: PropTypes.array.isRequired,
    entityCount: PropTypes.number.isRequired,
    id: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isFetchingEdge: PropTypes.bool.isRequired,
    heartValue: PropTypes.bool.isRequired,
    messagesConnect: PropTypes.array.isRequired,
    heartCount: PropTypes.number.isRequired,
    connectEntityId: PropTypes.string,
  }

  componentDidMount() {
    //no opp
  }

  incrementConnectionsIndex = () => {
      analytics('incrementConnectionsIndexAttempted');
    if (this.state.connectionDisplayIndex < this.props.entityCount - 1) {
      this.setState({
        connectionDisplayIndex: this.state.connectionDisplayIndex + 1,
      });
      analytics('incrementConnectionsIndex');
    }
  }

  decrementConnectionsIndex = () => {
      analytics('decrementConnectionsIndexAttempted');
    if (this.state.connectionDisplayIndex > 0) {
      this.setState({
        connectionDisplayIndex: this.state.connectionDisplayIndex - 1,
      });
      analytics('decrementConnectionsIndex');
    }
  }

  render() {
    const {
      isFetching,
      isLoggedIn,
      superEdges,
      entityCount,
      isFetchingEdge,
      messagesConnect,
      heartValue,
      heartCount,
    } = this.props;

    const {
      connectionDisplayIndex,
      isAddConnectionToggledOn,
      heartClickAttempted,
      rotateConnectionBox,
    } = this.state;

    console.log(superEdges, 'superEdges')

    /* increment/decrement styling */
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

    const showLoginInfo = (isAddConnectionToggledOn && !isLoggedIn) || (heartClickAttempted && !isLoggedIn) ? 'flex' : 'none';
    const loginButton = (
      <div className={'loginButton'} style={{ display: showLoginInfo }}>
        <span><a
          target="_blank"
          onClick={() => { analytics('loginClicked'); }}
          href={`${rootURL}/login`}
        >
          Log in</a></span>
      </div>)

    const loginText = heartClickAttempted ?
      (<div className={'loginText'} style={{ display: showLoginInfo }}>
        <span>You must be logged in to recommend a web page</span>
      </div>) :
      (<div className={'loginText'} style={{ display: showLoginInfo }}>
        <span>You must be logged in to make a connection</span>
      </div>)

    const showRecommenderInfo = !isAddConnectionToggledOn ? 'flex' : 'none';
    const recommenderInfo =  entityCount > 0 ?
      (<div className={'recommenderInfoBox'} style={{ display: showRecommenderInfo }}>
        <div className={'transitionReadNext'} style={{ marginTop: calculatedTopOffset }}>
          {superEdges.map((edge, i) =>
            <div key={i} className={'recommenderInfo'} >
              <div className={'user'}>
                <span>Contributor</span>
              </div>
              <div className={'username'}>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => { analytics('reccommenderClicked'); }}
                  href={'https://twitter.com/' + edge.edges[0].user.username}
                >
                  @{edge.edges[0].user.username}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>) : null

    const showAddRecommendationButton = !isAddConnectionToggledOn && isLoggedIn ? 'flex' : 'none';
    const addRecommendationButton = entityCount === 0 ?
      (<div
        className={'addRecommendationButton'}
        onClick={toggleMiddleSection.bind(this)}
        style={{ display: showAddRecommendationButton }} >
        <span>Add Recommendation</span>
      </div>) : null;


    const inputBox = isLoggedIn && isAddConnectionToggledOn ? (
      <div className={'inputBox'}>
        <Add onSave={this.onSave} />
      </div>) : null;

    const calculatedTopOffset = connectionDisplayIndex * -48;
    const showRecommendationBox = heartClickAttempted || isAddConnectionToggledOn ? 'none' : 'flex';
    const recommendationBox =
      entityCount > 0 &&
      !isFetching &&
      !isFetchingEdge ?
      (<div className={'recommendationBox'} style={{ display: showRecommendationBox }}>
        <div className={'transitionReadNext'} style={{ marginTop: calculatedTopOffset }}>
        {superEdges.map((edge, i) =>
          <div key={i} style={{ width: 480, height: 45, margin: '10px 0px' }}>
            <div className={'readNext'}>
              <span className={'noOverflow'}>
                <a
                  href={edge.entity.canonicalLink}
                  onClick={() => { analytics('outboundLinkToTheArticle'); }}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Read next
                </a>
              </span>
            </div>
            <div className={'nextRead'}>
              <span className={'noOverflow'}>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => { analytics('outboundLinkToTheArticle'); }}
                  href={edge.entity.canonicalLink}>
                  {edge.entity.domain}
                  <span> - </span>
                  {edge.entity.title}
                </a>
              </span>
            </div>
          </div>
        )}
        </div>
        <div className={'changeRecommendationBox'}>
          <i
            onClick={this.incrementConnectionsIndex.bind(this)}
            style={decrementButtonStyle}
            className={'fa fa-caret-up recommendationToggleCaret'}
          />
          <i
            onClick={this.decrementConnectionsIndex.bind(this)}
            style={incrementButtonStyle}
            className={'fa fa-caret-down recommendationToggleCaret'}
          />
        </div>
      </div>) : null;

    const noRecommendationBox =
      entityCount === 0 &&
      !heartClickAttempted &&
      !isFetching &&
      !isFetchingEdge ?
      (
        <div className={'recommendationBox'} style={{ display: showRecommendationBox }}>
          <div className={'noRecommendations'}>
            <span>
              There are no recommendations for this page
            </span>
          </div>
        </div>
      ) : null;
    const inputSuccessErrorMessages = isAddConnectionToggledOn ?
      (<div className={'inputSuccessErrorMessages noOverflow'}>
        <span>{isFetchingEdge ? 'isFetchingEdge' : ''} </span>
        <Message messages={messagesConnect} />
      </div>) : null;

    const heartIconType = heartValue ? 'fa-heart' : 'fa-heart-o';
    const showHeartCount = heartCount > 0 ? 'flex' : 'none';
    const connectionBoxRotationClass = rotateConnectionBox ? 'rotateIn' : 'rotateOut';

    return (
      <div className={'wikiwebFooter'} style={{ height: 45 }} >
        <div className={'centerBox'}>
          <div id="leftCol">
            <div className={'addMetaBox'}>
              <div className={'heartSubmit'}>
                <i
                  onClick={this.onHeart.bind(this)}
                  className={'fa ' + heartIconType + ' heartIcon'}
                />
                <span className={'heartCount'} style={{ display: showHeartCount }}>{heartCount}</span>
              </div>
              <div className={'addConnectionBox'} onClick={toggleMiddleSection.bind(this)}>
                <i
                  className={'addConnectionIcon fa fa-plus-square-o ' + connectionBoxRotationClass}
                  onMouseEnter={enterConnectionBox.bind(this)}
                  onMouseLeave={leaveConnectionBox.bind(this)}
                />
              </div>
              <div className={'verticalDivider'} style={{ marginLeft: 20 }} />
            </div>
          </div>

          <div id="middleCol">
            {recommendationBox}
            {noRecommendationBox}
            {loginText}
            {inputBox}
          </div>

          <div id="rightCol">
            <div className={'verticalDivider'} style={{ justifyContent: 'flex-end' }} />
            {recommenderInfo}
            {addRecommendationButton}
            {inputSuccessErrorMessages}
            {loginButton}
            <a onClick={this.onCloseFooter}>
              <i className={'fa fa-times closeButton'} style={{ position: 'absolute', right: 20, bottom: 15 }} />
            </a>
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
      isAddConnectionToggledOn: !this.state.isAddConnectionToggledOn,
      rotateConnectionBox: false,
    });
    analytics('connectionMade');
    e.preventDefault();
  }

  onCloseFooter = () => {
    analytics('toolbarClosed');
    chrome.storage.local.set({ wikiwebFooterActive: false });
  }

  onHeart = (e) => {
    if (this.props.isLoggedIn) {
      const { dispatch, id, heartValue } = this.props;
      analytics(heartValue ? 'pageHeartCreated' : 'pageHeartUndone');
      dispatch(fetchHeart(
        id,
        !heartValue,
      ));
    } else {
      this.setState({
        heartClickAttempted: !this.state.heartClickAttempted,
      });
    }

    e.preventDefault();
  }
}

export default connect(mapStateToProps)(Connections);

// Functons and constants
const styles = {
  /* currently blank... styles moved to stylesheet */
}

function enterConnectionBox(e) {
  this.setState({
    rotateConnectionBox: true,
  });
  e.preventDefault();
}

function leaveConnectionBox(e) {
  if (!this.state.isAddConnectionToggledOn) {
    this.setState({
      rotateConnectionBox: false,
    });
  }
  e.preventDefault();
}

function toggleMiddleSection(e) {
  const { isAddConnectionToggledOn } = this.state;
  if (isAddConnectionToggledOn) { analytics('addConnectionToggled'); }

  this.setState({
    heartClickAttempted: false,
    isAddConnectionToggledOn: !isAddConnectionToggledOn
  });
  e.preventDefault();
}

window.onkeyup = function(e) {
  if (e.keyCode == 27) { /* escape key */
    /* Yo Jeff - I'm too tired to think this one through, but how do I pass state through to a function on keypress? */
    /* thoughts are to attach this to body and pass state "this" through on all keystrokes, ... seems excessive */
  }
}
