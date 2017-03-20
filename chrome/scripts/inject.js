
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
  iframe.style.height = '100%'; /* 45px height corresponds with plugin height in stylesheet. We're using 46 here to account for the borderTop/boxShadowTop */
  iframe.style.zIndex = '2147483647';
  iframe.style.display = 'block';
  iframe.style.opacity = '1';
  iframe.style.margin = '0px';
  iframe.style.visibility = 'visible';
  iframe.style.backgroundColor = 'beige';
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
  /* don't split into multi-line. will break. @mceoin */
  notificationDiv.innerHTML = "<div style='width: 180px !important; padding: 20px !important; position: fixed !important; background-color: #663399; right: 10px !important; top: 10px !important; z-index: 2147483647; color: white; font-weight: 700 !important; font-size: 14px !important; font-family: Geneva, Arial, sans-serif !important;'>"+text+"</div>"
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
  iframe = undefined;
  spacer = undefined;
}


/**
 * Add listener to remove and create the iframe.
 */
chrome.runtime.onMessage.addListener(
  (sender) => {
    // const { wikiwebFooterActive } = sender;
    // if (!wikiwebFooterActive) {
    //   destroyApp();
    //   removeNotification();
    //   notification = createNotification(
    //     'WikiWeb turned OFF'
    //   );
    //   setTimeout(function() {
    //     removeNotification();
    //   }, TIMEOUT_NOTIFICATION);
    // } else {
    //   removeNotification();
    //   notification = createNotification(
    //     'WikiWeb turned ON'
    //   );
    //   setTimeout(function() {
    //     removeNotification()
    //   }, TIMEOUT_NOTIFICATION);
    //   initApp();
    // }
  }
);


/**
 * Add listener to remove and create the iframe.
 */
chrome.runtime.onMessage.addListener(
  (sender) => {
    const { wikiwebFooterActive } = sender;
    if (wikiwebFooterActive && iframe !== undefined) {
      iframe.style.height = '100%';
    } else if ( iframe !== undefined ) {
      iframe.style.height = '46px';
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
// getLocallyStoreActiveFooter(function(err, wikiwebFooterActive) {
//   if (wikiwebFooterActive){
//     initApp();
//   } else if ( wikiwebFooterActive === undefined ){ // App loadd for first time
//     initApp();
//     chrome.storage.local.set({ wikiwebFooterActive: true });
//     notification = createNotification(
//       'WikiWeb turned ON'
//     );
//     setTimeout(function() {
//       removeNotification()
//     }, TIMEOUT_NOTIFICATION);
//   }
// });
/** Kick Off the App on Page Load **/
initApp();
