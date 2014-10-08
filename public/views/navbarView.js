define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/navbar.html',
  'text!../../templates/homePage.html',
  '../../views/playGameView.js'
], function($, _, Backbone, navbarTemplate, homepageTemplate, PlayGameView){
  var ProjectListView = Backbone.View.extend({
    el: $('#pageContent'),
    events: {
    	'click #home': 'homepage',
    	'click #playGameTab': 'playGameTab',
    },
    initialize: function(){
    	
    },
    homepage: function() {
    	 var data = {};
    	  this.$el.find('#content').html(_.template( homepageTemplate, data));
    },
    playGameTab: function(){
    	 var data = {};
       var playGameView = new PlayGameView({ el: $("#content") });
       playGameView.render();
    },
    render: function(){
      // Using Underscore we can compile our template with data
      var data = {};
      var compiledTemplate = _.template( navbarTemplate, data );
      // Append our compiled template to this Views "el"
      this.$el.html( compiledTemplate );
      
      this.homepage();
    }
  });
  // Our module now returns our view
  return ProjectListView;
});
