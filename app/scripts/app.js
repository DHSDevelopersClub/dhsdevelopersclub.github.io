(function() {
  "use strict";

  var app = Polymer.dom(document).querySelector("#app");

  app.onRouteChange = function(event) {
    if (event.detail.path == "/learn" ||
        event.detail.path == "/collaborate") {
      app.$.mainNavbar.classList.add("no-image");
    } else {
      app.$.mainNavbar.classList.remove("no-image");
    }
  };
})();