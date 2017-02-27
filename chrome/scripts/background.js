
/**
 * setThe extensionButtonWith the correctParams
 * @param {[type]} entityCount [description]
 * @param {[type]} tabId       [description]
 */
function setExtensionButon(active) {
  // Set the path for the icon
  const path = active ?
  {
    16: '../img/icon-16-not-connected.png',
    48: '../img/icon-48-not-connected.png',
    128: '../img/icon-128-not-connected.png',
  }:
  {
    16: '../img/icon-16-connected.png',
    48: '../img/icon-48-connected.png',
    128: '../img/icon-128-connected.png',
  };

  chrome.browserAction.setIcon({
    path,
  });
};


chrome.browserAction.onClicked.addListener(function() {
  chrome.storage.local.get(['wikiwebFooterActive'], function (res) {
    var activeFooter = res.wikiwebFooterActive;
    chrome.storage.local.set({
      wikiwebFooterActive: activeFooter ? !activeFooter : true,
    });
    setExtensionButon(activeFooter);

    chrome.tabs.query({},function(tabs){
      tabs.map(function(tab){
        chrome.tabs.sendMessage(
            tab.id,
            {foo:'foo'},
            function (response) {
              //  console.log(response, 'response');
            }
        );
      })
    })

  });
});


// Messaging.addListener(function(request, sender, fnResponse) {
//     debugger
//     //self.onRequest(request, sender, fnResponse);
// });
