define([
  'jquery',
  'underscore',
  'backbone',
  'views/navbarView',

], function($, _, Backbone, NavbarView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
	

      // Default
      '': 'views/navbarView'
    }
  });

  var initialize = function(){
  	
    var navbarView = new NavbarView();
    navbarView.render();
  };
  return {
    initialize: initialize
  };
});