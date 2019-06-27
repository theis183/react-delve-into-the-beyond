var db = require("../../models");

module.exports = function (app) {
    app.post("/api/createPlayer/:playerName", function(req, res) {
        var player = new db.Player
        player.setPlayerName(req.params.playerName)
        db.Player.create(player).then(function(dbPlayer){
            res.json(dbPlayer)
        })
    })
}