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
    atBat: function(batter){
	// hitter
    var hitterOutFreq = 0.7
    var hitterWalkFreq = 0.03
    var hitterHRFreq = 0.02
    var hitterTripleFreq = 0.01
    var hitterDoubleFreq = 0.05
    var hitterSingleFreq = 0.19

    // league
    var leagueOutFreq = 0.683289
    var leagueWalkFreq = 0.090562
    var leagueHRFreq = 0.022758
    var leagueTripleFreq = 0.004615
    var leagueDoubleFreq = 0.044240
    var leagueSingleFreq = 0.154533

    // pitcher
    var pitcherOutFreq = 0.65
    var pitcherWalkFreq = 0.06
    var pitcherHRFreq = 0.06
    var pitcherTripleFreq = 0.01
    var pitcherDoubleFreq = 0.06
    var pitcherSingleFreq = 0.16

    // OUTCOME DETERMINATION

    // out
    var hitterOut = hitterOutFreq/(hitterOutFreq + hitterWalkFreq + hitterHRFreq + hitterTripleFreq + hitterDoubleFreq + hitterSingleFreq)
    var leagueOut = leagueOutFreq/(leagueOutFreq + leagueWalkFreq + leagueHRFreq + leagueTripleFreq + leagueDoubleFreq + leagueSingleFreq)
    var pitcherOut = pitcherOutFreq/(pitcherOutFreq + pitcherWalkFreq + pitcherHRFreq + pitcherTripleFreq + pitcherDoubleFreq + pitcherSingleFreq)

    var hitterOutOdds = hitterOut/(1-hitterOut)
    var leagueOutOdds = leagueOut/(1-leagueOut)
    var pitcherOutOdds = pitcherOut/(1-pitcherOut)

    var outOdds = hitterOutOdds * (pitcherOutOdds/leagueOutOdds)

    var outProb = outOdds/(1+outOdds)

    var outProbFinal = outProb

    // walk if not out
    var hitterWalk = hitterWalkFreq/(hitterWalkFreq + hitterHRFreq + hitterTripleFreq + hitterDoubleFreq + hitterSingleFreq)
    var leagueWalk = leagueWalkFreq/(leagueWalkFreq + leagueHRFreq + leagueTripleFreq + leagueDoubleFreq + leagueSingleFreq)
    var pitcherWalk = pitcherWalkFreq/(pitcherWalkFreq + pitcherHRFreq + pitcherTripleFreq + pitcherDoubleFreq + pitcherSingleFreq)

    var hitterWalkOdds = hitterWalk/(1-hitterWalk)
    var leagueWalkOdds = leagueWalk/(1-leagueWalk)
    var pitcherWalkOdds = pitcherWalk/(1-pitcherWalk)

    var walkOdds = hitterWalkOdds * (pitcherWalkOdds/leagueWalkOdds)

    var walkProb = walkOdds/(1+walkOdds)

    var walkProbFinal = (1-outProbFinal) * walkProb

    // homerun if not out and not walk
    var hitterHR = hitterHRFreq/(hitterHRFreq + hitterTripleFreq + hitterDoubleFreq + hitterSingleFreq)
    var leagueHR = leagueHRFreq/(leagueHRFreq + leagueTripleFreq + leagueDoubleFreq + leagueSingleFreq)
    var pitcherHR = pitcherHRFreq/(pitcherHRFreq + pitcherTripleFreq + pitcherDoubleFreq + pitcherSingleFreq)

    var hitterHROdds = hitterHR/(1-hitterHR)
    var leagueHROdds = leagueHR/(1-leagueHR)
    var pitcherHROdds = pitcherHR/(1-pitcherHR)

    var HROdds = hitterHROdds * (pitcherHROdds/leagueHROdds)

    var HRProb = HROdds/(1+HROdds)

    var HRProbFinal = (1-outProbFinal-walkProbFinal) * HRProb

    // triple if not out and if not walk and if not HR
    var hitterTriple = hitterTripleFreq/(hitterTripleFreq + hitterDoubleFreq + hitterSingleFreq)
    var leagueTriple = leagueTripleFreq/(leagueTripleFreq + leagueDoubleFreq + leagueSingleFreq)
    var pitcherTriple = pitcherTripleFreq/(pitcherTripleFreq + pitcherDoubleFreq + pitcherSingleFreq)

    var hitterTripleOdds = hitterTriple/(1-hitterTriple)
    var leagueTripleOdds = leagueTriple/(1-leagueTriple)
    var pitcherTripleOdds = pitcherTriple/(1-pitcherTriple)

    var tripleOdds = hitterTripleOdds * (pitcherTripleOdds/leagueTripleOdds)

    var tripleProb = tripleOdds/(1+tripleOdds)

    var tripleProbFinal = (1-outProbFinal-walkProbFinal-HRProbFinal) * tripleProb

    // double if not out and if not walk and if not HR and if not triple
    var hitterDouble = hitterDoubleFreq/(hitterDoubleFreq + hitterSingleFreq)
    var leagueDouble = leagueDoubleFreq/(leagueDoubleFreq + leagueSingleFreq)
    var pitcherDouble = pitcherDoubleFreq/(pitcherDoubleFreq + pitcherSingleFreq)

    var hitterDoubleOdds = hitterDouble/(1-hitterDouble)
    var leagueDoubleOdds = leagueDouble/(1-leagueDouble)
    var pitcherDoubleOdds = pitcherDouble/(1-pitcherDouble)

    var doubleOdds = hitterDoubleOdds * (pitcherDoubleOdds/leagueDoubleOdds)

    var doubleProb = doubleOdds/(1+doubleOdds)

    var doubleProbFinal = (1-outProbFinal-walkProbFinal-HRProbFinal-tripleProbFinal) * doubleProb

    // single if not out and if not walk and if not HR and if not triple and if not double
    var singleProb = 1

    var singleProbFinal = (1-outProbFinal-walkProbFinal-HRProbFinal-tripleProbFinal-doubleProbFinal) * singleProb
     
    // use probabilities to find outcome
      var roll = Math.random();
      var outcome;
      batter.gameStats.PlateAppearances ++;
      if(roll <= outProbFinal){
          outcome = "out";
          
        }
      else if(roll > outProbFinal && roll <= (outProbFinal + walkProbFinal)){                
          outcome = "walk";
          batter.gameStats.Walks ++;
        }
      else if(roll > (outProbFinal + walkProbFinal) && roll <= (outProbFinal + walkProbFinal + HRProbFinal)){
          outcome = "homerun";
          batter.gameStats.HomeRuns ++;
        }
      else if(roll > (outProbFinal + walkProbFinal + HRProbFinal) && roll <= (outProbFinal + walkProbFinal + HRProbFinal + tripleProbFinal)){
          outcome = "triple";
          batter.gameStats.Triples ++;
        }
      else if(roll > (outProbFinal + walkProbFinal + HRProbFinal + tripleProbFinal) && roll <= (outProbFinal + walkProbFinal + HRProbFinal + tripleProbFinal + doubleProbFinal)){
          outcome = "double";
          batter.gameStats.Doubles ++;
        }
      else{
          outcome = "single";
          batter.gameStats.Singles ++;
        }

      console.log(outcome);
      return outcome;
    },
    halfInning: function(team, side){
        var outs = 0;
        var firstBase = 0;
        var secondBase = 0;
        var thirdBase = 0;
        console.log (side + " " + this.currentInning + "\n");

        while (outs < 3){
            // Get Batter
            var batterNumber = team.AtBat % 9;
            console.log(team.Lineup[batterNumber].Name + " is up to bat");

            // determine outcome of PA
            var outcome = this.atBat(team.Lineup[batterNumber]);
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
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 1;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    team.Runs = team.Runs + 2;
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
                      }
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    team.Runs = team.Runs + 1;
                  }
                else if(outcome == "triple"){
                    secondBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 1;
                  }
                else if(outcome == "homerun"){
                    secondBase = 0;
                    team.Runs = team.Runs + 2;
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
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    thirdBase = 0;
                    team.Runs = team.Runs + 1;
                  }
                else if(outcome == "triple"){
                    thirdBase = 1;
                    team.Runs = team.Runs + 1;
                  }
                else if(outcome == "homerun"){
                    thirdBase = 0;
                    team.Runs = team.Runs + 2;
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
                      }
                    else{
                        team.Runs = team.Runs + 2;
                    }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 2;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    secondBase = 0;
                    team.Runs = team.Runs + 3;
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
                  }
                else if(outcome == "double"){
                    firstBase = 0;
                    secondBase = 1;
                    var bsr = Math.random();
                    if (bsr <= 0.38){
                        thirdBase = 1;
                        team.Runs = team.Runs + 1;
                      }
                    else{
                        thirdBase = 0;
                        team.Runs = team.Runs + 2;
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 2;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    thirdBase = 0;
                    team.Runs = team.Runs + 3;
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
                      }
                    else{
                        thirdBase = 0;
                        team.Runs = team.Runs + 2;
                      }
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    thirdBase = 0;
                    team.Runs = team.Runs + 2;
                  }
                else if(outcome == "triple"){
                    secondBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 2;
                  }
                else if(outcome == "homerun"){
                    secondBase = 0;
                    thirdBase = 0;
                    team.Runs = team.Runs + 3;
                  }
              }

            // bases loaded
            else if(firstBase == 1 && secondBase == 1 && thirdBase == 1){
                if (outcome == "walk"){
                    team.Runs = team.Runs + 1;
                  }
                else if(outcome == "single"){
                    var bsr = Math.random();
                    if (bsr <= 0.42){
                        team.Runs = team.Runs + 1
                      }
                    else{
                        team.Runs = team.Runs + 2
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
                      }
                    else{
                        thirdBase = 0;
                        team.Runs = team.Runs + 3;
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 1;
                    team.Runs = team.Runs + 3;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 0;
                    print("Grand Slam HR!");
                    team.Runs = team.Runs + 4;
                  }
              }
            }
    },
    playInning: function(){
        this.halfInning(this.awayTeam, "Top");
        this.halfInning(this.homeTeam, "Bottom");
    },
    playGame: function(){
    var innings = 9;
    this.homeTeam.AtBat = 0;
    this.homeTeam.Runs = 0;
    this.awayTeam.AtBat = 0;
    this.awayTeam.Runs = 0;

    for(this.currentInning = 1; this.currentInning - 1 < innings; this.currentInning++){
        this.playInning();
        console.log("\n" + "After " + this.currentInning + " the score is: Home " + this.homeTeam.Runs + "," + " Away " + this.awayTeam.Runs + "\n")
      }

      this.tmpl = _.template( template, { homeTeam: this.homeTeam, awayTeam: this.awayTeam });
      this.$el.html(this.tmpl);

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
