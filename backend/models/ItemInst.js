var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ItemInstSchema = new Schema({
    name: {type: String},
    techLvl: {type: Number},
    quantity: {type: Number},
    volume: {type: Number},
    value: {type: Number},
    property: {type: Object}
})

ItemInstSchema.methods.setName = function (itemName){
    this.name = itemName
    return this.name
}

ItemInstSchema.methods.setTechLevel = function (itemTechLvl){
    this.techLvl = itemTechLvl
    return this.techLvl
}

ItemInstSchema.methods.setVolume = function(itemVolume){
    this.volume = itemVolume
    return this.itemVolume
}

ItemInstSchema.methods.setValue = function(itemValue){
    this.value = itemValue
    return this.itemValue
}

ItemInstSchema.methods.setProperty = function(property){
    this.property = property
    return this.property
}

ItemInstSchema.methods.setQuantity = function(quantity){
    this.quantity = quantity
    return this.quantity
}

ItemInstSchema.methods.initItem = function(item, quantity){
    console.log("In the item inst init, here is the item" + item)
    this.setName(item.name)
    this.setTechLevel(item.techLvl)
    this.setVolume(item.volume)
    this.setValue(item.value)
    this.setProperty(item.property)
    this.setQuantity(quantity)
}

ItemInstSchema.methods.initRandomItem = function(stationSize){
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

var ItemInst = mongoose.model("ItemInst", ItemInstSchema)

module.exports = ItemInst