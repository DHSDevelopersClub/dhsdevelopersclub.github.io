$(function() {
  'use strict';

  var changeHeaderOpacity = function(opacity) {
    if (opacity < 0.3) {
      opacity = 0.3;
    }
    if (changeHeaderOpacity.old === opacity) {
      return;
    }
    changeHeaderOpacity.old = opacity;
    $('#header').css('background-color', 'rgba(255,255,255,' + opacity + ')');
  };

  var setTitleVisibility = function(visibility) {
    if (visibility !== setTitleVisibility.current) {
      setTitleVisibility.current = visibility;
      if (visibility) {
        $('#titleText').removeAttr('hidden');
      } else {
        $('#titleText').attr('hidden', '');
      }
    }
  };

  var mainImg = $('#mainImage');
  var header = $('#header');
  var mainImgBottom = mainImg.offset().top + mainImg.height();
  var headerColor = header.css('background-color');
  var totalDist = function(el) { return $(window).height() + $(el).height(); };
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop() + header.height();
    if (scrollTop <= mainImgBottom) {
      setTitleVisibility(false);
      var ratio = scrollTop / mainImgBottom;
      changeHeaderOpacity(ratio);
    } else {
      setTitleVisibility(true);
      changeHeaderOpacity(1);
    }

    $.each($('.background-image'), function(i, el) {
      var img = $(el).children('img')[0];
      var parallaxDist = ($(img).height() - $(el).height()) * 1;
      var elTop = $(el).offset().top;
      var scrollBottom = scrollTop - (elTop - $(window).height());
      if (scrollBottom < 0) { return; }
      var ratio = scrollBottom / totalDist(el);
      if (ratio > 1) { return; }
      var topOffset = String((1 - ratio) * -parallaxDist) + 'px';
      $(img).css('top', topOffset);
    });
  });
  $(window).scroll();
  console.log(header.css('background-color'));
});
