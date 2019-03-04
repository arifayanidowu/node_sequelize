const express = require("express");
const path = require("path");
const db = require("./config/database");
const gigsRoutes = require("./routes/gigs");
const homeRoutes = require("./routes/index");
const app = express();

// Database connection test
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// Edge templating engine
app.use(require("express-edge"));
app.set("views", `${__dirname}/views`);

// BodyParser
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/gigs", gigsRoutes);
app.use("/", homeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`[Server]: Listening on port ${PORT}`));
