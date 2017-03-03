import request from 'superagent';
import { receiveError } from './error';
import config from '../config';

const env = process.env.NODE_ENV || 'development';
const { rootURL } = config[env];

export const REQUEST_HEART = 'REQUEST_HEART';
export const RECEIVE_HEART = 'RECEIVE_HEART';

export const requestHeart = (value) => ({
  type: REQUEST_HEART,
  id
});

const receiveHeart = (heartValue, heartCount) => ({
  type: RECEIVE_HEART,
  heartValue,
  heartCount,
});

/* This demands a more efficent API.
   We have almost two identical functions fetchCurrentPage fetchConnectEntity.
   @TODO Consolidate functions around a single efficent API Call @jeffj
*/

export const fetchHeart = (id, value) => dispatch =>
  request
    .post(`${rootURL}/api/node/${id}/heart`)
    .set('Accept', 'application/json')
    .send({ value, id })
    .end((err, res) => {
      if (err) {
        dispatch(receiveError(['Error in Response']));
      } else {
        const body = res.body;
        const { value, count } = body;
        dispatch(receiveHeart(value, count));
      }
    });
