import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchURLSearch, invalidateReddit } from '../actions'
import Posts from '../components/Posts'

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
      //dispatch(fetchURLSearch(url))
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
    const { text } = this.props
    return (
      <div style={{height:'300px', width:'300px'}}>
        Eoin is Master!
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { posts: { text, isFetching } } = state


  return {
    text,
    isFetching
  }
}

export default connect(mapStateToProps)(App)
