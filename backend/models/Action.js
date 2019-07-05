var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ActionSchema = new Schema({
    actionType: {type: String},
    actionValue: {type: String},
    actionCompletionTime: {type: Date},
    completed: {type: Boolean, default: false}
})

var Action = mongoose.model("Action", ActionSchema)

module.exports  = Action