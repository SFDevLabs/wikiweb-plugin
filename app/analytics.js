import config from './config';
const env = process.env.NODE_ENV || 'development';
const { gaTrackingCode, version } = config;

function logEvent(action, label) {
  const category = 'extentionFooterBar';
  label = label !== undefined ? label : null;
  if (_gaq !== undefined && action !== undefined){
    _gaq.push(['_trackEvent', category, action, label])
  }
}

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://www.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  ga.onload = function(){
    setTimeout(function(){
      _gaq.push(['_setAccount', gaTrackingCode]);
      _gaq.push(['_gat._forceSSL']);// Send all hits using SSL, even from insecure (HTTP) pages.
      _gat._forceSSL();
      _gaq.push(['_trackPageview', 'extentionLoaded']);
    }, 10);
  };
})();

export default logEvent;
