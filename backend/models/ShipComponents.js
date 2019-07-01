var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ShipComponentSchema = new Schema({
    engine: {type: Object},
    warpDrive: {type: Object},
    miningLasers: {type: Object},
    lab: {type: Object},
    manufactuary: {type: Object},
    fuel: {type: Object},
    warpFuel: {type: Object}

})

var ShipComponent = mongoose.model("ShipComponent", ShipComponentSchema)

module.exports = ShipComponent