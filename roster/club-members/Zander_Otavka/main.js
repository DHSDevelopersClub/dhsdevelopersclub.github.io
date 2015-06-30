(function() {
  "use strict";
  var parallaxContainer = document.querySelector("parallax-container");
  var mainImageEnd = document.querySelector("a#mainImageEnd");
  var titleText = document.querySelector("#titleText");

  parallaxContainer.addEventListener("scroll", function() {
    if (parallaxContainer.scrollTop >= mainImageEnd.getTop()) {
      console.log(titleText.getAttribute('hidden'));
      if (titleText.getAttribute("hidden") !== null) {
        titleText.removeAttribute("hidden");
        header.classList.add("dark");
      }
    } else {
      console.log(titleText.getAttribute('hidden'));
      if (titleText.getAttribute("hidden") === null) {
        titleText.setAttribute("hidden", "");
        header.classList.remove("dark");
      }
    }
  })
}());