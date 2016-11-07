import request from 'superagent'

function saveState(state) {

  console.log(state, 'state')


  request
    .get('https://wikiweb.org/api/edges/firehose/')
    .send({ name: 'Manny', species: 'cat' })
    .set('X-API-Key', 'foobar')
    .set('Accept', 'application/json')
    .end(function(err, res){
      console.log(err, res, 'res')
      // Calling the end function will send the request
    });


  chrome.storage.local.set({ state: JSON.stringify(state) });
}

// todos unmarked count
function setBadge(todos) {


  // if (chrome.browserAction) {
  //   const count = todos.filter(todo => !todo.marked).length;
  //   chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
  // }
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state);
      setBadge(state.todos);
    });
    return store;
  };
}
