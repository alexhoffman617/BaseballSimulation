define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/navbar.html',
  'text!../../templates/homePage.html',
  'text!../../views/playGameView.js'
], function($, _, Backbone, navbarTemplate, homepageTemplate, playGameView){
  var ProjectListView = Backbone.View.extend({
    el: $('#pageContent'),
    PlayGameView: playGameView,
    events: {
    	'click #home': 'homepage',
    	'click #playGame': 'playGameTab',
    	'click .btn': 'gfy'
    },
    initialize: function(){
    	var x =1;
    },
    homepage: function() {
    	 var data = {};
    	  this.$el.find('#content').html(_.template( homepageTemplate, data));
    },
    playGameTab: function(){
    	 var playGameView = new PlayGameView();
       this.$el.find('#content').html(playGameView.render());
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
