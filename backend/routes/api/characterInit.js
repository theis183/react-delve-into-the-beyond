var db = require("../../models");


function populateCurrentSS(character) {
    console.log("in the populate SS")
    db.SolarSystem.findOne({ 'coord': [0, 0, 0] }).then((dbSolarSystem) => {
        console.log("found the solar system")
        console.log("Here is the solar system " + dbSolarSystem)
        return db.Character.findOneAndUpdate({ '_id': character._id }, { '$set': { currentSS: dbSolarSystem._id } }, { new: true })
    })
}

function populateCurrentPlanet(character) {
    db.SolarSystem.findOne({ 'coord': [0, 0, 0] })
        .populate('planets')
        .exec((err, dbSolarSystem) => {
            console.log("found the planet")
            console.log("The planet is " + dbSolarSystem.planets[0]._id)
            console.log("Here is the character id: " + character._id)
            if (err) {
                console.log("There was an error in populate planet")
            }
            db.Planet.findOne({ '_id': dbSolarSystem.planets[0]._id }).then((dbPlanet) => {
                return db.Character.findOneAndUpdate({ '_id': character._id }, { '$set': { currentPlanet: dbPlanet._id } }, { new: true })
            })

        })
}

function createShip(dbCharacter) {
    db.ShipStatRef.find({
        shipName: 'Delver',
        techLevel: 0
    }).then(
        dbShipStaticRef => {
            console.log("Made it to the ship inst create with dbstaticRef: " + dbShipStaticRef)
            console.log("Ship Name: " + dbShipStaticRef[0].shipName)
            db.ShipInst.create({
                shipName: dbShipStaticRef[0].shipName,
                role: dbShipStaticRef[0].role,
                shipClass: dbShipStaticRef[0].shipClass,
                acceleration: dbShipStaticRef[0].acceleration,
                wormHoleFactor: dbShipStaticRef[0].wormHoleFactor,
                cargoCapacity: dbShipStaticRef[0].cargoCapacity,
                fuelCapacity: dbShipStaticRef[0].fuelCapacity,
                scanRange: dbShipStaticRef[0].scanRange,
                scanResolution: dbShipStaticRef[0].scanResolution,
                miningLasers: dbShipStaticRef[0].miningLasers,
                miningLaserYield: dbShipStaticRef[0].miningLaserYield,
                hasLab: dbShipStaticRef[0].hasLab,
                researchBonus: dbShipStaticRef[0].researchBonus,
                hasManufactury: dbShipStaticRef[0].hasManufactury,
                manufacturyBonus: dbShipStaticRef[0].manufacturyBonus,
                techLevel: dbShipStaticRef[0].techLevel
            }).then(dbShipInst => {
                createInventory(dbShipInst)
                return db.Character.findOneAndUpdate({'_id': dbCharacter._id}, {'$set': {shipInst: dbShipInst._id}}, {new: true})
            })
        }
    )
}

function createInventory(dbShipInst) {
    db.Inventory.create({})
    .then( 
        dbInventory =>
        {
            initItemFuel(dbInventory)
            initItemWarpFuel(dbInventory)
            return db.ShipInst.findOneAndUpdate({'_id': dbShipInst._id}, {'$set': {inventory: dbInventory._id}}, {new: true})
        }
    )
}

function initItemFuel(dbInventory){
    db.ItemStatRef.find({
        name: "fuel",
        techLvl: 0
    }).then(
        dbItems => {
            const dbItem = dbItems[0]
            var item = new db.ItemInst
            item.initItem(dbItem, 1000)
            db.ItemInst.create(item)
            .then(
                dbItemInst =>{
                    return db.Inventory.findOneAndUpdate({'_id': dbInventory._id}, {'$push': {items: dbItemInst._id}}, {new: true})
                })
        }
    )
}

function initItemWarpFuel(dbInventory){
    db.ItemStatRef.find({
        name: "warpFuel",
        techLvl: 0
    }).then(
        dbItems => {
            console.log("Here is the stat ref for warp fuel " + JSON.stringify(dbItems))
            const dbItem = dbItems[0]
            var item = new db.ItemInst
            item.initItem(dbItem, 1000)
            db.ItemInst.create(item)
            .then(
                dbItemInst =>{
                    return db.Inventory.findOneAndUpdate({'_id': dbInventory._id}, {'$push': {items: dbItemInst._id}}, {new: true})
                })
        }
    )
}

module.exports = function (app) {
    app.post("/api/createCharacter", function (req, res) {
        const { body } = req
        const { userId, characterName } = body
        var character = new db.Character
        character.initCharacter(characterName)
        db.Character.create(character).then(function (dbCharacter) {
            res.json(dbCharacter)
            populateCurrentSS(dbCharacter)
            populateCurrentPlanet(dbCharacter)
            createShip(dbCharacter)
            return db.User.findOneAndUpdate({ '_id': userId }, { '$push': { characters: dbCharacter._id } }, { new: true })

        })
    })

    app.get("/api/character/:characterId", function (req, res) {
        characterId = req.params.characterId
        db.Character.find({
            _id: characterId
        }).populate('currentSS')
            .populate('currentPlanet')
            .populate('shipInst')
            .populate('actions')
            .exec((err, character) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Server error"
                    })
                }
                if (character.length != 1) {
                    return res.send({
                        success: false,
                        message: "Invalid"
                    })
                }
                else {
                    res.send({
                        success: true,
                        message: "Found Character",
                        character: character[0]
                    })
                }
            })
    })
}