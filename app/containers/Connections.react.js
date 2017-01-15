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
    // entityCount: PropTypes.number.isRequired,
    // title: PropTypes.string.isRequired,
    // queryLink: PropTypes.string.isRequired,
    // canonicalLink: PropTypes.string.isRequired,
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

    function pageDefaultJSX() {
      if (superEdges.length === 0) {
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
    }

    function edgeCardJSXGenerator(title, canonicalLink, username, index) {
      const isNewEdge = search && search.length > 0 && index === 0 ? 'isNewEdge' : null;
      const isNew = isNewEdge ? true : 'none';
      const isBottomBorder = (index !== endIndex - 1) && !isNewEdge ? '1px solid #DCDCDC' : null;
      return (
        <div key={index} className={isNewEdge} style={{ marginLeft: 5, marginRight: 5, padding: 5, display: 'block', borderBottom: isBottomBorder }}>
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: 14, lineHeight: '16px', paddingLeft: 1, paddingTop: 3 }}>
            {title}
          </div>
          <div className={'hyperlink'} style={{ display: 'block', height: 20 }}>
            <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue', fontSize: 11, paddingLeft: 1 }} href={canonicalLink}>
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
          </div>
        </div>);
    }

    function mainContent() {
      if (superEdges.length) {
        return superEdges
          .slice(startIndex, endIndex) // Only take a limited number of Edges for display
          .map((card, index) => {
            const { entity: { title, canonicalLink }, edges } = card;
            const username = edges && edges.length > 0 ? edges[0].user.username : '';
            return edgeCardJSXGenerator(title, canonicalLink, username, index);
          });
      }
    }

    return (
      <div className={'connectionsJS'}>
        {pageDefaultJSX()}
        {mainContent()}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Connections);
