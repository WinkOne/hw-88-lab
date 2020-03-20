const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');


const config = require('../config');

const router = express.Router();

const News = require('../model/News');

router.get('/', async (req, res) => {
    try {
        const news = await News.find();

        res.send(news);
    } catch (e) {
        res.send(e);
    }
});

router.get('/:id', async (req, res) => {

    try {
        const news = await News.findOne({_id: req.params.id});


        res.send(news);
    } catch (e) {
        res.send(e);
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, config.uploadPath),
    filename: (req, file, cb) => cb(null, nanoid() + path.extname(file.originalname))
});

const upload = multer({storage});


router.post('/', upload.single('image'), async (req, res) =>{
    try {
        const newsData = req.body;

        if(req.file) {
            newsData.image = req.file.filename;
        }

        const news = new News(newsData);

        await news.save();

        res.send(news)
    } catch (e) {
        res.send(e)
    }
});

module.exports = router;