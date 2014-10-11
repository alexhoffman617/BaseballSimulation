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
    // league frequencies
	this.leagueStrikeOutFreq = 0.203563
    this.leagueOutFreq = 0.479726
    this.leagueWalkFreq = 0.090562
    this.leagueHRFreq = 0.022758
    this.leagueTripleFreq = 0.004615
    this.leagueDoubleFreq = 0.044240
    this.leagueSingleFreq = 0.154533
    },    
    atBat: function(batter, pitcher){
	// hitter
	var hitterStrikeOutFreq = batter.Ratings.hitterStrikeOutFreq;
    var hitterOutFreq = batter.Ratings.hitterOutFreq;
    var hitterWalkFreq = batter.Ratings.hitterWalkFreq;
    var hitterHRFreq = batter.Ratings.hitterHRFreq;
    var hitterTripleFreq = batter.Ratings.hitterTripleFreq;
    var hitterDoubleFreq = batter.Ratings.hitterDoubleFreq;
    var hitterSingleFreq = batter.Ratings.hitterSingleFreq;

    // pitcher
	var pitcherStrikeOutFreq = pitcher.Ratings.pitcherStrikeOutFreq;
    var pitcherOutFreq = pitcher.Ratings.pitcherOutFreq;
    var pitcherWalkFreq = pitcher.Ratings.pitcherWalkFreq;
    var pitcherHRFreq = pitcher.Ratings.pitcherHRFreq;
    var pitcherTripleFreq = pitcher.Ratings.pitcherTripleFreq;
    var pitcherDoubleFreq = pitcher.Ratings.pitcherDoubleFreq;
    var pitcherSingleFreq = pitcher.Ratings.pitcherSingleFreq;

    // OUTCOME DETERMINATION
	
	//strikeout
	var hitterStrikeOut = hitterStrikeOutFreq/(hitterStrikeOutFreq + hitterOutFreq + hitterWalkFreq + hitterHRFreq + hitterTripleFreq + hitterDoubleFreq + hitterSingleFreq);
    var leagueStrikeOut = this.leagueStrikeOutFreq/(this.leagueStrikeOutFreq + this.leagueOutFreq + this.leagueWalkFreq + this.leagueHRFreq + this.leagueTripleFreq + this.leagueDoubleFreq + this.leagueSingleFreq);
    var pitcherStrikeOut = pitcherStrikeOutFreq/(pitcherStrikeOutFreq + pitcherOutFreq + pitcherWalkFreq + pitcherHRFreq + pitcherTripleFreq + pitcherDoubleFreq + pitcherSingleFreq);

    var hitterStrikeOutOdds = hitterStrikeOut/(1-hitterStrikeOut);
    var leagueStrikeOutOdds = leagueStrikeOut/(1-leagueStrikeOut);
    var pitcherStrikeOutOdds = pitcherStrikeOut/(1-pitcherStrikeOut);

    var strikeOutOdds = hitterStrikeOutOdds * (pitcherStrikeOutOdds/leagueStrikeOutOdds);

    var strikeOutProb = strikeOutOdds/(1+strikeOutOdds);

    var strikeOutProbFinal = strikeOutProb;

    // out
    var hitterOut = hitterOutFreq/(hitterOutFreq + hitterWalkFreq + hitterHRFreq + hitterTripleFreq + hitterDoubleFreq + hitterSingleFreq);
    var leagueOut = this.leagueOutFreq/(this.leagueOutFreq + this.leagueWalkFreq + this.leagueHRFreq + this.leagueTripleFreq + this.leagueDoubleFreq + this.leagueSingleFreq);
    var pitcherOut = pitcherOutFreq/(pitcherOutFreq + pitcherWalkFreq + pitcherHRFreq + pitcherTripleFreq + pitcherDoubleFreq + pitcherSingleFreq);

    var hitterOutOdds = hitterOut/(1-hitterOut);
    var leagueOutOdds = leagueOut/(1-leagueOut);
    var pitcherOutOdds = pitcherOut/(1-pitcherOut);

    var outOdds = hitterOutOdds * (pitcherOutOdds/leagueOutOdds);

    var outProb = outOdds/(1+outOdds);

    var outProbFinal = (1-strikeOutProbFinal) * outProb;

    // walk if not out
    var hitterWalk = hitterWalkFreq/(hitterWalkFreq + hitterHRFreq + hitterTripleFreq + hitterDoubleFreq + hitterSingleFreq);
    var leagueWalk = this.leagueWalkFreq/(this.leagueWalkFreq + this.leagueHRFreq + this.leagueTripleFreq + this.leagueDoubleFreq + this.leagueSingleFreq);
    var pitcherWalk = pitcherWalkFreq/(pitcherWalkFreq + pitcherHRFreq + pitcherTripleFreq + pitcherDoubleFreq + pitcherSingleFreq);

    var hitterWalkOdds = hitterWalk/(1-hitterWalk);
    var leagueWalkOdds = leagueWalk/(1-leagueWalk);
    var pitcherWalkOdds = pitcherWalk/(1-pitcherWalk);

    var walkOdds = hitterWalkOdds * (pitcherWalkOdds/leagueWalkOdds);

    var walkProb = walkOdds/(1+walkOdds);

    var walkProbFinal = (1-strikeOutProbFinal-outProbFinal) * walkProb;

    // homerun if not out and not walk
    var hitterHR = hitterHRFreq/(hitterHRFreq + hitterTripleFreq + hitterDoubleFreq + hitterSingleFreq);
    var leagueHR = this.leagueHRFreq/(this.leagueHRFreq + this.leagueTripleFreq + this.leagueDoubleFreq + this.leagueSingleFreq);
    var pitcherHR = pitcherHRFreq/(pitcherHRFreq + pitcherTripleFreq + pitcherDoubleFreq + pitcherSingleFreq);

    var hitterHROdds = hitterHR/(1-hitterHR);
    var leagueHROdds = leagueHR/(1-leagueHR);
    var pitcherHROdds = pitcherHR/(1-pitcherHR);

    var HROdds = hitterHROdds * (pitcherHROdds/leagueHROdds);

    var HRProb = HROdds/(1+HROdds);

    var HRProbFinal = (1-strikeOutProbFinal-outProbFinal-walkProbFinal) * HRProb;

    // triple if not out and if not walk and if not HR
    var hitterTriple = hitterTripleFreq/(hitterTripleFreq + hitterDoubleFreq + hitterSingleFreq);
    var leagueTriple = this.leagueTripleFreq/(this.leagueTripleFreq + this.leagueDoubleFreq + this.leagueSingleFreq);
    var pitcherTriple = pitcherTripleFreq/(pitcherTripleFreq + pitcherDoubleFreq + pitcherSingleFreq);

    var hitterTripleOdds = hitterTriple/(1-hitterTriple);
    var leagueTripleOdds = leagueTriple/(1-leagueTriple);
    var pitcherTripleOdds = pitcherTriple/(1-pitcherTriple);

    var tripleOdds = hitterTripleOdds * (pitcherTripleOdds/leagueTripleOdds);

    var tripleProb = tripleOdds/(1+tripleOdds);

    var tripleProbFinal = (1-strikeOutProbFinal-outProbFinal-walkProbFinal-HRProbFinal) * tripleProb;

    // double if not out and if not walk and if not HR and if not triple
    var hitterDouble = hitterDoubleFreq/(hitterDoubleFreq + hitterSingleFreq);
    var leagueDouble = this.leagueDoubleFreq/(this.leagueDoubleFreq + this.leagueSingleFreq);
    var pitcherDouble = pitcherDoubleFreq/(pitcherDoubleFreq + pitcherSingleFreq);

    var hitterDoubleOdds = hitterDouble/(1-hitterDouble);
    var leagueDoubleOdds = leagueDouble/(1-leagueDouble);
    var pitcherDoubleOdds = pitcherDouble/(1-pitcherDouble);

    var doubleOdds = hitterDoubleOdds * (pitcherDoubleOdds/leagueDoubleOdds);

    var doubleProb = doubleOdds/(1+doubleOdds);

    var doubleProbFinal = (1-strikeOutProbFinal-outProbFinal-walkProbFinal-HRProbFinal-tripleProbFinal) * doubleProb;

    // single if not out and if not walk and if not HR and if not triple and if not double
    var singleProb = 1;

    var singleProbFinal = (1-strikeOutProbFinal-outProbFinal-walkProbFinal-HRProbFinal-tripleProbFinal-doubleProbFinal) * singleProb;
     
    // use probabilities to find outcome
      var roll = Math.random();
      var outcome;
      batter.gameStats.PlateAppearances ++;
      if(roll <= strikeOutProbFinal){
          outcome = "strikeout";
          batter.gameStats.StrikeOuts ++;
		  pitcher.gameStats.StrikeOuts ++;
        }
      else if(roll > strikeOutProbFinal && roll <= (strikeOutProbFinal + outProbFinal)){                
          outcome = "out";
        }
      else if(roll > (strikeOutProbFinal + outProbFinal) && roll <= (strikeOutProbFinal + outProbFinal + walkProbFinal)){
          outcome = "walk";
          batter.gameStats.Walks ++;
		  pitcher.gameStats.Walks ++;
        }
      else if(roll > (strikeOutProbFinal + outProbFinal + walkProbFinal) && roll <= (strikeOutProbFinal + outProbFinal + walkProbFinal + HRProbFinal)){
          outcome = "homerun";
          batter.gameStats.HomeRuns ++;
		  pitcher.gameStats.Hits ++;
        }
      else if(roll > (strikeOutProbFinal + outProbFinal + walkProbFinal + HRProbFinal) && roll <= (strikeOutProbFinal + outProbFinal + walkProbFinal + HRProbFinal + tripleProbFinal)){
          outcome = "triple";
          batter.gameStats.Triples ++;
		  pitcher.gameStats.Hits ++;
        }
	  else if(roll > (strikeOutProbFinal + outProbFinal + walkProbFinal + HRProbFinal + tripleProbFinal) && roll <= (strikeOutProbFinal + outProbFinal + walkProbFinal + HRProbFinal + tripleProbFinal + doubleProbFinal)){
          outcome = "double";
          batter.gameStats.Doubles ++;
		  pitcher.gameStats.Hits ++;
        }
      else{
          outcome = "single";
          batter.gameStats.Singles ++;
		  pitcher.gameStats.Hits ++;
        }

      this.gameLog += ("<div>" + outcome + "</div>");
      return outcome;
    },
    halfInning: function(battingTeam, pitchingTeam, side){
        var outs = 0;
        var firstBase = 0;
        var secondBase = 0;
        var thirdBase = 0;
        this.gameLog += ("<div class='" + side + "'>" + side + " " + this.currentInning + "</div>");

        while (outs < 3){
            // Get Batter
            var batter = battingTeam.Lineup[battingTeam.AtBat % 9];
			var pitcher = pitchingTeam.pitcher;
            this.gameLog += ("<div>" + batter.Name + " is up to bat" + "</div>");


            // determine outcome of PA
            var outcome = this.atBat(batter, pitcher);
            battingTeam.AtBat ++;

            if(outcome == "strikeout" || outcome == "out"){
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
                    battingTeam.Runs =  battingTeam.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
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
                        battingTeam.Runs = battingTeam.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    thirdBase = 1;
                    battingTeam.Runs = battingTeam.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    battingTeam.Runs = battingTeam.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
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
                        battingTeam.Runs = battingTeam.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                      }
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    battingTeam.Runs = battingTeam.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                  }
                else if(outcome == "triple"){
                    secondBase = 0;
                    thirdBase = 1;
                    battingTeam.Runs = battingTeam.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                  }
                else if(outcome == "homerun"){
                    secondBase = 0;
                    battingTeam.Runs = battingTeam.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
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
                    battingTeam.Runs = battingTeam.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    thirdBase = 0;
                    battingTeam.Runs = battingTeam.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                  }
                else if(outcome == "triple"){
                    thirdBase = 1;
                    battingTeam.Runs = battingTeam.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                  }
                else if(outcome == "homerun"){
                    thirdBase = 0;
                    battingTeam.Runs = battingTeam.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
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
                        battingTeam.Runs = battingTeam.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
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
                        battingTeam.Runs = battingTeam.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                      }
                    else{
                        battingTeam.Runs = battingTeam.Runs + 2;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
                    }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 1;
                    battingTeam.Runs = battingTeam.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    secondBase = 0;
                    battingTeam.Runs = battingTeam.Runs + 3;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 3;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 3;
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
                    battingTeam.Runs = battingTeam.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                  }
                else if(outcome == "double"){
                    firstBase = 0;
                    secondBase = 1;
                    var bsr = Math.random();
                    if (bsr <= 0.38){
                        thirdBase = 1;
                        battingTeam.Runs = battingTeam.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                      }
                    else{
                        thirdBase = 0;
                        battingTeam.Runs = battingTeam.Runs + 2;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    thirdBase = 1;
                    battingTeam.Runs = battingTeam.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    thirdBase = 0;
                    battingTeam.Runs = battingTeam.Runs + 3;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 3;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 3;
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
                        battingTeam.Runs = battingTeam.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                      }
                    else{
                        thirdBase = 0;
                        battingTeam.Runs = battingTeam.Runs + 2;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
                      }
                  }
                else if(outcome == "double"){
                    secondBase = 1;
                    thirdBase = 0;
                    battingTeam.Runs = battingTeam.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
                  }
                else if(outcome == "triple"){
                    secondBase = 0;
                    thirdBase = 1;
                    battingTeam.Runs = battingTeam.Runs + 2;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
                  }
                else if(outcome == "homerun"){
                    secondBase = 0;
                    thirdBase = 0;
                    battingTeam.Runs = battingTeam.Runs + 3;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 3;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 3;
                  }
              }

            // bases loaded
            else if(firstBase == 1 && secondBase == 1 && thirdBase == 1){
                if (outcome == "walk"){
                    battingTeam.Runs = battingTeam.Runs + 1;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                  }
                else if(outcome == "single"){
                    var bsr = Math.random();
                    if (bsr <= 0.42){
                        battingTeam.Runs = battingTeam.Runs + 1;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 1;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 1;
                      }
                    else{
                        battingTeam.Runs = battingTeam.Runs + 2;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
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
                        battingTeam.Runs = battingTeam.Runs + 2;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 2;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 2;
                      }
                    else{
                        thirdBase = 0;
                        battingTeam.Runs = battingTeam.Runs + 3;
                        batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 3;
						pitcher.gameStats.Runs = pitcher.gameStats.Runs + 3;
                      }
                  }
                else if(outcome == "triple"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 1;
                    battingTeam.Runs = battingTeam.Runs + 3;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 3;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 3;
                  }
                else if(outcome == "homerun"){
                    firstBase = 0;
                    secondBase = 0;
                    thirdBase = 0;
                    print("Grand Slam HR!");
                    battingTeam.Runs = battingTeam.Runs + 4;
                    batter.gameStats.RunsBattedIn = batter.gameStats.RunsBattedIn + 4;
					pitcher.gameStats.Runs = pitcher.gameStats.Runs + 4;
                  }
              }
            }
			pitcher.gameStats.InningsPitched = pitcher.gameStats.InningsPitched + 1
    },
    playInning: function(){
        this.halfInning(this.awayTeam, this.homeTeam, "Top");
        this.halfInning(this.homeTeam, this.awayTeam, "Bottom");
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
      this.homeTeam = homeTeamGenerator.createTeam("Braves");
      this.awayTeam = awayTeamGenerator.createTeam("Yankees");
      this.tmpl = _.template( template, { homeTeam: this.homeTeam, awayTeam: this.awayTeam });
      this.$el.html(this.tmpl);
    }
  });
  // Our module now returns our view
  return PlayGameView;
});
