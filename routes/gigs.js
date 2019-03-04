const router = require("express").Router();
const db = require("../config/database");
const Gig = require("../models/Gigs");

router.get("/", (req, res) => {
  Gig.findAll()
    .then(gigs => {
      res.render("gigs", {
        gigs,
        title: "Gigs"
      });
    })
    .catch(err => console.log(err));
});

// Add a gig
router.post("/add", (req, res) => {
  const data = {
    title: "Wordpress developers",
    technologies: "wordpress,php,html,css",
    budget: "$1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus magna ac tellus placerat, sit amet dignissim odio viverra. Vivamus tellus mi, bibendum non erat accumsan, facilisis facilisis diam. Sed quis lacinia felis, non accumsan ligula. Etiam ex tellus, faucibus non leo in, tincidunt viverra elit. Duis aliquam, nulla sed consequat egestas, justo odio gravida lectus, quis pellentesque velit massa nec erat. In malesuada, ipsum et congue lobortis, dolor libero laoreet urna, nec varius diam dolor at tellus. Quisque suscipit dignissim orci ut faucibus.",
    contact_email: "user2@gmail.com"
  };

  let { title, technologies, budget, description, contact_email } = data;

  Gig.create({
    title,
    technologies,
    budget,
    description,
    contact_email
  })
    .then(gig => res.redirect("/gigs"))
    .catch(err => console.log(err));
});

module.exports = router;
