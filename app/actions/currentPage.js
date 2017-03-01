import request from 'superagent';
import { receiveError } from './error';
import config from '../config';

const env = process.env.NODE_ENV || 'development';
const { rootURL } = config[env];

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_CURRENT_PAGE = 'RECEIVE_CURRENT_PAGE';

export const REQUEST_EDGE = 'REQUEST_EDGE';


export const requestSearch = (url, tabId) => ({
  type: REQUEST_SEARCH,
  url,
  tabId,
});

const receiveCurrentPage = (id, entityCount, title, superEdges, queryLink, canonicalLink) => ({
  type: RECEIVE_CURRENT_PAGE,
  id,
  entityCount,
  title,
  superEdges,
  queryLink,
  canonicalLink,
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
        dispatch(receiveError(['Error in Response']));
      } else {
        const { entityCount, title, superEdges, queryLink, canonicalLink, _id } = res.body;
        dispatch(receiveCurrentPage(
          _id,
          entityCount,
          title,
          superEdges,
          queryLink,
          canonicalLink,
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
        return dispatch(receiveError(['Error in Response']));
      } // Stop here on err

      const { body: { isURL, node } } = res;
      if (isURL === false) {
        // No Opp
      } else if (!node || node === null) {
          // No Opp
      } else {
        const { _id } = node;
        dispatch(fetchCurrentPage(_id, tabId));
      }
    });
};
