const express = require("express");
const router = express.Router();

// Harry Potter
const info1 = {
    "schoolName": "Hogwarts School of Witchcraft and Wizardry",
    "degree": "Magic School Degree",
    "favoriteClass": "Defence Against the Dark Arts",
    "favoriteMemory": "Conquering my first fear"
}

// Magic School Bus
const info2 = {
    "schoolName": "Walkerville Elementary School",
    "degree": "Elementary School Degree",
    "favoriteClass": "Computer Class",
    "favoriteMemory": "My first time on the magic school bus"
}


// Simpsons
const info3 = {
    "schoolName": "Springfield Elementary School",
    "degree": "Elementary School Degree",
    "favoriteClass": "Band Class",
    "favoriteMemory": "Playing the forbidden song in the band room when the teacher left"
}


router.get("/", async (req, res) => {
    try {
        const arr = [info1, info2, info3];
        res.json(arr);
    } catch (e) {
        res.status(404).json({ message: "not found!" });
    }
});

module.exports = router;