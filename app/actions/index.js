import request from 'superagent'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const selectReddit = reddit => ({
  type: SELECT_REDDIT,
  reddit
})

export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit
})

export const requestPosts = url => ({
  type: REQUEST_POSTS,
  url
})

export const receivePosts = (text) => ({
  type: RECEIVE_POSTS,
  text
})

const fetchPosts = url => dispatch => {
  dispatch(requestPosts(url))

  return request
    .get(`https://wikiweb.org/api/searchurl?q=${url}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      const { body, body: { isURL } } = res
      if (err) {
        //@TODO Handel
      } else if (!isURL) {
        dispatch(receivePosts('Error in Response'))
      } else {

        const text = body.node.title;
        chrome.browserAction.setBadgeText({ text: makeid() });
        dispatch(receivePosts(text))
      }
      
    });

}

function makeid() {
    var text = "";
    var possible = "1234567890";

    for( var i=0; i < 1; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// const shouldFetchPosts = (state, reddit) => {
//   const posts = state.postsByReddit[reddit]
//   if (!posts) {
//     return true
//   }
//   if (posts.isFetching) {
//     return false
//   }
//   return posts.didInvalidate
// }

export const fetchURLSearch = url => (dispatch, getState) => {
  return dispatch(fetchPosts(url))
}
