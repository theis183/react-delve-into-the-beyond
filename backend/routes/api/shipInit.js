var db = require("../../models");

module.exports = function (app) {
    app.post("/api/createShipStaticRef/:techLvlMax", function (req, res) {
        techLvlMax = parseInt(req.params.techLvlMax)

        function createDelver(techLvl){
            return(
                {
                    shipName: "Delver",
                    role: "All Purpose",
                    shipClass: "Frigate",
                    acceleration: 500.0 + .5 * techLvl,
                    cargoCapacity: 500.0 + .5 * techLvl,
                    fuelCapacity: 100.0,
                    scanRange: 2.0 + .01 * techLvl,
                    scanResolution: 2.0 + .01 * techLvl,
                    miningLasers: 1 ,
                    miningLaserYield: 10 + .01 * techLvl,
                    hasLab: false,
                    researchBonus: 0,
                    hasManufactury: false,
                    manufacturyBonus: 0,
                    techLevel: techLvl
                }
            )
        }
        for(var i = 0; i < techLvlMax; i++){
            db.ShipStatRef.create(createDelver(i))
        }
    })

    app.get("/api/getShipStaticRef/:shipName/:techLevel", function (req, res) {
        shipName = req.params.shipName
        techLevel = parseInt(req.params.techLevel)
        console.log("Ship: " + shipName)
        console.log("Tech: " + techLevel)
        db.ShipStatRef.find({
            shipName: shipName,
            techLevel: techLevel
         }).then( dbShipStaticRef => {
             console.log(dbShipStaticRef)
             res.send(dbShipStaticRef)
         })
    })

    app.post("/api/createShipInst/:shipName/:techLevel", function (req, res) {
        const shipName = req.params.shipName
        const techLevel = parseInt(req.params.techLevel)
        db.ShipStatRef.find({
            shipName: shipName,
            techLevel: techLevel
         }).then(
           dbShipStaticRef => {
               console.log("Made it to the ship inst create with dbstaticRef: " + dbShipStaticRef)
               console.log("Ship Name: " + dbShipStaticRef[0].shipName)
               db.ShipInst.create({
                shipName: dbShipStaticRef[0].shipName,
                role: dbShipStaticRef[0].role,
                shipClass: dbShipStaticRef[0].shipClass,
                acceleration: dbShipStaticRef[0].acceleration,
                cargoCapacity: dbShipStaticRef[0].cargoCapacity,
                fuelCapacity: dbShipStaticRef[0].fuelCapacity,
                scanRange: dbShipStaticRef[0].scanRange,
                scanResolution: dbShipStaticRef[0].scanResolution,
                miningLasers: dbShipStaticRef[0].miningLasers ,
                miningLaserYield: dbShipStaticRef[0].miningLaserYield,
                hasLab: dbShipStaticRef[0].hasLab,
                researchBonus: dbShipStaticRef[0].researchBonus,
                hasManufactury: dbShipStaticRef[0].hasManufactury,
                manufacturyBonus: dbShipStaticRef[0].manufacturyBonus,
                techLevel: dbShipStaticRef[0].techLevel
            }).then(dbShipInst =>{
                   res.send(dbShipInst)
               })
           } 
        )

    })
}

