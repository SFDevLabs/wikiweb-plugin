import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearch } from '../actions/entity';
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
    function edgeCardJSXGenerator(title, canonicalLink, tags, username, index) {
      const isNew = search && search.length > 0 && index === 0 ? true : 'none';
      const isBottomBorder = (index !== endIndex - 1) ? '1px solid #DCDCDC' : null;
      return (
        <div key={index} style={{ marginLeft: 5, marginRight: 5, padding: 5, display: 'block', borderBottom: isBottomBorder }}>
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: 14, lineHeight: '16px', paddingLeft: 1, paddingTop: 3 }}>
            {title}
          </div>
          <div className={'hyperlink'} style={{ display: 'block', height: 20 }}>
            <a target="_blank" rel="noopener noreferrer" href={canonicalLink}>
              <span className={'linkIcon'} style={{ lineHeight: '20px', display: 'inline-block' }}>{canonicalLink}</span>
              <span style={{ paddingLeft: 3, color: 'purple', display: isNew }}>(new)</span>
              <span style={{ lineHeight: '20px', display: 'inline-block', paddingLeft: 2 }}><img alt="" src="img/hyperlink.png" className={'hyperlink'} style={{ verticalAlign: 'middle', width: 14, height: 14 }} /></span>
            </a>
          </div>
          <div style={{ display: 'block', height: 20, paddingBottom: 3 }}>
            <a style={{ textDecoration: 'none', color: '#4d4d4d' }} href={`http://twitter.com/${username}`}>
              <span style={{ lineHeight: '20px', float: 'left' }}><img alt="" src="img/qwokka.jpg" style={{ verticalAlign: 'middle', width: 14, borderRadius: 4 }} /></span>
              <span style={{ lineHeight: '20px', float: 'left', paddingLeft: 3, paddingTop: '1px', fontSize: 12 }}>@{username}</span>
            </a>
            <div className={'tagBox'}>
              { tags.map((tag, subIndex) => <span key={subIndex} className={'tag'}>{tag}</span>) }
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
          let username = '';
          let tags = [];
          if (edges && edges.length > 0) {
            username = edges[0].user.username;
            tags = edges[0].tags;
          }
          return edgeCardJSXGenerator(title, canonicalLink, tags, username, index);
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
