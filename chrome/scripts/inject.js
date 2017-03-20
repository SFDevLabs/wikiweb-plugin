
let iframe; // Store on the script level
let spacer; // Store on the script level
let notification; // Store on the script level
const expandedHeight = '100%';
const defaultHeight = '46px';
const TIMEOUT_NOTIFICATION = 3000;

/**
 * createIframe
 * @return {object} iframe DOM Element
 */
function createIframe(wikiwebExpanded){
  let iframe = document.createElement('iframe');
  iframe.id="wwinject"
  iframe.src='chrome-extension://'+chrome.runtime.id+'/main.html';
  iframe.style.width = '100%';
  iframe.style.position = 'fixed';
  iframe.style.left = 0;
  iframe.style.bottom = 0;
  iframe.style.border = 'none';
  iframe.style.height = wikiwebExpanded ? expandedHeight : defaultHeight; /* 45px height corresponds with plugin height in stylesheet. We're using 46 here to account for the borderTop/boxShadowTop */
  iframe.style.zIndex = '2147483647';
  iframe.style.display = 'block';
  iframe.style.opacity = '1';
  iframe.style.margin = '0px';
  iframe.style.visibility = 'visible';
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
function initApp(wikiwebExpanded) {
  iframe = createIframe(wikiwebExpanded);
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
 * Add listener to remove and create the iframe.
 */
 chrome.storage.onChanged.addListener(
  (sender) => {
   const { wikiwebExpanded } = sender;
   if (iframe && wikiwebExpanded && wikiwebExpanded.newValue){
     iframe.style.height = expandedHeight;
  } else if (iframe && wikiwebExpanded) {
    iframe.style.height = defaultHeight;
  }
 });

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
getLocalStore(function(err, wikiwebFooterActive, wikiwebExpanded) {
  if (wikiwebFooterActive){
    initApp(wikiwebExpanded);
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
