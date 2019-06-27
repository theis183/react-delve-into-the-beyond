var fs = require('fs')
var obj = {
    items: []
 }
var maxTechLevel = 100

function fuel(techLvl) {
    obj.items.push({
        "name": "fuel",
        "volume": .1,
        "value": 10 + 2 * techLvl,
        "techLvl": techLvl,
        "properties":{
            "fuelEfficiency": .02 * techLvl
        }
    })
}

function warpFuel(techLvl) {
    obj.items.push({
        "name": "fuel",
        "volume": .1,
        "value": 20 + 5 * techLvl,
        "techLvl": techLvl,
        "properties":{
            "warpFuelEfficiency": .02 * techLvl
        }
    })
}

for(var i = 0; i < maxTechLevel; i++){
    fuel(i)
    warpFuel(i)
}

fs.writeFile('items.json', JSON.stringify(obj), 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
    });