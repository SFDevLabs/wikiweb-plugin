iframe = document.createElement('iframe');
iframe.src='chrome-extension://chlabnnbbloifmgcmenphjdpakeaoijm/main.html';
iframe.style.width = "100%";
iframe.style.position = "fixed";
iframe.style.left = 0;
iframe.style.bottom = 0;
iframe.style.border = 'none';
iframe.style.height = 100; /* 45px height corresponds with plugin height in stylesheet */ /* TODO: set to 45px when done styling */
document.body.append(iframe);
