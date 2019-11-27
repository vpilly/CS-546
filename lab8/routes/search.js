const express = require('express');
const router = express.Router();
const peopleData = require('../data/people');


router.post('/', async (req, res) => {
    const formData = req.body;
    console.log(formData);

    if (!formData.personName) {
        res.status(400).json({ error: e });
        return;
    }

    try {
        const people = await peopleData.findPeopleByName(formData.personName);
        if (people.length > 0) res.render('search', { peopleList: people });
        else res.render('search', { noPeople: true });
    } catch (e) {
        res.status(500).json({ error: e });
    }

});

module.exports = router;
