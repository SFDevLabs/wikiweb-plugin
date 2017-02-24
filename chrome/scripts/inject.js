var MAIN_DOM_ID = 'wikiwebRoot';
var mainRootDiv;

/**
 * Set Up the DOM for the WW footer
*/
function footerDOMSetUp() {
  mainRootDiv = document.createElement('div');
  mainRootDiv.id = MAIN_DOM_ID;
  document.body.prepend(mainRootDiv);

  const paddingFooterDiv = document.createElement('div');
  paddingFooterDiv.style.height = 45;
  document.body.append(paddingFooterDiv);
};

/**
 * Set Up the DOM for the WW footer
*/
function footerDOMDestroy() {
  mainRootDiv.remove();
  mainRootDiv = undefined;
}


function createFooterJS() {
  const script = document.createElement('script');
  script.type = 'application/javascript';
  script.src = '//localhost:4000/js/popup.bundle.js'; // use this for linked script
  document.body.appendChild(script);
}

// Message Catching for extension button
setTimeout(function(){
  chrome.runtime.onMessage.addListener(
    function(sender, request, sendResponse) {

      chrome.storage.local.get(
        ['wikiwebFooterActive'],
        function (res) {
          if (res.wikiwebFooterActive === true && mainRootDiv === undefined) {
            footerDOMSetUp();
            createFooterJS();
          } else {
            footerDOMDestroy();
          }
        }
      );
    }
  );
},500);

// Inital kickoff
chrome.storage.local.get(
  ['wikiwebFooterActive'],
  function (res) {
    if (res.wikiwebFooterActive === true) {
      footerDOMSetUp();
      createFooterJS();
    }
  }
);
