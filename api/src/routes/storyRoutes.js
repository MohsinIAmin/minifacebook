const storyController = require('../controllers/storyController');

const express = require('express');
const router = express.Router();
const multer = require('multer');

const PATH = './uploads';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
let upload = multer({
    storage: storage
});

router.get('/:uid', storyController.getStory);
router.post('/', upload.single("image"), storyController.postStory);

module.exports = router;