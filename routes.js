var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var App = require('./public/js/components/app');
var HomeIndex = require('./public/js/components/home/index');

module.exports = (
  <Route path='/' handler={App}>
    <DefaultRoute handler={HomeIndex} />
  </Route>
);
