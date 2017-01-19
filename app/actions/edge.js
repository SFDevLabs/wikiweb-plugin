import request from 'superagent';
import { hashHistory } from 'react-router';
import { fetchEntity } from './entity';
import { receiveError } from './error';


export const REQUEST_EDGE = 'REQUEST_EDGE';
export const RECEIVE_EDGE = 'RECEIVE_EDGE';

export const REQUEST_CONNECTED_SEARCH = 'REQUEST_CONNECTED_SEARCH';
export const RECEIVE_CONNECTED_SEARCH = 'RECEIVE_CONNECTED_SEARCH';

const requestPostEdge = () => ({
  type: REQUEST_EDGE,
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

/* This demands a more efficent API.
   We have almost two identical functions fetchEntity fetchConnectEntity.
   @TODO Consolidate functions around a single efficent API Call @jeffj
*/
// This demands a more efficent API.  For for cimplicty we are usign what we have.
export const fetchConnectSearch = url => (dispatch) => {
  dispatch(requestConnectSearch());
  return request
    .get(`http://localhost:3000/api/searchurl?q=${url}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receiveError(['Error in Response']));
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
export const fetchPostEdge = (fromId, toId, description, tags) => (dispatch) => {
  dispatch(requestPostEdge());
  return request
    .post('http://localhost:3000/api/connect')
    .send({ fromId, toId, description, tags })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receiveError(res.body.messages));
      } // Stop here on err
      hashHistory.push('/?isNew=true'); //Navigate back Home
      dispatch(fetchEntity(fromId));  // Re request edges for the page
    });
};
