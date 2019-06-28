var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArtifactSchema = new Schema({
techLevel: {type:Number},
signal: {type:Number}
})

ArtifactSchema.methods.setTechLevel = function(distanceFromOrigin){
    const rand = Math.random()
    this.techLevel = Math.ceil(rand * (Math.sqrt(distanceFromOrigin)))
    return this.techLevel
}

ArtifactSchema.methods.setSignal = function(techLevel){
    const rand = Math.random() * 100
    this.signal = rand / techLevel
    return this.signal    
}

ArtifactSchema.methods.initArtifact= function(distanceFromOrigin){
    this.setTechLevel(distanceFromOrigin)
    this.setSignal(this.techLevel)
}

var Artifact = mongoose.model("Artifact", ArtifactSchema)

module.exports  = Artifact