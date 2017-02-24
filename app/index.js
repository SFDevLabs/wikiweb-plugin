import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import App from './containers/App.react';
// Adding Styles to page
import styles from './index.scss';


const middleware = [thunk];
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

class Root extends Component {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}


ReactDOM.render(
  <Root />,
  document.querySelector('#wikiwebRoot')
);
