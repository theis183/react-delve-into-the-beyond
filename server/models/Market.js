var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MarketSchema = new Schema({
    items: [{type: Schema.Types.ObjectId, ref: "Item"}],
    numOfItems: {type: Number}
    })

MarketSchema.methods.setNumOfItems = function(stationSize){
    this.numOfItems = Math.ceil(((stationSize + 2) ** 2) * Math.random())
}    

MarketSchema.methods.initMarket = function(stationSize){
    this.setNumOfItems(stationSize)
}

var Market = mongoose.model("Market", MarketSchema)

module.exports = Market