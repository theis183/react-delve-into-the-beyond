var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ShipSchema = new Schema({
    shipClass: {type: String},
    acceleration: {type: Number},
    cargoCapacity: {type: Number},
    fuelCapacity: {type: Number},
})

var Ship = mongoose.model("Ship", ShipSchema)

module.exports = Ship
