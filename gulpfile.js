/* globals require, __dirname, Buffer */
/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function() {
"use strict";

// Include Gulp & tools we'll use
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var del = require("del");
var runSequence = require("run-sequence");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var merge = require("merge-stream");
var path = require("path");
var fs = require("fs");
var glob = require("glob");
var historyApiFallback = require("connect-history-api-fallback");
var packageJson = require("./package.json");
var crypto = require("crypto");
var polybuild = require("polybuild");
var stringifyObject = require("stringify-object");
var stream = require("stream");
var os = require("os");
var url = require("url");
var gm = require("gm");
var through = require("through2");

var WINDOWS = /^win/.test(os.platform());
var MAC = /^darwin$/.test(os.platform());

var AUTOPREFIXER_BROWSERS = [
  "ie >= 10",
  "ie_mob >= 10",
  "ff >= 30",
  "chrome >= 34",
  "safari >= 7",
  "opera >= 23",
  "ios >= 7",
  "android >= 4.4",
  "bb >= 10"
];

var TESTING_BROWSERS = (function() {
  try {
    return require("./testing-browsers.json");
  } catch (e) {
    if (e.code !== "MODULE_NOT_FOUND") {
      throw e;
    }

    var browsers = [
      "firefox",
      "google chrome"
    ];
    if (WINDOWS) {
      browsers.push("iexplore");
    } else if (MAC) {
      browsers.push("safari");
    }
    return browsers;
  }
})();

var styleTask = function(stylesPath, srcs) {
  return gulp.src(srcs.map(function(src) {
      return path.join("app", stylesPath, src);
    }))
    .pipe($.changed(stylesPath, {extension: ".css"}))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest(".tmp/" + stylesPath))
    .pipe($.minifyCss())
    .pipe(gulp.dest("dist/" + stylesPath))
    .pipe($.size({title: stylesPath}));
};

var jshintTask = function(src) {
  return gulp.src(src)
    .pipe($.jshint.extract()) // Extract JS from .html files
    .pipe($.jshint())
    .pipe($.jshint.reporter("jshint-stylish"))
    .pipe($.if(!browserSync.active, $.jshint.reporter("fail")));
};

var optimizeHtmlTask = function(src, dest) {
  var assets = $.useref.assets({searchPath: [".tmp", "app", "dist"]});

  return gulp.src(src)
    .pipe(assets)
    // Concatenate and minify JavaScript
    .pipe($.if("*.js", $.uglify({preserveComments: "some"})))
    // Concatenate and minify styles
    // In case you are still using useref build blocks
    .pipe($.if("*.css", $.minifyCss()))
    .pipe(assets.restore())
    .pipe($.useref())
    // Minify any HTML
    .pipe($.if("*.html", $.minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    })))
    // Output files
    .pipe(gulp.dest(dest))
    .pipe($.size({title: "html"}));
};

var vulcanizeTask = function(src, dest) {
  return gulp.src(src)
    .pipe(polybuild({maximumCrush: true}))
    .pipe(gulp.dest(dest));
};

// Start a Browsersync server
var startBrowserSync = function(port, baseDir, routes) {
  browserSync({
    port: port,
    notify: false,
    logPrefix: "DHS",
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function(snippet) {
          return snippet;
        }
      }
    },
    // Run as an https by uncommenting "https: true"
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    browser: TESTING_BROWSERS,
    server: {
      baseDir: baseDir,
      middleware: [ historyApiFallback() ],
      routes: routes
    },
    middleware: [] // Hack to make blank urls show their index.html
  });
};

var minifyImage = function() {
  return $.imagemin({
    progressive: true,
    interlaced: true,
    multipass: true
  });
};

// Code shamlessly stolen from gulp-gm https://www.npmjs.com/package/gulp-gm.
var resizeAndRename = function(scale) {
  return through.obj(function (originalFile, enc, done) {
    var PluginError = $.util.PluginError;
    var PLUGIN_NAME = "resize-rename-task";

    var file = originalFile.clone({contents: false});

    if (file.isNull()) {
      return done(null, file);
    }

    if (file.isStream()) {
      return done(new PluginError(PLUGIN_NAME, "Streaming not supported"));
    }

    var passthrough = through();
    var gmFile = gm(file.contents, file.path);

    gmFile.size(function (err, size) {
      var width = Math.round(size.width * scale);
      var height = Math.round(size.height * scale);
      var modifiedGmFile = gmFile.resize(width, height);

      if (modifiedGmFile === null) {
        return done(new PluginError(PLUGIN_NAME, "Modifier callback didn't return anything."));
      } else {
        modifiedGmFile.toBuffer(function (err, buffer) {
          if (err) {
            return done(new PluginError(PLUGIN_NAME, err));
          } else {
            if (modifiedGmFile._outputFormat) {
              file.path = file.path.replace(
                path.extname(file.path), "." + modifiedGmFile._outputFormat);
            }
            var extname = path.extname(file.path);
            var basename = path.basename(file.path, extname);
            file.path = file.path.replace(
              basename,
              basename + "-" + width + "w"
            );
            file.contents = buffer;
            done(null, file);
          }
        });
      }
    });
  });
};

