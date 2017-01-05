import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import Connections from '../components/Connections'
import Add from '../components/Add'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      const url = tabs[0].url.split('?')[0]
      dispatch(fetchPosts(url))
    });

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
    }
  }

  handleChange = nextReddit => {
    this.props.dispatch(selectReddit(nextReddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  render() {
    const { entityCount } = this.props
    return (
      <div style={{height:'200px', width:'200px'}}>
        <Connections />
        <Add />
        This page has {entityCount} connection{entityCount>1?'s':''}!
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { posts: { entityCount } } = state

  return {
    entityCount,
  }
}

export default connect(mapStateToProps)(App)
