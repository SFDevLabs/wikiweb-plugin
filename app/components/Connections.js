import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchSearch } from '../actions/entity';

const startIndex = 0;
const endIndex = 3;

function edgeCardJSXGenerator(title, canonicalLink, username, index) {
  return (
    <div key={index} style={{ marginLeft: 5, marginRight: 5, padding: 5, display: 'block', borderBottom: '1px solid #DCDCDC', }}>
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: 14, marginBottom: 2, }}>
        {title}
      </div>
      <div>
        <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#4d4d4d', fontSize: 12 }} href={canonicalLink}>
          {canonicalLink}
        </a>
      </div>
      <div style={{ display: 'block' }}>
        <span style={{ fontSize: 12 }} >
          <a style={{ textDecoration: 'none', color: '#4d4d4d' }} href={`http://twitter.com/${username}`}>
            <img alt="" src="./assets/img/qwokka.jpg" />
            <span style={{ paddingLeft: 5 }}>@{username}</span>
          </a>
        </span>
      </div>
    </div>);
}

/* Footer */
function footerJSX() {
  return (
    <div style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 8, height: 25, display: 'block' }}>
      <Link to="add" style={{ textDecoration: 'none', color: '#4d4d4d', outline: 'none' }}>
        <div style={{ width: '49%', float: 'left', fontSize: 14, textAlign: 'center', outline: 'none' }}>
          <span>WikiWeb</span>
        </div>
      </Link>
      <Link to="add" style={{ textDecoration: 'none', color: '#4d4d4d' }}>
        <div style={{ borderLeft: '1px solid #DCDCDC', width: '49%', float: 'right', textAlign: 'center' }}>
          <strong><span style={{ color: 'orange', fontSize: 19 }}>+</span></strong>
        </div>
      </Link>
    </div>);
}

const mapStateToProps = (state) => {
  const { entity:
    { entityCount,
      isFetching,
      title,
      superEdges,
      queryLink,
      canonicalLink,
    }
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
    // entityCount: PropTypes.number.isRequired,
    // title: PropTypes.string.isRequired,
    // queryLink: PropTypes.string.isRequired,
    // canonicalLink: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      const url = tabs[0].url.split('?')[0];
      dispatch(fetchSearch(url));
    });
  }

  render() {
    const { superEdges,
      //entityCount, title, queryLink, canonicalLink,
    } = this.props;

    return (
      <div style={{ paddingTop: 4, paddingBottom: 4, fontFamily: 'Verdana, Geneva, sans-serif', color: '#000000', borderTop: '3px solid #70037C' }}>
        {superEdges
          .slice(startIndex, endIndex) //Only take a limited number of Edges for display
          .map((card, index) => {
            const { entity: { title, canonicalLink }, edges } = card;
            const username = edges && edges.length > 0 ? edges[0].user.username : '';
            return edgeCardJSXGenerator(title, canonicalLink, username, index);
          })
        }
        {footerJSX()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Connections);
