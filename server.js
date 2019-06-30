const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose")
const path = require("path")


// Define middleware here
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Define API routes here
require("./backend/routes/api/serverInit")(app)
require("./backend/routes/api/characterInit")(app)
require("./backend/routes/api/userInit") (app)
// Send every other request to the React app
// Define any API routes before this runs

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/galaxy")

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
