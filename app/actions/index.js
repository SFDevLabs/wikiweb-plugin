import request from 'superagent';

const setExtensionButon = (entityCount) => {
  //Set the badge text
  chrome.browserAction.setBadgeText({
    text: entityCount > 0 ? entityCount.toString() : ''
  });
  // Set the path for the icon
  const path = entityCount > 0 ?
  {
    16: 'img/icon-16-connected.png',
    48: 'img/icon-48-connected.png',
    128: 'img/icon-128-connected.png',
  } :
  {
    16: 'img/icon-16-not-connected.png',
    48: 'img/icon-48-not-connected.png',
    128: 'img/icon-128-not-connected.png',
  };

  chrome.browserAction.setIcon({
    path
  });
};

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_ENTITY = 'RECEIVE_ENTITY';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export const REQUEST_PROFILE = 'REQUEST_SEARCH';
export const RECEIVE_PROFILE = 'RECEIVE_ENTITY';

export const requestSearch = url => ({
  type: REQUEST_SEARCH,
  url
});

export const receiveEntities = (entityCount, title, superEdges, queryLink, canonicalLink) => ({
  type: RECEIVE_ENTITY,
  entityCount,
  title,
  superEdges,
  queryLink,
  canonicalLink,
});

export const receiveError = () => ({
  type: RECEIVE_ERROR,
});

export const requestProfile = url => ({
  type: REQUEST_SEARCH,
  url
});

export const receiveProfile = user => ({
  type: RECEIVE_USER,
  user,
});

export const fetchProfile = () => (dispatch) => {
  dispatch(requestProfile());
  return request
    .get('http://localhost:3000/api/users/profile')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receiveError('Error in Response'));
      }

      const { body } = res;
      if (!body) {
        dispatch(receiveError('Error in Response'));
      } else {
        dispatch(receiveProfile(body.user));
      }
    });
};

const fetchEntity = id => dispatch =>
  request
    .get(`http://localhost:3000/api/node/${id}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        dispatch(receiveError('Error in Response'));
      } else {
        const { entityCount, title, superEdges, queryLink, canonicalLink } = res.body;
        setExtensionButon(entityCount);
        dispatch(receiveEntity(
          entityCount,
          title,
          superEdges,
          queryLink,
          canonicalLink,
        ));
      }
    });

export const fetchSearch = url => (dispatch) => {
  dispatch(requestSearch(url));
  return request
    .get(`http://localhost:3000/api/searchurl?q=${url}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receiveError('Error in Response'));
      } // Stop here on err

      const { body: { isURL, node } } = res;
      if (isURL === false) {
        setExtensionButon(0);
      } else if (!node || node === null) {
        setExtensionButon(0);
      } else {
        const { _id } = node;
        dispatch(fetchEntity(_id));
      }
    });
};
