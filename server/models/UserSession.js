var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSessionSchema = new Schema ({
    userId: {type: String, default: ''},
    timestamp: {type: Date, default: Date.now},
    isDeleted: {type: Boolean, default: false}
  
}) 



var UserSession = mongoose.model("UserSession", UserSessionSchema)

module.exports  = UserSession