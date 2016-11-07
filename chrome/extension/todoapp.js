import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app';
import './todoapp.css';


ReactDOM.render(
	<Root  />,
	document.querySelector('#root')
);

// chrome.storage.local.get('state', (obj) => {
//   const { state } = obj;
//   const initialState = JSON.parse(state || '{}');



// });
