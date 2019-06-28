var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StationSchema = new Schema ({
    stationSize: {type: Number},
    market: {type: Schema.Types.ObjectId, ref: "Market"},
    manufacturingLvl: {type: Number},
    labLvl: {type: Number}
})

StationSchema.methods.setStationSize = function(distanceFromOrigin){
    this.stationSize = Math.ceil((Math.random() * 100) * (1/ (1 + Math.sqrt(distanceFromOrigin)))) 
    return this.stationSize
}

StationSchema.methods.setManufacturingLvl = function(stationSize){
    this.manufacturingLvl = Math.floor(stationSize * Math.random() * 1.25)
    return this.manufacturingLvl 
}

StationSchema.methods.setLabLvl = function(stationSize){
    this.labLvl = Math.floor((stationSize ** 2) * Math.random() * .25)
    return this.manufacturingLvl 
}


StationSchema.methods.initStation = function(distanceFromOrigin){
    this.setStationSize(distanceFromOrigin)
    this.setManufacturingLvl(this.stationSize)
    this.setLabLvl(this.stationSize)
}


var Station = mongoose.model("Station", StationSchema)

module.exports  = Station