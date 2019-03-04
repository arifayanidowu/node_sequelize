const express = require("express");
const path = require('path');
const db = require("./config/database");
const gigsRoutes = require("./routes/gigs");
const app = express();

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });


app.use(require("express-edge"));
app.set("views", `${__dirname}/views`);

app.use(express.static(path.join(__dirname, 'public')));

app.use("/gigs", gigsRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`[Server]: Listening on port ${PORT}`));
