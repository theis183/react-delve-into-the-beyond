var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var InventorySchema = new Schema({
    items: [{type: Schema.Types.ObjectId, ref: "ItemInst"}]
})

var Inventory = mongoose.model("Inventory", InventorySchema)

module.exports = Inventory