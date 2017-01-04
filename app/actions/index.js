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

export const receivePosts = (entityCount) => ({
  type: RECEIVE_POSTS,
  entityCount,
})


const fetchProfile = url => dispatch => {
  dispatch(requestPosts(url))

  return request
    .get(`http://localhost:3000/api/users/profile`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receivePosts('Error in Response'));
      }

      const { body, body: { isURL, node } } = res
      if (!isURL || node === null) {
      } else {
        dispatch(fetchNode(node._id))
      }
    });
}

export const fetchPosts = url => dispatch => {
  dispatch(requestPosts(url))

  return request
    .get(`http://localhost:3000/api/searchurl?q=${url}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receivePosts('Error in Response'));
      }

      const { body, body: { isURL, node } } = res
      if (!isURL) {
        setExtensionButon(0);
      } else {
        if ( node === null) { setExtensionButon(0) }; // If the URL is valid but we have no node in DB
        dispatch(fetchNode(node._id));
      }
    });
}

const fetchNode = id => dispatch => {
  //dispatch(requestNode(id))
  return request
    .get(`http://localhost:3000/api/node/${id}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receivePosts('Error in Response'));
      }
      const { entityCount } = res.body;
      setExtensionButon(entityCount);
      dispatch(receivePosts(entityCount));
    });
}

function setExtensionButon(entityCount){
  //Set the badge text
  chrome.browserAction.setBadgeText({
    text: entityCount > 0 ? entityCount.toString() : ''
  });
  // Set the path for the icon
  const path = entityCount > 0 ?
  {
    "16": "img/icon-16-connected.png",
    "48": "img/icon-48-connected.png",
    "128": "img/icon-128-connected.png",
  }:
  {
    "16": "img/icon-16-not-connected.png",
    "48": "img/icon-48-not-connected.png",
    "128": "img/icon-128-not-connected.png",
  };

  chrome.browserAction.setIcon({
    path
  });
}
