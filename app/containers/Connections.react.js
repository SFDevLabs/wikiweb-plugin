import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearch } from '../actions/entity';
import { fetchProfile } from '../actions/user';

import Footer from '../components/Footer.react';

const startIndex = 0;
const endIndex = 3;

const mapStateToProps = (state) => {
  const { entity:
    { entityCount,
      isFetching,
      title,
      superEdges,
      queryLink,
      canonicalLink,
    },
  } = state;

  return {
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
  }

  componentDidMount() {
    const { dispatch } = this.props;
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      const url = tabs[0].url.split('?')[0];
      dispatch(fetchSearch(url));
      dispatch(fetchProfile());
    });
  }

  render() {
    const { superEdges,
      location: {
        search,
      },
    } = this.props;

    // @TODO This should be outside the function and combined with line 101 as the else. @jeffj
    function pageDefaultJSX() {
      return (
        <div style={{ paddingLeft: '15%', paddingRight: '15%' }}>
          <br />
          <div style={{ display: 'block' }} >
            <img alt="" src="img/logo.png" style={{ height: 50, width: 50, margin: 'auto' }} />
          </div>
          <br />
          <div><span>There are no connections for this page inside the WikiWeb. </span></div>
          <br />
          <div>
            <span><em>Be the first to add one!</em></span>
            <span><img alt="" src="img/arrow_orange.svg" className={'rotatedArrow'} /></span>
          </div>
        </div>
      );
    }
    // @TODO Move me outside the render
    function edgeCardJSXGenerator(title, canonicalLink, tags, description, username, profileUrl, index) {
      const isNew = search && search.length > 0 && index === 0 ? true : 'none';
      const isBottomBorder = (index !== endIndex - 1) ? '1px solid #DCDCDC' : null;
      const buffBottom = (index === endIndex - 1) ? 40 : 0;
      return (
        <div key={index} className={'edgeCardBox'} style={{ borderBottom: isBottomBorder, marginBottom: buffBottom }}>
          <div className={'titleBox'}>
            <a target="_blank" rel="noopener noreferrer" href={canonicalLink}>
              {title}
            </a>
          </div>
          <div className={'hyperlink'} title={canonicalLink}>
            <a target="_blank" rel="noopener noreferrer" href={canonicalLink}>
              <span className={'linkIcon'} style={{ lineHeight: '20px', display: 'inline-block' }}>{canonicalLink}</span>
              <span style={{ paddingLeft: 3, color: 'purple', display: isNew }}>(new)</span>
              <span style={{ lineHeight: '20px', display: 'inline-block', paddingLeft: 2 }}><img alt="" src="img/hyperlink.png" className={'hyperlink'} style={{ verticalAlign: 'middle', width: 14, height: 14 }} /></span>
            </a>
          </div>
          <div className={'description'} title={description}>
            {description}
          </div>
          <div style={{ display: 'block', height: 22, marginTop: 3 }}>
            <div className={'userBox'} title={`user: @${username}`}>
              <a href={`http://twitter.com/${username}`}>
                <span><img alt="" src={profileUrl} /></span>
                <span className={'username'}>@{username}</span>
              </a>
            </div>
            <div>
              <div className={'tagBox'}>
                { tags.map((tag, subIndex) => <span key={subIndex} className={'tag'}>{tag}</span>) }
              </div>
            </div>
          </div>
        </div>);
    }

    // @TODO Move me outside the render
    function mainContent(data) {
      return data
        .slice(startIndex, endIndex) // Only take a limited number of Edges for display
        .map((card, index) => {
          const { entity: { title, canonicalLink }, edges } = card;
          const description = edges[0].description;
          const tags = edges[0].tags;
          let username = '';
          let profileUrl = '';
          if (edges && edges.length > 0) {
            username = edges[0].user.username;
            username = edges[0].user.username;
            profileUrl = edges[0].user.profile_image;
          }
          return edgeCardJSXGenerator(title, canonicalLink, tags, description, username, profileUrl, index);
        });
    }
    const pageJSX = superEdges.length > 0 ? mainContent(superEdges) : pageDefaultJSX(superEdges);

    return (
      <div className={'connectionsJS'}>
        {pageJSX}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Connections);
