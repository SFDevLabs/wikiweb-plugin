import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Add from './Add.react';
import Message from '../components/Message.react';
import { fetchPostEdge } from '../actions/edge';
import { fetchHeart } from '../actions/heart';
import analytics from '../analytics';
import config from '../config';
import { fetchCurrentPageLinks } from '../actions/currentPage';
import ReactSpinner from 'react-spinjs';

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
      isParsed,
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
    isParsed,
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

  componentWillMount() {
    const { id, dispatch} = this.props;
    if (id.length > 0){
      dispatch(fetchCurrentPageLinks(id));
    }

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
      messagesConnect,
      heartValue,
      heartCount,
      links,
      title,
      queryLink,
      isParsed,
    } = this.props;

    const {
      connectionDisplayIndex,
      isAddConnectionToggledOn,
      heartClickAttempted,
      rotateConnectionBox,
      isLoginRedirectToggledOn,
    } = this.state;


    const profileBox = (<a
        type="button"
        href={`${rootURL}/@${profile.username}`}
        rel="noreferrer noopener"
        onClick={() => { analytics('profileImgClick'); }}
      >
        <img src={profile.profile_image} style={{ marginTop: 8, height: '32px', borderRadius: '3px' }} />
      </a>)

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

    const superEdgeJSX = superEdges && superEdges.length > 0 ? superEdges.map((edge, i) =>
      <div key={i} className={'row'} style={{ borderTop: '1px solid #e7e7e7' }}>
        <div className={'typeCol'}>
          <span className={'userContributed'}>
            <i className={'fa fa-user'} title={`Connected by: @${edge.edges[0].user.username}`}/>
          </span>
        </div>
        <div className={'titleCol'}>
          <span className={'noOverflow title'} title={edge.entity.title}>
            <a target="_blank" href={edge.entity.canonicalLink} rel="noreferrer noopener">
              {edge.entity.title ? edge.entity.title : edge.entity.canonicalLink}
            </a>
          </span>
          <span className={'noOverflow favicon'} title={edge.entity.title}>
            <a target="_blank" href={edge.entity.canonicalLink} rel="noreferrer noopener">
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
      </div>) : [];

    const filteredLink = links.filter((link, pos) =>
      link.pageTo &&
      link.pageTo !== null && // Filtering out dead links
      links.map((link) => link.href).indexOf(link.href) === pos // Removing duplate URLs
    );

    const pageLinksJSX = filteredLink.length > 0 ?
      filteredLink.map((link, i) => {
        const pageTo = link.pageTo;
        if (!pageTo ) return <div key={i} />;
        const { title, faviconCDN, canonicalLink, domain } = pageTo;
        return <div key={i} className={'row'} style={{ borderTop: '1px solid #e7e7e7' }}>
          <div className={'typeCol'}>
            <span className={'pageLink'}>
              <i className={'fa fa-code'} title={`Example promoted link`}/>
            </span>
          </div>
          <div className={'titleCol'}>
            <a target="_blank" href={canonicalLink} className={'noOverflow title'} rel="noreferrer noopener">
              {title.length > 0 ? title : canonicalLink}
            </a>
            <span className={'noOverflow favicon'} title={'link to page'}>
              <a target="_blank" href={canonicalLink} rel="noreferrer noopener">
                <img src={ faviconCDN && faviconCDN.length ? faviconCDN : 'img/document.ico' } />
              </a>
            </span>
          </div>
          <div className={'domainCol'}>
            <span>{domain}</span>
          </div>
          <div className={'sourceCol'}>
            <span>Page</span>
          </div>
        </div>
      }
    ) : [];

    const noConnectionsRow =
      superEdges.length === 0 &&
      pageLinksJSX.length === 0 ?
      (<div style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 20, borderTop: '1px solid #e7e7e7', backgroundColor: 'rgba(102, 51, 153, 0.3)' }}>
        <span style={{ fontWeigth: 700, fontSize: 14 }}>
        There are no user recommendations for this page - be the first to add one.</span>
      </div>) : null;


    const resultsGrid = (
      <div className={'resultsGrid'}>
        {gridHeaders}
        {pageLinksJSX}
        {superEdgeJSX}
        {noConnectionsRow}
      </div>)
    return (
      <div id='fullPage'>
        <div className={'pageContents'}>
          {isFetching || isParsed === false ?
            ( <div>
                <ReactSpinner color="black"/>
                <div className={'parsingPage'}>
                  <span>Parsing Page...</span>
                </div>
              </div>
              ) :
            (<div>
              {pageTitleSection}
              {resultsGrid}
            </div>)
          }

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
