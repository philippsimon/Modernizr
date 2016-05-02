/*!
{
  "name": "cookies-3rd-party",
  "property": "cookies",
  "tags": ["storage"],
  "authors": ["Chethan"]
}
!*/
/* DOC
Detects whether cross domain cookie access is supported.
*/
define(['Modernizr', 'addTest', 'test/cookies'], function(Modernizr, addTest) {
  Modernizr.addAsyncTest(function() {

    function jsonp(url, callback) {
      var funcName = 'func_' + Math.floor(Math.random() * 1000000000);
      var timeout;
      window[funcName] = function(data) {
        clearTimeout(timeout);
        callback(undefined, data);
      };
      timeout = setTimeout(function() {
        delete window[funcName];
        callback('jsonp callback to ' + funcName + ' timed out');
      }, 5000);
      var script = window.document.createElement('script');
      script.type = 'text/javascript';
      script.src = url + (url.match(/\?/) ? '&' : '?') + 'callback=' + funcName;
      window.document.getElementsByTagName('head')[0].appendChild(script);
      return funcName;
    }
    var thirdPartyTestURL  = 'http://hbbtv-extern-fe01.sim-technik.de/chethan/send_callback.php';

    jsonp(thirdPartyTestURL + '?calltype=setCookie', function(error) {
      if (error) {
        addTest('cookies3rdparty', false);
        return;
      }
      jsonp(thirdPartyTestURL + '?calltype=testCookie', function(error, thirdPartyCookiesSupported) {
        if (error) {
          addTest('cookies3rdparty', false);
          return;
        }
        jsonp(thirdPartyTestURL + '?calltype=clearCookie', function() {
          addTest('cookies3rdparty', thirdPartyCookiesSupported);
        });
      });
    });
  });
});
