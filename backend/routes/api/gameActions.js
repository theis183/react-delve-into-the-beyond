var db = require("../../models");
var math = require('mathjs')



module.exports = function (app) {
    app.get("/api/longRangeScan/:scanRange/:distanceFromOrigin/:coordx/:coordy/:coordz", function (req, res) {
        const scanRange = parseFloat(req.params.scanRange)
        const distanceFromOrigin = parseFloat(req.params.distanceFromOrigin)
        const coord = [parseFloat(req.params.coordx), parseFloat(req.params.coordy), parseFloat(req.params.coordz)]
        db.SolarSystem.find(
            {
                $and: [{ distanceFromOrigin: { $gte: (distanceFromOrigin - scanRange) } },
                { distanceFromOrigin: { $lte: (distanceFromOrigin + scanRange) } }]
            }
        ).then(dbSolarSystems => {
            foundSystems = []
            dbSolarSystems.forEach(solarSystem => {
                const dist = math.distance(solarSystem.coord, coord)
                console.log("distance is " + dist)
                if (dist < scanRange && dist != 0) {
                    foundSystems.push(solarSystem)
                }
            });
            res.send(foundSystems)
        }

        )
    })

    app.get("/api/midRangeScan/:solarSystemId", function (req, res) {
        db.SolarSystem.find({
            _id: req.params.solarSystemId
        }).populate('planets')
            .exec((err, solarSystem) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Server error"
                    })
                }
                if (solarSystem.length != 1) {
                    return res.send({
                        success: false,
                        message: "Invalid"
                    })
                }
                else {
                    res.send({
                        success: true,
                        message: "Found SolarSystem",
                        solarSystem: solarSystem[0]
                    })
                }
            })

    })

    app.get("/api/shortRangeScan/:planetId", function (req, res) {
        db.Planet.find({
            _id: req.params.planetId
        }).populate('stations')
            .populate('artifacts')
            .exec((err, planet) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Server error"
                    })
                }
                if (planet.length != 1) {
                    return res.send({
                        success: false,
                        message: "Invalid"
                    })
                }
                else {
                    res.send({
                        success: true,
                        message: "Found Planet",
                        planet: planet[0]
                    })
                }
            })

    })


    app.get("/api/checkAction/:characterId", function (req, res) {
        db.Character.find({
            _id: req.params.characterId
        }).populate('actions')
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
                    const actions = character[0].actions
                    var found = false
                    actions.forEach(action => {
                        if (!action.completed) {
                            found = true
                        }
                    })
                    return res.send({
                        success: true,
                        found: found
                    })
                }
            })

    })

    app.post("/api/queueAction", function (req, res, next) {
        const { body } = req
        const { characterId, actionType, time, actionValue } = body
        const newDate = Date.now() + (1000 * time)
        db.Action.create({
            actionType: actionType,
            actionCompletionTime: newDate,
            actionValue: actionValue
        }).then(dbAction => {
            return db.Character.findOneAndUpdate({ '_id': characterId }, { '$push': { actions: dbAction._id } }, { new: true })
                .then(res.send("Success"))

        })
    })

    app.get("/api/getActions/:characterId", function (req, res) {
        db.Character.find({
            _id: req.params.characterId
        }).populate('actions')
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
                    const actions = character[0].actions
                    var found = false
                    var inProgressAction = []
                    actions.forEach(action => {
                        if (!action.completed) {
                            found = true
                            inProgressAction = action
                        }
                    })
                    return res.send({
                        success: true,
                        found: found,
                        action: inProgressAction
                    })
                }
            })

    })

    app.put("/api/changePlanet/:planetId/:characterId", function (req, res, next) {
        db.Character.findOneAndUpdate({
            _id: req.params.characterId,
        },
            {
                $set: { currentPlanet: req.params.planetId }
            }, (err, planet) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Server error"
                    })
                }
                else {
                    res.send({
                        success: true,
                        message: "Changed Planets",
                        planet: planet
                    })
                }
            })
    })

    app.put("/api/changeSolarSystem/:solarSystemId/:characterId", function (req, res, next) {
        db.Character.findOneAndUpdate({
            _id: req.params.characterId,
        },
            {
                $set: { currentSS: req.params.solarSystemId }
            }, (err, character) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Server error"
                    })
                }
                else {
                    res.send({
                        success: true,
                        message: "Changed SolarSystem",
                        character: character
                    })
                }
            })
    })

    app.put("/api/completeAction/:actionId", function (req, res, next) {
        db.Action.findOneAndUpdate({
            _id: req.params.actionId
        }, {
                $set: { completed: true }
            }
            , (err, action) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Server error"
                    })
                }
                else {
                    res.send({
                        success: true,
                        message: "Completed Action",
                    })
                }
            })
    })

    app.get("/api/getStar/:starId", function (req, res) {
        db.Star.find({
            _id: req.params.starId
        })
            .exec((err, star) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Server error"
                    })
                }
                if (star.length != 1) {
                    return res.send({
                        success: false,
                        message: "Invalid"
                    })
                }
                else {
                    const dbStar = star[0]
                    return res.send({
                        success: true,
                        star: dbStar
                    })
                }
            })

    })

    app.get("/api/getInventory/:inventoryId", function (req, res) {
        db.Inventory.find({
            _id: req.params.inventoryId
        })
        .populate("items")
        .exec(
            (err, inventory) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Server error"
                    })
                }
                if (inventory.length != 1) {
                    return res.send({
                        success: false,
                        message: "Invalid"
                    })
                }
                else {
                    const dbInventory = inventory[0]
                    console.log("Here is the inventory from the ba " + JSON.stringify(dbInventory))
                    return res.send({
                        success: true,
                        inventory: dbInventory
                    })
                    
                }
            
            }
        )
    })

}