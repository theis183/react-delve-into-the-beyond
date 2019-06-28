var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var CharacterSchema = new Schema({
    characterName: {type: String},
    currentSS: {type: Schema.Types.ObjectId, ref: "SolarSystem"},
    currentPlanet: {type: Schema.Types.ObjectId, ref: "Planet"},
    ship: {type: Schema.Types.ObjectId, ref: "Ship"},
    currency: {type: Number}
})

CharacterSchema.methods.setCharacterName = function(characterName) {
    this.characterName = characterName
    return this.characterName
}

var Character = mongoose.model("Character", CharacterSchema)

module.exports = Character