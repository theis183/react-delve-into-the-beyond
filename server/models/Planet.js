var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var PlanetSchema = new Schema({
    coordLoc: [],
    distanceFromStar: {type: Number},
    planetTemp: {type:Number},
    planetType: {type: String},
    numOfArtifacts: {type: Number},
    artifacts: [{type: Schema.Types.ObjectId, ref: "Artifact"}], 
    numOfStations: {type: Number},
    stations: [{type: Schema.Types.ObjectId, ref: "Station"}]

})

PlanetSchema.methods.setCoordLoc = function(){
    this.coordLoc = Array.from({length: 3}, () =>Math.pow(Math.random() * 3 - 1.5, 5 ))
    return this.coordLoc
}

PlanetSchema.methods.setPlanetTemp = function(distanceFromStar, starTemp) {
    this.planetTemp = starTemp / distanceFromStar
    return this.planetTemp
}

PlanetSchema.methods.setDistanceFromStar = function(coordLoc){
    this.distanceFromStar = Math.sqrt((Math.pow(coordLoc[0], 2) + Math.pow(coordLoc[1], 2) + Math.pow(coordLoc[2] , 2 ) ))
    return this.distanceFromOrigin
}

PlanetSchema.methods.setPlanetType = function(planetTemp){
    console.log(planetTemp)
    if(planetTemp < .15) {this.planetType = "Heavy Gas Giant"}
    else if (planetTemp < .75) {this.planetType = "Gas Giant"}
    else if (planetTemp < .90) {this.planetType = "Terran Ice"}
    else if (planetTemp < 1.2) {this.planetType = "Terran Water"}
    else if (planetTemp < 2) {this.planetType = "Terran Dessert"}
    else {this.planetType = "Terran Volcanic"}
    return this.planetType
}

PlanetSchema.methods.setNumOfArtifacts = function(distanceFromOrigin, planetType){
    const rand = Math.random() * Math.sqrt(distanceFromOrigin)
    console.log("*************")
    console.log(rand)
    switch(planetType){
        case "Terran Volcanic":
            this.numOfArtifacts = Math.floor(rand * 1.1)
            break;
        case "Terran Dessert":
            this.numOfArtifacts = Math.floor(rand * 2.25)
            break;
        case "Terran Water":
            this.numOfArtifacts = Math.floor(rand * 10)
            break;
        case "Terran Ice":
            this.numOfArtifacts = Math.floor(rand * 5.5)
            break;
        case "Gas Giant":
            this.numOfArtifacts = 0
            break;
        case "Heavy Gas Giant":
            this.numOfArtifacts = 0
            break;
    }
return this.numOfArtifacts
}

PlanetSchema.methods.setNumOfStations = function (distanceFromOrigin){
    this.numOfStations = Math.floor((Math.sqrt(250/ Math.sqrt(1 + distanceFromOrigin)) * Math.random()))
    return this.numOfStations
}

PlanetSchema.methods.initPlanet = function(starTemp, distanceFromOrigin){
    this.setCoordLoc()
    this.setDistanceFromStar(this.coordLoc)
    this.setPlanetTemp(this.distanceFromStar, starTemp)
    this.setPlanetType(this.planetTemp)
    this.setNumOfArtifacts(distanceFromOrigin, this.planetType)
    this.setNumOfStations(distanceFromOrigin)
}

var Planet = mongoose.model("Planet", PlanetSchema)

module.exports = Planet