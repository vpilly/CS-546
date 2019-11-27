const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;

router.get('/', async (req, res) => {
    try {
        const posts = await postData.getAllPosts();
        res.json(posts);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post('/', async (req, res) => {
    const formData = req.body;
    console.log(formData);

    if (!formData.title || !formData.author || !formData.content) {
        res.status(400).json({ error: 'invalid json' });
        return;
    }

    try {
        const post = await postData.addPost(formData.title, formData.author, formData.content);
        res.json(post);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e });
    }
});

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const post = await animalData.get(req.params.id);
        res.json(post);
    } catch (e) {
        res.status(404).json({ error: "Post not found" });
    }
});

router.put('/:id', async (req, res) => {
    console.log(req.params.id);

    const formData = req.body;
    console.log(formData);

    if (!formData.newTitle && !formData.newContent) {
        res.status(400).json({ error: 'invalid json' });
    }
    else if (!formData.newContent) {
        try {
            const post = await postData.updateTitle(req.params.id, formData.newTitle);
            res.json(post);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    }
    else if (!formData.newTitle) {
        try {
            const post = await postData.updateContent(req.params.id, formData.newContent);
            res.json(post);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    }
    else {
        try {
            const post = await postData.updatePost(req.params.id, formData.newTitle, formData.newContent);
            res.json(post);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    }
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const post = await postData.removePost(req.params.id);
        const output = { deleted: true, data: post };
        res.json(output);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;