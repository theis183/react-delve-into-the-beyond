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

CharacterSchema.methods.setCharacterCurrentSS = function(solarSystem){
    this.currentSS = solarSystem
    return this.currentSS
}

CharacterSchema.methods.setCurrentPlanet = function(planet){
    this.currentPlanet = planet
    return this.currentPlanet
}

CharacterSchema.methods.setShip = function(ship){
    this.ship = ship
    return this.ship
}

CharacterSchema.methods.setCurrency = function(currency){
    this.currency = currency
    return this.currency
}

CharacterSchema.methods.addCurrency = function(amount){
    this.currency += amount
    return this.currency
}

CharacterSchema.methods.initCharacter = function(characterName){
    this.setCharacterName(characterName)
    this.setCurrency(10000)
}

var Character = mongoose.model("Character", CharacterSchema)

module.exports = Character