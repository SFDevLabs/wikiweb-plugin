
let iframe; // Store on the script level
let spacer; // Store on the script level
let notification; // Store on the script level
const TIMEOUT_NOTIFICATION = 3000;

/**
 * createIframe
 * @return {object} iframe DOM Element
 */
function createIframe(){
  let iframe = document.createElement('iframe');
  iframe.id="wwinject"
  iframe.src='chrome-extension://'+chrome.runtime.id+'/main.html';
  iframe.style.width = '100%';
  iframe.style.position = 'fixed';
  iframe.style.left = 0;
  iframe.style.bottom = 0;
  iframe.style.border = 'none';
  iframe.style.height = '46px'; /* 45px height corresponds with plugin height in stylesheet. We're using 46 here to account for the borderTop/boxShadowTop */
  iframe.style.zIndex = '2147483647'
  iframe.style.display = 'block'
  iframe.style.opacity = '1'
  iframe.style.margin = '0px'
  iframe.style.visibility = 'visible'
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
 * createNotification
 * @return {object} div DOM Element
 */
function createNotification(text) {
  const notificationDiv = document.createElement('div');
  const notificationP = document.createElement('p');
  notificationP.innerText = text;
  notificationP.style.fontWeight = '700';
  notificationP.style.fontSize = '14px';
  notificationP.style.color = 'white';
  notificationDiv.append(notificationP);
  notificationDiv.style.height = '45px';
  notificationDiv.style.width = '200px';
  notificationDiv.style.paddingLeft = '20px';
  notificationDiv.style.position = 'fixed';
  notificationDiv.style.right = '10px';
  notificationDiv.style.top = '10px';
  notificationDiv.style.backgroundColor = '#663399';
  notificationDiv.style.border = '1px solid black';
  notificationDiv.style.zIndex = '2147483647';

  document.body.append(notificationDiv);
  return notificationDiv;
}

/**
 * removeNotification
 * @return {object} div DOM Element
 */
function removeNotification() {
  if (notification !== undefined) { notification.remove(); };
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
 * Add listener to remove and create the iframe.
 */
chrome.runtime.onMessage.addListener(
  (sender) => {
    const { wikiwebFooterActive } = sender;
    if (!wikiwebFooterActive) {
      destroyApp();
      removeNotification();
      notification = createNotification(
        'WikiWeb turned OFF'
      );
      setTimeout(function() {
        removeNotification();
      }, TIMEOUT_NOTIFICATION);
    } else {
      removeNotification();
      notification = createNotification(
        'WikiWeb turned ON'
      );
      setTimeout(function() {
        removeNotification()
      }, TIMEOUT_NOTIFICATION);
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
      activeFooter
    );
  });
}

/** Set the inital extension button state **/
getLocallyStoreActiveFooter(function(err, wikiwebFooterActive) {
  if (wikiwebFooterActive){
    initApp();
  } else if ( wikiwebFooterActive === undefined ){ // App loadd for first time
    initApp();
    chrome.storage.local.set({ wikiwebFooterActive: true });
    notification = createNotification(
      'WikiWeb turned ON'
    );
    setTimeout(function() {
      removeNotification()
    }, TIMEOUT_NOTIFICATION);
  }
});
/** Kick Off the App on Page Load **/
