import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchSearch } from '../actions'

const mapStateToProps = state => {
  const { node: { entityCount, isFetching, title, superEdges  } } = state

  return {
    entityCount,
    title,
    isFetching,
    superEdges,
  }
}

class Connections extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    entityCount: PropTypes.number.isRequired,
    superEdges: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
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
    const { entityCount, title, superEdges } = this.props

    return (
      <div>
        Titel: {title}
        This page has {entityCount} connection{entityCount>1?'s':''}!
        <hr/>
        Connections:
        {superEdges.map(obj=>
          (<li>{obj.entity.title} - {obj.entity._id}&nbsp;
            <a target="_blank" href={obj.entity.canonicalLink}>Link</a>
          </li>)
        )}
        <hr/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Connections)
