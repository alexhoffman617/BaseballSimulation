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
    createPlayer: function(){
      player = {};
      player.Name = nameGenerator.getFullName();
      player.Rating = this.getRating();
      player.Position = this.getPosition();
      return player;
    },
    createTeam: function(){
      var numberOfPlayers = 9;
      this.team = [];
      for(var i = 0; i < numberOfPlayers; i++){
        this.team[i]= this.createPlayer();
      }
      return this.team;
    }
  });
  // Our module now returns our view
  return TeamGenerator;
});
