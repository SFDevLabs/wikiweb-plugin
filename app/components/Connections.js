import React, { PropTypes, Component } from 'react'
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
        {superEdges.map(card =>
          (<div style={{paddingLeft: 10, paddingRight: 10, display: 'block', borderBottom: '1px solid #DCDCDC'}}>
            <div style={{display: 'block', overflow: 'hidden', textOverflow: 'ellipsis'}}>{card.entity.title}</div>
            <div><a target="_blank" href={card.entity.canonicalLink}>{card.entity.canonicalLink}</a></div>
            <div style={{display: 'block'}}>
              <span style={{display: 'inline-block'}}>
                <img style={{height: 15, width: 15}} src=""/>
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

    const seeMore = entityCount < 3 ? 
      (<div style={{float: 'left'}}>See more ({entityCount})...</div>) :
      (<div style={{float: 'left'}}>See on <span><button onClick={function(){console.log('open addConnection tab')}}>Add +</button></span></div>)

    const footerJSX = (
      <div style={{borderTop: '1px solid #DCDCDC', paddingLeft: 10, paddingRight: 10, paddingTop: 4, height: 20, display: 'block'}}>
        {entityCount > 3 ? 
          (<div style={{float: 'left'}}>See more ({entityCount})...</div>) :
          (<button style={{float: 'left'}} onClick={this.goToWikiWeb}>wikiweb.org</button>)
        }
        <button 
          style={{float: 'right'}}
          onClick={function(){console.log('open addConnection tab')}}>
          Add Connection <span style={{color: 'orange'}}><strong>+</strong></span>
        </button>
      </div>
    );

    return (
      <div style={{paddingTop: 4, paddingBottom: 4}}>
        {edgeCardsJSX}
        {footerJSX}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Connections)
