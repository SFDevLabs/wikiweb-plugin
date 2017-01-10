import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchSearch } from '../actions/entity';

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

    // Move me to a class @jeffj
    function footerJSX() {
      return (
        <div className={'footer'} style={{ height: 40, display: 'block' }}>
          <Link to="add" style={{ lineHeight: '40px', textDecoration: 'none', color: '#4d4d4d', outline: 'none' }}>
            <div className={'wikiwebBox'} style={{ width: '174.5px', float: 'left', fontSize: 14, textAlign: 'center', outline: 'none' }}>
              <span>WikiWeb</span>
            </div>
          </Link>
          <div className={'verticalDivider'} style={{ borderLeft: '1px solid #DCDCDC', height: 30, float: 'left', marginTop: 5, marginBottom: 5 }}>{' '}</div>
          <Link to="add" style={{ lineHeight: '40px', textDecoration: 'none', color: '#4d4d4d' }}>
            <div className={'addConnectionBox'} style={{ width: '174.5px', float: 'right', textAlign: 'center' }}>
              <strong><span>+</span></strong>
            </div>
          </Link>
        </div>);
    }

    function edgeCardJSXGenerator(title, canonicalLink, username, index) {
      return (
        <div key={index} style={{ marginLeft: 5, marginRight: 5, padding: 5, display: 'block', borderBottom: '1px solid #DCDCDC', }}>
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: 14, marginBottom: 2, }}>
            {title}
          </div>
          <div className={'hyperlink'} style={{ display: 'block', height: 20 }}>
            <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#4d4d4d', fontSize: 11, paddingLeft: 1 }} href={canonicalLink}>
              <span className={'linkIcon'} style={{ lineHeight: '20px', display: 'inline-block' }}>{canonicalLink}</span>
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

    return (
      <div className={'connectionsJS'} style={{ paddingTop: 4, fontFamily: 'Verdana, Geneva, sans-serif', color: '#000000', borderTop: '3px solid #70037C' }}>
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
