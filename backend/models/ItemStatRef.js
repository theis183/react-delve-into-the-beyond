var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ItemStatRefSchema = new Schema({
    name: {type: String},
    techLvl: {type: Number},
    volume: {type: Number},
    value: {type: Number},
    property: {type: Object}
})

ItemStatRefSchema.methods.setName = function (itemName){
    this.name = itemName
    return this.name
}

ItemStatRefSchema.methods.setTechLevel = function (itemTechLvl){
    this.techLvl = itemTechLvl
    return this.techLvl
}

ItemStatRefSchema.methods.setVolume = function(itemVolume){
    this.volume = itemVolume
    return this.itemVolume
}

ItemStatRefSchema.methods.setValue = function(itemValue){
    this.value = itemValue
    return this.itemValue
}

ItemStatRefSchema.methods.setProperty = function(property){
    this.property = property
    return this.property
}

ItemStatRefSchema.methods.initItem = function(item){
    this.setName(item.name)
    this.setTechLevel(item.techLvl)
    this.setVolume(item.volume)
    this.setValue(item.value)
    this.setProperty(item.property)
}

var ItemStatRef = mongoose.model("ItemStatRef", ItemStatRefSchema)

module.exports = ItemStatRef