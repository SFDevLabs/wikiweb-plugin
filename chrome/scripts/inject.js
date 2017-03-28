
let iframe; // Store on the script level
let spacer; // Store on the script level
let notification; // Store on the script level
const expandedHeight = '0';//'100%';
const defaultHeight = 'calc(-100% + 47px)'//'47px';
const TIMEOUT_NOTIFICATION = 3000;
const originalDocumentOverflow = document.body.style.overflow
const originalHTMLOverflow = document.documentElement.style.overflow;
/**
 * createIframe
 * @return {object} iframe DOM Element
 */
function createIframe(){
  let iframe = document.createElement('iframe');
  iframe.id="wwinject"
  iframe.src='chrome-extension://'+chrome.runtime.id+'/main.html?href='+escape(window.location.href);
  iframe.style.width = '100%';
  iframe.style.position = 'fixed';
  iframe.style.left = 0;
  iframe.style.bottom = 0;
  iframe.style.border = 'none';
  iframe.style.height = '100%'//defaultHeight; /* 45px height corresponds with plugin height in stylesheet. We're using 46 here to account for the borderTop/boxShadowTop */
  iframe.style.zIndex = '2147483647';
  iframe.style.display = 'block';
  iframe.style.opacity = '1';
  iframe.style.margin = '0px';
  iframe.style.bottom = defaultHeight;
  iframe.style.visibility = 'visible';
  iframe.style.top = 'initial';
  iframe.style.right = 'initial';
  iframe.style.transition = 'all 250ms ease-in-out'
  document.body.append(iframe);
  return iframe;
}

/**
 * createFooterSpacer
 * @return {object} div DOM Element
 */
function createFooterSpacer(){
  let paddingFooterDiv = document.createElement('div');
  paddingFooterDiv.style.height = defaultHeight;
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
 chrome.storage.onChanged.addListener(
  (sender) => {
    const { wikiwebFooterActive } = sender;
    if (wikiwebFooterActive && !wikiwebFooterActive.newValue) {
      destroyApp();
      removeNotification();
      notification = createNotification(
        'WikiWeb turned OFF'
      );
      setTimeout(function() {
        removeNotification();
      }, TIMEOUT_NOTIFICATION);
    } else if (wikiwebFooterActive) {
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
 * getLocalStore State
 * @param  {Function} cb
 */
function getLocalStore (cb) {
  chrome.storage.local.get(['wikiwebFooterActive', 'wikiwebExpanded'], function (res) {
    var { wikiwebFooterActive, wikiwebExpanded } = res;
    const err = false;
    cb(
      err,
      wikiwebFooterActive,
      wikiwebExpanded
    );
  });
}

/** Set the inital extension button state **/
getLocalStore(function(err, wikiwebFooterActive) {
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

chrome.runtime.onMessage.addListener(
  function(request, sender) {
    const wikiwebExpanded = request.wikiwebExpanded;
    if (iframe && wikiwebExpanded){
      iframe.style.bottom = expandedHeight;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
   } else if (iframe && !wikiwebExpanded) {
     iframe.style.bottom = defaultHeight;
     document.body.style.overflow = originalDocumentOverflow;
     document.documentElement.style.overflow = originalHTMLOverflow;
   }
});
