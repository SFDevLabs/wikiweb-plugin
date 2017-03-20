import request from 'superagent';
import config from '../config';

const env = process.env.NODE_ENV || 'development';
const { rootURL } = config;

export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const RECEIVE_NOT_AUTH = 'RECEIVE_NOT_AUTH';

export const requestProfile = url => ({
  type: REQUEST_PROFILE,
  url,
});

export const receiveProfile = profile => ({
  type: RECEIVE_PROFILE,
  profile,
});

export const receiveNotAuth = () => ({
  type: RECEIVE_NOT_AUTH,
});

export const fetchProfile = () => (dispatch) => {
  dispatch(requestProfile());
  return request
    .get(`${rootURL}/api/users/profile`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && err.status === 401) {
        return dispatch(receiveNotAuth());
      }

      const { body } = res;
      if (!body) {
        // dispatch(receiveError('Error in Response'));
      } else {
        dispatch(receiveProfile(body.user));
      }
    });
};
