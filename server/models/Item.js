var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var items = require('./referenceObjects/items.json')

var ItemSchema = new Schema({
    name: {type: Number},
    techLvl: {type: Number},
    quantity: {type: Number},
    volume: {type: Number},
    value: {type: Number},
    property: {type: Object}
})

ItemSchema.methods.setName = function (itemName){
    this.name = itemName
    return this.name
}

ItemSchema.methods.setTechLevel = function (itemTechLvl){
    this.techLvl = itemTechLvl
    return this.techLvl
}

ItemSchema.methods.setVolume = function(itemVolume){
    this.volume = itemVolume
    return this.itemVolume
}

ItemSchema.methods.setValue = function(itemValue){
    this.value = itemValue
    return this.itemValue
}

ItemSchema.methods.setProperty = function(property){
    this.property = property
    return this.property
}

ItemSchema.methods.setQuantity = function(quantity){
    this.quantity = quantity
    return this.quantity
}

ItemSchema.methods.initItem = function(item, quantity){
    this.setName(item.name)
    this.setTechLevel(item.techLvl)
    this.setVolume(item.volume)
    this.setValue(item.value)
    this.setProperty(item.property)
    this.setQuantity(quantity)
}

ItemSchema.methods.initRandomItem = function(stationSize){
    rand = Math.random()
    if (rand < .4){
        myItem = items.items.filter(
            item => item.name == 'fuel' && item.techLvl == stationSize
        )
        quantity = Math.ceil(Math.random() * 100 * stationSize) + 100
    }
    else {
        myItem = items.items.filter(
            item => item.name == 'warpFuel' && item.techLvl == stationSize
        )
        quantity = Math.ceil(Math.random() * 100 * stationSize) + 100
    }
    this.initItem(myItem, quantity)
}

var Item = mongoose.model("Item", ItemSchema)

module.exports = Item