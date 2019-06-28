var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var SolarSystemSchema = new Schema({
    coord: [],
    distanceFromOrigin: {type:Number},
    star: {type: Schema.Types.ObjectId, ref: "Star"},
    planets: [{type: Schema.Types.ObjectId, ref: "Planet"}],
    numOfPlanets: {type:Number}
})

SolarSystemSchema.methods.setCoord = function(galaxySize){
    this.coord = Array.from({length: 3}, () => Math.random() * galaxySize * 2 - galaxySize)
    return this.coord
}

SolarSystemSchema.methods.setDistanceFromOrigin = function(coord){
    this.distanceFromOrigin = Math.sqrt((Math.pow(coord[0], 2) + Math.pow(coord[1], 2) + Math.pow(coord[2] , 2 ) ))
    return this.distanceFromOrigin
}



SolarSystemSchema.methods.setNumOfPlanets = function(){
    this.numOfPlanets = Math.floor(Math.random() * 10 + 1)
    return this.numOfPlanets
}

SolarSystemSchema.methods.initSolarSystem = function(galaxySize){
    this.setCoord(galaxySize)
    this.setNumOfPlanets()
    this.setDistanceFromOrigin(this.coord)
}

var SolarSystem = mongoose.model("SolarSystem", SolarSystemSchema)

module.exports = SolarSystem