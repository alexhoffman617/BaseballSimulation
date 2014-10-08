define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/playGame.html',
  '../../generators/teamGenerator.js',
], function($, _, Backbone, template, teamGenerator){
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
      var homeTeamGenerator = new teamGenerator();
      var awayTeamGenerator = new teamGenerator();
      this.homeTeam = homeTeamGenerator.createTeam(9);
      this.awayTeam = awayTeamGenerator.createTeam(9);
      this.tmpl = _.template( template, { homeTeam: this.homeTeam, awayTeam: this.awayTeam });
      this.$el.html(this.tmpl);
    }
  });
  // Our module now returns our view
  return PlayGameView;
});
