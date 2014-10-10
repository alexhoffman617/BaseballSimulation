define([
  'jquery',
  'underscore',
  'backbone',
    '../../generators/nameGenerator.js',
], function($, _, Backbone, NameGenerator){
  var TeamGenerator = Backbone.View.extend({
    events: {
    },
    initialize: function(){

      this.largeBatterArray =[];
      this.largeBatterArray1 =[
          [1,"Jason Heyward","RF",0.653312789,0.107858243,0.016949153,0.004622496,0.040061633,0.177195686],
          [2,"Tommy La Stella","2B",0.672222222,0.105555556,0.002777778,0.002777778,0.044444444,0.172222222],
          [3,"Freddie Freeman","1B",0.620056497,0.132768362,0.025423729,0.005649718,0.060734463,0.155367232],
          [4,"Justin Upton","LF",0.666146646,0.095163807,0.04524181,0.003120125,0.053042122,0.137285491],
          [5,"Evan Gattis","C",0.695760599,0.06234414,0.054862843,0.002493766,0.042394015,0.142144638],
          [6,"Chris Johnson","3B",0.708674304,0.04091653,0.016366612,0,0.044189853,0.1898527],
          [7,"Andrelton Simmons","SS",0.708333333,0.0625,0.012152778,0.006944444,0.03125,0.178819444],
          [8,"BJ Upton","CF",0.70790378,0.10652921,0.020618557,0.008591065,0.032646048,0.12371134],
          [9,"Julio Teheran","P",0.894736842,0.013157895,0,0,0.013157895,0.078947368]
      ];
      this.largeBatterArray2 =[
          [1,"Brett Gardner","LF",0.688679245,0.088050314,0.02672956,0.012578616,0.039308176,0.144654088],
          [2,"Derek Jeter","SS",0.70977918,0.055205047,0.006309148,0.001577287,0.029968454,0.197160883],
          [3,"Jacoby Ellsbury","CF",0.669291339,0.08503937,0.02519685,0.007874016,0.042519685,0.17007874],
          [4,"Brian McCann","C",0.724907063,0.06133829,0.042750929,0.001858736,0.027881041,0.141263941],
          [5,"Mark Teixeira","1B",0.692913386,0.12007874,0.043307087,0,0.027559055,0.116141732],
          [6,"Chase Headley","3B",0.642857143,0.133928571,0.026785714,0,0.035714286,0.160714286],
          [7,"Martin Prado","2B",0.671532847,0.02189781,0.051094891,0,0.065693431,0.189781022],
          [8,"Ichiro Suzuki", "RF",0.677922078,0.057142857,0.002597403,0.005194805,0.033766234,0.223376623],
          [9,"Masahiro Tanaka","P",0.888888889,0,0,0,0,0.111111111]
      ];

      this.pitcherArray = [];
      this.pitcherArray1 = ["Julio Teheran",0.725113122,0.062217195,0.024886878,0.004524887,0.0260181,0.157239819];
      this.pitcherArray2 = ["Masahiro Tanaka",0.726937269,0.04612546,0.027675277,0.001845018,0.04797048,0.149446494];

      this.nameGenerator = new NameGenerator();

    	this.positionArray = ["C", "P", "1B", "2B", "3B", "SS", "LF", "CF", "RF"];
      this.ratingArray =       [0, 1, 2, 3, 4,  5,  6,  7, 8, 9];
      this.ratingWeightArray = [1, 1, 1, 3, 4, 10, 12, 10, 8, 4]; 

      // Setup Array for rating generation
      var totalweight=eval(this.ratingWeightArray.join("+"));
      this.weightedRatingsArray = new Array();
      var currentRating=0;
      while (currentRating < this.ratingArray.length){ 
          for (i=0; i < this.ratingWeightArray[currentRating]; i++){        
            this.weightedRatingsArray[this.weightedRatingsArray.length] = this.ratingArray[currentRating];
          }
        currentRating++;
      }
    },
    getRating: function(){
      return this.weightedRatingsArray[Math.floor(Math.random() * this.weightedRatingsArray.length)] * 10 + Math.floor(Math.random() * 10)
    },
    getPosition: function(){
      var arrayElementPosition = Math.floor(Math.random() * this.positionArray.length);
      var position = this.positionArray[arrayElementPosition];
      this.positionArray.splice(arrayElementPosition, 1);
      return position;
    },
    createRealBatter: function(){
      var player = {};
      player.Ratings = {};
      var counter = 0;
      var playerArray = []
      while(counter >= 0){
        playerArray = this.largeBatterArray[counter];
        if(playerArray.length == 0){
          counter++;
        }else{
          player.Name = playerArray[1];
          player.Position = playerArray[2];
          player.Ratings.hitterOutFreq = playerArray[3];
          player.Ratings.hitterWalkFreq = playerArray[4];
          player.Ratings.hitterHRFreq = playerArray[5];
          player.Ratings.hitterTripleFreq = playerArray[6];
          player.Ratings.hitterDoubleFreq = playerArray[7];
          player.Ratings.hitterSingleFreq = playerArray[8];

          this.largeBatterArray[counter] = [];
          counter = -1;
        }
      }

      //GameStats
      player.gameStats = {};
      player.gameStats.PlateAppearances = 0;
      player.gameStats.Walks = 0;
      player.gameStats.Singles = 0;
      player.gameStats.Doubles = 0;
      player.gameStats.Triples = 0;
      player.gameStats.HomeRuns = 0;
      player.gameStats.RunsBattedIn = 0;
      player.gameStats.Runs = 0;
      player.gameStats.StrikeOuts = 0;
      return player;
    },
    createRealPitcher: function(){
      var pitcher = {};
      pitcher.name = this.pitcherArray[0];
      pitcher.pitcherOutFreq = this.pitcherArray[1];
      pitcher.pitcherWalkFreq = this.pitcherArray[2];
      pitcher.pitcherHRFreq = this.pitcherArray[3];
      pitcher.pitcherTripleFreq = this.pitcherArray[4];
      pitcher.pitcherDoubleFreq = this.pitcherArray[5];
      pitcher.pitcherSingleFreq = this.pitcherArray[6];

      return pitcher;
    },
    createCustomPlayer: function(){
      player = {};
      player.Name = this.nameGenerator.getFullName();
      player.Rating = this.getRating();
      player.Position = this.getPosition();
      player.gameStats = {};
      player.gameStats.PlateAppearances = 0;
      player.gameStats.Walks = 0;
      player.gameStats.Singles = 0;
      player.gameStats.Doubles = 0;
      player.gameStats.Triples = 0;
      player.gameStats.HomeRuns = 0;
      player.gameStats.RunsBattedIn = 0;
      player.gameStats.Runs = 0;
      player.gameStats.StrikeOuts = 0;
      return player;
    },
    createTeam: function(teamName){
      if(teamName == "Braves"){
        this.largeBatterArray = this.largeBatterArray1;
        this.pitcherArray = this.pitcherArray1;
      }
      if(teamName == "Yankees"){
        this.largeBatterArray = this.largeBatterArray2;
        this.pitcherArray = this.pitcherArray2;
      }

      var numberOfPlayers = 9;
      this.team = {};
      this.team.Lineup = [];
      
      for(var i = 0; i < numberOfPlayers; i++){
        this.team.Lineup[i]= this.createRealBatter();
        //this.team.Lineup[i]= this.createCustomPlayer();
      }

      this.team.pitcher = this.createRealPitcher();

      return this.team;
    }
  });
  // Our module now returns our view
  return TeamGenerator;
});
