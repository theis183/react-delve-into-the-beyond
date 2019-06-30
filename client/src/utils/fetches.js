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
  }
 
}

