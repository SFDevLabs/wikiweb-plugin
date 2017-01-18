export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export const receiveError = errors => ({
  type: RECEIVE_ERROR,
  errors,
});
