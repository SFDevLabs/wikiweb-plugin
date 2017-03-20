import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Add from './Add.react';
import Message from '../components/Message.react';
import { fetchPostEdge } from '../actions/edge';
import { fetchHeart } from '../actions/heart';
import analytics from '../analytics';

import config from '../config';
const { rootURL } = config;

const mapStateToProps = (state) => {
  const {
    user: {
      isLoggedIn,
    },
    user: {
      profile,
    },
    edge,
    connectEntity,
    currentPage: {
      id,
      entityCount,
      isFetching,
      title,
      superEdges,
      links,
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
    links,
    queryLink,
    canonicalLink,
    messagesConnect,
    heartCount,
    heartValue,
  };
};

class Connections extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fullPageToggle: PropTypes.func.isRequired,
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

  state = {
    connectionDisplayIndex: 0,
    isAddConnectionToggledOn: false,
    isLoginRedirectToggledOn: false,
    heartClickAttempted: false,
    rotateConnectionBox: false,
  }

  componentDidMount() {
    window.onkeyup = (e) => {
      if (e.keyCode === 27) {
        this.setState({
          isAddConnectionToggledOn: false,
        });
      }
    };
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
      links,
    } = this.props;

    const {
      connectionDisplayIndex,
      isAddConnectionToggledOn,
      heartClickAttempted,
      rotateConnectionBox,
      isLoginRedirectToggledOn,
    } = this.state;

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
          onClick={() => {
            this.onLoginRedirect()
            analytics('loginClicked');
          }}
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

    const calculatedTopOffset = connectionDisplayIndex * -45;


    const showRecommenderInfo = !isAddConnectionToggledOn ? 'flex' : 'none';
    const recommenderInfo =  entityCount > 0 ?
      (<div className={'recommenderInfoBox'} style={{ display: showRecommenderInfo }}>
        <div className={'transitionReadNext'} style={{ marginTop: calculatedTopOffset }}>
          {superEdges.map((edge, i) =>

            <div className={'recommenderInfo'} key={i} style={{ width: 480, height: 45 }}>
              <div className="scrollFlexContainer">
                <div className={'user'}>
                  <span>Contributor</span>
                </div>
                <div className={'username'}>
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => { analytics('reccommenderClicked'); }}
                    href={`${rootURL}/@${edge.edges[0].user.username}`}
                  >
                    @{edge.edges[0].user.username}
                  </a>
                </div>
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


    const showRecommendationBox = heartClickAttempted || isAddConnectionToggledOn ? 'none' : 'flex';
    const changeRecommendationBox = superEdges.length > 1 ?
      (
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
      ) :
      null;
    const recommendationBox =
      entityCount > 0 &&
      !isFetching &&
      !isFetchingEdge ?
      (<div className={'recommendationBox'} style={{ display: showRecommendationBox }}>
        <div className={'transitionReadNext'} style={{ marginTop: calculatedTopOffset }}>
        {superEdges.map((edge, i) =>
          <div key={i} style={{ width: 480, height: 45 }}>
            <div className="scrollFlexContainer">
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
          </div>
        )}
        </div>
        {changeRecommendationBox}
      </div>) : null;

    const linksJSX = links && links.length > 0 ? links.map((link, i) => <div>
      {link.href}
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

    const verticalDivider = <div className={'verticalDivider'} style={{ margin: '0px 15px' }} ><div /></div>

    return (
      <div id='wikiwebFooter' className={'wikiwebFooter'} style={{ height: 45 }} >
        <div className={'logoBox'}>
          <a href={`${rootURL}`}>
            <img src="img/logo.png" style={{ height: 30, width: 30, marginTop: 8 }} />
          </a>
        </div>

      {isLoginRedirectToggledOn?
        <div className="loginRefreshPromp" >
          <p>
            Please refresh the page after you log in.
          </p>
        </div>
        :null}
        <div className={'centerBox'}>
          <div id="leftFooterCol">
            <div className={'addMetaBox'}>
              <div style={{ visibility:'hidden' }} className={'heartSubmit'}>
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
            </div>
            {verticalDivider}
          </div>

          <div id="middleFooterCol">
            {linksJSX}
            {recommendationBox}
            {noRecommendationBox}
            {loginText}
            {inputBox}
          </div>

          <div id="rightFooterCol">
            {verticalDivider}
            {recommenderInfo}
            {addRecommendationButton}
            {inputSuccessErrorMessages}
            {loginButton}
            <a onClick={this.onCloseFooter}>
              <i className={'fa fa-times closeButton'} style={{ position: 'absolute', right: 20, bottom: 15 }} />
            </a>
            <a onClick={this.onExpandFooter}>
              <i className={'fa fa-forward closeButton'} style={{ position: 'absolute', right: 40, bottom: 15 }} />
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
    chrome.storage.local.set({ wikiwebFooterActive: true });
  }

  onExpandFooter = () => {
    analytics('toolbarExpanded');
    this.props.fullPageToggle();
  }

  onLoginRedirect = () => {
    const { isLoginRedirectToggledOn } = this.state;
    this.setState({
      isLoginRedirectToggledOn: !isLoginRedirectToggledOn,
    });
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
