const express = require("express");
const router = express.Router();
const peopleData = require('../data/people');

router.get("/", async (req, res) => {
    try {
        const people = await peopleData.getPeople();
        res.json(people);
    } catch (e) {
        res.status(404).json({ message: "not found!" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const person = await peopleData.getPersonById(parseInt(req.params.id));
        res.json(person);
    } catch (e) {
        res.status(404).json({ message: "not found!" });
    }
});

module.exports = router;