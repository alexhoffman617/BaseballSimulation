define([
  'jquery',
  'underscore',
  'backbone',
  'text!../../templates/playGame.html',
  'text!../../templates/gameLog.html',
  '../../generators/teamGenerator.js',
], function($, _, Backbone, template, gameLogTemplate, TeamGenerator){
  var PlayGameView = Backbone.View.extend({
    el: $('#pageContent'),
    events: {
    	'click #playGameButton': 'playGame'
    },
    initialize: function(){
    	
    },    
    atBat: function(batter){
      var roll = Math.random();
      var outcome;
      batter.gameStats.PlateAppearances ++;
      if(roll <= 0.683289){
          outcome = "out";
          
        }
      else if(roll > 0.683289 && roll <= 0.837822409){                
          outcome = "single";
          batter.gameStats.Singles ++;
        }
      else if(roll > 0.837822409 && roll <= 0.92838502){
          outcome = "walk";
          batter.gameStats.Walks ++;
        }
      else if(roll > 0.92838502 && roll <= 0.972625158){
          outcome = "double";
          batter.gameStats.Doubles ++;
        }
      else if(roll > 0.972625158 && roll <= 0.977241094){
          outcome = "triple";
          batter.gameStats.Triples ++;
        }
      else{
          outcome = "homerun";
          batter.gameStats.HomeRuns ++;
        }

      this.gameLog += ("<div>" + outcome + "</div>");
      return outcome;
    },
    halfInning: function(team, side){
        var outs = 0;
        var firstBase = 0;
        var secondBase = 0;
        var thirdBase = 0;
        this.gameLog += ("<div>" + side + " " + this.currentInning + "</div>");

        while (outs < 3){
            // Get Batter
            var batter = team.Lineup[team.AtBat % 9];
            this.gameLog += ("<div>" + batter.Name + " is up to bat" + "</div>");


            // determine outcome of PA
            var outcome = this.atBat(batter);
            team.AtBat ++;

            if(outcome == "out"){
            outs = outs + 1;
            }

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
                    team.Runs =  team.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
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
                        team.Runs = team.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    team.Runs = team.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
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
                    var bsr = Math.random();

                    if (bsr <= 0.42){
                        thirdBase = 1;
                      }
                    else{
                        team.Runs = team.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                      }
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    team.Runs = team.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                  }
                else if(outcome == "triple"){
                    secondBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                  }
                else if(outcome == "homerun"){
                    secondBase = 0;
                    team.Runs = team.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
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
                    team.Runs = team.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    thirdBase = 0;
                    team.Runs = team.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                  }
                else if(outcome == "triple"){
                    thirdBase = 1;
                    team.Runs = team.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                  }
                else if(outcome == "homerun"){
                    thirdBase = 0;
                    team.Runs = team.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
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
                        team.Runs = team.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
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
                        team.Runs = team.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                      }
                    else{
                        team.Runs = team.Runs + 2;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
                    }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    secondBase = 0;
                    team.Runs = team.Runs + 3;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 3;
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
                    team.Runs = team.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                  }
                else if(outcome == "double"){
                    firstBase = 0;
                    secondBase = 1;
                    var bsr = Math.random();
                    if (bsr <= 0.38){
                        thirdBase = 1;
                        team.Runs = team.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                      }
                    else{
                        thirdBase = 0;
                        team.Runs = team.Runs + 2;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    thirdBase = 0;
                    team.Runs = team.Runs + 3;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 3;
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
                        team.Runs = team.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                      }
                    else{
                        thirdBase = 0;
                        team.Runs = team.Runs + 2;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
                      }
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    thirdBase = 0;
                    team.Runs = team.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
                  }
                else if(outcome == "triple"){
                    secondBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
                  }
                else if(outcome == "homerun"){
                    secondBase = 0;
                    thirdBase = 0;
                    team.Runs = team.Runs + 3;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 3;
                  }
              }

            // bases loaded
            else if(firstBase == 1 && secondBase == 1 && thirdBase == 1){
                if (outcome == "walk"){
                    team.Runs = team.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                  }
                else if(outcome == "single"){
                    var bsr = Math.random();
                    if (bsr <= 0.42){
                        team.Runs = team.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
                      }
                    else{
                        team.Runs = team.Runs + 2;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
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
                        team.Runs = team.Runs + 2;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
                      }
                    else{
                        thirdBase = 0;
                        team.Runs = team.Runs + 3;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 3;
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 3;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 3;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 0;
                    print("Grand Slam HR!");
                    team.Runs = team.Runs + 4;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 4;
                  }
              }
            }
    },
    playInning: function(){
        this.halfInning(this.awayTeam, "Top");
        this.halfInning(this.homeTeam, "Bottom");
    },
    playGame: function(){
    this.gameLog = ""

    var innings = 9;
    this.homeTeam.AtBat = 0;
    this.homeTeam.Runs = 0;
    this.awayTeam.AtBat = 0;
    this.awayTeam.Runs = 0;

    for(this.currentInning = 1; this.currentInning - 1 < innings; this.currentInning++){
        this.playInning();
        this.gameLog += ("<div>" + "After " + this.currentInning + " the score is: Home " + this.homeTeam.Runs + "," + " Away " + this.awayTeam.Runs + "</div>");
      }

      this.tmpl = _.template( template, { homeTeam: this.homeTeam, awayTeam: this.awayTeam });
      this.$el.html(this.tmpl);
      this.$el.find("#gameLog").append(this.gameLog);

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
