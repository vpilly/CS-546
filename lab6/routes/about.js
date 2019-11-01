const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const info = {
      "name": "Varun Pilly",
      "cwid": "10419906",
      "biography": "I am third year computer science student at Stevens. I am unsure of which specific field I am going to work in, but I do not want to do operating systems. My favorite type of food is thai.\nI am more of a tea person rather than a cofee person. I love talking to my friends and spending time with them. Although most of them go to Rutgers.",
      "favoriteShows": ["Agents of Shield", "The Dragon Prince", "Black Mirror", "Daredevil"],
      "hobbies": ["Video Games", "Volleyball", "Volleyball"]
    }
    res.json(info);
  } catch (e) {
    res.status(404).json({ message: "not found!" });
  }
});

module.exports = router;