// Compile and automatically prefix stylesheets
gulp.task("app-styles", function() {
  return styleTask("styles", ["**/*.css"]);
});

gulp.task("element-styles", function() {
  return styleTask("elements", ["**/*.css"]);
});

gulp.task("roster-styles", function() {
  return styleTask("roster", ["**/*.css"]);
});

// Scale images for multiple screen resolutions
gulp.task("resize-profiles", function() {
  var merged = merge();
  for (var i = 1; i <= 3; i++) {
    merged.add(gulp.src(["app/roster/*/profile.jpg"])
      .pipe($.imageResize({
        width: 100 * i,
        height: 100 * i,
        crop: true,
        upscale: false
      }))
      .pipe($.rename({ suffix: "-" + i + "x" }))
      .pipe(minifyImage())
      .pipe(gulp.dest(".tmp/roster/"))
      .pipe(gulp.dest("dist/roster/")));
  }
  return merged.pipe($.size({title: "resize-profiles"}));
});

gulp.task("resize-images", function() {
  var merged = merge();
  for (var i = 1; i <= 3; i++) {
    merged.add(gulp.src([
        "app/**/*.{png,jpg,jpeg}",
        "!app/roster/*/profile.jpg",
        "!app/images/touch/**/*"
      ])
      .pipe(resizeAndRename(1 / i))
      .pipe(minifyImage())
      .pipe(gulp.dest(".tmp/"))
      .pipe(gulp.dest("dist/")));
  }
  return merged.pipe($.size({title: "resize-images"}));
});

// Optimize images
gulp.task("optimize-images", function() {
  return gulp.src("app/**/*.{png,jpg,jpeg,svg}")
    .pipe(minifyImage())
    .pipe(gulp.dest("dist"))
    .pipe($.size({title: "optimize-images"}));
});

// Lint JavaScript
gulp.task("jshint", function() {
  return jshintTask([
      "app/scripts/**/*.js",
      "app/elements/**/*.js",
      "app/elements/**/*.html",
      "app/roster/**/*.js",
      "app/roster/**/*.html",
      "gulpfile.js"
    ]);
});

// Copy all files at the root level (app)
gulp.task("copy", function() {
  var app = gulp.src([
    "app/*",
    "!app/test",
    "!app/cache-config.json"
  ], {
    dot: true
  }).pipe(gulp.dest("dist"));

  var bower = gulp.src(["bower_components/**/*"])
    .pipe(gulp.dest("dist/bower_components"));

  var roster = gulp.src(["app/roster/**/*"])
    .pipe(gulp.dest("dist/roster"));

  var elements = gulp.src(["app/elements/**/*.html"])
    .pipe(gulp.dest("dist/elements"));

  var swBootstrap = gulp.src(["bower_components/platinum-sw/bootstrap/*.js"])
    .pipe(gulp.dest("dist/elements/bootstrap"));

  var swToolbox = gulp.src(["bower_components/sw-toolbox/*.js"])
    .pipe(gulp.dest("dist/sw-toolbox"));

  return merge(app, bower, roster, elements, swBootstrap, swToolbox)
    .pipe($.size({title: "copy"}));
});

// Copy web fonts to dist
gulp.task("fonts", function() {
  return gulp.src(["app/fonts/**"])
    .pipe(gulp.dest("dist/fonts"))
    .pipe($.size({title: "fonts"}));
});

// Scan your HTML for assets & optimize them
gulp.task("html", function() {
  return optimizeHtmlTask(
    ["app/**/*.html", "!app/{elements,test}/**/*.html"],
    "dist");
});

// Generate roster.json based on the folders in app/roster
gulp.task("generate-roster", function() {
  var members = [];
  glob.sync("app/roster/*")
  .forEach(function(file) {
    var member = path.basename(file, path.extname(file));
    members.push(member);
  });
  var string = stringifyObject(members, {
      indent: "  ",
      singleQuotes: false
  });

  var src = stream.Readable({ objectMode: true });
  src._read = function() {
    this.push(new $.util.File({
      cwd: "",
      base: "",
      path: "roster.json",
      contents: new Buffer(string)
    }));
    this.push(null);
  };
  return src
    .pipe(gulp.dest(".tmp/roster/"))
    .pipe(gulp.dest("dist/roster/"));
});

