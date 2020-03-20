const express = require('express');
const auth = require('../middleware/auth');

const Comments = require('../model/Comments');

const router = express.Router();

router.get('/:id', auth, async (req, res) => {
    const comments = await Comments.find({newsId: req.params.id}).populate('user');

    res.send(comments);
});


router.post('/', auth, async (req, res) => {
    try {
        const user = req.user;

        const comments = await Comments.create({user: user._id, comments: req.body.comments, newsId: req.body.newsId});

        return res.send(comments);
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;