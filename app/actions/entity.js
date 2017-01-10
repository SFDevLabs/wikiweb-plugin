import request from 'superagent';
import { setExtensionButon } from '../lib';

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_ENTITY = 'RECEIVE_ENTITY';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export const requestSearch = url => ({
  type: REQUEST_SEARCH,
  url
});

const receiveEntity = (entityCount, title, superEdges, queryLink, canonicalLink) => ({
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
