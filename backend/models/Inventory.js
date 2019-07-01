var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var InventorySchema = new Schema({
    volume: {type: Number},
    items: []
})

var Inventory = mongoose.model("Inventory", InventorySchema)

module.exports = Inventory