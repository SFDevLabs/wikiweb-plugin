
let iframe; // Store on the script level
let spacer; // Store on the script level
let notification; // Store on the script level
let notificationApp; // Store on the script level


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
  bindLinkListener();
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

/** Expand the application**/
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


/** Make an application notification **/
chrome.runtime.onMessage.addListener(
  function(request, sender) {
    const wikiwebNotification = request.wikiwebNotification;
    if (wikiwebNotification){
      const {text, type} = wikiwebNotification;
      notificationApp = createAppNotification(
        text,
        type
      );
      setTimeout(function() {
        removeAppNotification();
      }, TIMEOUT_NOTIFICATION);
   } else {
     // No opp
   }
});


function bindLinkListener(){
  var elements = document.getElementsByTagName('a');
  for(var i = 0, len = elements.length; i < len; i++) {
      elements[i].onclick = clickEvent;
  }
}

 function clickEvent(e) {
   destroyApp();
   setTimeout(function() {
     initApp();
     bindLinkListener();
   }, 500);
}


/**
 * createNotification
 * @return {object} div DOM Element
 */
function createAppNotification(text, type) {
  var color;
  switch (type) {
    case 'warning':
      color = 'yellow';
      break;
    case 'error':
      color = 'red';
      break;
    case 'info':
      color = 'blue';
      break;
    case 'success':
      color = 'green';
      break;
    default:
      color = 'green';
};
  const notificationDiv = document.createElement('div');
  /* don't split into multi-line. will break. @mceoin */
  document.body.append(notificationDiv);
  notificationDiv.innerText = text;
  notificationDiv.style.transition = 'all 250ms ease-in-out';
  notificationDiv.style.textAlign = 'center';
  notificationDiv.style.width = '100%';
  notificationDiv.style.padding = '10px';
  notificationDiv.style.position = 'fixed';
  notificationDiv.style.backgroundColor = color;
  notificationDiv.style.bottom = 0;
  notificationDiv.style.zIndex = 2147483646;
  notificationDiv.style.color = 'white';
  notificationDiv.style.fontWeight = 700;
  notificationDiv.style.fontSize= '14px'
  notificationDiv.style.fontFamily = 'Geneva';
  setTimeout(function(){
    notificationDiv.style.marginBottom = '45px';
  },10);
  return notificationDiv;
}

/**
 * removeNotification
 * @return {object} div DOM Element
 */
function removeAppNotification() {
  notificationApp.style.marginBottom = '0px';
  setTimeout(function(){
  //  if (notificationApp !== undefined) { notificationApp.remove(); };
  },500);

}
