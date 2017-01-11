import request from 'superagent';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

export const requestUser = url => ({
  type: REQUEST_USER,
  url,
});

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user,
});

export const fetchUser = () => (dispatch) => {
  dispatch(requestUser());
  return request
    .get('http://localhost:3000/api/users/profile')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        //return dispatch(receiveError('Error in Response'));
      }

      const { body } = res;
      if (!body) {
        // dispatch(receiveError('Error in Response'));
      } else {
        dispatch(receiveUser(body.user));
      }
    });
};
