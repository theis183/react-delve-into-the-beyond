var db = require("../../models");
var math = require('mathjs')



module.exports = function (app) {
    app.get("/api/longRangeScan/:scanRange/:distanceFromOrigin/:coordx/:coordy/:coordz", function (req, res) {
        const scanRange = parseFloat(req.params.scanRange)
        const distanceFromOrigin = parseFloat(req.params.distanceFromOrigin)
        const coord = [parseFloat(req.params.coordx), parseFloat(req.params.coordy), parseFloat(req.params.coordz)]
        db.SolarSystem.find(
            { $and: [ { distanceFromOrigin: { $gte: (distanceFromOrigin - scanRange) } },
                 { distanceFromOrigin: { $lte: (distanceFromOrigin + scanRange) } } ] }
            ).then( dbSolarSystems => {
                foundSystems = []
                dbSolarSystems.forEach(solarSystem => {
                    const dist = math.distance(solarSystem.coord, coord)
                    console.log("distance is " + dist)
                    if(dist < scanRange && dist != 0){
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

    app.get("/api/shortRangeScan/:planetId/:scanResolution", function (req, res) {
        db.Planet.find({
            _id:req.params.planetId
        }).populate('stations')
        
    })
}