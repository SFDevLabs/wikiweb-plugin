
let iframe; // Store on the script level
let spacer; // Store on the script level
/**
 * createIframe
 * @return {object} iframe DOM Element
 */
function createIframe(){
  let iframe = document.createElement('iframe');
  iframe.src='chrome-extension://'+chrome.runtime.id+'/main.html';
  iframe.style.width = '100%';
  iframe.style.position = 'fixed';
  iframe.style.left = 0;
  iframe.style.bottom = 0;
  iframe.style.border = 'none';
  iframe.style.height = '46px'; /* 45px height corresponds with plugin height in stylesheet. We're using 46 here to account for the borderTop/boxShadowTop */
  iframe.style.zIndex = '2147483647'
  document.body.append(iframe);
  return iframe;
}

/**
 * createFooterSpacer
 * @return {object} div DOM Element
 */
function createFooterSpacer(){
  let paddingFooterDiv = document.createElement('div');
  paddingFooterDiv.style.height = '45px';
  document.body.append(paddingFooterDiv);
  return paddingFooterDiv;
}

/**
 * initApp
 */
function initApp() {
  iframe = createIframe();
  spacer = createFooterSpacer();
}

/**
 * destroyApp
 */
function destroyApp() {
  iframe.remove();
  spacer.remove();
  iframe = null;
  spacer = null;
}


/**
 * Add lsitener to remove and create the iframe.
 */
chrome.runtime.onMessage.addListener(
  (sender) => {
    const { wikiwebFooterActive } = sender;
    if (!wikiwebFooterActive) {
      destroyApp();
    } else {
      initApp();
    }
  }
);

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
      activeFooter === undefined ? true : activeFooter
    );
  });
}

/** Set the inital extension button state **/
getLocallyStoreActiveFooter(function(err, wikiwebFooterActive) {
  if (wikiwebFooterActive){
    initApp();
  }
});
/** Kick Off the App on Page Load **/
