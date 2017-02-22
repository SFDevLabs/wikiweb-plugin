chrome.browserAction.onClicked.addListener(function() {
  chrome.storage.local.get(['wikiwebFooterActive'], function (res) {
    var activeFooter = res.wikiwebFooterActive;
    chrome.storage.local.set({
      wikiwebFooterActive: activeFooter ? !activeFooter : true,
    });
  });
});
