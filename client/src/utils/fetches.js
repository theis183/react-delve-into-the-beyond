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
  }
 
}

