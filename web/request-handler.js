var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

var options = {
  GET: function(req, res) {
    httpHelpers.serveAssets(res, req.url, function() {
      httpHelpers.serveArchives(res, req.url, function() {
        res.statusCode = 404;
        res.end('File not found');
      });
    });
  },
  POST: function(req, res) {
    httpHelpers.getBody(req, function(body) {
      var url = JSON.parse(body).url;
      archive.isUrlArchived(url, function(exists) {
        if (exists) {
          res.statusCode = 302;
          res.setHeader('Location', '/' + url);
          res.end();
        } else {
          archive.isUrlInList(url, function(exists) {
            if (! exists) {
              archive.addUrlToList(url);
            }
            res.statusCode = 302;
            res.setHeader('Location', "/loading.html");
            res.end();
          });
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  if (req.url === "/") {
    req.url = "/index.html";
  }
  options[req.method](req, res);
};
