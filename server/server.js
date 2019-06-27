const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose")


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("build"));


// Define API routes here
require("./routes/api/serverInit")(app)
require("./routes/api/playerInit")(app)
require("./routes/api/userInit") (app)
// Send every other request to the React app
// Define any API routes before this runs

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/galaxy")

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
