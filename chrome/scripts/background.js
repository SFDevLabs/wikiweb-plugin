
/**
 * setThe extensionButtonWith the correctParams
 * @param {[Bool]} active
 */
function setExtensionButon(active) {
  const path = active ?
  {
    16: '../img/icon-16-connected.png',
    48: '../img/icon-48-connected.png',
    128: '../img/icon-128-connected.png',
  }:
  {
    16: '../img/icon-16-not-connected.png',
    48: '../img/icon-48-not-connected.png',
    128: '../img/icon-128-not-connected.png',
  };
  // Set the path for the icon
  chrome.browserAction.setIcon({
    path,
  });
};

/**
 * getLocallyStoreActiveFooter State
 * @param  {Function} cb
 */
function getLocallyStoreActiveFooter (cb) {
  chrome.storage.local.get(['wikiwebFooterActive'], function (res) {
    var activeFooter = res.wikiwebFooterActive;
    const err = false;
    cb(
      err,
      activeFooter
    );
  });
}

/** Set the inital extension button state **/
getLocallyStoreActiveFooter(function(err, wikiwebFooterActive) {
  setExtensionButon(wikiwebFooterActive);
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  const wikiwebFooterActive = changes.wikiwebFooterActive.newValue
  setExtensionButon(wikiwebFooterActive);
  // Send the message to the inject script to create of destroy the footer
  chrome.tabs.query({}, function (tabs) {
    tabs.map(function (tab) {
      chrome.tabs.sendMessage(
          tab.id,
          { wikiwebFooterActive }
      );
    });
  });
});

/** Add a listener for the extensions on click event **/
chrome.browserAction.onClicked.addListener(function () {
  getLocallyStoreActiveFooter(function (err, wikiwebFooterActive) {
    chrome.storage.local.set({ wikiwebFooterActive: !wikiwebFooterActive });
  });
});
