
/*
  getPageSearch
*/
function getPageSearch(url, tabId){
  var request = new XMLHttpRequest();
  request.open(
    'GET',
    'http://localhost:3000/api/searchurl?q=' + url,
    true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      if (data.isURL){ // Feed in the ID to our entity API
        getPageEntity(data.node._id, tabId);
      } else { // No Result
        setExtensionButon(0, tabId)
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
function getPageEntity(id, tabId){
  var request = new XMLHttpRequest();
  request.open(
    'GET',
    'http://localhost:3000/api/node/' + id,
    true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      setExtensionButon(data.entityCount, tabId);
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
function setExtensionButon(entityCount, tabId) {
  //Set the badge text
  chrome.browserAction.setBadgeText({
    tabId,
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
    tabId,
    path: path
  });
};


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
  var url = changeInfo.url;
  if (changeInfo.status='loading' && url){
    setExtensionButon(0, tabId);
    getPageSearch(url, tabId);
  }
});

chrome.tabs.onActivated.addListener(function(idObject, changeInfo){
  chrome.tabs.query({
    active: true,
    currentWindow: true,
  }, (tabs) => {
    const url = tabs[0].url.split('?')[0];
    getPageSearch(url, idObject.tabId);
  });
});
