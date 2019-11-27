const express = require('express');
const router = express.Router();
const peopleData = require('../data/people');

router.get('/:id', async (req, res) => {
    try {
        const person = await peopleData.getPersonById(Number(req.params.id));
        person["name"] = `${person.firstName} ${person.lastName}`;
        person["title"] = "Person Found";
        res.render('details', person);
    } catch (e) {
        res.status(400);
        res.render('details', { hasErrors: true, title: "Person Found" });
    }
});

module.exports = router;
