import request from 'superagent';
import { hashHistory } from 'react-router';
import { fetchEntity } from './entity';
import { receiveError } from './error';
import config from '../config';

const env = process.env.NODE_ENV || 'development';
const { rootURL } = config[env];

export const REQUEST_EDGE = 'REQUEST_EDGE';

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
    .get(`${rootURL}/api/searchurl?q=${url}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receiveError(['Error in Response']));
      } // Stop here on err

      const { body: { isURL, node, messages } } = res;
      if (isURL) {
        const { _id, title } = node;
        dispatch(receiveConnectSearch(isURL, _id, title));
      } else {
        dispatch(receiveError(messages));
      }
    });
};

// This demands a more efficent API.  For for cimplicty we are usign what we have.
export const fetchPostEdge = (fromId, toId, description, tags, tabId) => (dispatch) => {
  dispatch(requestPostEdge());
  return request
    .post(`${rootURL}/api/connect`)
    .send({ fromId, toId, description, tags })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receiveError(res.body.messages));
      } // Stop here on err
      hashHistory.push('/?isNew=true'); //Navigate back Home
      dispatch(fetchEntity(fromId, tabId));  // Re request edges for the page
    });
};
