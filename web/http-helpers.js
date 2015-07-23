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

var serveFile = function(res, filename, callback) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      callback();
    } else {
      res.end(data);
    }
  });
};

exports.serveAssets = function(res, asset, callback) {
  var extension = getExtension(asset);

  if (extension in extensions) {
    res.setHeader('Content-Type', extensions[extension]);
  }

  serveFile(res, path.join(archive.paths.siteAssets, asset), callback);
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

exports.serveArchives = function(res, asset, callback) {
  res.setHeader('Content-Type', 'text/html');
  serveFile(res, path.join(archive.paths.archivedSites, asset), callback);
};

exports.getBody = function(req, callback) {
  var body = '';

  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    callback(body);
  });
};

exports.redirect = function(res, location) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
}


// As you progress, keep thinking about what helper functions you can put here!
