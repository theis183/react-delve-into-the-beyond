var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var StarSchema = new Schema ({
    coordLoc: {type: Array, default: [0,0,0]},
    starType: {type: String},
    spectralType: {type: String},
    luminosity: {type: Number},
    mass: {type: Number},
    radius: {type: Number},
    temp: {type: Number}
})

StarSchema.methods.setStarType = function(){
    var rand = Math.random()
    if (rand < .01){this.starType = "blueStar"}
    else if (rand < .1) {this.starType = "yellowDwarf"}
    else if (rand < .2) {this.starType = "orangeDwarf"}
    else if (rand < .8) {this.starType = "redDwarf"}
    else if (rand < .801) {this.starType = "blueGiant"}
    else if (rand < .802) {this.starType = "blueSuperGiant"}
    else if (rand < .85) {this.starType = "redGiant"}
    else if (rand < .8501) {this.starType = "redSuperGiant"}
    else if (rand < .95) {this.starType = "brownDwarf"}
    else if (rand <.99 ) {this.starType = "whiteDwarf"}
    else if (rand <.999) {this.starType = "neutronStar"}
    else {this.starType = "blackHole"}
    return this.starType
}

StarSchema.methods.setSpectralType = function(starType) {
    var rand = Math.random()
    switch (starType){
        case ("blueStar"):
            if (rand < .6) {this.spectralType = "O"}
            else {this.spectralType = "B"}
            break;
        case("yellowDwarf"):
            this.spectralType = "G"
            break;
        case("orangeDwarf"):
            this.spectralType = "K"
            break;
        case("redDwarf"):
            if (rand < .55) {this.spectralType = "K"}
            else {this.spectralType = "M"}
            break;
        case ("blueGiant"):
            if (rand < .5) {this.spectralType = "O"}
            else if(rand < .95) {this.spectralType = "B"}
            else {this.spectralType = "A"}
            break;
        case ("blueSuperGiant"):
            if (rand < .55) {this.spectralType = "O"}
            else {this.spectralType = "B"}
            break;
        case ("redGiant"):
            if (rand < .7) {this.spectralType = "M"}
            else {this.spectralType = "K"}
            break;
        case ("redSuperGiant"):
            if (rand < .65) {this.spectralType ="K"}
            else {this.spectralType = "M"}
            break;
        case ("brownDwarf"):
            if (rand < .35) {this.spectralType = "M"}
            else if (rand < .6) {this.spectralType = "L"}
            else if (rand < .8) {this.spectralType = "T"}
            else {this.spectralType = "Y"}
            break;
        case ("whiteDwarf"):
            this.spectralType = "D"
            break;
        case ("neutronStar"):
            this.spectralType = "D"
            break;
        case ("blackHole"):
            this.spectralType = "None"
            break;
    }
    return this.spectralType

}

StarSchema.methods.setLuminosity = function(starType){
    rand = Math.random()
    switch (starType){
        case ("blueStar"):
            this.luminosity = rand * 999900 + 100
            break;
        case("yellowDwarf"):
            this.luminosity = rand * 4.4 + 0.6
            break;
        case("orangeDwarf"):
            this.luminosity = rand * 0.52 + 0.08
            break;
        case("redDwarf"):
            this.luminosity = rand * .08
            break;
        case ("blueGiant"):
            this.luminosity = rand * 1000 + 9000
            break;
        case ("blueSuperGiant"):
            this.luminosity = rand * 9999000 + 1000
            break;
        case ("redGiant"):
            this.luminosity = rand * 900 + 100
            break;
        case ("redSuperGiant"):
            this.luminosity = rand * 799000 + 1000
            break;
        case ("brownDwarf"):
            this.luminosity = rand * .0001
            break;
        case ("whiteDwarf"):
            this.luminosity = rand * 100
            break;
        case ("neutronStar"):
            this.luminosity = rand * .00001
            break;
        case ("blackHole"):
            this.luminosity = 0
            break;
    }
    return this.luminosity
}

StarSchema.methods.setMass = function(starType) {
    rand = Math.random()
    switch (starType){
        case ("blueStar"):
            this.mass = rand * 87.5 + 2.5
            break;
        case("yellowDwarf"):
            this.mass = rand * .6 + .8
            break;
        case("orangeDwarf"):
            this.mass = rand * .35 + .45
            break;
        case("redDwarf"):
            this.mass = rand * .37 + .08
            break;
        case ("blueGiant"):
            this.mass = rand * 148 + 2
            break;
        case ("blueSuperGiant"):
            this.mass = rand * 980 + 20
            break;
        case ("redGiant"):
            this.mass = rand * 9.7 + .3
            break;
        case ("redSuperGiant"):
            this.mass = rand * 30 + 10
            break;
        case ("brownDwarf"):
            this.mass = rand * .07 + .01
            break;
        case ("whiteDwarf"):
            this.mass = rand * 1.3 + .1
            break;
        case ("neutronStar"):
            this.mass = rand * 1.8 + 1.4
            break;
        case ("blackHole"):
            this.mass = rand * 10 + 4
            break;
    }
    return this.mass
}

StarSchema.methods.setTemp = function(starType) {
    rand = Math.random()
    switch (starType){
        case ("blueStar"):
            this.temp = rand + 4
            break;
        case("yellowDwarf"):
            this.temp = rand * .26 + .96
            break;
        case("orangeDwarf"):
            this.temp = rand * .3 + .6
            break;
        case("redDwarf"):
            this.temp = rand * .1 + .5
            break;
        case ("blueGiant"):
            this.temp = rand * 3 + 2
            break;
        case ("blueSuperGiant"):
            this.temp = rand * 8 + 2
            break;
        case ("redGiant"):
            this.temp = rand * .36 + .6
            break;
        case ("redSuperGiant"):
            this.temp = rand * .26 + .65
            break;
        case ("brownDwarf"):
            this.temp = rand * .5 + .01
            break;
        case ("whiteDwarf"):
            this.temp = rand * 7 + 1.5
            break;
        case ("neutronStar"):
            this.temp = rand * 5 + 10
            break;
        case ("blackHole"):
            this.temp = 0
            break;
    }
    return this.temp
}

StarSchema.methods.initStar = function(){
    this.setStarType()
    this.setSpectralType(this.starType)
    this.setLuminosity(this.starType)
    this.setMass(this.starType)
    this.setTemp(this.starType)
}


var Star = mongoose.model("Star", StarSchema)

module.exports  = Star
