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
    events: {
    	'click #home': 'homepage',
    	'click #link1': 'playGameTab',
    	'click .btn': 'gfy'
    },
    initialize: function(){
    	
    },
    gfy: function(){
		$(this.$el.find('.btn')[1]).text('Go Fuck Yourself');
		$(this.$el.find('.btn')[1]).attr('class', 'btn btn-success');
    },
    homepage: function() {
    	 var data = {};
    	  this.$el.find('#content').html(_.template( homepageTemplate, data));
    },
    playGameTab: function(){
    	 var data = {};
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
