import request from 'superagent';
import config from '../config';

const env = process.env.NODE_ENV || 'development';
const { rootURL } = config[env];

export const REQUEST_CONNECTED_SEARCH = 'REQUEST_CONNECTED_SEARCH';
export const RECEIVE_CONNECTED_SEARCH = 'RECEIVE_CONNECTED_SEARCH';

export const RECEIVE_CONNECTED_SEARCH_ERROR = 'RECEIVE_CONNECTED_SEARCH_ERROR';


const receiveError = (isURL, parseSuccess, messages) => ({
  type: RECEIVE_CONNECTED_SEARCH_ERROR,
  messages,
  isURL,
  parseSuccess,
});

const requestConnectSearch = url => ({
  type: REQUEST_CONNECTED_SEARCH,
  url,
});

const receiveConnectSearch = (isURL, parseSuccess, id, title) => ({
  type: RECEIVE_CONNECTED_SEARCH,
  isURL,
  parseSuccess,
  id,
  title,
});


/* This demands a more efficent API.
   We have almost two identical functions fetchCurrentPage fetchConnectEntity.
   @TODO Consolidate functions around a single efficent API Call @jeffj
*/
// This demands a more efficent API.  For for cimplicty we are usign what we have.
export const fetchConnectSearch = url => (dispatch) => {
  dispatch(requestConnectSearch(url));
  return request
    .get(`${rootURL}/api/searchurl?q=${url}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receiveError(['Error in Response']));
      } // Stop here on err
      const { body: { isURL, parseSuccess, node, messages } } = res;
      if (parseSuccess) {
        const { _id, title } = node;
        dispatch(receiveConnectSearch(isURL, parseSuccess, _id, title));
      } else {
        dispatch(receiveError(isURL, parseSuccess, messages));
      }
    });
};
