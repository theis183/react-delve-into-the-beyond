const db = require("../../models");

module.exports = function (app) {
app.post("/api/account/signup", function (req, res, next) {
    const { body } = req
    const { username, email, password} = body
    if(!username){
        return res.send({
            success: false,
            message: "Error UserName cannot be blank"
        })
    }

    if(!password){
        return res.send({
            success: false,
            message: "Error Password cannot be blank"
        })
    }

    db.User.find({
        username: username
    }, (err, previousUser) => {
        if(err) {
            return res.send({
                success: false,
                message: "Server Error"
            })
        }
        else if (previousUser.length > 0){
            return res.send({
                success: false,
                message: "Error, user already exists"
            })
        }

        const newUser = new db.User
        newUser.username = username
        newUser.email = email
        newUser.password = newUser.generateHash(password)
        newUser.save((err, user) => {
            if(err){
                return res.send({
                    success: false,
                    message: "Server Error"
                })
            }
            return res.send({
                success: true,
                message: "Signup complete"
            })
        }
        
        ) 
    }

    )
})

app.post("/api/account/signin", function (req, res, next) {
    const { body } = req
    const { username, password} = body

if(!username){
    return res.send({
        success: false,
        message: "Error UserName cannot be blank"
    })
}

if(!password){
    return res.send({
        success: false,
        message: "Error Password cannot be blank"
    }) 
}

db.User.find({
    username: username  
}, (err, users) => {
    if(err) {
        return res.send({
            success: false,
            message: "Server Error"
        })
    }
    if(users.length != 1){
        return res.send({
            success: false,
            message: "Invalid"
        })
    }
    const user = users[0]
    if(!user.validPassword(password)){
        return res.send({
            success: false,
            message: "Invalid"
        })
    }
    var userSession = new db.UserSession
    userSession.userId  = user._id
    userSession.save((err, doc) => {
        if(err){
            return res.send({
                success: false,
                message: "Server Error"
            })
        }
        return res.send({
            success: true,
            message: "Valid sign in",
            token: doc._id
        })
    })
})

})

app.get("/api/account/verify/:token", function(req, res, next){
    token = req.params.token
    console.log("Here is the token in the api endpoint" + token)
    db.UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if(err) {
            return res.send({
                success: false,
                message: "Server error"
            })
        }
        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: "Invalid"
            })
        }
        else {
            res.send({
                success: true,
                message: "Found Session"
            })
        }
    })
})

app.put("/api/account/logout", function(req, res, next){
    const {query} = req
    const {token} = query
    db.UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    },
    {
        $set: {isDeleted:true}
    }, (err, sessions) => {
        if(err) {
            return res.send({
                success: false,
                message: "Server error"
            })
        }
        else {
            res.send({
                success: true,
                message: "Logged Out"
            })
        }
    })
})

}