import axios from "axios";

export default {

  userSignUp: function(state) {
    return axios.post("/api/account/signup", {
        username: state.username,
        email: state.email,
        password: state.password
    });
  },

  userSignIn: function(state) {
    return axios.post("/api/account/signin", {
        username: state.username,
        password: state.password
    });
  },

  userLogout: function(token){
    return axios.put("/api/account/logout/" + token)
  },

  verifyToken: function(token){
    return axios.get("/api/account/verify/" + token, {
    })
  },

  getUser: function(userId){
    return axios.get("/api/account/user/" + userId)
  },

  createCharacter: function(state){
    return axios.post("/api/createCharacter/",{
      characterName: state.characterName,
      userId: state.userId
    } )
  },

  getCharacter: function(characterId){
    return axios.get("/api/character/" + characterId)
  },

  longRangeScan: function(scanRange, coord, distanceFromOrigin){
    return axios.get("/api/longRangeScan/" + scanRange + "/" + distanceFromOrigin + "/" + coord[0] + "/" + coord[1] + "/" + coord[2])
  },

  midRangeScan: function(solarSystemId){
    return axios.get("/api/midRangeScan/" + solarSystemId)
  },
 
  shortRangeScan: function(planetId){
    return axios.get("/api/shortRangeScan/" + planetId)
  },

  checkAction: function(characterId){
    return axios.get("/api/checkAction/" + characterId)
  },

  queueAction: function(characterId, actionType, time, actionValue){
    return axios.post("/api/queueAction",{
      characterId: characterId,
      actionType: actionType,
      time: time,
      actionValue: actionValue
    } )
  },

  getActions: function(characterId){
    return axios.get("/api/getActions/" + characterId)
  },

  changePlanet: function(planetId, characterId){
    return axios.put("api/changePlanet/" + planetId +"/" + characterId )
  },

  changeSolarSystem: function(solarSystemId, characterId){
    return axios.put("/api/changeSolarSystem/" + solarSystemId + "/" + characterId)
  },

  completeAction: function(actionId){
    return axios.put("/api/completeAction/" + actionId)
  },

  getStar: function(starId){
    return axios.get("/api/getStar/" + starId)
  },

  getInventory: function(inventoryId){
    return axios.get("/api/getInventory/" + inventoryId)
  },

  addItem: function(itemName, itemTechLevel, quantity, inventoryId){
    return axios.post("/api/createItemInst",
    {
      name: itemName,
      techLvl: itemTechLevel,
      quantity: quantity,
      inventoryId: inventoryId
    })
  },

  deleteArtifact: function(artifactId){
    return axios.delete("/api/deleteArtifact/" + artifactId)
  }

}

