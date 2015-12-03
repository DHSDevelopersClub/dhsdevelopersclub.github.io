(function() {
  "use strict";

  var parallaxContainer = document.querySelector("parallax-container");
  var mainImageEnd = document.querySelector("a#mainImageEnd").getTop();
  var titleText = document.querySelector("#titleText");
  var header = document.querySelector("#header");
  var headerHeight = header.offsetHeight;
  var parallaxImages = document.querySelectorAll(".parallax-image");

  parallaxContainer.addEventListener("scroll", SmoothA.updateHash);
  SmoothA.updateHash();

  parallaxContainer.addEventListener("scroll", function() {
    var scroll = parallaxContainer.scrollTop;

    if (scroll >= mainImageEnd) {
      if (titleText.getAttribute("hidden") !== null) {
        titleText.removeAttribute("hidden");
      }
    } else {
      if (titleText.getAttribute("hidden") === null) {
        titleText.setAttribute("hidden", "");
      }
    }

    var insideImage = false;
    for (var i = 0; i < parallaxImages.length; i++) {
      var imageTop = parallaxImages[i].offsetTop;
      var imageBottom = imageTop + parallaxImages[i].offsetHeight;
      if (imageTop <= scroll && scroll < imageBottom - headerHeight) {
        insideImage = true;
      }
    }

    if (insideImage) {
      if (header.classList.contains("hidden")) {
        header.classList.remove("hidden");
      }
    } else {
      if (!header.classList.contains("hidden")) {
        header.classList.add("hidden");
      }
    }
  });
}());
