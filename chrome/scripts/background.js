
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
  var url = changeInfo.url;
  if (changeInfo.status='loading' && url){
    getPageSearch(url);
  }
});

chrome.tabs.onActivated.addListener(function(tabId, changeInfo){
  chrome.tabs.query({
    active: true,
    currentWindow: true,
  }, (tabs) => {
    const url = tabs[0].url.split('?')[0];
    getPageSearch(url);
  });
});

/*
  getPageSearch
*/
function getPageSearch(url){
  var request = new XMLHttpRequest();
  request.open(
    'GET',
    'http://localhost:3000/api/searchurl?q=' + url,
    true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      if (data.isURL){ // Feed in the ID to our entity API
        getPageEntity(data.node._id);
      } else { // No Result
        setExtensionButon(0)
      }

    } else {
      // We reached our target server, but it returned an error

    }
  };

  request.onerror = function() {
    console.log('Error In Request')
  };

  request.send();
}

/*
  getPageEntity
*/
function getPageEntity(id){
  var request = new XMLHttpRequest();
  request.open(
    'GET',
    'http://localhost:3000/api/node/' + id,
    true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      setExtensionButon(data.entityCount);
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function() {
    console.log('Error In Request')
  };

  request.send();
}

//@TODO Duplicated bacuse we have no build tools/

/*
  setExtensionButon
*/
function setExtensionButon(entityCount){
  //Set the badge text
  chrome.browserAction.setBadgeText({
    text: entityCount > 0 ? entityCount.toString() : ''
  });
  // Set the path for the icon
  var path = entityCount > 0 ?
  {
    16: 'img/icon-16-connected.png',
    48: 'img/icon-48-connected.png',
    128: 'img/icon-128-connected.png',
  } :
  {
    16: 'img/icon-16-not-connected.png',
    48: 'img/icon-48-not-connected.png',
    128: 'img/icon-128-not-connected.png',
  };

  chrome.browserAction.setIcon({
    path: path
  });
};
