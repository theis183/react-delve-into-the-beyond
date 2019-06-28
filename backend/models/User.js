var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

var UserSchema = new Schema ({
   username: {type: String},
   password: {type: String},
   email: {type: String},
   characters: [{type: Schema.Types.ObjectId, ref: "Character"}],
   isDeleted: {type: Boolean, default: false}
}) 

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

var User = mongoose.model("User", UserSchema)

module.exports  = User