var $ = document.querySelector.bind(document);
var $$ = function (selector) {
  return [].slice.call(document.querySelectorAll(selector), 0);
};

var prefix = null;
if ("requestFullscreen" in document.documentElement) {
  prefix = "fullscreen";
} else if ("mozRequestFullScreen" in document.documentElement) {
  prefix = "mozFullScreen";
} else if ("webkitRequestFullscreen" in document.documentElement) {
  prefix = "webkitFullscreen";
} else if ("msRequestFullscreen") {
  prefix = "msFullscreen";
}

var onFullscreenChange = function () {
  var elementName = "not set";
  if (document[prefix + "Element"]) {
    elementName = document[prefix + "Element"].nodeName;
  }
  onFullscreenHandler(!!document[prefix + "Element"]);
};

if (document[prefix + "Enabled"]) {
  var onFullscreenHandler = function (started) {
    $$(".start").forEach(function (x) {
      x.style.display = started ? "none" : "inline-block";
    });
  };

  document.addEventListener(
    prefix.toLowerCase() + "change",
    onFullscreenChange
  );

  var goFullScreen = null;
  if ("requestFullscreen" in document.documentElement) {
    goFullScreen = "requestFullscreen";
  } else if ("mozRequestFullScreen" in document.documentElement) {
    goFullScreen = "mozRequestFullScreen";
  } else if ("webkitRequestFullscreen" in document.documentElement) {
    goFullScreen = "webkitRequestFullscreen";
  } else if ("msRequestFullscreen") {
    goFullScreen = "msRequestFullscreen";
  }

  var goFullscreenHandler = function (element) {
    return function () {
      var maybePromise = element[goFullScreen]();
      if (maybePromise && maybePromise.catch) {
        maybePromise.catch(function (err) {
          console.log("Error: ", err);
        });
      }
    };
  };
}
