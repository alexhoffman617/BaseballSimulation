define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/navbar.html',
], function($, _, Backbone, template){
  var PlayGameView = Backbone.View.extend({
    el: $('#pageContent'),
    tmpl: template,
    events: {
    	'click .btn': 'gfy'
    },
    initialize: function(){
    	
    },
    gfy: function(){
		$(this.$el.find('.btn')[1]).text('Go Fuck Yourself');
		$(this.$el.find('.btn')[1]).attr('class', 'btn btn-success');
    },
    render: function(){
      this.$el.html(tmpl({}));
    }
  });
  // Our module now returns our view
  return PlayGameView;
});
