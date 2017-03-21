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
      </div>
    )

    const pageTitleSection = (
      <div className={'pageTitleSection'}>
        <div className={'titleImgBox'}>
          <img src={'img/document.ico'} />
        </div>
        <div className={'content'}>
          <div className={'pageTitle noOverflow'}>{title}</div>
          <div className={'queryLink noOverflow'}>{queryLink}</div>
        </div>
    </div>)

    const gridHeaders = (
      <div className={'row rowHeader'}>
        <div className={'typeCol'}>
          <span>Type</span>
        </div>
        <div className={'titleCol'}>
          <span className={'title'}>Title</span>
          <span className={'noOverflow favicon'} title={'link to page'}>
            <img src={'/img/hyperlink.png'} style={{ height: 20, width: 20 }}/>
          </span>
        </div>
        <div className={'domainCol'}>
          <span>Domain</span>
        </div>
        <div className={'sourceCol'}>
          <span>Source</span>
        </div>
      </div>)

    const examplePromotedConnection = (
      <div className={'row promotedRow'}>
        <div className={'typeCol'}>
          <span className={'promoted'}>
            <i className={'fa fa-certificate'} title={`Example promoted link`}/>
          </span>
        </div>
        <div className={'titleCol'}>
          <span className={'noOverflow title'}>Wealth, health and fitness. 3 days to success!</span>
          <span className={'noOverflow favicon'} title={'link to page'}>
            <img src={'/img/default-favicon.png'} />
          </span>
        </div>
        <div className={'domainCol'}>
          <span>moneymatters.org</span>
        </div>
        <div className={'sourceCol'}>
          <span>Ad</span>
        </div>
      </div>)

    const examplePageLink = (
      <div className={'row'}>
        <div className={'typeCol'}>
          <span className={'pageLink'}>
            <i className={'fa fa-code'} title={`Example promoted link`}/>
          </span>
        </div>
        <div className={'titleCol'}>
          <span className={'noOverflow title'}>Pivotal’s Cloud-Native platform drives software innovation for many of the world’s most admired brands. With millions of developers in communities around the world, Pivotal technology touches billions of users every day. After shaping the software development culture of Silicon Valleys most valuable companies for over a decade, today Pivotal leads a global technology movement transforming how the world builds software.</span>
          <span className={'noOverflow favicon'} title={'link to page'}>
            <img src={'/img/default-favicon.png'} />
          </span>
        </div>
        <div className={'domainCol'}>
          <span>pivotal.io</span>
        </div>
        <div className={'sourceCol'}>
          <span>@jeffj</span>
        </div>
      </div>)

    const superEdgeRows = superEdges && superEdges.length > 0 ? superEdges.map((edge, i) => 
      <div key={i} className={'row'}>
        <div className={'typeCol'}>
          <span className={'userContributed'}>
            <i className={'fa fa-user'} title={`Connected by: @${edge.edges[0].user.username}`}/>
          </span>
        </div>
        <div className={'titleCol'}>
          <span className={'noOverflow title'} title={edge.entity.title}>
            <a href={edge.entity.canonicalLink}>
              {edge.entity.title ? edge.entity.title : edge.entity.canonicalLink}
            </a>
          </span>
          <span className={'noOverflow favicon'} title={edge.entity.title}>
            <a href={edge.entity.canonicalLink}>
              <img style={{ marginTop: 3 }} src={edge.entity.faviconCDN ? edge.entity.faviconCDN : '/img/default-favicon.png'} />
            </a>
          </span>
        </div>
        <div className={'domainCol'}>
          <span className={'noOverflow'} title={edge.entity.domain}>{edge.entity.domain}</span>
        </div>
        <div className={'sourceCol'}>
          <span className={'noOverflow'}>
            <a
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => { analytics('reccommenderClicked'); }}
              href={`${rootURL}/@${edge.edges[0].user.username}`}
            >
              @{edge.edges[0].user.username}
            </a>
          </span>
        </div>
      </div>) : null;

    const resultsGrid = (
      <div className={'resultsGrid'}>
        {gridHeaders}
        {examplePromotedConnection}
        {examplePageLink}
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
