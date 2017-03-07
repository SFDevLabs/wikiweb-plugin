import request from 'superagent';
import { hashHistory } from 'react-router';
import { fetchCurrentPage } from './currentPage';
import config from '../config';

const env = process.env.NODE_ENV || 'development';
const { rootURL } = config[env];

export const REQUEST_EDGE = 'REQUEST_EDGE';
export const RECEIVE_EDGE = 'RECEIVE_EDGE';
export const RECEIVE_EDGE_ERROR = 'RECEIVE_EDGE_ERROR';


const receiveError = messages => ({
  type: RECEIVE_EDGE_ERROR,
  messages,
});


const requestPostEdge = () => ({
  type: REQUEST_EDGE,
});

const recievePostEdge = () => ({
  type: RECEIVE_EDGE,
});


// This demands a more efficent API.  For for cimplicty we are usign what we have.
export const fetchPostEdge = (fromId, toId, description, tags, tabId) => (dispatch) => {
  dispatch(requestPostEdge());
  return request
    .post(`${rootURL}/api/connect`)
    .send({ fromId, toId, description, tags })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        const message = res ? res.body.messages : ['Somethign went wrong. Please Try Again']
        return dispatch(receiveError(message));
      } // Stop here on err

      dispatch(recievePostEdge());
      dispatch(fetchCurrentPage(fromId, tabId));  // Re request edges for the page
    });
};
