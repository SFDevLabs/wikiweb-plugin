import request from 'superagent';

export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const RECEIVE_NOT_AUTH = 'RECEIVE_NOT_AUTH';

const rootURL = 'http://localhost:3000';

export const requestProfile = url => ({
  type: REQUEST_PROFILE,
  url,
});

export const receiveProfile = user => ({
  type: RECEIVE_PROFILE,
  user,
});

export const receiveNotAuth = user => ({
  type: RECEIVE_NOT_AUTH,
  user,
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
