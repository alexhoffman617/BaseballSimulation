define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/playGame.html',
], function($, _, Backbone, template){
  var PlayGameView = Backbone.View.extend({
    el: $('#pageContent'),
    events: {
    	'click #playGameButton': 'playGame'
    },
    initialize: function(){
    	
    },
    playGame: function(){
		this.$el.find('#playGameButton').text('Game Played')
    this.$el.find('#playGameButton').attr('class', 'btn btn-success');
    },
    render: function(){
      this.tmpl = _.template( template, {} );
      this.$el.html(this.tmpl);
    }
  });
  // Our module now returns our view
  return PlayGameView;
});
