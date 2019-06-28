var db = require("../../models");

function createArtifact(dbPlanet, dbSolarSystem){
    var artifact = new db.Artifact
    artifact.initArtifact(dbSolarSystem.distanceFromOrigin)
    db.Artifact.create(artifact)
        .then(function(dbArtifact){
            return db.Planet.findOneAndUpdate({'_id': dbPlanet._id}, {'$push': {artifacts: dbArtifact._id}}, {new: true})
        })
}

function createStation(dbPlanet, dbSolarSystem){
    var station = new db.Station
    station.initStation(dbSolarSystem.distanceFromOrigin)
    db.Station.create(station)
    .then(function(dbStation){
        return db.Planet.findOneAndUpdate({'_id': dbPlanet._id}, {'$push': {stations: dbStation._id}}, {new: true})
    })
}

function createPlanet(dbSolarSystem, dbStar) {
    var planet = new db.Planet
    planet.initPlanet(dbStar.temp, dbSolarSystem.distanceFromOrigin)
    db.Planet.create(planet)
        .then(function (dbPlanet) {
            for(var i = 0; i < dbPlanet.numOfArtifacts; i++){
                createArtifact(dbPlanet, dbSolarSystem)
            }
            for (var i = 0; i < dbPlanet.numOfStations; i++){
                createStation(dbPlanet, dbSolarSystem)
            }
            return db.SolarSystem.findOneAndUpdate({ '_id': dbSolarSystem._id }, { '$push': { planets: dbPlanet._id } }, { new: true })
        })
}




module.exports = function (app) {

    app.post("/api/createGalaxy/:numberOfSystems/:sizeOfGalaxy", function (req, res) {
        var numberOfSystems = parseInt(req.params.numberOfSystems)
        var sizeOfGalaxy = parseFloat(req.params.sizeOfGalaxy)
        for (var i = 0; i < numberOfSystems; i++) {
            var solarSystem = new db.SolarSystem
            solarSystem.initSolarSystem(sizeOfGalaxy)
            db.SolarSystem.create(solarSystem).then(function (dbSolarSystem) {
                var star = new db.Star
                star.initStar()
                db.Star.create(star).then(function (dbStar) {
                    for (var j = 0; j < dbSolarSystem.numOfPlanets; j++) { createPlanet(dbSolarSystem, dbStar) }
                    return db.SolarSystem.findOneAndUpdate({ '_id': dbSolarSystem._id }, { '$set': { star: dbStar._id } }, { new: true })
                }).then(function () {
                    res.json(dbSolarSystem)
                })
            })
        }
    })
}