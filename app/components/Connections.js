import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchSearch } from '../actions'

const mapStateToProps = state => {
  const { node: { entityCount, isFetching, title, superEdges, queryLink, canonicalLink  } } = state

  return {
    entityCount,
    title,
    isFetching,
    superEdges,
    queryLink,
    canonicalLink,
  }
}

class Connections extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    entityCount: PropTypes.number.isRequired,
    superEdges: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    queryLink: PropTypes.string.isRequired,
    canonicalLink: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      const url = tabs[0].url.split('?')[0]
      dispatch(fetchSearch(url))
    });
  }

  goToWikiWeb = () => { chrome.tabs.update(null, {url:'https://wikiweb.org'}); };

  render() {
    const { entityCount, title, superEdges, queryLink, canonicalLink } = this.props;

    /* Connections */
    const edgeCardsJSX = (
      <div>
        {superEdges.map((card, index) => {
          return (<div key={index} style={{marginLeft: 5, marginRight: 5, padding: 5, display: 'block',  borderBottom: '1px solid #DCDCDC'}}>
            <div style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: 14, marginBottom: 2}}>{card.entity.title}</div>
            <div><a target="_blank" style={{textDecoration: 'none', color: '#4d4d4d', fontSize: 12}} href={card.entity.canonicalLink}>{card.entity.canonicalLink}</a></div>
            <div style={{display: 'block'}}>
              <span style={{fontSize: 12}}>
                <a style={{textDecoration: 'none', color: '#4d4d4d'}} href={'http://twitter.com/'+card.edges[0].user.username} >@{card.edges[0].user.username}</a>
              </span>
            </div>
          </div>)
          })
        }
      </div>
    );

    /* Footer */
    const footerJSX = (
      <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 8, height: 25, display: 'block'}}>
        <Link to="add" style={{textDecoration: 'none', color: '#4d4d4d', outline: 'none'}}>
          <div style={{width: '49%', float: 'left', fontSize: 14, textAlign: 'center', outline: 'none'}}>
            <span>WikiWeb</span>
          </div>
        </Link> 
        <Link to="add" style={{textDecoration: 'none', color: '#4d4d4d'}}>
          <div style={{borderLeft: '1px solid #DCDCDC', width: '49%', float: 'right', textAlign: 'center'}}>
            <strong><span style={{color: 'orange', fontSize: 19}}>+</span></strong>
          </div>
        </Link> 
      </div>
    );

    return (
      <div style={{paddingTop: 4, paddingBottom: 4, fontFamily: 'Verdana, Geneva, sans-serif', color: '#000000', borderTop: '3px solid #70037C'}}>
        {edgeCardsJSX}
        {footerJSX}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Connections)
