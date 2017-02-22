import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './containers/App.react';
import ReactDOM from 'react-dom';

const root = document.createElement('div');
root.id = "wikiwebRoot";
document.body.prepend(root);

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
