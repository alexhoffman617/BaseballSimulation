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
    createTeam: function(){
      var team = [];
      var player = {}
      player.Position = "LF"
      player.Rating = 50;
      team[0] = player;
      return team
    },
    render: function(){
      this.homeTeam = this.createTeam();
      this.tmpl = _.template( template, { homeTeam: this.homeTeam });
      this.$el.html(this.tmpl);
    }
  });
  // Our module now returns our view
  return PlayGameView;
});
