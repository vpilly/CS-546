const express = require('express');
const router = express.Router();
const data = require('../data');
const animalData = data.animals;

router.get('/', async (req, res) => {
    try {
        const animals = await animalData.getAll();
        res.json(animals);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    const formData = req.body;
    console.log(formData);

    if (!formData.name || !formData.animalType) {
        res.status(400).json({ error: 'invalid json' });
        return;
    }

    try {
        const animal = await animalData.create(formData.name, formData.animalType);
        res.json(animal);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e });
    }
});

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const animal = await animalData.get(req.params.id);
        res.json(animal);
    } catch (e) {
        res.status(404).json({ error: 'Animal not found' });
    }
});

router.put('/:id', async (req, res) => {
    console.log(req.params.id);

    const formData = req.body;
    console.log(formData);

    if (!formData.newName && !formData.newType) {
        res.status(400).json({ error: 'invalid json' });
    } else if (!formData.newType) {
        try {
            const animal = await animalData.rename(req.params.id, formData.newName);
            res.json(animal);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    }
    else if (!formData.newname) {
        try {
            const animal = await animalData.retype(req.params.id, formData.newType);
            res.json(animal);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    }
    else {
        try {
            const animal = await animalData.update(req.params.id, formData.newName, formData.newType);
            res.json(animal);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    }
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const animal = await animalData.remove(req.params.id);
        const output = { deleted: true, data: animal };
        res.json(output);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;