// Polybuild will take care of inlining HTML imports,
// scripts and CSS for you.
// Anyone who wants their page vulcanized can add a vulcanizeTask here.
gulp.task("vulcanize", function() {
  var app = vulcanizeTask("dist/index.html", "dist/");
  var zander = vulcanizeTask(
    "dist/roster/Zander_Otavka/index.html", "dist/roster/Zander_Otavka");
  return merge(app, zander);
});

// If you require more granular configuration of Vulcanize
// than polybuild provides, follow instructions from readme at:
// https://github.com/PolymerElements/polymer-starter-kit/#if-you-require-more-granular-configuration-of-vulcanize-than-polybuild-provides-you-an-option-by

// Rename Polybuild's index.build.html to index.html
gulp.task("rename-index", function() {
  return gulp.src("dist/**/index.build.html")
    .pipe($.rename({ basename: "index" }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("remove-old-build-index", function(cb) {
  del("dist/**/index.build.html", cb);
});

// Generate config data for the <sw-precache-cache> element.
// This include a list of files that should be precached, as well as a (hopefully unique) cache
// id that ensure that multiple PSK projects don't share the same Cache Storage.
// This task does not run by default, but if you are interested in using service worker caching
// in your project, please enable it within the "default" task.
// See https://github.com/PolymerElements/polymer-starter-kit#enable-service-worker-support
// for more context.
gulp.task("cache-config", function(callback) {
  var dir = "dist";
  var config = {
    cacheId: packageJson.name || path.basename(__dirname),
    disabled: false
  };

  glob("{elements,scripts,styles}/**/*.*", {cwd: dir}, function(error, files) {
    if (error) {
      callback(error);
    } else {
      files.push("index.html", "./", "bower_components/webcomponentsjs/webcomponents-lite.min.js");
      config.precache = files;

      var md5 = crypto.createHash("md5");
      md5.update(JSON.stringify(config.precache));
      config.precacheFingerprint = md5.digest("hex");

      var configPath = path.join(dir, "cache-config.json");
      fs.writeFile(configPath, JSON.stringify(config), callback);
    }
  });
});

// Clean output directory
gulp.task("clean", function(cb) {
  del([".tmp", ".publish", "dist"], cb);
});

// Watch files for changes & reload
gulp.task("serve", [
  "app-styles", "element-styles", "roster-styles",
  "optimize-images", "resize-profiles", "resize-images",
  "generate-roster"
], function() {
  startBrowserSync(5000, [".tmp", "app"], {
    "/bower_components": "bower_components"
  });

  gulp.watch(["app/**/*.html"], reload);
  gulp.watch(["app/styles/**/*.css"], ["app-styles", reload]);
  gulp.watch(["app/elements/**/*.css"], ["element-styles", reload]);
  gulp.watch(["app/roster/**/*.css"], ["roster-styles", reload]);
  gulp.watch(["app/{scripts,elements}/**/{*.js,*.html}"], ["jshint"]);
  gulp.watch(["app/images/**/*"], reload);
  gulp.watch(["app/roster/**"], ["generate-roster", reload]);
  gulp.watch(["app/roster/*/profile.jpg"], ["resize-profiles", reload]);
  gulp.watch([
      "app/**/*.{png,jpg,jpeg}",
      "!app/roster/*/profile.jpg",
      "!app/images/touch/**/*"
    ], ["resize-images", reload]);

  gulp.watch(["bower_components/**/*"], reload);
});

// Build and serve the output from the dist build
gulp.task("serve:dist", ["default"], function() {
  startBrowserSync(5001, "dist");
});

// Build production files, the default task
gulp.task("default", ["clean"], function(cb) {
  // Uncomment "cache-config" after "rename-index" if you are going to use service workers.
  runSequence(
    ["copy", "app-styles"],
    ["element-styles", "roster-styles"],
    ["optimize-images", "fonts", "html", "generate-roster"],
    ["resize-profiles", "resize-images"],
    "vulcanize", "rename-index", "remove-old-build-index", // "cache-config",
    cb);
});

// Push build to gh-pages
gulp.task("deploy", function(cb) {
  runSequence("default", "deploy:dist", cb);
});

// Push the current contents of dist/ to github pages
gulp.task("deploy:dist", function() {
  return gulp.src("dist/**/*")
    .pipe($.ghPages({branch: "master"}));
});

})();
