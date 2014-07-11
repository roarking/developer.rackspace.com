// This is the master, all-in-one JavaScript file that's concatenated from the
// others under this directory. Rather than adding JavaScript here, add it
// somewhere else in this directory and it'll be included.

//= require lib/jquery/jquery-1.11.1
//= require lib/jquery/jquery.cookie-1.4.1
//= require lib/bootstrap/collapse
//= require lib/bootstrap/dropdown
//= require core.js
//= require pages/sponsorship.js
//= require pages/docs.js
//= require pages/devtrial.js
//= require pages/home.js

(function (window, document, $) {
  var app = window.devsite;

  $.extend(app, {
    // TODO move to some kind of utils object or something
    getParameter: (function () {
      var cache = {};
      return function (name) {
        if ('getParameter' in window.location && typeof(window.location.getParameter) === 'function') {
          return window.location.getParameter(name);
        }

        var query = window.location.search.substring(1);
        if (cache[query]) {
          return cache[query][name];
        }

        var kvp = query.split('&'), values = {};
        for (var i = 0; i < kvp.length; i++) {
          var kv = kvp[i].split('=');
          values[kv[0]] = decodeURIComponent(kv[1] || '').replace(/\+/g, ' ');
        }

        cache[query] = values;
        return cache[query][name];
      };
    }())
  });

  $(document).on('ready', function() {

    // Core page functionality - do not remove

    window.hljs.initHighlightingOnLoad();
    
    var _gaq = window._gaq || [];
    _gaq.push(['_setAccount', 'UA-35639070-1']);
    _gaq.push(['_setDomainName', 'rackspace.com']);
    _gaq.push(['_trackPageview']);

    (function () {
      var ga = document.createElement('script');
      ga.type = 'text/javascript';
      ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(ga, s);
    })();

    app.routes = {
      '/community/': app.pages.sponsorship,
      '/docs/': app.pages.docs,
      '/devtrial/': app.pages.devtrial,
      '/': app.pages.home
    };

    Object.keys(app.routes).forEach(function(route) {
      if (window.location.pathname.indexOf(route) === 0) {
        app.routes[route]();
      }
    });
  });

}(window, document, jQuery));