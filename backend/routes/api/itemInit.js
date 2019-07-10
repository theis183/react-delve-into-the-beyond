var db = require("../../models");

module.exports = function (app) {
    app.post("/api/createItemStaticRef/:techLvlMax", function (req, res) {
        techLvlMax = parseInt(req.params.techLvlMax)

        function fuel(techLvl) {
            return({
                "name": "fuel",
                "volume": .1,
                "value": 10 + 2 * techLvl,
                "techLvl": techLvl,
                "property":{
                    "fuelEfficiency": .02 * techLvl + 0
                }
            })
        }

        function warpFuel(techLvl) {
            return({
                "name": "warpFuel",
                "volume": .1,
                "value": 20 + 5 * techLvl,
                "techLvl": techLvl,
                "property":{
                    "warpFuelEfficiency": .02 * techLvl + 0
                }
            })
        }

        function artifact(techLvl) {
            return({
                "name": "artifact",
                "volume": 50,
                "value": 10000 + 1000 * techLvl,
                "techLvl": techLvl,
                "property":{
                    "research": .02 * techLvl + 0
                }
            })
        }

        for(var i = 0; i < techLvlMax; i++){
            db.ItemStatRef.create(fuel(i))
            db.ItemStatRef.create(warpFuel(i))
            db.ItemStatRef.create(artifact(i))
        }

    })

    app.get("/api/getItemStaticRef/:itemName/:techLevel", function (req, res) {
        itemName = req.params.itemName
        techLevel = parseInt(req.params.techLevel)
        db.ItemStatRef.find({
            name: itemName,
            techLevel: techLevel
         }).then( dbitemStaticRef => {
             res.send(dbitemStaticRef)
         })
    })

    app.post("/api/createItemInst", function (req, res) {
        const {body} = req
        const {name, techLvl, quantity, inventoryId} = body
        console.log("Here is inventoryId" + inventoryId)
        db.ItemStatRef.find({
            name: name,
            techLvl: techLvl
         }).then(
           dbItemStaticRefs => {
               const dbItemStaticRef = dbItemStaticRefs[0]
               var item = new db.ItemInst
               item.initItem(dbItemStaticRef, quantity)
               db.ItemInst.create(
                item
            ).then(dbItemInst =>{
                return db.Inventory.findOneAndUpdate({'_id': inventoryId}, {'$push': {items: dbItemInst._id}}, {new: true})
               }).then(res.send("Item Added"))
           } 
        )

    })
}