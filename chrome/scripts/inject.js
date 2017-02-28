iframe = document.createElement('iframe');
iframe.src='chrome-extension://chlabnnbbloifmgcmenphjdpakeaoijm/main.html'; // TODO: inject this dynamically
iframe.style.width = '100%';
iframe.style.position = 'fixed';
iframe.style.left = 0;
iframe.style.bottom = 0;
iframe.style.border = 'none';
iframe.style.height = 46; /* 45px height corresponds with plugin height in stylesheet. We're using 46 here to account for the borderTop/boxShadowTop */
document.body.append(iframe);
