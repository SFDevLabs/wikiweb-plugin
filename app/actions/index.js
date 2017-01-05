import request from 'superagent'

export const REQUEST_SEARCH = 'REQUEST_POSTS'
export const RECEIVE_NODE = 'RECEIVE_POSTS'
export const RECEIVE_ERROR = 'RECEIVE_POSTS'


export const requestSearch = url => ({
  type: REQUEST_SEARCH,
  url
})

export const receiveNode = (entityCount, title, superEdges) => ({
  type: RECEIVE_NODE,
  entityCount,
  title,
  superEdges,
})

export const receiveError = (entityCount) => ({
  type: RECEIVE_ERROR,
})


// const fetchProfile = url => dispatch => {
//   dispatch(requestPosts(url))
//
//   return request
//     .get(`http://localhost:3000/api/users/profile`)
//     .set('Accept', 'application/json')
//     .end((err, res) => {
//       if (err) {
//         return dispatch(receivePosts('Error in Response'));
//       }
//
//       const { body, body: { isURL, node } } = res
//       if (!isURL || node === null) {
//       } else {
//         dispatch(fetchNode(node._id))
//       }
//     });
// }

export const fetchSearch = url => dispatch => {
  dispatch(requestSearch(url))

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
  return request
    .get(`http://localhost:3000/api/node/${id}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receiveError('Error in Response'));
      } else {
        const { entityCount, title, superEdges } = res.body;
        setExtensionButon(entityCount);
        dispatch(receiveNode(
          entityCount,
          title,
          superEdges,
        ));
      };
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
    } :
    {
      "16": "img/icon-16-not-connected.png",
      "48": "img/icon-48-not-connected.png",
      "128": "img/icon-128-not-connected.png",
    };

  chrome.browserAction.setIcon({
    path
  });
}
