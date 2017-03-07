import request from 'superagent';
import config from '../config';

const env = process.env.NODE_ENV || 'development';
const { rootURL } = config[env];

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_CURRENT_PAGE = 'RECEIVE_CURRENT_PAGE';

export const RECEIVE_SEARCH_ERROR = 'RECEIVE_SEARCH_ERROR';

const receiveSearchError = messages => ({
  type: RECEIVE_SEARCH_ERROR,
  messages,
});

export const requestSearch = (url, tabId) => ({
  type: REQUEST_SEARCH,
  url,
  tabId,
});

const receiveCurrentPage = (id, entityCount, title, superEdges, queryLink, canonicalLink, heartValue, heartCount, isURL) => ({
  type: RECEIVE_CURRENT_PAGE,
  id,
  entityCount,
  title,
  superEdges,
  queryLink,
  canonicalLink,
  heartValue,
  heartCount,
  isURL,
});

/* This demands a more efficent API.
   We have almost two identical functions fetchCurrentPage fetchConnectEntity.
   @TODO Consolidate functions around a single efficent API Call @jeffj
*/

export const fetchCurrentPage = (id, tabId) => dispatch =>
  request
    .get(`${rootURL}/api/node/${id}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        dispatch(receiveSearchError([{
          type: 'error',
          text: 'Error in Response'
        }]));
      } else {
        const { entityCount, title, superEdges, queryLink, canonicalLink, _id, heart:{ value, count} } = res.body;
        const isURL = true;
        dispatch(receiveCurrentPage(
          _id,
          entityCount,
          title,
          superEdges,
          queryLink,
          canonicalLink,
          value,
          count,
          isURL
        ));
      }
    });

export const fetchSearch = (url, tabId) => (dispatch) => {
  dispatch(requestSearch(url, tabId));
  return request
    .get(`${rootURL}/api/searchurl?q=${url}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        return dispatch(receiveSearchError([{
          type: 'error',
        }]));
      } // Stop here on err
      const { body: { isURL, node, parseSuccess, messages } } = res;
      if (isURL === false || parseSuccess === false) {
        dispatch(receiveSearchError(messages));
      } else {
        const { _id } = node;
        dispatch(fetchCurrentPage(_id, tabId));
      }
    });
};
