iframe = document.createElement('iframe');
iframe.src='chrome-extension://'+chrome.runtime.id+'/main.html';
iframe.style.width = '100%';
iframe.style.position = 'fixed';
iframe.style.left = 0;
iframe.style.bottom = 0;
iframe.style.border = 'none';
iframe.style.height = '46px'; /* 45px height corresponds with plugin height in stylesheet. We're using 46 here to account for the borderTop/boxShadowTop */
iframe.style.zIndex = '2147483647'
document.body.append(iframe);

paddingFooterDiv = document.createElement('div');
paddingFooterDiv.style.height = '45px';
document.body.append(paddingFooterDiv);
