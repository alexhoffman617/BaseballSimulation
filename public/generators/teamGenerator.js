define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
  var TeamGenerator = Backbone.View.extend({
    events: {
    },
    initialize: function(){

    	this.positionArray = ["C", "P", "1B", "2B", "3B", "SS", "LF", "CF", "RF"];
      this.ratingArray =       [0, 1, 2, 3, 4,  5,  6,  7, 8, 9];
      this.ratingWeightArray = [1, 2, 5, 7, 9, 13, 13, 11, 9, 5]; 

      // Setup Array for rating generation
      var totalweight=eval(ratingWeightArray.join("+"));
      this.weightedRatingsArray = new Array();
      var currentRating=0;
      while (currentRating<ratingArray.length){ 
          for (i=0; i<ratingWeightArray[currentRating]; i++){        
            this.weightedRatingsArray[this.weightedRatingsArray.length]=ratingArray[currentRating];
          }
        currentRating++;
      }
    },
    getRating: function(){
      return this.weightedRatingsArray[Math.floor(Math.random() * weightedRatingsArray.length)] * 10 + Math.floor(Math.random() * 10)
    }
    getPosition: function(){
      var arrayElementPosition = Math.floor(Math.random() * this.positionArray.length);
      var position = this.positionArray[arrayElementPosition];
      this.positionArray.splice(arrayElementPosition, 1);
      return position;
    },
    createPlayer: function(){
      player = {};
      player.Rating = this.getRating();
      player.Position = this.getPosition();
      return player;
    },
    createTeam: function(int numberOfPlayers){
      this.team = []
      for(int i = 0; i <numberOfPlayers; i++){
        this.team[i]= this.createPlayer();
      }
    }
  });
  // Our module now returns our view
  return TeamGenerator;
});
