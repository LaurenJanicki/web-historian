var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

var options = {
  GET: httpHelpers.serveAssets
};

exports.handleRequest = function (req, res) {
  if (req.url === "/") {
    req.url = "/index.html";
  }
  options[req.method](res, req.url);
};
