const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose")
const path = require("path")

// ... other app.use middleware 
app.use(express.static( "../client/build"))

// ...
// Right before your app.listen(), add this:




// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Define API routes here
require("./routes/api/serverInit")(app)
require("./routes/api/playerInit")(app)
require("./routes/api/userInit") (app)
require('./routes/api/shipInit') (app)
require('./routes/api/gameActions') (app)
// Send every other request to the React app
// Define any API routes before this runs

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/galaxy")

app.get("*", (req, res) => {
  res.sendFile("../client/build/index.html");
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
