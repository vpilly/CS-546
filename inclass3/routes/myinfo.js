const express = require("express");
const router = express.Router();

const myInfo = { name: 'Patrick Hill', dateOfBirth: '9/25', hometown: 'New York City' }

router.get("/", async (req, res) => {
    res.json(myInfo)
});

module.exports = router;