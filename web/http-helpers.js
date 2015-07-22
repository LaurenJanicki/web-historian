var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

var extensions = {
  html: "text/html",
  css: "text/css",
  ico: "image/x-icon"
};

var getExtension = function(filename) {
  return filename.split('.').pop();
}

exports.serveAssets = function(res, asset, callback) {
  var extension = getExtension(asset);
  res.setHeader('Content-Type', extensions[extension]);
  fs.readFile(path.join(archive.paths.siteAssets, asset), function(err, data) {
    if (err) {
      res.statusCode = 404;
      res.end('File not found');
    } else {
      res.end(data);
    }
  });
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};



// As you progress, keep thinking about what helper functions you can put here!
