/*
 * GET home page.
 */
var express = require('express');
var app = express();
app.set('view engine', 'html');
exports.index = function(Todo) {
  return function(req, res) {
	res.sendfile('views\\dashboard.html');
  };
};
exports.newIndex = function(Todo) {
  return function(req, res) {
	res.sendfile('views\\dashboard.html');
  };
};