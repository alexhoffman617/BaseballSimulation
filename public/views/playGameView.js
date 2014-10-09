define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/playGame.html',
  '../../generators/teamGenerator.js',
], function($, _, Backbone, template, TeamGenerator){
  var PlayGameView = Backbone.View.extend({
    el: $('#pageContent'),
    events: {
    	'click #playGameButton': 'playGame'
    },
    initialize: function(){
    	
    },
    playGame: function(){
    var innings = 9;
    var homeHits = 0;
    var homeRuns = 0;
    var awayHits = 0;
    var awayRuns = 0;

    for(var currentInnings = 1; currentInnings - 1 < innings; currentInnings++){
        outs = 0;
        firstBase = 0;
        secondBase = 0;
        thirdBase = 0;
        console.log ("Top " + currentInnings + "\n");

        while (a_outs < 3){
            // determine outcome of PA
            var roll = Math.random();
            var outcome;
            if(roll <= 0.683289){
                outcome = "out";
                outs = awayOuts + 1;
              }
            else if(roll > 0.683289 && roll <= 0.837822409){                
                outcome = "single";
              }
            else if(roll > 0.837822409 && roll <= 0.92838502){
                outcome = "walk";
              }
            else if(roll > 0.92838502 && roll <= 0.972625158){
                outcome = "double";
              }
            else if(roll > 0.972625158 && roll <= 0.977241094){
                outcome = "triple";
              }
            else{
                outcome = "homerun";
              }

            console.log(outcome);

            // bases empty
            if (firstBase == 0 && secondBase == 0 && thirdBase == 0){
                if (outcome == "single" || outcome == "walk"){
                    firstBase = 1;
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                  }
                else if(outcome == "triple"){
                    thirdBase = 1;
                  }
                else if(outcome == "homerun"){
                    awayRuns = awayRuns + 1;
                  }
              }

            // runner on first
            else if(firstBase == 1 && secondBase == 0 && thirdBase == 0){
                if (outcome == "walk"){
                    secondBase = 1;
                  }
                else if(outcome == "single"){
                    var bsr = Math.random()
                    if (bsr <= 0.72){
                        secondBase = 1;
                      }
                    else{
                        thirdBase = 1;
                      }
                  }
                else if(outcome == "double"){
                    firstBase = 0;
                    secondBase = 1;
                    var bsr = Math.random();
                    if (bsr <= 0.38){
                        thirdBase = 1;
                      }
                    else{
                        awayRuns = awayRuns + 1;
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    thirdBase = 1;
                    awayRuns = awayRuns + 1;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    awayRuns = awayRuns + 2;
                  }
                }

            // runner on second
            else if(firstBase == 0 && secondBase == 1 && thirdBase == 0){
                if (outcome == "walk"){
                    firstBase = 1;
                  }
                else if(outcome == "single"){
                    firstBase = 1;
                    secondBase = 0;
                    bsr = Math.random();

                    if (bsr <= 0.42){
                        thirdBase = 1;
                      }
                    else{
                        awayRuns = awayRuns + 1;
                      }
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    awayRuns = awayRuns + 1;
                  }
                else if(outcome == "triple"){
                    secondBase = 0;
                    thirdBase = 1;
                    awayRuns = awayRuns + 1;
                  }
                else if(outcome == "homerun"){
                    secondBase = 0;
                    awayRuns = awayRuns + 2;
                  }
              }

             // runner on third
            else if(firstBase == 0 && secondBase == 0 && thirdBase == 1){
                if (outcome == "walk"){
                    firstBase = 1;
                  }
                else if(outcome == "single"){
                    firstBase = 1;
                    thirdBase = 0;
                    awayRuns = awayRuns + 1;
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    thirdBase = 0;
                    awayRuns = awayRuns + 1;
                  }
                else if(outcome == "triple"){
                    thirdBase = 1;
                    awayRuns = awayRuns + 1;
                  }
                else if(outcome == "homerun"){
                    thirdBase = 0;
                    awayRuns = awayRuns + 2;
                  }
              }

            // runners on first && second
            else if(firstBase == 1 && secondBase == 1 && thirdBase == 0){
                if (outcome == "walk"){
                    thirdBase = 1;
                  }
                else if(outcome == "single"){
                    var bsr = Math.random();
                    if (bsr <= 0.42){
                        thirdBase = 1;
                      }
                    else{
                        awayRuns = awayRuns + 1;
                      }
                    var bsr2 = Math.random();
                    if (bsr > 0.42 && bsr2 > 0.72){
                        secondBase = 0;
                        thirdBase = 1;
                      }
                  }
                else if(outcome == "double"){
                    firstBase = 0;
                    var bsr = Math.random();
                    if (bsr <= 0.38){
                        thirdBase = 1;
                        awayRuns = awayRuns + 1;
                      }
                    else{
                        awayRuns = awayRuns + 2;
                    }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 1;
                    awayRuns = awayRuns + 2;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    secondBase = 0;
                    awayRuns = awayRuns + 3;
                  }
              }

            // runners on first && third
            else if(firstBase == 1 && secondBase == 0 && thirdBase == 1){
                if (outcome == "walk"){
                    secondBase = 1;
                  }
                else if(outcome == "single"){
                    var bsr = Math.random();
                    if (bsr <= 0.72){
                        secondBase = 1;
                        thirdBase = 0;
                      }
                    else{
                        thirdBase = 1;
                      }
                    awayRuns = awayRuns + 1;
                  }
                else if(outcome == "double"){
                    firstBase = 0;
                    secondBase = 1;
                    var bsr = Math.random();
                    if (bsr <= 0.38){
                        thirdBase = 1;
                        awayRuns = awayRuns + 1;
                      }
                    else{
                        thirdBase = 0;
                        awayRuns = awayRuns + 2;
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    thirdBase = 1;
                    awayRuns = awayRuns + 2;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    thirdBase = 0;
                    awayRuns = awayRuns + 3;
                  }
              }

            // runners on second && third
            else if(firstBase == 0 && secondBase == 1 && thirdBase == 1){
                if (outcome == "walk"){
                    firstBase = 1;
                  }
                else if(outcome == "single"){
                    firstBase = 1;
                    secondBase = 0;
                    var bsr = Math.random();
                    if (bsr <= 0.42){
                        thirdBase = 1;
                        awayRuns = awayRuns + 1;
                      }
                    else{
                        thirdBase = 0;
                        awayRuns = awayRuns + 2;
                      }
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    thirdBase = 0;
                    awayRuns = awayRuns + 2;
                  }
                else if(outcome == "triple"){
                    secondBase = 0;
                    thirdBase = 1;
                    awayRuns = awayRuns + 2;
                  }
                else if(outcome == "homerun"){
                    secondBase = 0;
                    thirdBase = 0;
                    awayRuns = awayRuns + 3;
                  }
              }

            // bases loaded
            else if(firstBase == 1 && secondBase == 1 && thirdBase == 1){
                if (outcome == "walk"){
                    awayRuns = awayRuns + 1;
                  }
                else if(outcome == "single"){
                    var bsr = Math.random();
                    if (bsr <= 0.42){
                        awayRuns = awayRuns + 1
                      }
                    else{
                        awayRuns = awayRuns + 2
                      }
                    var bsr_2 = Math.random();
                    if (bsr > 0.42 && bsr_2 > 0.72){
                        secondBase = 0;
                      }
                    else{
                        thirdBase = 0;
                      }
                  }
                else if(outcome == "double"){
                    firstBase = 0;
                    secondBase = 1;
                    var bsr = Math.random();
                    if (bsr <= 0.38){
                        thirdBase = 1;
                        awayRuns = awayRuns + 2;
                      }
                    else{
                        thirdBase = 0;
                        awayRuns = awayRuns + 3;
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 1;
                    awayRuns = awayRuns + 3;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 0;
                    print("Grand Slam HR for the away team!");
                    awayRuns = awayRuns + 4;
                  }
              }
            }

        console.log("\n" + "After top " + currentInning + " the score is Home " + 0+ "," + " Away " + awayRuns + "\n")
          }

		this.$el.find('#playGameButton').text('Game Played')
    this.$el.find('#playGameButton').attr('class', 'btn btn-success');
    },
    atBat: function(){

    },
    halfInning: function(){

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
      var homeTeamGenerator = new TeamGenerator();
      var awayTeamGenerator = new TeamGenerator();
      this.homeTeam = homeTeamGenerator.createTeam(9);
      this.awayTeam = awayTeamGenerator.createTeam(9);
      this.tmpl = _.template( template, { homeTeam: this.homeTeam, awayTeam: this.awayTeam });
      this.$el.html(this.tmpl);
    }
  });
  // Our module now returns our view
  return PlayGameView;
});
