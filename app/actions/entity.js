import request from 'superagent';
import { setExtensionButon } from '../lib';

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const REQUEST_CONNECTED_SEARCH = 'REQUEST_CONNECTED_SEARCH';

export const RECEIVE_ENTITY = 'RECEIVE_ENTITY';
export const REQUEST_CONNECT_SEARCH = 'REQUEST_CONNECT_SEARCH';
export const RECEIVE_CONNECTED_SEARCH = 'RECEIVE_CONNECTED_SEARCH';

export const REQUEST_EDGE = 'RECEIVE_EDGE';
export const RECEIVE_EDGE = 'RECEIVE_EDGE';

export const RECEIVE_ERROR = 'RECEIVE_ERROR';


export const requestSearch = url => ({
  type: REQUEST_SEARCH,
  url,
});

const receiveEntity = (id, entityCount, title, superEdges, queryLink, canonicalLink) => ({
  type: RECEIVE_ENTITY,
  id,
  entityCount,
  title,
  superEdges,
  queryLink,
  canonicalLink,
});

export const requestConnectSearch = url => ({
  type: REQUEST_CONNECTED_SEARCH,
  url,
});

const receiveConnectSearch = (isURL, id, title) => ({
  type: RECEIVE_CONNECTED_SEARCH,
  isURL,
  id,
  title,
});

export const receiveError = () => ({
  type: RECEIVE_ERROR,
});

export const requestProfile = url => ({
  type: REQUEST_SEARCH,
  url,
});

const receiveEdge = (superEdge) => ({
  type: RECEIVE_EDGE,
  superEdge,
});

/* This demands a more efficent API.
   We have almost two identical functions fetchEntity fetchConnectEntity.
   @TODO Consolidate functions around a single efficent API Call @jeffj
*/

const fetchEntity = id => dispatch =>
  request
    .get(`http://localhost:3000/api/node/${id}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        dispatch(receiveError('Error in Response'));
      } else {
        const { entityCount, title, superEdges, queryLink, canonicalLink, _id } = res.body;
        setExtensionButon(entityCount);
        dispatch(receiveEntity(
          _id,
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

// This demands a more efficent API.  For for cimplicty we are usign what we have.
export const fetchConnectSearch = url => (dispatch) => {
  dispatch(requestConnectSearch());
  return request
    .get(`http://localhost:3000/api/searchurl?q=${url}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receiveError('Error in Response'));
      } // Stop here on err

      const { body: { isURL, node } } = res;
      if (node !== null) {
        const { _id, title } = node;
        dispatch(receiveConnectSearch(isURL, _id, title));
      } else {
        dispatch(receiveConnectSearch(isURL, '', ''));
      }
    });
};

// This demands a more efficent API.  For for cimplicty we are usign what we have.
export const fetchPostEdge = (fromId, toId) => (dispatch) => {
  //dispatch(requestPostEdge());



  return request
    .post('http://localhost:3000/api/connect')
    .send({fromId, toId})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return //dispatch(receiveError('Error in Response'));
      } // Stop here on err

      //http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
      const { body } = res;
      dispatch(receiveEdge( /*Edge goes here @jeffj*/));

      // if (node !== null) {
      //   const { _id, title } = node;
      //
      // } else {
      //   dispatch(receiveConnectSearch(isURL, '', ''));
      // }
    });
};
