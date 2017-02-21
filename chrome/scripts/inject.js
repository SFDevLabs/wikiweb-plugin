var root = document.createElement('div');
root.id = "wikiwebRoot";
document.body.prepend(root);

var script = document.createElement('script');
script.type = "application/javascript";
script.src = "https://localhost:4000/js/popup.bundle.js"; // use this for linked script
document.body.appendChild(script);
