import request from 'superagent';

import { setExtensionButon } from '../lib';

import { receiveError } from './error';

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const REQUEST_CONNECTED_SEARCH = 'REQUEST_CONNECTED_SEARCH';

export const RECEIVE_ENTITY = 'RECEIVE_ENTITY';


export const REQUEST_EDGE = 'REQUEST_EDGE';
export const RECEIVE_EDGE = 'RECEIVE_EDGE';

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


export const requestProfile = url => ({
  type: REQUEST_SEARCH,
  url,
});

/* This demands a more efficent API.
   We have almost two identical functions fetchEntity fetchConnectEntity.
   @TODO Consolidate functions around a single efficent API Call @jeffj
*/

export const fetchEntity = id => dispatch =>
  request
    .get(`http://localhost:3000/api/node/${id}`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        dispatch(receiveError(['Error in Response']));
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
        return dispatch(receiveError(['Error in Response']));
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
