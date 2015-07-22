var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

var options = {
  GET: function(res, url) {
    httpHelpers.serveAssets(res, url, function() {
      httpHelpers.serveArchives(res, url, function() {
        res.statusCode = 404;
        res.end('File not found');
      });
    });

  }
};

exports.handleRequest = function (req, res) {
  if (req.url === "/") {
    req.url = "/index.html";
  }
  options[req.method](res, req.url);
};
