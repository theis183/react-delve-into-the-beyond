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
}