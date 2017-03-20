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
    profile,
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


class FullPage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fullPageToggle: PropTypes.func.isRequired,
    superEdges: PropTypes.array.isRequired,
    entityCount: PropTypes.number.isRequired,
    id: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    profile: PropTypes.object,
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


  render() {

    const {
      isFetching,
      isLoggedIn,
      profile,
      superEdges,
      entityCount,
      isFetchingEdge,
      messagesConnect,
      heartValue,
      heartCount,
      links,
      title,
      queryLink,
    } = this.props;

    const {
      connectionDisplayIndex,
      isAddConnectionToggledOn,
      heartClickAttempted,
      rotateConnectionBox,
      isLoginRedirectToggledOn,
    } = this.state;

    console.log(this.props, 'props from fullpage')

    const profileBox = (<a 
        type="button" 
        href={`${rootURL}/@${profile.username}`}
        onClick={() => { analytics('profileImgClick'); }}
      >
        <img src={profile.profile_image} style={{ marginTop: 8, height: '32px', borderRadius: '3px' }} />
      </a>)

    const loginButton = (
      <div className={'btn btn-default navbar-btn'}>
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

    const headerJSX = (
      <div className={'header'}>
        <div className={'fontLogo'}>
          <a href="https://wikiweb.org">WikiWeb</a>
        </div>
        <div className={'loginProfileBox'}>
          {isLoggedIn && profile ? profileBox : loginButton}
        </div>
      </div>
    )

    const pageTitleSection = (
      <div className={'pageTitleSection'}>
        <div className={'titleImgBox'}>
          <img src={'img/document.ico'} style={{ height: 50 }} />
        </div>
        <div className={'content'}>
          <div className={'pageTitle noOverflow'}>{title}</div>
          <div className={'queryLink noOverflow'}>{queryLink}</div>
        </div>
    </div>)

    const superEdgeRows = superEdges && superEdges.length > 0 ? superEdges.map((edge, i) => 
      <div key={i} className={'row'}>
        <div className={'typeCol'}>
          <span className={'noOverflow'}>
            <i className={'fa fa-user'} />
          </span>
        </div>
        <div className={'titleCol'}>
          <span className={'noOverflow'}>{edge.entity.title}</span>
        </div>
        <div className={'domainCol'}>
          <span className={'noOverflow'}>{edge.entity.domain}</span>
        </div>
        <div className={'sourceCol'}>
          <span className={'noOverflow'}>@{edge.edges[0].user.username}</span>
        </div>
      </div>) : null;

    const resultsGrid = (
      <div className={'resultsGrid'}>
        <div className={'row rowHeader'}>
          <div className={'typeCol'}>
            <span>Type</span>
          </div>
          <div className={'titleCol'}>
            <span>Title</span>
          </div>
          <div className={'domainCol'}>
            <span>Domain</span>
          </div>
          <div className={'sourceCol'}>
            <span>Source</span>
          </div>
        </div>
        {superEdgeRows} 
      </div>)

    return (
      <div id='fullPage'>
        {headerJSX}
        <div className={'pageContents'}>
          {pageTitleSection}
          {resultsGrid}
        </div>
      </div>
    )

  } /* end of render */

  onCollapseFooter = () => {
    this.props.fullPageToggle()
    analytics('toolbarExpanded');
  }
}

export default connect(mapStateToProps)(FullPage);
