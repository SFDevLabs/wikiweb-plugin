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

  render() {
    const { entityCount, title, superEdges, queryLink, canonicalLink } = this.props;
    console.log(superEdges, 'superEdges', title, 'title');
    const server = 'http://localhost:3000'; // REVIEW PLEASE - how should I be doing this to account for local & production servers? @mceoin
    const windowLocation = window.location.href;

    /* Header */
    const headerJSX = (
      <div style={{paddingLeft: 10, paddingRight: 10, height: 20, borderBottom: '1px solid #DCDCDC', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis'}}>
        <span style={{opacity: 0.66 }}>{queryLink}</span>
      </div>
    );

    /* Connections */
    const edgeCardsJSX = (
      <div>
        {superEdges.map(card =>
          (<div style={{paddingLeft: 10, paddingRight: 10, display: 'block', borderBottom: '1px solid #DCDCDC'}}>
            <div style={{display: 'block', overflow: 'hidden', textOverflow: 'ellipsis'}}>{card.entity.title}</div>
            <div><a target="_blank" href={card.entity.canonicalLink}>{card.entity.canonicalLink}</a></div>
            <div style={{display: 'block'}}>
              <span style={{display: 'inline-block'}}>
                <img style={{height: 15, width: 15}} src={card.edges[0].user.twitter.profile_image_url}/>
              </span>
              <span style={{display: 'inline-block', paddingLeft: 5}}>
                <a style={{textDecoration: 'none', color: '#4d4d4d'}} href={'http://twitter.com/'+card.edges[0].user.username} >@{card.edges[0].user.username}</a>
              </span>
            </div>
          </div>)
        )}
      </div>
    );

    /* Footer */
    const addConnectionUrl = canonicalLink ?
      `${server}/connect?url=${canonicalLink}`:
      `${server}/connect?url=${windowLocation}`;
    const goToAddConnectionPage = () => { chrome.tabs.update(null, {url:addConnectionUrl}); };
    const goToWikiWeb = () => { chrome.tabs.update(null, {url:'https://wikiweb.org'}); };

    const seeMore = entityCount < 3 ?
      (<div style={{float: 'left'}}>See more ({entityCount})...</div>) :
      (<div style={{float: 'left'}}>See on <span><Link to="add">Add +</Link></span></div>)

    const footerJSX = (
      <div style={{borderTop: '1px solid #DCDCDC', paddingLeft: 10, paddingRight: 10, height: 20, display: 'block'}}>
        {entityCount > 3 ?
          (<div style={{float: 'left'}}>See more ({entityCount})...</div>) :
          (<button style={{float: 'left'}} onClick={goToWikiWeb}>wikiweb.org</button>)
        }
        <div style={{float: 'right'}}>
          <Link to="add">
            <span>Add <span style={{color: 'orange'}}></span></span>
            <strong>+</strong>
          </Link>
        </div>
      </div>
    );

    return (
      <div>
        {headerJSX}
        {edgeCardsJSX}
        {footerJSX}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Connections)
