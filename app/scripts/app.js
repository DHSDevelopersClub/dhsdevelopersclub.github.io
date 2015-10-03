(function() {
  "use strict";
  var app = document.querySelector("#app");

  app.onRouteChange = function(event) {
    if (event.detail.path == "/" ||
        event.detail.path == "/join") {
      app.$.mainNavbar.classList.add("image");
    } else {
      app.$.mainNavbar.classList.remove("image");
    }

    Polymer.dom(document).querySelector("#mainNavbar nav-links")
      .updateStyles();
  };

  app.openNavDropdown = function(event) {
    setTimeout(function() {
      app.$.navLinks.open();
    }, 100);
  };

  var onHashChange = function() {
    if (!window.location.hash || window.location.hash[0] !== "/") {
      window.location.hash = "/";
    }
  };
  window.addEventListener("hashchange", onHashChange);
  onHashChange();

  app.addEventListener("dom-change", function() {
    // The contents of the app template have loaded
  });
})();
