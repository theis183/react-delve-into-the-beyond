var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ShipStatRefSchema = new Schema({
    shipName: {type: String},
    role: {type: String},
    shipClass: {type: String},
    acceleration: {type: Number},
    wormHoleFactor: {type: Number},
    cargoCapacity: {type: Number},
    fuelCapacity: {type: Number},
    warpFuelCapacity: {type: Number},
    scanRange: {type: Number},
    scanResolution: {type: Number},
    miningLasers: {type: Number},
    miningLaserYield: {type: Number},
    hasLab: {type: Boolean},
    researchBonus: {type: Number},
    hasManufactury: {type: Boolean},
    manufacturyBonus: {type: Number},
    techLevel: {type: Number}
})

var ShipStatRef = mongoose.model("ShipStatRef", ShipStatRefSchema)

module.exports = ShipStatRef
